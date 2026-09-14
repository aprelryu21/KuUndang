import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Heart, Lock, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminLoginPage: React.FC = () => {
  const { signIn, user } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      navigate('/admin');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await signIn(username, password);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
      showToast(res.error, 'error');
    } else {
      showToast('Berhasil masuk ke KU UNDANG Admin! ♡', 'success');
      navigate('/admin');
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex items-center justify-center p-4 text-[#24313A]">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#283D52] flex items-center justify-center mx-auto mb-4 text-[#FFFCF7] shadow-lg">
            <Heart className="w-7 h-7 text-[#DFBFC1] fill-[#DFBFC1]" />
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold tracking-wide text-[#283D52]">
            KU UNDANG
          </h1>
          <p className="mt-1 text-xs tracking-widest uppercase font-semibold text-[#768692]">
            Admin & Content Management System
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#FFFCF7] rounded-3xl p-8 border border-[#C2A56B]/35 shadow-lg">
          <div className="mb-6 text-center">
            <h2 className="text-lg font-bold text-[#283D52]">Masuk ke Studio</h2>
            <p className="text-xs text-[#768692] mt-0.5">
              Kelola seluruh konten undangan digital, data tamu, dan RSVP
            </p>
          </div>

          {errorMsg && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5"
              >
                Username
              </label>
              <div className="relative">
                <input
                  id="username-input"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Masukkan username"
                  autoComplete="username"
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-sm text-[#24313A] focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40"
                />
                <Mail className="w-4 h-4 text-[#768692] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label
                htmlFor="password-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5"
              >
                Kata Sandi
              </label>
              <div className="relative">
                <input
                  id="password-input"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="current-password"
                  className="w-full pl-10 pr-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-sm text-[#24313A] focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40"
                />
                <Lock className="w-4 h-4 text-[#768692] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] disabled:opacity-60 text-[#FFFCF7] text-xs font-semibold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <span>Memeriksa...</span>
              ) : (
                <>
                  <span>SIGN IN</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Back to Landing Page Link */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-[#768692] hover:text-[#283D52] font-medium transition-colors inline-flex items-center gap-1.5"
          >
            ← Ke Beranda Utama (Landing Page)
          </Link>
        </div>
      </div>
    </div>
  );
};
