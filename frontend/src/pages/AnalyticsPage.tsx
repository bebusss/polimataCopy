import { useEffect, useState } from 'react';
import DashboardLayout from '../components/DashboardLayout';
import { api } from '../lib/api';
import toast from 'react-hot-toast';
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

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

interface TimelineData {
  date: string;
  count: number;
}

interface TopCompany {
  company: string;
  count: number;
}

export default function AnalyticsPage() {
  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [timeline, setTimeline] = useState<TimelineData[]>([]);
  const [topCompanies, setTopCompanies] = useState<TopCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [timelineDays, setTimelineDays] = useState(30);

  useEffect(() => {
    fetchAnalytics();
  }, [timelineDays]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const [summaryRes, timelineRes, companiesRes] = await Promise.all([
        api.get('/analytics/summary'),
        api.get(`/analytics/timeline?days=${timelineDays}`),
        api.get('/analytics/top-companies?limit=10'),
      ]);
      setSummary(summaryRes.data);
      setTimeline(timelineRes.data.data);
      setTopCompanies(companiesRes.data.top_companies);
    } catch (error: any) {
      toast.error('Error al cargar análisis');
      console.error('Error fetching analytics:', error);
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

  // Prepare pie chart data
  const pieData = summary
    ? [
        { name: 'Nuevos', value: summary.by_status.new, color: '#3B82F6' },
        { name: 'Contactados', value: summary.by_status.contacted, color: '#F59E0B' },
        { name: 'Cerrados', value: summary.by_status.closed, color: '#10B981' },
      ]
    : [];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Análisis</h1>
          <p className="text-gray-400">Métricas y gráficos detallados</p>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Total Contactos</h3>
              <span className="text-3xl">👥</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.total_contacts || 0}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Hoy</h3>
              <span className="text-3xl">📅</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.today || 0}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Esta Semana</h3>
              <span className="text-3xl">📊</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.this_week || 0}</p>
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-gray-400 font-medium">Conversión</h3>
              <span className="text-3xl">📈</span>
            </div>
            <p className="text-3xl font-bold text-white">{summary?.conversion_rate || 0}%</p>
          </div>
        </div>

        {/* Timeline Chart */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Contactos en el Tiempo</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setTimelineDays(7)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timelineDays === 7
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                7 días
              </button>
              <button
                onClick={() => setTimelineDays(30)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timelineDays === 30
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                30 días
              </button>
              <button
                onClick={() => setTimelineDays(90)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  timelineDays === 90
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-white/10 text-gray-400 hover:bg-white/20'
                }`}
              >
                90 días
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}
              />
              <YAxis stroke="#9CA3AF" tick={{ fill: '#9CA3AF' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '0.5rem',
                  color: '#fff',
                }}
              />
              <Legend wrapperStyle={{ color: '#9CA3AF' }} />
              <Line
                type="monotone"
                dataKey="count"
                name="Contactos"
                stroke="#3B82F6"
                strokeWidth={3}
                dot={{ fill: '#3B82F6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart - Status Distribution */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Distribución por Estado</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem',
                    color: '#fff',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-6 space-y-2">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 rounded" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-300">{item.name}</span>
                  </div>
                  <span className="text-white font-bold">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Top Companies */}
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h2 className="text-xl font-bold text-white mb-6">Top Empresas</h2>
            <div className="space-y-4">
              {topCompanies.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No hay datos de empresas</p>
              ) : (
                topCompanies.map((company, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {index + 1}
                      </div>
                      <span className="text-gray-300 truncate">{company.company}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-white font-bold">{company.count}</span>
                      <span className="text-gray-500 text-sm">contactos</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Métricas Adicionales</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-gray-400 mb-2">Promedio por Día</p>
              <p className="text-3xl font-bold text-white">
                {summary && timeline.length > 0
                  ? (summary.total_contacts / timeline.length).toFixed(1)
                  : '0'}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-2">Tasa de Nuevos</p>
              <p className="text-3xl font-bold text-white">
                {summary && summary.total_contacts > 0
                  ? ((summary.by_status.new / summary.total_contacts) * 100).toFixed(1)
                  : '0'}
                %
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 mb-2">Tasa de Cierre</p>
              <p className="text-3xl font-bold text-white">
                {summary && summary.total_contacts > 0
                  ? ((summary.by_status.closed / summary.total_contacts) * 100).toFixed(1)
                  : '0'}
                %
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
