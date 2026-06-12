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

# --- Schemas for Analysis ---

class BulletPointAnalysis(BaseModel):
    bullet_point: str
    situation: str = Field(description="'present', 'missing', or 'partial'")
    task: str = Field(description="'present', 'missing', or 'partial'")
    action: str = Field(description="'present', 'missing', or 'partial'")
    result: str = Field(description="'present', 'missing', or 'partial'")
    score: int = Field(description="Score out of 100")
    feedback: str = Field(description="Actionable feedback on how to improve this specific bullet point")

class ATSAnalysis(BaseModel):
    score: int = Field(description="Score out of 100")
    missing_keywords: List[str]
    formatting_issues: List[str]
    recommendations: List[str]

class ImpactAnalysis(BaseModel):
    score: int = Field(description="Score out of 100 based on metric density")
    metrics_found: List[str]
    improvement_areas: List[str]

class FullAnalysisReport(BaseModel):
    overall_score: int
    star_score: int
    ats_score: int
    impact_score: int
    recruiter_score: int
    bullet_points: List[BulletPointAnalysis]
    ats_analysis: ATSAnalysis
    impact_analysis: ImpactAnalysis
    recruiter_feedback: str

ANALYSIS_PROMPT = """
You are an expert Senior Technical Recruiter and Career Coach. 
Analyze the following parsed resume data based on:
1. STAR Framework (Situation, Task, Action, Result) for every experience/project bullet point.
2. ATS Optimization (missing standard sections, weak verbs).
3. Impact Metrics (quantifiable results like %, $, #).

Return a comprehensive, deeply analytical report matching the requested JSON schema. Be brutally honest but constructive.

Parsed Resume JSON:
----------------
{parsed_data}
----------------
"""
