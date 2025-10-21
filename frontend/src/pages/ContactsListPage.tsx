import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { api, ContactResponse } from '../lib/api';
import toast from 'react-hot-toast';

type StatusFilter = 'all' | 'new' | 'contacted' | 'closed';

export default function ContactsListPage() {
  const [contacts, setContacts] = useState<ContactResponse[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<ContactResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedContact, setSelectedContact] = useState<ContactResponse | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  useEffect(() => {
    filterContacts();
  }, [contacts, searchTerm, statusFilter]);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/contacts/');
      setContacts(response.data);
    } catch (error: any) {
      toast.error('Error al cargar contactos');
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterContacts = () => {
    let filtered = [...contacts];

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (contact) =>
          contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (contact.company && contact.company.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter((contact) => contact.status === statusFilter);
    }

    // Sort by AI score (highest first), then by created_at
    filtered.sort((a, b) => {
      if (a.ai_score && b.ai_score) {
        return b.ai_score - a.ai_score;
      }
      if (a.ai_score) return -1;
      if (b.ai_score) return 1;
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    });

    setFilteredContacts(filtered);
  };

  const updateContactStatus = async (contactId: number, newStatus: string) => {
    try {
      await api.put(`/contacts/${contactId}`, { status: newStatus });
      toast.success('Estado actualizado');
      fetchContacts();
    } catch (error: any) {
      toast.error('Error al actualizar estado');
      console.error('Error updating contact:', error);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      new: { text: 'Nuevo', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
      contacted: { text: 'Contactado', color: 'bg-yellow-600/20 text-yellow-400 border-yellow-500/30' },
      closed: { text: 'Cerrado', color: 'bg-green-600/20 text-green-400 border-green-500/30' },
    };
    const badge = badges[status as keyof typeof badges] || badges.new;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const getPriorityBadge = (priority?: string) => {
    if (!priority) return null;
    const badges = {
      low: { text: 'Baja', color: 'bg-gray-600/20 text-gray-400 border-gray-500/30' },
      medium: { text: 'Media', color: 'bg-blue-600/20 text-blue-400 border-blue-500/30' },
      high: { text: 'Alta', color: 'bg-orange-600/20 text-orange-400 border-orange-500/30' },
      urgent: { text: 'Urgente', color: 'bg-red-600/20 text-red-400 border-red-500/30' },
    };
    const badge = badges[priority as keyof typeof badges];
    if (!badge) return null;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  const getScoreColor = (score?: number) => {
    if (!score) return 'text-gray-400';
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Contactos</h1>
          <p className="text-gray-400">Administra todos tus leads</p>
        </div>

        {/* Filters */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <input
                type="text"
                placeholder="Buscar por nombre, email o empresa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
              />
            </div>

            {/* Status Filter */}
            <div className="flex gap-2">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'all'
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                Todos ({contacts.length})
              </button>
              <button
                onClick={() => setStatusFilter('new')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'new'
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                Nuevos ({contacts.filter((c) => c.status === 'new').length})
              </button>
              <button
                onClick={() => setStatusFilter('contacted')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'contacted'
                    ? 'bg-yellow-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                Contactados ({contacts.filter((c) => c.status === 'contacted').length})
              </button>
              <button
                onClick={() => setStatusFilter('closed')}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  statusFilter === 'closed'
                    ? 'bg-green-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                Cerrados ({contacts.filter((c) => c.status === 'closed').length})
              </button>
            </div>
          </div>
        </div>

        {/* Contacts Table */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white/5 border-b border-white/10">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Contacto
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Prioridad
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {filteredContacts.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-500">
                      No se encontraron contactos
                    </td>
                  </tr>
                ) : (
                  filteredContacts.map((contact) => (
                    <tr
                      key={contact.id}
                      className="hover:bg-white/5 transition cursor-pointer"
                      onClick={() => setSelectedContact(contact)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        {contact.ai_score ? (
                          <div className="flex items-center space-x-2">
                            <span className={`text-2xl font-bold ${getScoreColor(contact.ai_score)}`}>
                              {contact.ai_score}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-500">-</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-white font-medium">{contact.name}</p>
                          <p className="text-gray-400 text-sm">{contact.email}</p>
                          {contact.phone && <p className="text-gray-500 text-sm">{contact.phone}</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-gray-300">{contact.company || '-'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getPriorityBadge(contact.ai_priority)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(contact.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-400 text-sm">
                        {new Date(contact.created_at).toLocaleDateString('es-ES')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <select
                          value={contact.status}
                          onChange={(e) => {
                            e.stopPropagation();
                            updateContactStatus(contact.id, e.target.value);
                          }}
                          className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500"
                        >
                          <option value="new">Nuevo</option>
                          <option value="contacted">Contactado</option>
                          <option value="closed">Cerrado</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Contact Detail Modal */}
      {selectedContact && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedContact(null)}
        >
          <div
            className="bg-[#0A0E28] border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-white">{selectedContact.name}</h2>
                <p className="text-gray-400">{selectedContact.email}</p>
              </div>
              <button
                onClick={() => setSelectedContact(null)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Información</h3>
                <div className="space-y-2">
                  {selectedContact.phone && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">Teléfono:</span> {selectedContact.phone}
                    </p>
                  )}
                  {selectedContact.company && (
                    <p className="text-gray-300">
                      <span className="text-gray-500">Empresa:</span> {selectedContact.company}
                    </p>
                  )}
                  <p className="text-gray-300">
                    <span className="text-gray-500">Estado:</span>{' '}
                    <span className="inline-block ml-2">{getStatusBadge(selectedContact.status)}</span>
                  </p>
                </div>
              </div>

              {/* AI Insights */}
              {selectedContact.ai_score && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Análisis AI</h3>
                  <div className="bg-white/5 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-400">Score:</span>
                      <span className={`text-2xl font-bold ${getScoreColor(selectedContact.ai_score)}`}>
                        {selectedContact.ai_score}/100
                      </span>
                    </div>
                    {selectedContact.ai_priority && (
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400">Prioridad:</span>
                        {getPriorityBadge(selectedContact.ai_priority)}
                      </div>
                    )}
                    {selectedContact.ai_insights && (
                      <div className="space-y-2 pt-2 border-t border-white/10">
                        {selectedContact.ai_insights.urgency && (
                          <p className="text-gray-300">
                            <span className="text-gray-500">Urgencia:</span>{' '}
                            <span className="capitalize">{selectedContact.ai_insights.urgency}</span>
                          </p>
                        )}
                        {selectedContact.ai_insights.budget && (
                          <p className="text-gray-300">
                            <span className="text-gray-500">Presupuesto:</span>{' '}
                            <span className="capitalize">{selectedContact.ai_insights.budget}</span>
                          </p>
                        )}
                        {selectedContact.ai_insights.industry && (
                          <p className="text-gray-300">
                            <span className="text-gray-500">Industria:</span>{' '}
                            {selectedContact.ai_insights.industry}
                          </p>
                        )}
                        {selectedContact.ai_insights.pain_points &&
                          selectedContact.ai_insights.pain_points.length > 0 && (
                            <div>
                              <p className="text-gray-500 mb-2">Puntos de dolor:</p>
                              <ul className="list-disc list-inside space-y-1">
                                {selectedContact.ai_insights.pain_points.map((point: string, idx: number) => (
                                  <li key={idx} className="text-gray-300 text-sm">
                                    {point}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Message */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Mensaje</h3>
                <p className="text-gray-300 bg-white/5 rounded-lg p-4">{selectedContact.message}</p>
              </div>

              {/* AI Suggested Response */}
              {selectedContact.ai_suggested_response && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Respuesta Sugerida (AI)</h3>
                  <p className="text-gray-300 bg-blue-600/10 border border-blue-500/30 rounded-lg p-4">
                    {selectedContact.ai_suggested_response}
                  </p>
                </div>
              )}

              {/* Date */}
              <div className="pt-4 border-t border-white/10">
                <p className="text-gray-500 text-sm">
                  Creado: {new Date(selectedContact.created_at).toLocaleString('es-ES')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
