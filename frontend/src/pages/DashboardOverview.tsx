import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../lib/api';
import toast from 'react-hot-toast';

interface AnalyticsSummary {
  total_contacts: number;
  by_status: {
    new: number;
    contacted: number;
    closed: number;
  };
  today: number;
  this_week: number;
  conversion_rate: number;
}

export default function DashboardOverview() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, []);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const response = await api.get('/analytics/summary');
      setSummary(response.data);
    } catch (error: any) {
      toast.error('Error al cargar estadísticas');
      console.error('Error fetching summary:', error);
    } finally {
      setLoading(false);
    }
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
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Vista General</h1>
          <p className="text-gray-400">Resumen de tus contactos y métricas</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Contacts */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Total Contactos</h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.total_contacts || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Todos los tiempos</p>
          </div>

          {/* Today's Contacts */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Hoy</h3>
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.today || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Contactos nuevos</p>
          </div>

          {/* This Week */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Esta Semana</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.this_week || 0}</p>
            <p className="text-sm text-gray-500 mt-2">Últimos 7 días</p>
          </div>

          {/* Conversion Rate */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Tasa de Conversión</h3>
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.conversion_rate || 0}%</p>
            <p className="text-sm text-gray-500 mt-2">Contactados + Cerrados</p>
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Estado de Contactos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* New */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/20 rounded-full mb-4">
                <span className="text-3xl">🆕</span>
              </div>
              <p className="text-2xl font-bold text-white">{summary?.by_status.new || 0}</p>
              <p className="text-gray-400 mt-1">Nuevos</p>
            </div>

            {/* Contacted */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-600/20 rounded-full mb-4">
                <span className="text-3xl">💬</span>
              </div>
              <p className="text-2xl font-bold text-white">{summary?.by_status.contacted || 0}</p>
              <p className="text-gray-400 mt-1">Contactados</p>
            </div>

            {/* Closed */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600/20 rounded-full mb-4">
                <span className="text-3xl">✅</span>
              </div>
              <p className="text-2xl font-bold text-white">{summary?.by_status.closed || 0}</p>
              <p className="text-gray-400 mt-1">Cerrados</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            to="/dashboard/contacts"
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 hover:opacity-90 transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ver Contactos</h3>
                <p className="text-blue-100">Administra todos tus leads</p>
              </div>
              <span className="text-4xl group-hover:scale-110 transition-transform">→</span>
            </div>
          </Link>

          <Link
            to="/dashboard/analytics"
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl p-6 hover:opacity-90 transition group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-white mb-2">Ver Análisis</h3>
                <p className="text-purple-100">Gráficos y métricas detalladas</p>
              </div>
              <span className="text-4xl group-hover:scale-110 transition-transform">→</span>
            </div>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}
