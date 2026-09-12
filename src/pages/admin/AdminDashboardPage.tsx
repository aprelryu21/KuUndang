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
  Folder,
  Cloud,
  RefreshCw,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { googleDriveService } from '../../services/googleDriveService';

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
  const [gasUrlInput, setGasUrlInput] = useState(googleDriveService.getAppsScriptUrl());
  const [isSyncing, setIsSyncing] = useState(false);

  const loadDashboardData = async () => {
    setLoading(true);
    weddingService.init();
    const invs = await weddingService.getAllInvitations();
    setInvitations(invs);

    const st = await weddingService.getStats();
    setStats(st);
    setLoading(false);
  };

  const handleSaveGasUrl = (e: React.FormEvent) => {
    e.preventDefault();
    googleDriveService.setAppsScriptUrl(gasUrlInput.trim());
    setShowConfigModal(false);
    showToast('URL Google Apps Script berhasil disimpan!', 'success');
  };

  const handleSyncAllToGoogle = async () => {
    if (!googleDriveService.isConfigured()) {
      setShowConfigModal(true);
      return;
    }
    setIsSyncing(true);
    try {
      const allInvs = await weddingService.getAllInvitations();
      for (const inv of allInvs) {
        const full = await weddingService.getFullInvitationData(inv.id);
        if (full) {
          await googleDriveService.syncInvitationData(full);
        }
      }
      showToast('Semua undangan berhasil disinkronkan ke Google Sheets & Drive!', 'success');
    } catch (err: any) {
      showToast('Sinkronisasi gagal: ' + (err?.message || 'Cek URL Apps Script'), 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
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
            Ringkasan status undangan digital, rekap tamu hadir, dan doa restu.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Link
            to="/admin/invitations"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Kelola Undangan</span>
          </Link>
        </div>
      </div>

      {/* Google Apps Script & Drive Integration Banner */}
      <div className="p-5 rounded-3xl bg-[#F7F2EA] border border-[#283D52]/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52] shrink-0">
            <Folder className="w-5 h-5 text-[#C2A56B]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-[#283D52]">Google Drive & Sheets Storage</h3>
              {googleDriveService.isConfigured() ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Terhubung
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                  Belum Diatur
                </span>
              )}
            </div>
            <p className="text-xs text-[#768692] mt-0.5">
              Menyimpan foto, audio, dan database langsung ke folder Google Drive <strong className="text-[#283D52]">KUUNDANG</strong> & Google Sheets.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSyncAllToGoogle}
            disabled={isSyncing}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkron ke Sheets'}</span>
          </button>

          <button
            type="button"
            onClick={() => setShowConfigModal(true)}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Konfigurasi GAS</span>
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
          <p className="mt-1 text-[11px] text-[#768692]">Templat aktif dalam sistem</p>
        </div>

        {/* Total Guests */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Daftar Tamu
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#C2A56B]/20 flex items-center justify-center text-[#C2A56B]">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalGuests}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Tamu terdaftar dengan kode unik</p>
        </div>

        {/* Total Attending Guests */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Konfirmasi Hadir
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.attending}{' '}
            <span className="text-xs font-normal text-[#768692]">
              ({stats.totalAttendanceCount} orang)
            </span>
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">
            {stats.notAttending} tamu berhalangan hadir
          </p>
        </div>

        {/* Total Wishes */}
        <div className="p-5 rounded-3xl bg-[#FFFCF7] border border-[#283D52]/10 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold tracking-wider uppercase text-[#768692]">
              Doa & Ucapan
            </span>
            <div className="w-8 h-8 rounded-xl bg-[#DFBFC1]/40 flex items-center justify-center text-[#283D52]">
              <MessageSquareHeart className="w-4 h-4" />
            </div>
          </div>
          <p className="mt-3 font-heading text-3xl font-bold text-[#283D52]">
            {stats.totalWishes}
          </p>
          <p className="mt-1 text-[11px] text-[#768692]">Ucapan tersimpan di guestbook</p>
        </div>
      </div>

      {/* Invitations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-[#283D52]">Undangan Pernikahan</h2>
            <p className="text-xs text-[#768692]">
              Pilih undangan untuk mengubah konten, tema, atau mengelola tamu
            </p>
          </div>
          <Link
            to="/admin/invitations"
            className="text-xs font-semibold text-[#C2A56B] hover:text-[#283D52] flex items-center gap-1"
          >
            <span>Lihat Semua</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="bg-[#FFFCF7] rounded-3xl border border-[#283D52]/10 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="p-6">
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      inv.status === 'published'
                        ? 'bg-emerald-100 text-emerald-800'
                        : inv.status === 'draft'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-neutral-100 text-neutral-800'
                    }`}
                  >
                    {inv.status}
                  </span>

                  <span className="text-xs text-[#768692] flex items-center gap-1.5 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
                    {inv.wedding_date}
                  </span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#283D52]">
                  {inv.title}
                </h3>
                <p className="text-xs text-[#768692] mt-1">
                  URL Publik: <code className="text-[#283D52] font-mono">/{inv.slug}</code>
                </p>

                <div className="mt-4 pt-4 border-t border-[#EFE8DE] flex items-center gap-4 text-xs text-[#768692]">
                  <span>Mempelai: <strong className="text-[#24313A]">{inv.groom_nickname} & {inv.bride_nickname}</strong></span>
                  <span>•</span>
                  <span>Tema: <strong className="text-[#24313A]">{inv.theme_config?.font_heading || 'Luxury Whimsical'}</strong></span>
                </div>
              </div>

              <div className="px-6 py-4 bg-[#F7F2EA] border-t border-[#283D52]/10 flex items-center justify-between gap-2">
                <Link
                  to={`/admin/invitations/${inv.id}/edit`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit Konten</span>
                </Link>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/preview/${inv.id}`}
                    target="_blank"
                    className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-medium transition-colors"
                    title="Pratinjau Undangan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <a
                    href={`/${inv.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-xs font-medium text-[#283D52] flex items-center gap-1.5 transition-colors"
                  >
                    <span>Buka Publik</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* GAS Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#283D52]/60 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg bg-[#FFFCF7] rounded-3xl border border-[#283D52]/20 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#283D52]/10 flex items-center justify-center text-[#283D52]">
                  <Cloud className="w-5 h-5 text-[#C2A56B]" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-bold text-[#283D52]">
                    Koneksi Google Apps Script
                  </h3>
                  <p className="text-[11px] text-[#768692]">
                    Simpan file ke Drive & sinkronkan data ke Google Sheets
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="w-8 h-8 rounded-full bg-[#F7F2EA] hover:bg-[#EFE8DE] flex items-center justify-center text-[#283D52] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveGasUrl} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                  Web App URL Google Apps Script:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://script.google.com/macros/s/.../exec"
                  value={gasUrlInput}
                  onChange={(e) => setGasUrlInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/20 rounded-xl text-xs font-mono text-[#283D52] focus:outline-hidden focus:border-[#C2A56B]"
                />
                <p className="text-[11px] text-[#768692] mt-1.5 leading-relaxed">
                  URL didapat setelah klik <strong>Deploy &gt; New deployment &gt; Web app</strong> (Who has access: <strong>Anyone</strong>) di script Google Apps Script.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 text-xs text-[#283D52] space-y-1.5">
                <p className="font-bold flex items-center gap-1.5 text-[#C2A56B]">
                  <span>💡</span> Keuntungan Google Apps Script + Drive:
                </p>
                <ul className="list-disc pl-4 text-[11px] text-[#768692] space-y-1">
                  <li>Gratis dan tanpa batasan kuota rumit Supabase.</li>
                  <li>Foto dan lagu tersimpan rapi di Google Drive Anda pada folder <strong>KUUNDANG</strong>.</li>
                  <li>Daftar tamu, RSVP, dan ucapan otomatis masuk ke Google Sheets.</li>
                </ul>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfigModal(false)}
                  className="px-4 py-2 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-xs font-semibold cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm"
                >
                  Simpan URL
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
