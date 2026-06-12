from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class AnalysisReportResponse(BaseModel):
    id: UUID
    resume_id: UUID
    report_type: str
    report_data: dict
    created_at: datetime

    class Config:
        from_attributes = True


class FullAnalysisResponse(BaseModel):
    resume_id: UUID
    overall_score: float
    star_analysis: Optional[dict] = None
    ats_analysis: Optional[dict] = None
    impact_analysis: Optional[dict] = None
    recruiter_analysis: Optional[dict] = None
