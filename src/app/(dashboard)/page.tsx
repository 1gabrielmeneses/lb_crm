'use client';

import {
  Search, Plus, TrendingUp, TrendingDown,
  Users, Percent, Calendar, FileText
} from 'lucide-react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts';
import './page.css';

const chartData = [
  { name: 'Jan', current: 65, previous: 35 },
  { name: 'Fev', current: 85, previous: 55 },
  { name: 'Mar', current: 125, previous: 75 },
  { name: 'Abr', current: 105, previous: 65 },
  { name: 'Mai', current: 165, previous: 95 },
  { name: 'Jun', current: 145, previous: 85 },
];

export default function Dashboard() {
  return (
    <div className="dashboard-container h-full flex-col flex">
      <header className="top-header">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <h2 className="text-2xl font-bold">Geral</h2>
        </div>

        <div className="header-actions">
          <div className="flex items-center gap-2 text-sm text-secondary mr-4">
            <TrendingUp size={16} className="text-accent-gold" color="var(--accent-gold)" />
            <span>Performance mensal: +12% vs. mês anterior</span>
          </div>

          <div className="input-group" style={{ width: '300px' }}>
            <Search className="input-icon" size={18} />
            <input type="text" className="input input-with-icon" placeholder="Buscar relatórios, métricas..." />
          </div>

          <button className="btn btn-primary">
            <Plus size={18} /> Novo Lead
          </button>
        </div>
      </header>

      <main className="page-content dashboard">
        <div className="stats-grid">
          {/* Card 1 */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(56, 114, 250, 0.15)' }}>
                <Users size={24} color="#3b82f6" />
              </div>
              <div className="badge badge-green"><TrendingUp size={12} className="mr-1" /> 15%</div>
            </div>
            <div>
              <div className="stat-title">Total de Leads</div>
              <div className="stat-value">1,248</div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(195, 154, 107, 0.15)' }}>
                <Percent size={24} color="var(--accent-gold)" />
              </div>
              <div className="badge badge-green"><TrendingUp size={12} className="mr-1" /> 4.2%</div>
            </div>
            <div>
              <div className="stat-title">Conversão</div>
              <div className="stat-value">18.5%</div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(168, 85, 247, 0.15)' }}>
                <Calendar size={24} color="#a855f7" />
              </div>
              <div className="badge badge-red"><TrendingDown size={12} className="mr-1" /> 2%</div>
            </div>
            <div>
              <div className="stat-title">Reuniões Agendadas</div>
              <div className="stat-value">86</div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="card stat-card">
            <div className="stat-header">
              <div className="stat-icon-wrapper" style={{ backgroundColor: 'rgba(239, 68, 68, 0.15)' }}>
                <FileText size={24} color="#ef4444" />
              </div>
              <div className="badge badge-green"><TrendingUp size={12} className="mr-1" /> 12%</div>
            </div>
            <div>
              <div className="stat-title">Contratos Assinados</div>
              <div className="stat-value">42</div>
            </div>
          </div>
        </div>

        <div className="card chart-card">
          <div className="chart-header">
            <div>
              <div className="chart-title">Aceleração Comercial</div>
              <div className="chart-subtitle">Evolução de Leads Qualificados e Fechamentos nos últimos 6 meses</div>
            </div>
            <div className="chart-filters">
              <button className="filter-btn active">6 Meses</button>
              <button className="filter-btn">1 Ano</button>
              <button className="filter-btn">Todos</button>
            </div>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <AreaChart data={chartData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--accent-gold)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--accent-gold)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: 'var(--text-secondary)', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '8px' }}
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Area type="monotone" dataKey="previous" stroke="var(--text-muted)" strokeDasharray="5 5" fill="none" strokeWidth={2} />
                <Area type="monotone" dataKey="current" stroke="var(--accent-gold)" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bottom-grid">
          <div className="card">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Atividade Recente dos Agentes</h3>
              <button className="btn-ghost text-sm" style={{ color: 'var(--accent-gold)' }}>Ver tudo</button>
            </div>
            <div className="activity-list">
              <div className="activity-item">
                <div className="avatar">
                  <div className="avatar-img" style={{ backgroundColor: '#bae6fd' }} />
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>Carlos Mendes</strong> agendou uma visita com <strong>Grupo Vivara</strong>
                  </div>
                  <div className="activity-meta">
                    <span className="badge badge-gray" style={{ color: '#fbbf24' }}>Visita</span>
                    <span>Há 25 min</span>
                  </div>
                </div>
              </div>

              <div className="activity-item">
                <div className="avatar">
                  <div className="avatar-img" style={{ backgroundColor: '#fed7aa' }} />
                </div>
                <div className="activity-content">
                  <div className="activity-text">
                    <strong>Ana Souza</strong> moveu <strong>Padaria Central</strong> para <strong>Ganho</strong>
                  </div>
                  <div className="activity-meta">
                    <span className="badge badge-green">Fechamento</span>
                    <span>Há 2 horas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Ranking de Imobiliárias</h3>
              <div className="text-xs text-secondary flex items-center gap-2">
                <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }} />
                Volume (R$)
              </div>
            </div>

            <div className="ranking-list">
              <div className="ranking-item">
                <div className="ranking-header">
                  <span className="ranking-name">Imobiliária Central</span>
                  <span className="ranking-value">R$ 4.2M</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '85%' }}></div>
                </div>
              </div>

              <div className="ranking-item">
                <div className="ranking-header">
                  <span className="ranking-name">Lopes & Associados</span>
                  <span className="ranking-value">R$ 3.1M</span>
                </div>
                <div className="progress-bg">
                  <div className="progress-fill" style={{ width: '65%' }}></div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
