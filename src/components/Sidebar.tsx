'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MessageSquare, Briefcase, Hexagon } from 'lucide-react';
import './Sidebar.css';

export function Sidebar() {
    const pathname = usePathname();

    const navItems = [
        { label: 'Dashboard', href: '/', icon: LayoutDashboard },
        { label: 'CRM', href: '/crm', icon: Briefcase },
        { label: 'Mensagens', href: '/mensagens', icon: MessageSquare },
        { label: 'Agentes', href: '/agentes', icon: Users },
    ];

    return (
        <aside className="sidebar">
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
                        <div className="profile-name">Alex Morgan</div>
                        <div className="profile-role">Corretor Sênior</div>
                    </div>
                </div>
            </div>
        </aside>
    );
}
