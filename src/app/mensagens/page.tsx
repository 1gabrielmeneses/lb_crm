'use client';

import {
    Edit, Filter, Search, Paperclip, MoreVertical,
    Smile, Mic, Send, Plus, Check, CheckCheck
} from 'lucide-react';
import './page.css';

interface Chat {
    id: string;
    name: string;
    tags: string;
    lastMessage: string;
    time: string;
    avatarImg?: string;
    initials?: string;
    avatarBg?: string;
    unread?: number;
    online?: boolean;
    active?: boolean;
}

const chatList: Chat[] = [
    {
        id: '1',
        name: 'Fernanda Lima',
        tags: 'Cobertura Duplex • Reunião',
        lastMessage: 'Ok, pode confirmar o horário para amanhã?',
        time: '10:42',
        avatarImg: '#0d9488', // using teal for her avatar bg color based on image
        online: true,
        active: true
    },
    {
        id: '2',
        name: 'Roberto Faro',
        tags: 'Investidor Privado • MQL',
        lastMessage: 'Vou analisar a proposta e retorno.',
        time: 'Ontem',
        initials: 'RF',
        avatarBg: '#4f46e5'
    },
    {
        id: '3',
        name: 'Maria Oliveira',
        tags: 'Construtora MO • Lista',
        lastMessage: 'Obrigada pelo contato.',
        time: 'Segunda',
        avatarImg: '#fed7aa'
    },
    {
        id: '4',
        name: 'Lucas Torres',
        tags: 'Shopping Centers • SAL',
        lastMessage: 'Qual o valor do m² na região?',
        time: '23/10',
        initials: 'LT',
        avatarBg: '#0f766e',
        unread: 2
    },
    {
        id: '5',
        name: 'Grupo Vivara',
        tags: 'Loja Shopping • Contrato',
        lastMessage: 'Documentos enviados.',
        time: '20/10',
        avatarImg: '#52525b'
    }
];

export default function Mensagens() {
    return (
        <div className="chats-container">
            {/* Sidebar: Chat List */}
            <aside className="chats-sidebar">
                <div className="chats-sidebar-header">
                    <h2 className="text-xl font-bold">Chats</h2>
                    <div className="chats-sidebar-actions">
                        <button><Edit size={18} /></button>
                        <button><Filter size={18} /></button>
                    </div>
                </div>

                <div className="chats-search">
                    <div className="input-group">
                        <Search className="input-icon" size={16} />
                        <input type="text" className="input input-with-icon" placeholder="Buscar ou começar nova conversa" />
                    </div>
                </div>

                <div className="chat-list">
                    {chatList.map(chat => (
                        <div key={chat.id} className={`chat-list-item ${chat.active ? 'active' : ''}`}>
                            <div
                                className="chat-item-avatar"
                                style={{ backgroundColor: chat.avatarImg || chat.avatarBg }}
                            >
                                {chat.initials}
                                {chat.online && <div className="chat-item-status" />}
                            </div>

                            <div className="chat-item-content">
                                <div className="chat-item-header">
                                    <span className="chat-item-name" style={{ color: chat.active || chat.unread ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                                        {chat.name}
                                    </span>
                                    <span className="chat-item-time" style={{ color: chat.active ? 'var(--accent-gold)' : 'var(--text-muted)' }}>
                                        {chat.time}
                                    </span>
                                </div>
                                <div className="chat-item-tags">{chat.tags}</div>
                                <div className="flex justify-between items-center">
                                    <div className="chat-item-message" style={{ color: chat.active || chat.unread ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                                        {chat.lastMessage}
                                    </div>
                                    {chat.unread && <span className="unread-badge">{chat.unread}</span>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            {/* Main Chat Area */}
            <main className="chat-main">
                <header className="chat-header">
                    <div className="chat-header-info">
                        <div className="chat-item-avatar" style={{ backgroundColor: '#0d9488', width: 40, height: 40 }}>
                            {/* online dot */}
                            <div className="chat-item-status" style={{ width: 10, height: 10 }} />
                        </div>
                        <div>
                            <div className="chat-header-name">Fernanda Lima</div>
                            <div className="chat-header-tags">
                                <span style={{ color: "var(--accent-gold)" }}>🏢 Cobertura Duplex</span> •
                                <span className="badge badge-gray" style={{ color: "var(--accent-gold)" }}>Reunião</span>
                            </div>
                        </div>
                    </div>

                    <div className="chat-header-actions">
                        <button><Search size={20} /></button>
                        <button><Paperclip size={20} /></button>
                        <button><MoreVertical size={20} /></button>
                    </div>
                </header>

                <div className="chat-messages">
                    <div className="date-divider"><span>Hoje</span></div>

                    <div className="message-row message-received">
                        <div className="chat-item-avatar" style={{ backgroundColor: '#0d9488', width: 32, height: 32, marginBottom: '0.25rem' }} />
                        <div className="message-bubble">
                            Olá Alex, bom dia! Tudo bem com você?
                            <div className="message-meta">09:15</div>
                        </div>
                    </div>

                    <div className="message-row message-received">
                        {/* hidden avatar block just for alignment spacing */}
                        <div style={{ width: 32, flexShrink: 0 }} />
                        <div className="message-bubble">
                            Gostaria de saber se a cobertura ainda está disponível para visitação nesta semana. Tenho interesse em conhecer.
                            <div className="message-meta">09:16</div>
                        </div>
                    </div>

                    <div className="message-row message-sent">
                        <div className="message-bubble">
                            Bom dia, Fernanda! Tudo ótimo.
                            <div className="message-meta">09:20 <CheckCheck size={14} color="#fff" /></div>
                        </div>
                    </div>

                    <div className="message-row message-sent">
                        <div className="message-bubble">
                            Sim, está disponível! Podemos agendar. Qual o melhor horário para você?
                            <div className="message-meta">09:21 <CheckCheck size={14} color="#fff" /></div>
                        </div>
                    </div>

                    <div className="message-row message-received">
                        <div className="chat-item-avatar" style={{ backgroundColor: '#0d9488', width: 32, height: 32, marginBottom: '0.25rem' }} />
                        <div className="message-bubble">
                            Amanhã à tarde seria perfeito. Por volta das 14h, é possível?
                            <div className="message-meta">10:40</div>
                        </div>
                    </div>

                    <div className="message-row message-sent">
                        <div className="message-bubble">
                            Ok, pode confirmar o horário para amanhã? Vou deixar reservado na agenda.
                            <div className="message-meta">10:42 <CheckCheck size={14} color="#fff" /></div>
                        </div>
                    </div>
                </div>

                <div className="chat-input-area">
                    <button className="chats-sidebar-actions" style={{ color: 'var(--text-secondary)' }}>
                        <Plus size={24} />
                    </button>

                    <div className="chat-input-wrapper">
                        <div className="chat-input-actions pl-2">
                            <button><Smile size={20} /></button>
                        </div>
                        <input type="text" className="chat-input" placeholder="Digite uma mensagem..." />
                        <div className="chat-input-actions pr-2">
                            <button><Mic size={20} /></button>
                        </div>
                    </div>

                    <button className="btn-send">
                        <Send size={20} style={{ marginLeft: '-2px' }} />
                    </button>
                </div>
            </main>
        </div>
    );
}
