'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Search, Plus, MoreHorizontal, Star, X, Phone, Mail, Building2,
  DollarSign, Tag, User, Calendar, GripVertical, ChevronRight, Trash2
} from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import type { Lead, LeadStage } from '@/lib/types/database';
import './page.css';

const STAGES: { key: LeadStage; label: string; color: string }[] = [
  { key: 'lista', label: 'Lista', color: '#64748b' },
  { key: 'lead', label: 'Leads', color: '#3b82f6' },
  { key: 'mql', label: 'MQL', color: '#8b5cf6' },
  { key: 'sal', label: 'SAL', color: '#f59e0b' },
  { key: 'sql', label: 'SQL', color: '#10b981' },
  { key: 'ganho', label: 'Ganho', color: '#22c55e' },
  { key: 'perdido', label: 'Perdido', color: '#ef4444' },
];

const AVATAR_COLORS = [
  '#334155', '#4f46e5', '#0891b2', '#059669', '#d97706',
  '#dc2626', '#7c3aed', '#2563eb', '#0d9488', '#c026d3',
];

function getInitials(name: string): string {
  return name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
}

function getRandomColor(): string {
  return AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
}

function formatCurrency(value: number | null): string {
  if (!value) return '';
  if (value >= 1_000_000) return `R$ ${(value / 1_000_000).toFixed(1).replace('.0', '')}M`;
  if (value >= 1_000) return `R$ ${(value / 1_000).toFixed(0)}k`;
  return `R$ ${value.toFixed(0)}`;
}

function formatTimeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return 'Agora';
  if (diffMins < 60) return `${diffMins}m atrás`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}h atrás`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'Ontem';
  if (diffDays < 30) return `${diffDays}d atrás`;
  return date.toLocaleDateString('pt-BR');
}

// ─── New Lead Modal ────────────────────────────────────────
function NewLeadModal({
  onClose,
  onSave,
  initialStage
}: {
  onClose: () => void;
  onSave: (lead: Partial<Lead>) => void;
  initialStage: LeadStage;
}) {
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [value, setValue] = useState('');
  const [stage, setStage] = useState<LeadStage>(initialStage);
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [saving, setSaving] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function maskPhone(raw: string): string {
    const digits = raw.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits.length ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(maskPhone(e.target.value));
  }

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;
    setEmail(val);
    if (val && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      setEmailError('Email inválido');
    } else {
      setEmailError('');
    }
  }

  const isEmailValid = !email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !isEmailValid) return;
    setSaving(true);

    const numericValue = value ? parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.')) : null;

    await onSave({
      name: name.trim(),
      company_name: companyName.trim() || null,
      value: numericValue,
      stage,
      starred: false,
      tags: [phone, email].filter(Boolean) as string[],
      avatar_bg: getRandomColor(),
      initials: getInitials(name.trim()),
    });
    setSaving(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-new-lead" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Novo Lead</h2>
          <button className="btn-icon" onClick={onClose}><X size={20} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-group">
              <label className="form-label"><User size={14} /> Nome *</label>
              <input
                ref={nameRef}
                className="input"
                placeholder="Nome do contato"
                value={name}
                onChange={e => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><Building2 size={14} /> Empresa</label>
                <input
                  className="input"
                  placeholder="Nome da empresa"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label"><DollarSign size={14} /> Valor</label>
                <input
                  className="input"
                  placeholder="Ex: 500000"
                  value={value}
                  onChange={e => setValue(e.target.value)}
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label"><Phone size={14} /> Telefone</label>
                <input
                  className="input"
                  placeholder="(11) 99999-9999"
                  value={phone}
                  onChange={handlePhoneChange}
                  inputMode="tel"
                />
              </div>
              <div className="form-group">
                <label className="form-label"><Mail size={14} /> Email</label>
                <input
                  className={`input ${emailError ? 'input-error' : ''}`}
                  placeholder="email@exemplo.com"
                  value={email}
                  onChange={handleEmailChange}
                  inputMode="email"
                />
                {emailError && <span className="form-error">{emailError}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label"><Tag size={14} /> Estágio</label>
              <div className="stage-selector">
                {STAGES.map(s => (
                  <button
                    type="button"
                    key={s.key}
                    className={`stage-pill ${stage === s.key ? 'active' : ''}`}
                    style={{ '--pill-color': s.color } as React.CSSProperties}
                    onClick={() => setStage(s.key)}
                  >
                    <span className="pill-dot" style={{ backgroundColor: s.color }} />
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn btn-primary" disabled={saving || !name.trim() || !isEmailValid}>
              {saving ? 'Salvando...' : 'Criar Lead'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Lead Detail Modal ─────────────────────────────────────
function LeadDetailModal({
  lead,
  onClose,
  onUpdate,
  onDelete,
}: {
  lead: Lead;
  onClose: () => void;
  onUpdate: (id: string, data: Partial<Lead>) => void;
  onDelete: (id: string) => void;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(lead.name);
  const [companyName, setCompanyName] = useState(lead.company_name || '');
  const [value, setValue] = useState(lead.value?.toString() || '');
  const [stage, setStage] = useState<LeadStage>(lead.stage);
  const [starred, setStarred] = useState(lead.starred);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const stageInfo = STAGES.find(s => s.key === lead.stage);

  const handleSave = () => {
    const numericValue = value ? parseFloat(value.replace(/[^\d.,]/g, '').replace(',', '.')) : null;
    onUpdate(lead.id, {
      name: name.trim(),
      company_name: companyName.trim() || null,
      value: numericValue,
      stage,
      starred,
    });
    setEditing(false);
  };

  const handleStarToggle = () => {
    const newStarred = !starred;
    setStarred(newStarred);
    onUpdate(lead.id, { starred: newStarred });
  };

  const handleStageChange = (newStage: LeadStage) => {
    setStage(newStage);
    if (!editing) {
      onUpdate(lead.id, { stage: newStage });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal modal-detail" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="detail-header-left">
            <div
              className="lead-avatar-xl"
              style={{ backgroundColor: lead.avatar_bg || '#334155' }}
            >
              {lead.initials || getInitials(lead.name)}
            </div>
            <div>
              {editing ? (
                <input
                  className="input detail-name-input"
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              ) : (
                <h2 className="detail-name">{lead.name}</h2>
              )}
              {editing ? (
                <input
                  className="input detail-company-input"
                  value={companyName}
                  placeholder="Empresa"
                  onChange={e => setCompanyName(e.target.value)}
                />
              ) : (
                lead.company_name && (
                  <span className="detail-company">{lead.company_name}</span>
                )
              )}
            </div>
          </div>
          <div className="detail-header-actions">
            <button
              className={`btn-icon star-btn ${starred ? 'starred' : ''}`}
              onClick={handleStarToggle}
            >
              <Star size={20} fill={starred ? '#fbbf24' : 'none'} color={starred ? '#fbbf24' : 'currentColor'} />
            </button>
            <button className="btn-icon" onClick={onClose}><X size={20} /></button>
          </div>
        </div>

        <div className="modal-body detail-body">
          {/* Stage pipeline */}
          <div className="detail-section">
            <label className="detail-label">Pipeline</label>
            <div className="pipeline-bar">
              {STAGES.map((s, i) => (
                <button
                  key={s.key}
                  className={`pipeline-step ${stage === s.key ? 'active' : ''} ${STAGES.findIndex(st => st.key === stage) >= i ? 'passed' : ''
                    }`}
                  style={{ '--step-color': s.color } as React.CSSProperties}
                  onClick={() => handleStageChange(s.key)}
                >
                  <span className="pipeline-dot" />
                  <span className="pipeline-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Info grid */}
          <div className="detail-section">
            <label className="detail-label">Informações</label>
            <div className="detail-info-grid">
              <div className="detail-info-item">
                <DollarSign size={16} />
                <span className="info-label">Valor</span>
                {editing ? (
                  <input
                    className="input input-sm"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    placeholder="0"
                  />
                ) : (
                  <span className="info-value">
                    {lead.value ? formatCurrency(lead.value) : '—'}
                  </span>
                )}
              </div>
              <div className="detail-info-item">
                <Building2 size={16} />
                <span className="info-label">Empresa</span>
                <span className="info-value">{lead.company_name || '—'}</span>
              </div>
              <div className="detail-info-item">
                <Calendar size={16} />
                <span className="info-label">Criado em</span>
                <span className="info-value">
                  {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                </span>
              </div>
              <div className="detail-info-item">
                <Tag size={16} />
                <span className="info-label">Estágio</span>
                <span className="info-value">
                  <span className="badge-stage" style={{ backgroundColor: stageInfo?.color + '22', color: stageInfo?.color }}>
                    {stageInfo?.label}
                  </span>
                </span>
              </div>
            </div>
          </div>

          {/* Tags */}
          {lead.tags && lead.tags.length > 0 && (
            <div className="detail-section">
              <label className="detail-label">Contato</label>
              <div className="detail-tags">
                {lead.tags.map((tag, i) => (
                  <span key={i} className="detail-tag">
                    {tag.includes('@') ? <Mail size={12} /> : <Phone size={12} />}
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer detail-footer">
          <div className="detail-footer-left">
            {confirmDelete ? (
              <div className="confirm-delete">
                <span className="text-sm text-red">Confirmar exclusão?</span>
                <button className="btn btn-danger-sm" onClick={() => onDelete(lead.id)}>Sim, excluir</button>
                <button className="btn btn-ghost-sm" onClick={() => setConfirmDelete(false)}>Cancelar</button>
              </div>
            ) : (
              <button className="btn btn-ghost btn-danger-text" onClick={() => setConfirmDelete(true)}>
                <Trash2 size={16} /> Excluir
              </button>
            )}
          </div>
          {editing ? (
            <div className="flex gap-2">
              <button className="btn btn-ghost" onClick={() => setEditing(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSave}>Salvar</button>
            </div>
          ) : (
            <button className="btn btn-primary" onClick={() => setEditing(true)}>Editar</button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Lead Card ─────────────────────────────────────────────
function LeadCard({
  lead,
  onDragStart,
  onClick,
}: {
  lead: Lead;
  onDragStart: (e: React.DragEvent, lead: Lead) => void;
  onClick: (lead: Lead) => void;
}) {
  return (
    <div
      className="lead-card"
      draggable
      onDragStart={e => onDragStart(e, lead)}
      onDragEnd={e => { (e.currentTarget as HTMLElement).classList.remove('dragging'); }}
      onClick={() => onClick(lead)}
    >
      <div className="lead-card-top">
        <div className="lead-avatar-lg" style={{ backgroundColor: lead.avatar_bg || '#334155' }}>
          {lead.initials || getInitials(lead.name)}
        </div>
        <div className="lead-info">
          <div className="lead-name">{lead.name}</div>
          {lead.company_name && <div className="lead-company">{lead.company_name}</div>}
        </div>
      </div>
      <div className="lead-card-bottom">
        {lead.value ? (
          <div className="lead-value">{formatCurrency(lead.value)}</div>
        ) : (
          <div />
        )}
        {lead.starred ? (
          <Star size={16} fill="#fbbf24" color="#fbbf24" strokeWidth={1} />
        ) : (
          <div className="lead-time">{formatTimeAgo(lead.created_at)}</div>
        )}
      </div>
    </div>
  );
}

export default function CRM() {
  const [supabase] = useState(() => createClient());
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showNewModal, setShowNewModal] = useState(false);
  const [newLeadStage, setNewLeadStage] = useState<LeadStage>('lista');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<LeadStage | null>(null);
  const draggedLead = useRef<Lead | null>(null);

  // Fetch leads from Supabase
  useEffect(() => {
    let cancelled = false;

    async function fetchLeads() {
      try {
        const { data, error } = await supabase
          .from('leads')
          .select('*')
          .order('stage_order', { ascending: true })
          .order('created_at', { ascending: false });

        if (!cancelled) {
          if (error) {
            console.error('Error fetching leads:', error);
          } else {
            setLeads((data as Lead[]) ?? []);
          }
        }
      } catch (err) {
        console.error('Unexpected error fetching leads:', err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchLeads();

    return () => { cancelled = true; };
  }, []);

  // Create lead
  const handleCreateLead = async (leadData: Partial<Lead>) => {
    const maxOrder = leads
      .filter(l => l.stage === leadData.stage)
      .reduce((max, l) => Math.max(max, l.stage_order), -1);

    const { data, error } = await supabase
      .from('leads')
      .insert({ ...leadData, stage_order: maxOrder + 1 })
      .select()
      .single();

    if (!error && data) {
      setLeads(prev => [data as Lead, ...prev]);
      setShowNewModal(false);
    }
  };

  // Update lead
  const handleUpdateLead = async (id: string, updates: Partial<Lead>) => {
    const { error } = await supabase
      .from('leads')
      .update(updates)
      .eq('id', id);

    if (!error) {
      setLeads(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
      if (selectedLead?.id === id) {
        setSelectedLead(prev => prev ? { ...prev, ...updates } : null);
      }
    }
  };

  // Delete lead
  const handleDeleteLead = async (id: string) => {
    const { error } = await supabase
      .from('leads')
      .delete()
      .eq('id', id);

    if (!error) {
      setLeads(prev => prev.filter(l => l.id !== id));
      setSelectedLead(null);
    }
  };

  // Drag and drop
  const handleDragStart = (e: React.DragEvent, lead: Lead) => {
    draggedLead.current = lead;
    e.dataTransfer.effectAllowed = 'move';
    const el = e.currentTarget as HTMLElement;
    el.classList.add('dragging');
  };

  const handleDragOver = (e: React.DragEvent, stage: LeadStage) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverColumn(stage);
  };

  const handleDragLeave = () => {
    setDragOverColumn(null);
  };

  const handleDrop = async (e: React.DragEvent, targetStage: LeadStage) => {
    e.preventDefault();
    setDragOverColumn(null);

    const lead = draggedLead.current;
    if (!lead || lead.stage === targetStage) return;

    // Optimistic update
    const maxOrder = leads
      .filter(l => l.stage === targetStage)
      .reduce((max, l) => Math.max(max, l.stage_order), -1);

    const newOrder = maxOrder + 1;
    setLeads(prev => prev.map(l =>
      l.id === lead.id ? { ...l, stage: targetStage, stage_order: newOrder } : l
    ));

    await supabase
      .from('leads')
      .update({ stage: targetStage, stage_order: newOrder })
      .eq('id', lead.id);

    draggedLead.current = null;
  };

  const handleDragEnd = (e: React.DragEvent) => {
    const el = e.currentTarget as HTMLElement;
    el.classList.remove('dragging');
    setDragOverColumn(null);
    draggedLead.current = null;
  };

  // Filter leads by search
  const filteredLeads = search.trim()
    ? leads.filter(l =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      (l.company_name || '').toLowerCase().includes(search.toLowerCase())
    )
    : leads;

  const getColumnLeads = (stage: LeadStage) =>
    filteredLeads
      .filter(l => l.stage === stage)
      .sort((a, b) => a.stage_order - b.stage_order);

  return (
    <div className="crm-dashboard w-full">
      <header className="top-header">
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-bold">Gestão de Leads</h1>
          <div className="lead-total-badge">
            {leads.length} {leads.length === 1 ? 'lead' : 'leads'}
          </div>
        </div>

        <div className="header-actions">
          <div className="input-group" style={{ width: '280px' }}>
            <Search className="input-icon" size={18} />
            <input
              type="text"
              className="input input-with-icon"
              placeholder="Buscar contatos, empresas..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary"
            onClick={() => { setNewLeadStage('lista'); setShowNewModal(true); }}
          >
            <Plus size={18} /> Novo Lead
          </button>
        </div>
      </header>

      <main className="page-content">
        {loading ? (
          <div className="kanban-loading">
            <div className="spinner" />
            <span>Carregando leads...</span>
          </div>
        ) : (
          <div className="kanban-board">
            {STAGES.map(stageInfo => {
              const columnLeads = getColumnLeads(stageInfo.key);
              const isOver = dragOverColumn === stageInfo.key;

              return (
                <div
                  key={stageInfo.key}
                  className={`kanban-column ${isOver ? 'drag-over' : ''}`}
                  onDragOver={e => handleDragOver(e, stageInfo.key)}
                  onDragLeave={handleDragLeave}
                  onDrop={e => handleDrop(e, stageInfo.key)}
                >
                  <div className="kanban-column-header">
                    <div className="column-title-group">
                      <div className="column-dot" style={{ backgroundColor: stageInfo.color }} />
                      <div className="column-title">{stageInfo.label}</div>
                      <div className="column-count">{columnLeads.length}</div>
                    </div>
                    <button
                      className="btn-icon-sm"
                      onClick={() => { setNewLeadStage(stageInfo.key); setShowNewModal(true); }}
                      title="Adicionar lead"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <div className="kanban-cards">
                    {columnLeads.map(lead => (
                      <LeadCard
                        key={lead.id}
                        lead={lead}
                        onDragStart={handleDragStart}
                        onClick={setSelectedLead}
                      />
                    ))}
                    {columnLeads.length === 0 && (
                      <div className="kanban-empty">
                        <span>Nenhum lead</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modals */}
      {showNewModal && (
        <NewLeadModal
          onClose={() => setShowNewModal(false)}
          onSave={handleCreateLead}
          initialStage={newLeadStage}
        />
      )}

      {selectedLead && (
        <LeadDetailModal
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onUpdate={handleUpdateLead}
          onDelete={handleDeleteLead}
        />
      )}
    </div>
  );
}
