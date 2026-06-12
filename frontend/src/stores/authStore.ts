import { create } from 'zustand'
import type { User } from '@/types'
import { auth } from '@/lib/api'

interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('resiqo_token'),
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await auth.login(email, password)
      localStorage.setItem('resiqo_token', response.access_token)
      set({ user: response.user, token: response.access_token, isLoading: false })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Login failed. Please check your credentials.'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  register: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await auth.register(name, email, password)
      localStorage.setItem('resiqo_token', response.access_token)
      set({ user: response.user, token: response.access_token, isLoading: false })
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Registration failed. Please try again.'
      set({ error: message, isLoading: false })
      throw error
    }
  },

  logout: () => {
    localStorage.removeItem('resiqo_token')
    set({ user: null, token: null })
    window.location.href = '/login'
  },

  checkAuth: async () => {
    const token = localStorage.getItem('resiqo_token')
    if (!token) {
      set({ isLoading: false })
      return
    }
    set({ isLoading: true })
    try {
      const user = await auth.getMe()
      set({ user, token, isLoading: false })
    } catch {
      localStorage.removeItem('resiqo_token')
      set({ user: null, token: null, isLoading: false })
    }
  },

  clearError: () => set({ error: null }),
}))
