from pydantic import BaseModel
from datetime import datetime
from uuid import UUID
from typing import Optional


class ResumeResponse(BaseModel):
    id: UUID
    filename: str
    file_url: Optional[str] = None
    overall_score: Optional[float] = None
    ats_score: Optional[float] = None
    star_score: Optional[float] = None
    impact_score: Optional[float] = None
    recruiter_score: Optional[float] = None
    created_at: datetime

    class Config:
        from_attributes = True


class ResumeListResponse(BaseModel):
    resumes: list[ResumeResponse]
    total: int
