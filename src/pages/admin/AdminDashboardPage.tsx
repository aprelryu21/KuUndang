import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { weddingService } from '../../services/weddingService';
import { Invitation } from '../../types/wedding';
import {
  Heart,
  Users,
  CheckCircle2,
  XCircle,
  MessageSquareHeart,
  Calendar,
  Plus,
  ExternalLink,
  Edit3,
  Copy,
  Clock,
  ArrowUpRight,
  Database,
  RefreshCw,
  Sparkles,
  Settings,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { getSupabaseConfig } from '../../lib/supabase';
import { SupabaseConfigModal } from '../../components/admin/SupabaseConfigModal';
import { SupabaseDataExplorerModal } from '../../components/admin/SupabaseDataExplorerModal';

export const AdminDashboardPage: React.FC = () => {
  const { showToast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [stats, setStats] = useState({
    totalInvitations: 1,
    totalGuests: 5,
    totalRSVPs: 4,
    attending: 4,
    notAttending: 0,
    totalAttendanceCount: 11,
    totalWishes: 4,
  });
  const [loading, setLoading] = useState(true);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showExplorerModal, setShowExplorerModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState(getSupabaseConfig());

  const loadDashboardData = async () => {
    setLoading(true);
    weddingService.init();
    const invs = await weddingService.getAllInvitations();
    setInvitations(invs);

    const st = await weddingService.getStats();
    setStats(st);
    setSupabaseStatus(getSupabaseConfig());
    setLoading(false);
  };

  const handleSyncAllToSupabase = async () => {
    if (!supabaseStatus.isConfigured) {
      setShowConfigModal(true);
      return;
    }
    setIsSyncing(true);
    try {
      const res = await weddingService.syncAllLocalDataToSupabase();
      if (res.success) {
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    } catch (err: any) {
      showToast('Sinkronisasi gagal: ' + (err?.message || 'Cek koneksi internet'), 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
    const handleConfigChange = () => {
      setSupabaseStatus(getSupabaseConfig());
      loadDashboardData();
    };
    window.addEventListener('supabase_config_changed', handleConfigChange);
    return () => window.removeEventListener('supabase_config_changed', handleConfigChange);
  }, []);

  return (
    <div className="space-y-8">
      {/* Top Banner & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#283D52]">
            Dashboard Studio
          </h1>
          <p className="text-xs sm:text-sm text-[#768692] mt-0.5">
            Ringkasan status undangan digital, rekap tamu hadir, dan penyimpanan cloud Supabase.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/invitations"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Kelola Undangan</span>
          </Link>
        </div>
      </div>

      {/* Supabase Cloud Storage & Database Banner */}
      <div className="p-5 rounded-3xl bg-[#F7F2EA] border border-[#283D52]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#283D52]">Penyimpanan Supabase Cloud (Storage &amp; Database)</h3>
              {supabaseStatus.isConfigured ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Cloud Aktif
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                  Mode Lokal (Offline)
                </span>
              )}
            </div>
            <p className="text-xs text-[#768692] mt-0.5">
              {supabaseStatus.isConfigured
                ? 'Semua foto terunggah ke bucket "wedding-media" Supabase dan data tersimpan realtime di PostgreSQL.'
                : 'Penyimpanan berjalan di browser lokal. Hubungkan ke Supabase untuk upload cloud cepat & persistensi permanen.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto flex-wrap">
          {supabaseStatus.isConfigured && (
            <button
              type="button"
              onClick={() => setShowExplorerModal(true)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
              title="Periksa isi tabel langsung di Supabase"
            >
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Lihat Data Supabase</span>
            </button>
          )}

          {supabaseStatus.isConfigured && (
            <button
              type="button"
              onClick={handleSyncAllToSupabase}
              disabled={isSyncing}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron ke Cloud'}</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <Settings className="w-3.5 h-3.5" />
            <span>{supabaseStatus.isConfigured ? 'Pengaturan' : 'Hubungkan Supabase'}</span>
          </button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Invitations */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Total Undangan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52]">
              <Heart className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalInvitations}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Undangan dalam sistem</p>
        </div>

        {/* Total Guests */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Daftar Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalGuests}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Tamu terdaftar &amp; tautan personal</p>
        </div>

        {/* Total RSVP Confirmed */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Konfirmasi Hadir
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-emerald-700">
            {stats.totalAttendanceCount} <span className="text-sm font-normal text-[#768692]">jiwa</span>
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">
            Dari {stats.attending} respons tamu
          </p>
        </div>

        {/* Total Wishes */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Doa &amp; Ucapan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52]">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalWishes}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Pesan di buku tamu</p>
        </div>
      </div>

      {/* Quick Access to Invitations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading text-xl font-bold text-[#283D52]">
            Daftar Undangan Pernikahan
          </h2>
          <Link
            to="/admin/invitations"
            className="text-xs font-semibold text-[#283D52] hover:underline flex items-center gap-1"
          >
            <span>Semua Undangan</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-[#FFFCF7] rounded-3xl border border-[#283D52]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-36 relative overflow-hidden bg-[#283D52]">
                  <img
                    src={inv.cover_image || 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1470&auto=format&fit=crop'}
                    alt={inv.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-xs">
                      {inv.template_id || 'royal-arch'}
                    </span>
                    <h3 className="font-heading text-lg font-bold mt-1 leading-tight line-clamp-1">
                      {inv.groom_nickname} &amp; {inv.bride_nickname}
                    </h3>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#768692]">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
                      {inv.wedding_date}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inv.status === 'published'
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      {(inv.status || 'draft').toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-[#768692] line-clamp-1 font-mono">
                    /{inv.slug}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0 flex items-center gap-2 border-t border-[#283D52]/5 mt-2">
                <Link
                  to={`/admin/invitations/${inv.id}/edit`}
                  className="flex-1 py-2 px-3 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Undangan</span>
                </Link>
                <Link
                  to={`/${inv.slug}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] transition-colors"
                  title="Buka Halaman Tamu"
                >
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Supabase Configuration Modal */}
      <SupabaseConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSuccess={loadDashboardData}
      />

      {/* Supabase Data Explorer Modal */}
      <SupabaseDataExplorerModal
        isOpen={showExplorerModal}
        onClose={() => {
          setShowExplorerModal(false);
          loadDashboardData();
        }}
      />
    </div>
  );
};
