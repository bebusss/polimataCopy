// Mock data usado cuando el backend no está disponible
export const mockContacts = [
  {
    id: 1,
    name: 'Juan Pérez',
    email: 'juan@example.com',
    company: 'Tech Corp',
    message: 'Interesado en automatizar procesos de mi empresa',
    status: 'new',
    created_at: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'María García',
    email: 'maria@startup.com',
    company: 'StartupXYZ',
    message: 'Necesito consultoría en IA para mi startup',
    status: 'contacted',
    created_at: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 3,
    name: 'Carlos López',
    email: 'carlos@empresa.com',
    company: 'Mi Empresa',
    message: 'Quiero una demo del producto',
    status: 'closed',
    created_at: new Date(Date.now() - 172800000).toISOString(),
  },
];
