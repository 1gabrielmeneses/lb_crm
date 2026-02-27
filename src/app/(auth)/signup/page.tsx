'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Hexagon } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export default function SignupPage() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const supabase = createClient();
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  }

  if (success) {
    return (
      <div className="auth-card">
        <div className="auth-logo">
          <Hexagon fill="var(--accent-gold)" color="var(--accent-gold)" size={28} />
          <span className="logo-text">
            Liberty<span className="logo-text-bold">Business</span>
          </span>
        </div>

        <h1 className="auth-title">Verifique seu email</h1>
        <div className="auth-success" style={{ marginTop: '1rem' }}>
          Enviamos um link de confirmação para <strong>{email}</strong>.
          Clique no link para ativar sua conta.
        </div>

        <div className="auth-footer">
          <Link href="/login">Voltar para o login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-card">
      <div className="auth-logo">
        <Hexagon fill="var(--accent-gold)" color="var(--accent-gold)" size={28} />
        <span className="logo-text">
          Liberty<span className="logo-text-bold">Business</span>
        </span>
      </div>

      <h1 className="auth-title">Criar conta</h1>
      <p className="auth-subtitle">Preencha seus dados para acessar o CRM</p>

      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="fullName">Nome completo</label>
          <input
            id="fullName"
            type="text"
            className="input"
            placeholder="Seu nome"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            className="input"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            className="input"
            placeholder="Mínimo 6 caracteres"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
        </div>

        <button type="submit" className="btn btn-primary auth-btn" disabled={loading}>
          {loading ? 'Criando conta...' : 'Criar conta'}
        </button>
      </form>

      <div className="auth-footer">
        Já tem uma conta? <Link href="/login">Entrar</Link>
      </div>
    </div>
  );
}
