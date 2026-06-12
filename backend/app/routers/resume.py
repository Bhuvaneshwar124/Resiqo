import os
import uuid
from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.db.database import get_db
from app.db.models import User, Resume
from app.core.dependencies import get_current_user
from app.core.config import get_settings
from app.schemas.resume import ResumeResponse, ResumeListResponse
from app.services.document_parser import document_parser
from app.services.ai_client import ai_client
from app.utils.prompts import RESUME_PARSING_PROMPT, ParsedResumeData
from app.services.analyzer import analyzer_service
from app.db.models import AnalysisReport
from app.schemas.analysis import AnalysisReportResponse

settings = get_settings()
router = APIRouter(prefix="/api/resume", tags=["Resumes"])

@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Validate file type
    ext = file.filename.split(".")[-1].lower()
    if ext not in ["pdf", "docx", "doc"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail="Only PDF and DOCX files are supported."
        )

    file_bytes = await file.read()
    
    # 1. Parse raw text
    try:
        raw_text = document_parser.parse_document(file_bytes, file.filename)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
        
    # 2. Extract structured data via AI
    try:
        prompt = RESUME_PARSING_PROMPT.format(resume_text=raw_text)
        parsed_data = ai_client.generate_structured_data(prompt, ParsedResumeData)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"AI parsing failed: {str(e)}")

    # 3. Analyze the structured data (STAR, ATS, Impact)
    try:
        analysis_report = analyzer_service.run_full_analysis(parsed_data.model_dump())
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Full analysis failed: {str(e)}")

    # 4. Save file locally (in a real app, use S3/GCS)
    unique_filename = f"{uuid.uuid4()}_{file.filename}"
    file_path = os.path.join(settings.UPLOAD_DIR, unique_filename)
    
    os.makedirs(settings.UPLOAD_DIR, exist_ok=True)
    with open(file_path, "wb") as f:
        f.write(file_bytes)

    # 5. Save to Database
    resume = Resume(
        user_id=current_user.id,
        filename=file.filename,
        file_url=f"/uploads/{unique_filename}",
        raw_text=raw_text,
        parsed_data=parsed_data.model_dump(),
        overall_score=analysis_report.overall_score,
        ats_score=analysis_report.ats_score,
        star_score=analysis_report.star_score,
        impact_score=analysis_report.impact_score,
        recruiter_score=analysis_report.recruiter_score
    )
    db.add(resume)
    await db.flush()
    await db.refresh(resume)

    # Also save the analysis report
    from app.db.models import AnalysisReport
    report = AnalysisReport(
        resume_id=resume.id,
        report_type="full_analysis",
        report_data=analysis_report.model_dump()
    )
    db.add(report)
    await db.commit()

    return ResumeResponse.model_validate(resume)

@router.get("/list", response_model=ResumeListResponse)
async def list_resumes(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.user_id == current_user.id).order_by(Resume.created_at.desc())
    )
    resumes = result.scalars().all()
    
    return ResumeListResponse(
        resumes=[ResumeResponse.model_validate(r) for r in resumes],
        total=len(resumes)
    )

@router.get("/{resume_id}", response_model=ResumeResponse)
async def get_resume(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id)
    )
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    return ResumeResponse.model_validate(resume)

@router.delete("/{resume_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resume(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    result = await db.execute(
        select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id)
    )
    resume = result.scalar_one_or_none()
    
    if not resume:
        raise HTTPException(status_code=404, detail="Resume not found")
        
    # Delete file from disk
    if resume.file_url:
        file_path = os.path.join(settings.UPLOAD_DIR, resume.file_url.split("/")[-1])
        if os.path.exists(file_path):
            os.remove(file_path)
            
    await db.delete(resume)
    await db.flush()

@router.get("/{resume_id}/analysis", response_model=AnalysisReportResponse)
async def get_resume_analysis(
    resume_id: uuid.UUID,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    # Verify user owns this resume
    result = await db.execute(
        select(Resume).where(Resume.id == resume_id, Resume.user_id == current_user.id)
    )
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Resume not found")

    report_result = await db.execute(
        select(AnalysisReport).where(
            AnalysisReport.resume_id == resume_id, 
            AnalysisReport.report_type == "full_analysis"
        )
    )
    report = report_result.scalar_one_or_none()
    
    if not report:
        raise HTTPException(status_code=404, detail="Analysis report not found for this resume")
        
    return AnalysisReportResponse.model_validate(report)
