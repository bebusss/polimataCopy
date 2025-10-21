import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - agregar token automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - manejar 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Solo redirect si no estamos ya en login
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export interface ContactFormData {
  name: string
  email: string
  company?: string
  message: string
}

export interface ContactResponse {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  message: string
  status: string
  ai_score?: number
  ai_priority?: string
  ai_insights?: {
    urgency?: string
    budget?: string
    industry?: string
    pain_points?: string[]
  }
  ai_suggested_response?: string
  created_at: string
  updated_at?: string
}

export const contactAPI = {
  submit: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await api.post('/contacts', data)
    return response.data
  },
}

export { api }
export default api
