'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Hexagon, LogOut } from 'lucide-react';
import { useAuth } from '@/components/AuthProvider';
import { createClient } from '@/lib/supabase/client';
import './Sidebar.css';

export function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { profile } = useAuth();

    const navItems = [
        { label: 'Dashboard', href: '/', icon: LayoutDashboard },
        { label: 'CRM', href: '/crm', icon: Briefcase },
        { label: 'Mensagens', href: '/mensagens', icon: MessageSquare },
        { label: 'Agentes', href: '/agentes', icon: Users },
    ];

    async function handleLogout() {
        const supabase = createClient();
        await supabase.auth.signOut();
        router.push('/login');
        router.refresh();
    }

    const displayName = profile?.full_name || 'Usuário';
    const displayRole = profile?.role === 'admin' ? 'Administrador'
        : profile?.role === 'gestor' ? 'Gestor'
        : 'Corretor';

    const isCollapsed = pathname === '/mensagens';

    return (
        <aside className={`sidebar ${isCollapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <Hexagon fill="var(--accent-gold)" color="var(--accent-gold)" size={24} />
                    <div className="logo-icon-inner" />
                </div>
                <span className="logo-text">
                    Liberty<span className="logo-text-bold">Business</span>
                </span>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Icon size={20} className="nav-icon" />
                            <span>{item.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="sidebar-footer">
                <div className="profile-card">
                    <div className="profile-avatar">
                        <div className="avatar-img" />
                        <div className="status-dot" />
                    </div>
                    <div className="profile-info">
                        <div className="profile-name">{displayName}</div>
                        <div className="profile-role">{displayRole}</div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="btn-ghost logout-btn"
                        title="Sair"
                    >
                        <LogOut size={16} />
                    </button>
                </div>
            </div>
        </aside>
    );
}
