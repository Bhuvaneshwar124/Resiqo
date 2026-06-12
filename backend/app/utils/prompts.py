from pydantic import BaseModel, Field
from typing import List, Optional

# --- Schemas for AI extraction ---

class ExperienceItem(BaseModel):
    company: str
    role: str
    duration: str
    bullet_points: List[str]

class ProjectItem(BaseModel):
    name: str
    description: str
    bullet_points: List[str]

class EducationItem(BaseModel):
    institution: str
    degree: str
    duration: str

class ParsedResumeData(BaseModel):
    name: str = Field(description="Full name of the candidate")
    email: str = Field(description="Email address")
    phone: str = Field(description="Phone number")
    linkedin: Optional[str] = Field(description="LinkedIn URL if present", default=None)
    github: Optional[str] = Field(description="GitHub or portfolio URL if present", default=None)
    summary: Optional[str] = Field(description="Professional summary or objective", default=None)
    skills: List[str] = Field(description="List of all technical and soft skills mentioned")
    experience: List[ExperienceItem] = Field(description="Work experience history")
    projects: List[ProjectItem] = Field(description="Projects worked on")
    education: List[EducationItem] = Field(description="Educational background")
    certifications: List[str] = Field(description="List of certifications")
    achievements: List[str] = Field(description="List of standalone achievements/awards")


# --- Prompts ---

RESUME_PARSING_PROMPT = """
You are an expert ATS (Applicant Tracking System) parser. 
Extract structured information from the following raw resume text.
If a section is missing from the resume, leave the corresponding list empty or string null.
Separate experience descriptions and project descriptions into discrete `bullet_points`.

Raw Resume Text:
----------------
{resume_text}
----------------
"""
