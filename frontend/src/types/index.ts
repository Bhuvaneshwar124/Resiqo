export interface User {
  id: string
  name: string
  email: string
  role: 'candidate' | 'admin'
  created_at: string
}

export interface Resume {
  id: string
  user_id: string
  filename: string
  file_url: string
  overall_score: number | null
  ats_score: number | null
  star_score: number | null
  impact_score: number | null
  recruiter_score: number | null
  created_at: string
}

export interface STARAnalysis {
  bullet_point: string
  situation: 'present' | 'missing' | 'partial'
  task: 'present' | 'missing' | 'partial'
  action: 'present' | 'missing' | 'partial'
  result: 'present' | 'missing' | 'partial'
  score: number
  suggestions: string[]
}

export interface AnalysisReport {
  id: string
  resume_id: string
  report_type: 'star' | 'ats' | 'impact' | 'recruiter' | 'job_match'
  report_data: Record<string, unknown>
  created_at: string
}

export interface JobMatch {
  match_percentage: number
  matched_skills: string[]
  missing_skills: string[]
  recommendations: string[]
  keyword_suggestions: string[]
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export interface ScoreData {
  name: string
  score: number
  fullMark: number
}
