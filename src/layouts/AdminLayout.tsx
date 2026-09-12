import React, { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard,
  Heart,
  Users,
  MessageSquareHeart,
  Sparkles,
  LogOut,
  Menu,
  X,
  ExternalLink,
  PlusCircle,
  Settings,
  HelpCircle,
  Database,
  Palette,
} from 'lucide-react';

export const AdminLayout: React.FC = () => {
  const { user, signOut, isDemoAuth } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showSupabaseInfoModal, setShowSupabaseInfoModal] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard, exact: true },
    { label: 'Daftar Undangan', path: '/admin/invitations', icon: Heart },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-[#F7F2EA] flex flex-col md:flex-row text-[#24313A]">
      {/* Mobile Top Navbar */}
      <div className="md:hidden flex items-center justify-between px-5 py-4 bg-[#FFFCF7] border-b border-[#283D52]/10 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#283D52] flex items-center justify-center text-[#FFFCF7]">
            <Heart className="w-4 h-4 text-[#DFBFC1] fill-[#DFBFC1]" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-[#283D52] tracking-wide">
              KU UNDANG
            </h1>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-[#283D52] hover:bg-[#F7F2EA]"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Desktop Sidebar / Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#FFFCF7] border-r border-[#283D52]/10 flex flex-col justify-between transition-transform duration-300 md:translate-x-0 md:static ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Studio Brand Header */}
          <div className="p-6 border-b border-[#283D52]/10">
            <Link to="/admin" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#283D52] flex items-center justify-center text-[#FFFCF7] shadow-sm">
                <Heart className="w-5 h-5 text-[#DFBFC1] fill-[#DFBFC1]" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold tracking-wide text-[#283D52]">
                  KU UNDANG
                </h2>
                <p className="text-[10px] text-[#768692] font-semibold tracking-wider uppercase">
                  CMS & Invitation Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5">
            <p className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#768692]">
              Menu Utama
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.path, item.exact);

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    active
                      ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                      : 'text-[#24313A] hover:bg-[#F7F2EA] hover:text-[#283D52]'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? 'text-[#DFBFC1]' : 'text-[#768692]'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}

            <div className="pt-4">
              <p className="px-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#768692]">
                Tautan Cepat
              </p>
              <a
                href="/april-siti"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-[#24313A] hover:bg-[#F7F2EA] transition-all"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
                  <span>Demo April & Siti</span>
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-[#768692]" />
              </a>
            </div>
          </nav>
        </div>

        {/* Bottom User Profile & Status */}
        <div className="p-4 border-t border-[#283D52]/10 space-y-3">
          {/* Supabase Status Pill */}
          <button
            type="button"
            onClick={() => setShowSupabaseInfoModal(true)}
            className="w-full flex items-center justify-between p-2 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-left text-xs transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <Database className="w-3.5 h-3.5 text-[#C2A56B]" />
              <span className="text-[11px] font-medium text-[#24313A]">
                {isDemoAuth ? 'Mode Lokal / Demo' : 'Supabase Terhubung'}
              </span>
            </div>
            <span
              className={`w-2 h-2 rounded-full ${
                isDemoAuth ? 'bg-amber-400' : 'bg-emerald-500'
              }`}
            />
          </button>

          {/* User info */}
          <div className="flex items-center justify-between pt-1">
            <div className="truncate mr-2">
              <p className="text-xs font-bold text-[#283D52] truncate">
                {user?.full_name || 'Admin Studio'}
              </p>
              <p className="text-[10px] text-[#768692] truncate">{user?.email}</p>
            </div>
            <button
              type="button"
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-[#768692] hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Keluar"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Supabase connection info modal */}
      {showSupabaseInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] max-w-md w-full rounded-3xl p-6 border border-[#C2A56B]/40 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#283D52] font-heading text-xl font-bold">
                <Database className="w-5 h-5 text-[#C2A56B]" />
                <span>Status Backend & Database</span>
              </div>
              <button
                type="button"
                onClick={() => setShowSupabaseInfoModal(false)}
                className="p-1 rounded-md text-[#768692] hover:text-[#24313A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="text-xs space-y-3 text-[#24313A] leading-relaxed">
              <p>
                Aplikasi ini mendukung arsitektur <strong className="text-[#283D52]">Dual-Storage</strong>:
              </p>
              <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#283D52]/10 space-y-1.5">
                <p className="font-semibold text-[#283D52]">
                  1. Local Persistent Engine (Aktif)
                </p>
                <p className="text-[#768692]">
                  Seluruh data undangan, tamu, RSVP, ucapan, dan tema tersimpan secara interaktif dan real-time di browser Anda tanpa perlu pengaturan awal.
                </p>
              </div>

              <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#283D52]/10 space-y-1.5">
                <p className="font-semibold text-[#283D52]">
                  2. Supabase PostgreSQL & Auth (Siap Pakai)
                </p>
                <p className="text-[#768692]">
                  Skema SQL lengkap tersedia di <code className="bg-white px-1 rounded">supabase/schema.sql</code>. Cukup masukkan <code className="bg-white px-1 rounded">VITE_SUPABASE_URL</code> dan <code className="bg-white px-1 rounded">VITE_SUPABASE_ANON_KEY</code> di file <code className="bg-white px-1 rounded">.env</code> untuk mengaktifkan cloud database.
                </p>
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowSupabaseInfoModal(false)}
                className="px-4 py-2 bg-[#283D52] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider"
              >
                Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
