import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

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
  message: string
  created_at: string
}

export const contactAPI = {
  submit: async (data: ContactFormData): Promise<ContactResponse> => {
    const response = await api.post('/api/v1/contacts/', data)
    return response.data
  },
}

export default api
