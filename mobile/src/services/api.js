import axios from 'axios';
import { mockContacts } from '../data/mockData';

// IMPORTANTE: Cambia esto por tu IP local cuando pruebes en tu teléfono
// Ejemplo: const API_URL = 'http://192.168.1.10:8000';
const API_URL = 'http://192.168.1.68:8000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Service
export const contactsAPI = {
  // Listar todos los contactos
  async getAll() {
    try {
      const response = await api.get('/api/v1/contacts/');
      return { success: true, data: response.data, source: 'backend' };
    } catch (error) {
      console.log('Backend no disponible, usando datos mock');
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
