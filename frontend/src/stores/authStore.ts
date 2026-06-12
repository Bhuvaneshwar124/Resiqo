import { create } from 'zustand';
import { User } from '../types';
import { authApi } from '../lib/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: any) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('resiqo_token'),
  isLoading: true,
  isAuthenticated: !!localStorage.getItem('resiqo_token'),

  login: async (credentials) => {
    const res = await authApi.login(credentials);
    const { access_token, user } = res.data;
    localStorage.setItem('resiqo_token', access_token);
    set({ user, token: access_token, isAuthenticated: true });
  },

  register: async (userData) => {
    const res = await authApi.register(userData);
    const { access_token, user } = res.data;
    localStorage.setItem('resiqo_token', access_token);
    set({ user, token: access_token, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('resiqo_token');
    set({ user: null, token: null, isAuthenticated: false });
  },

  checkAuth: async () => {
    const token = localStorage.getItem('resiqo_token');
    if (!token) {
      set({ isLoading: false, isAuthenticated: false });
      return;
    }
    try {
      const res = await authApi.getMe();
      set({ user: res.data, isAuthenticated: true, isLoading: false });
    } catch (error) {
      localStorage.removeItem('resiqo_token');
      set({ user: null, token: null, isAuthenticated: false, isLoading: false });
    }
  },
}));
