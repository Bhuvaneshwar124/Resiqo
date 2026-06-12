import axios from 'axios'
import type { AuthResponse, Resume, AnalysisReport, JobMatch, User } from '@/types'

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('resiqo_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor - handle 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('resiqo_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const auth = {
  register: async (name: string, email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/register', { name, email, password })
    return data
  },
  login: async (email: string, password: string) => {
    const { data } = await api.post<AuthResponse>('/auth/login', { email, password })
    return data
  },
  getMe: async () => {
    const { data } = await api.get<User>('/auth/me')
    return data
  },
  updateProfile: async (profileData: Partial<User>) => {
    const { data } = await api.put<User>('/auth/profile', profileData)
    return data
  },
}

export const resume = {
  upload: async (file: File) => {
    const formData = new FormData()
    formData.append('file', file)
    const { data } = await api.post<Resume>('/resumes/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
  list: async () => {
    const { data } = await api.get<Resume[]>('/resumes')
    return data
  },
  get: async (id: string) => {
    const { data } = await api.get<Resume>(`/resumes/${id}`)
    return data
  },
  delete: async (id: string) => {
    await api.delete(`/resumes/${id}`)
  },
}

export const analysis = {
  runFull: async (resumeId: string) => {
    const { data } = await api.post<AnalysisReport>(`/analysis/${resumeId}/full`)
    return data
  },
  get: async (resumeId: string) => {
    const { data } = await api.get<AnalysisReport[]>(`/analysis/${resumeId}`)
    return data
  },
}

export const jobMatch = {
  match: async (resumeId: string, jobDescription: string) => {
    const { data } = await api.post<JobMatch>('/job-match', { resume_id: resumeId, job_description: jobDescription })
    return data
  },
  get: async (id: string) => {
    const { data } = await api.get<JobMatch>(`/job-match/${id}`)
    return data
  },
}

export const rewriter = {
  rewrite: async (bulletPoints: string[]) => {
    const { data } = await api.post<{ rewritten: string[] }>('/rewriter/rewrite', { bullet_points: bulletPoints })
    return data
  },
  rewriteBulk: async (resumeId: string) => {
    const { data } = await api.post<{ rewritten: string[] }>(`/rewriter/bulk/${resumeId}`)
    return data
  },
}

export default api
