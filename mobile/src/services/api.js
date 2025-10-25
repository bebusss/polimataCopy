import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { mockContacts } from '../data/mockData';

// IMPORTANTE: Cambia esto por tu IP local cuando pruebes en tu tel�fono
// Para encontrar tu IP: ipconfig en Windows, ifconfig en Mac/Linux
// Ejemplo: const API_URL = 'http://192.168.1.10:8000';
const API_URL = 'http://192.168.1.68:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 30000, // Aumentado a 30 segundos
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log para debugging
console.log('📡 API URL configured:', API_URL);

// Request interceptor: Add JWT token to all requests
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor: Handle 401 errors (token expired)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Clear stored credentials
      await AsyncStorage.multiRemove(['access_token', 'user']);
    }
    return Promise.reject(error);
  }
);

// Authentication API
export const authAPI = {
  async login(email, password) {
    try {
      // FastAPI OAuth2 expects form data with 'username' and 'password' fields
      const formData = new URLSearchParams();
      formData.append('username', email);
      formData.append('password', password);

      const response = await api.post('/api/v1/auth/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      // Store token and user data
      await AsyncStorage.setItem('access_token', response.data.access_token);
      await AsyncStorage.setItem('user', JSON.stringify(response.data.user));

      return { success: true, data: response.data };
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      return {
        success: false,
        error: error.response?.data?.detail || 'Error de inicio de sesi�n'
      };
    }
  },

  async logout() {
    try {
      await AsyncStorage.multiRemove(['access_token', 'user']);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async checkAuth() {
    try {
      const token = await AsyncStorage.getItem('access_token');
      const userStr = await AsyncStorage.getItem('user');

      if (token && userStr) {
        return { success: true, data: { user: JSON.parse(userStr) } };
      }
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },
};

// Contacts API Service
export const contactsAPI = {
  // Listar todos los contactos
  async getAll() {
    try {
      console.log('🔄 Fetching contacts from:', `${API_URL}/api/v1/contacts/`);
      const response = await api.get('/api/v1/contacts/');
      console.log('✅ Backend connected successfully');
      return { success: true, data: response.data, source: 'backend' };
    } catch (error) {
      console.error('❌ Backend connection failed:', error.message);
      console.error('Error details:', error.response?.data || error.code);
      console.log('⚠️ Backend no disponible, usando datos mock');
      return { success: true, data: mockContacts, source: 'mock' };
    }
  },

  // Obtener un contacto por ID
  async getById(id) {
    try {
      const response = await api.get(`/api/v1/contacts/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      const contact = mockContacts.find(c => c.id === id);
      return { success: true, data: contact || null };
    }
  },

  // Actualizar estado de un contacto
  async updateStatus(id, status) {
    try {
      const response = await api.put(`/api/v1/contacts/${id}`, { status });
      return { success: true, data: response.data };
    } catch (error) {
      // En modo mock, solo simulamos el update
      const contact = mockContacts.find(c => c.id === id);
      if (contact) {
        contact.status = status;
        return { success: true, data: contact };
      }
      return { success: false, error: 'Contacto no encontrado' };
    }
  },

  // Crear un nuevo contacto
  async create(contactData) {
    try {
      const response = await api.post('/api/v1/contacts/', contactData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default api;
