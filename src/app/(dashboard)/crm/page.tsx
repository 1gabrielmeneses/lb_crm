'use client';

import {
    Search, Plus, MoreHorizontal, Star
} from 'lucide-react';
import './page.css';

interface LeadProps {
    id: string;
    name: string;
    company: string;
    value: string;
    time: string;
    avatarImg?: string;
    initials?: string;
    avatarBg?: string;
    starred?: boolean;
}

const leadsLista: LeadProps[] = [
    {
        id: '1',
        name: 'João da Silva',
        company: 'Imóveis Centro',
        value: 'R$ 500k',
        time: '2d atrás',
        initials: 'JD',
        avatarBg: '#334155'
    },
    {
        id: '2',
        name: 'Maria Oliveira',
        company: 'Construtora MO',
        value: 'R$ 1.2M',
        time: '4h atrás',
        avatarImg: '#fed7aa' // Assuming placeholder bg for avatar img
    }
];

const leadsLeads: LeadProps[] = [
    {
        id: '3',
        name: 'Carlos Mendes',
        company: 'Residencial Green',
        value: 'R$ 850k',
        time: '',
        avatarImg: '#bae6fd',
        starred: true
    }
];

const leadsMQL: LeadProps[] = [
    {
        id: '4',
        name: 'Roberto Faro',
        company: 'Investidor Privado',
        value: 'R$ 2.5M',
        time: 'Ontem',
        initials: 'RF',
        avatarBg: '#4f46e5'
    }
];

function LeadCard({ lead }: { lead: LeadProps }) {
    return (
        <div className="lead-card">
            <div className="lead-card-top">
                {lead.avatarImg ? (
                    <div className="lead-avatar-lg" style={{ backgroundColor: lead.avatarImg }} />
                ) : (
                    <div className="lead-avatar-lg" style={{ backgroundColor: lead.avatarBg }}>
                        {lead.initials}
                    </div>
                )}
                <div className="lead-info">
                    <div className="lead-name">{lead.name}</div>
                    <div className="lead-company">{lead.company}</div>
                </div>
            </div>
            <div className="lead-card-bottom">
                <div className="lead-value">{lead.value}</div>
                {lead.starred ? (
                    <Star size={16} fill="#fbbf24" color="#fbbf24" strokeWidth={1} />
                ) : (
                    <div className="lead-time">{lead.time}</div>
                )}
            </div>
        </div>
    );
}

export default function CRM() {
    return (
        <div className="crm-dashboard w-full">
            <header className="top-header">
                <div className="flex items-center gap-6">
                    <h1 className="text-2xl font-bold">Gestão de Leads</h1>

                    <div className="avatar-group ml-6">
                        <div className="avatar" style={{ backgroundColor: '#9ca3af' }}></div>
                        <div className="avatar" style={{ backgroundColor: '#fed7aa' }}></div>
                        <div className="avatar" style={{ backgroundColor: '#bae6fd' }}></div>
                        <div className="avatar avatar-more">+4</div>
                    </div>
                </div>

                <div className="header-actions">
                    <div className="input-group" style={{ width: '280px' }}>
                        <Search className="input-icon" size={18} />
                        <input type="text" className="input input-with-icon" placeholder="Buscar contatos, empresas..." />
                    </div>

                    <button className="btn btn-primary">
                        <Plus size={18} /> Novo Lead
                    </button>
                </div>
            </header>

            <main className="page-content">
                <div className="kanban-board">

                    {/* Column 1: Lista */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">
                            <div className="column-title-group">
                                <div className="column-dot" style={{ backgroundColor: '#64748b' }}></div>
                                <div className="column-title">Lista</div>
                                <div className="column-count">12</div>
                            </div>
                            <MoreHorizontal className="column-options" size={18} />
                        </div>
                        <div className="kanban-cards">
                            {leadsLista.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                        </div>
                    </div>

                    {/* Column 2: Leads */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">
                            <div className="column-title-group">
                                <div className="column-dot" style={{ backgroundColor: '#3b82f6' }}></div>
                                <div className="column-title">Leads</div>
                                <div className="column-count">5</div>
                            </div>
                            <MoreHorizontal className="column-options" size={18} />
                        </div>
                        <div className="kanban-cards">
                            {leadsLeads.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                        </div>
                    </div>

                    {/* Column 3: MQL */}
                    <div className="kanban-column">
                        <div className="kanban-column-header">
                            <div className="column-title-group">
                                <div className="column-dot" style={{ backgroundColor: '#8b5cf6' }}></div>
                                <div className="column-title">MQL</div>
                                <div className="column-count">3</div>
                            </div>
                            <MoreHorizontal className="column-options" size={18} />
                        </div>
                        <div className="kanban-cards">
                            {leadsMQL.map(lead => <LeadCard key={lead.id} lead={lead} />)}
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}
