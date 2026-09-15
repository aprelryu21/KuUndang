import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { weddingService } from '../../services/weddingService';
import { Invitation, TemplateId } from '../../types/wedding';
import {
  Plus,
  Copy,
  Edit3,
  Trash2,
  ExternalLink,
  Eye,
  Calendar,
  Archive,
  CheckCircle,
  X,
  Sparkles,
  Database,
  Loader2,
  AlertTriangle,
  UploadCloud,
  Settings,
  RefreshCw,
  CheckCircle2,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { SupabaseDataExplorerModal } from '../../components/admin/SupabaseDataExplorerModal';
import { SupabaseConfigModal } from '../../components/admin/SupabaseConfigModal';
import { getSupabaseConfig } from '../../lib/supabase';

export const AdminInvitationsListPage: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Supabase State
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [showExplorer, setShowExplorer] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [supabaseStatus, setSupabaseStatus] = useState(getSupabaseConfig());

  // Delete Modal State
  const [deleteTarget, setDeleteTarget] = useState<Invitation | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGroom, setNewGroom] = useState('');
  const [newBride, setNewBride] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDate, setNewDate] = useState('2026-10-10');
  const [newTemplate, setNewTemplate] = useState<TemplateId>('royal-arch');

  // Duplicate Modal State
  const [duplicateSource, setDuplicateSource] = useState<Invitation | null>(null);
  const [dupTitle, setDupTitle] = useState('');
  const [dupSlug, setDupSlug] = useState('');
  const [copyPhotos, setCopyPhotos] = useState(true);
  const [copyGifts, setCopyGifts] = useState(true);

  const loadInvitations = async () => {
    setLoading(true);
    weddingService.init();
    const invs = await weddingService.getAllInvitations();
    setInvitations(invs);
    setSupabaseStatus(getSupabaseConfig());
    setLoading(false);
  };

  useEffect(() => {
    loadInvitations();
    const handleConfigChange = () => {
      setSupabaseStatus(getSupabaseConfig());
      loadInvitations();
    };
    window.addEventListener('supabase_config_changed', handleConfigChange);
    return () => window.removeEventListener('supabase_config_changed', handleConfigChange);
  }, []);

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
      showToast(err.message || 'Gagal sinkronisasi data', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  // Handle Slug auto-generation for create modal
  const handleNamesChange = (groom: string, bride: string) => {
    setNewGroom(groom);
    setNewBride(bride);
    if (groom && bride) {
      const gSlug = (groom || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      const bSlug = (bride || '').toLowerCase().replace(/[^a-z0-9]/g, '');
      setNewSlug(`${gSlug}-${bSlug}`);
      if (!newTitle) {
        setNewTitle(`The Wedding of ${groom} & ${bride}`);
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlug.trim() || !newGroom.trim() || !newBride.trim()) {
      showToast('Harap lengkapi nama mempelai dan slug URL', 'error');
      return;
    }

    setIsCreating(true);
    try {
      const created = await weddingService.createInvitation({
        title: newTitle || `The Wedding of ${newGroom} & ${newBride}`,
        bride_nickname: newBride,
        groom_nickname: newGroom,
        slug: newSlug.trim().toLowerCase(),
        wedding_date: newDate,
        template_id: newTemplate,
      });

      const syncStatus = (created as any)._supabaseStatus;
      if (syncStatus?.synced) {
        showToast(`Undangan "${created.title}" berhasil dibuat dan tersimpan di database Supabase Cloud! ♡`, 'success');
      } else if (syncStatus?.error) {
        showToast(`Undangan tersimpan lokal. Supabase info: ${syncStatus.error}`, 'error');
      } else if (!syncStatus?.isConfigured) {
        showToast(`Undangan "${created.title}" tersimpan lokal. Hubungkan Supabase untuk menyimpan ke cloud.`, 'info');
      } else {
        showToast(`Undangan "${created.title}" berhasil dibuat! ♡`, 'success');
      }

      setShowCreateModal(false);
      // Reset form
      setNewTitle('');
      setNewGroom('');
      setNewBride('');
      setNewSlug('');
      await loadInvitations();
      navigate(`/admin/invitations/${created.id}/edit`);
    } catch (err: any) {
      showToast(err.message || 'Gagal membuat undangan', 'error');
    } finally {
      setIsCreating(false);
    }
  };

  const openDuplicateModal = (inv: Invitation) => {
    setDuplicateSource(inv);
    setDupTitle(`The Wedding of ${inv.groom_nickname} & ${inv.bride_nickname} (Salinan)`);
    setDupSlug(`${inv.slug}-copy`);
    setCopyPhotos(true);
    setCopyGifts(true);
  };

  const handleDuplicateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!duplicateSource || !dupSlug) return;

    try {
      const duplicated = await weddingService.duplicateInvitation(
        duplicateSource.id,
        dupTitle,
        dupSlug.trim().toLowerCase(),
        { copyPhotos, copyGifts }
      );

      showToast(`Undangan berhasil diduplikasi menjadi "${duplicated.title}" ♡`, 'success');
      setDuplicateSource(null);
      loadInvitations();
    } catch (err: any) {
      showToast(err.message || 'Gagal menduplikasi undangan', 'error');
    }
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setIsDeleting(true);
    try {
      await weddingService.deleteInvitation(deleteTarget.id);
      showToast(`Undangan "${deleteTarget.title}" berhasil dihapus.`, 'info');
      setDeleteTarget(null);
      await loadInvitations();
    } catch (err: any) {
      showToast(err.message || 'Gagal menghapus undangan', 'error');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleTogglePublish = async (inv: Invitation) => {
    const newStatus = inv.status === 'published' ? 'draft' : 'published';
    await weddingService.updateInvitation(inv.id, { status: newStatus });
    showToast(`Status undangan diubah menjadi ${newStatus.toUpperCase()}`, 'success');
    loadInvitations();
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold text-[#283D52]">
            Kelola Undangan
          </h1>
          <p className="text-xs sm:text-sm text-[#768692] mt-0.5">
            Daftar semua undangan pernikahan digital. Buat, edit, preview, atau duplikasi untuk pasangan berikutnya.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowExplorer(true)}
            className="inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer"
            title="Lihat Data yang Tersimpan di Supabase"
          >
            <Database className="w-4 h-4 text-emerald-600" />
            <span>Lihat Data Supabase</span>
          </button>

          <button
            type="button"
            onClick={() => setShowCreateModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Buat Undangan Baru</span>
          </button>
        </div>
      </div>

      {/* Supabase Cloud Connection & Sync Banner */}
      <div className="p-4 sm:p-5 rounded-3xl bg-[#F7F2EA] border border-[#283D52]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0 border border-emerald-200">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-bold text-[#283D52]">Koneksi Supabase Cloud Database</h3>
              {supabaseStatus.isConfigured ? (
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Cloud Terhubung
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-semibold">
                  Mode Lokal Browser (Offline)
                </span>
              )}
            </div>
            <p className="text-xs text-[#768692] mt-0.5">
              {supabaseStatus.isConfigured
                ? 'Data undangan yang Anda tambah atau edit tersimpan realtime di database PostgreSQL Supabase.'
                : 'Undangan yang ditambahkan tersimpan di browser lokal. Hubungkan ke Supabase agar data muncul di dashboard Supabase.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap justify-end">
          {supabaseStatus.isConfigured && (
            <button
              type="button"
              onClick={() => setShowExplorer(true)}
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
              className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-xs"
              title="Unggah semua undangan lokal ke database Supabase"
            >
              <UploadCloud className={`w-3.5 h-3.5 text-emerald-700 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>{isSyncing ? 'Sinkronisasi...' : 'Sinkron ke Cloud'}</span>
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

      {/* Invitations Table / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {invitations.map((inv) => (
          <div
            key={inv.id}
            className="bg-[#FFFCF7] rounded-3xl border border-[#283D52]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            {/* Card Body */}
            <div className="p-6">
              <div className="flex items-center justify-between gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => handleTogglePublish(inv)}
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider transition-colors cursor-pointer ${
                    inv.status === 'published'
                      ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                      : inv.status === 'draft'
                      ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                      : 'bg-neutral-100 text-neutral-800'
                  }`}
                  title="Klik untuk ubah status publish"
                >
                  ● {inv.status}
                </button>

                <span className="text-xs text-[#768692] flex items-center gap-1 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
                  {inv.wedding_date}
                </span>
              </div>

              <h2 className="font-heading text-2xl font-bold text-[#283D52] leading-snug">
                {inv.title}
              </h2>

              <p className="mt-1 text-xs text-[#768692] font-mono">
                Slug: /{inv.slug}
              </p>

              <div className="mt-4 pt-4 border-t border-[#EFE8DE] space-y-1.5 text-xs text-[#768692]">
                <p>
                  Pasangan: <strong className="text-[#24313A]">{inv.groom_nickname} & {inv.bride_nickname}</strong>
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span>Tema Desain:</span>
                  <span
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase ${
                      inv.template_id === 'super-mario'
                        ? 'bg-[#5C94FC] text-white font-mono'
                        : inv.template_id === 'persona-5'
                        ? 'bg-[#E60012] text-white -skew-x-3'
                        : inv.template_id === 'javanese-royal'
                        ? 'bg-[#D4AF37] text-[#1A1009]'
                        : inv.template_id === 'cute-pink-floral'
                        ? 'bg-[#FF5C8D] text-white'
                        : inv.template_id === 'fleur-botanica'
                        ? 'bg-[#293522] text-[#BDA06C] border border-[#BDA06C]/40'
                        : 'bg-[#283D52] text-[#FFFCF7]'
                    }`}
                  >
                    {inv.template_id === 'super-mario'
                      ? '8-Bit Mario Game'
                      : inv.template_id === 'persona-5'
                      ? 'Persona 5 Style'
                      : inv.template_id === 'javanese-royal'
                      ? 'Adat Jawa Sakral'
                      : inv.template_id === 'cute-pink-floral'
                      ? 'Pastel Bloom Pink'
                      : inv.template_id === 'fleur-botanica'
                      ? 'Fleur Botanica'
                      : 'The Royal Arch'}
                  </span>
                </div>
                <p>
                  Musik Latar: {inv.music_enabled ? 'Aktif' : 'Non-aktif'}
                </p>
              </div>
            </div>

            {/* Actions Toolbar */}
            <div className="px-6 py-4 bg-[#F7F2EA] border-t border-[#283D52]/10 flex items-center justify-between gap-2">
              <Link
                to={`/admin/invitations/${inv.id}/edit`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-colors shadow-xs"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Link>

              <div className="flex items-center gap-1.5">
                {/* Preview Button */}
                <Link
                  to={`/preview/${inv.id}`}
                  target="_blank"
                  className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] transition-colors"
                  title="Pratinjau Undangan"
                >
                  <Eye className="w-3.5 h-3.5" />
                </Link>

                {/* Duplicate Button */}
                <button
                  type="button"
                  onClick={() => openDuplicateModal(inv)}
                  className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] transition-colors cursor-pointer"
                  title="Duplikasi Template Undangan"
                >
                  <Copy className="w-3.5 h-3.5 text-[#C2A56B]" />
                </button>

                {/* Public Link */}
                <a
                  href={`/${inv.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] transition-colors"
                  title="Buka Halaman Tamu"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {/* Delete Button */}
                <button
                  type="button"
                  onClick={() => setDeleteTarget(inv)}
                  className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-rose-50 border border-rose-200 text-rose-700 transition-colors cursor-pointer"
                  title="Hapus Undangan"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#C2A56B]/40 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#283D52]">
                  Buat Undangan Baru
                </h3>
                <p className="text-xs text-[#768692]">
                  Mulai template digital untuk pasangan baru
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1 rounded-lg text-[#768692] hover:text-[#24313A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Panggilan Pria
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Rizky"
                    value={newGroom}
                    onChange={(e) => handleNamesChange(e.target.value, newBride)}
                    className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Panggilan Wanita
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Anisa"
                    value={newBride}
                    onChange={(e) => handleNamesChange(newGroom, e.target.value)}
                    className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Judul Undangan
                </label>
                <input
                  type="text"
                  required
                  placeholder="The Wedding of Rizky & Anisa"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Slug URL (Unik)
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-[#EFE8DE] border border-r-0 border-[#283D52]/15 rounded-l-xl text-xs text-[#768692]">
                    /
                  </span>
                  <input
                    type="text"
                    required
                    value={newSlug}
                    onChange={(e) => setNewSlug((e.target.value || '').toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    placeholder="rizky-anisa"
                    className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-r-xl text-xs text-[#24313A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Tanggal Pernikahan
                </label>
                <input
                  type="date"
                  required
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Pilihan Tema Desain
                </label>
                <select
                  value={newTemplate}
                  onChange={(e) => setNewTemplate(e.target.value as any)}
                  className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] font-medium"
                >
                  <option value="royal-arch">The Royal Navy & Gold Arch (Klasik Ningrat)</option>
                  <option value="persona-5">Phantom Crimson & Black (Persona 5 Theme)</option>
                  <option value="javanese-royal">Adat Jawa Keraton & Gamelan Sakral</option>
                  <option value="cute-pink-floral">Pastel Bloom & Bunga Lucu (Pink Manis)</option>
                  <option value="super-mario">8-Bit Retro Platformer (Super Mario Bros)</option>
                  <option value="fleur-botanica">Fleur Botanica & Conservatory Glasshouse (Segel Lilin)</option>
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#EFE8DE]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  disabled={isCreating}
                  className="px-4 py-2.5 rounded-xl border border-[#283D52]/20 text-xs font-semibold uppercase tracking-wider text-[#283D52] hover:bg-[#EFE8DE] cursor-pointer disabled:opacity-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isCreating}
                  className="px-5 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isCreating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Menyiapkan Undangan...</span>
                    </>
                  ) : (
                    <span>Buat Undangan</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DUPLICATE MODAL */}
      {duplicateSource && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] max-w-md w-full rounded-3xl p-6 sm:p-8 border border-[#C2A56B]/40 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#283D52]">
                  Duplikasi Undangan
                </h3>
                <p className="text-xs text-[#768692]">
                  Salin dari: <strong className="text-[#283D52]">{duplicateSource.title}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setDuplicateSource(null)}
                className="p-1 rounded-lg text-[#768692] hover:text-[#24313A]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleDuplicateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Nama Undangan Baru
                </label>
                <input
                  type="text"
                  required
                  value={dupTitle}
                  onChange={(e) => setDupTitle(e.target.value)}
                  className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Slug URL Baru
                </label>
                <div className="flex items-center">
                  <span className="px-3 py-2.5 bg-[#EFE8DE] border border-r-0 border-[#283D52]/15 rounded-l-xl text-xs text-[#768692]">
                    /
                  </span>
                  <input
                    type="text"
                    required
                    value={dupSlug}
                    onChange={(e) => setDupSlug((e.target.value || '').toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="w-full px-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-r-xl text-xs text-[#24313A]"
                  />
                </div>
              </div>

              {/* Automatic items copied */}
              <div className="p-3 bg-[#F7F2EA] rounded-xl border border-[#283D52]/10 text-xs space-y-1.5 text-[#24313A]">
                <p className="font-semibold text-[#283D52] flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Komponen yang otomatis disalin:</span>
                </p>
                <p className="text-[11px] text-[#768692] pl-5">
                  ✓ Layout & Section Manager • ✓ Konfigurasi Tema & Warna • ✓ Timeline Cerita & Acara
                </p>
              </div>

              {/* Options */}
              <div className="space-y-2 pt-1">
                <label className="flex items-center gap-2.5 text-xs text-[#24313A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={copyPhotos}
                    onChange={(e) => setCopyPhotos(e.target.checked)}
                    className="rounded text-[#283D52] focus:ring-[#C2A56B]"
                  />
                  <span>Salin galeri foto dari template asal</span>
                </label>

                <label className="flex items-center gap-2.5 text-xs text-[#24313A] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={copyGifts}
                    onChange={(e) => setCopyGifts(e.target.checked)}
                    className="rounded text-[#283D52] focus:ring-[#C2A56B]"
                  />
                  <span>Salin informasi rekening tanda kasih (gift)</span>
                </label>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#EFE8DE]">
                <button
                  type="button"
                  onClick={() => setDuplicateSource(null)}
                  className="px-4 py-2.5 rounded-xl border border-[#283D52]/20 text-xs font-semibold uppercase tracking-wider text-[#283D52]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Duplikasi Sekarang
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-[#283D52]/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#FFFCF7] max-w-md w-full rounded-3xl p-6 sm:p-7 border border-rose-200 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center shrink-0 border border-rose-200">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-heading text-xl font-bold text-[#283D52]">
                  Hapus Undangan?
                </h3>
                <p className="text-xs text-[#768692]">Penghapusan permanen dari sistem</p>
              </div>
            </div>

            <div className="bg-rose-50/80 border border-rose-200 rounded-2xl p-4 mb-5 space-y-1.5 text-left">
              <p className="text-xs font-semibold text-rose-900">
                Undangan yang akan dihapus: <br />
                <span className="font-bold underline text-sm">{deleteTarget.title}</span>
              </p>
              <p className="text-[11px] text-rose-700 leading-relaxed mt-1">
                Seluruh data pasangan, jadwal acara, galeri foto, amplop digital, daftar tamu, RSVP, dan ucapan yang terkait akan dihapus secara permanen dari browser dan Supabase Cloud.
              </p>
            </div>

            <div className="flex justify-end gap-2.5">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-4 py-2.5 rounded-xl border border-[#283D52]/20 text-xs font-semibold uppercase tracking-wider text-[#283D52] hover:bg-[#EFE8DE] transition-colors cursor-pointer disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={isDeleting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Menghapus...</span>
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    <span>Ya, Hapus Sekarang</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Supabase Data Explorer Modal */}
      <SupabaseDataExplorerModal
        isOpen={showExplorer}
        onClose={() => {
          setShowExplorer(false);
          loadInvitations();
        }}
        onOpenConfig={() => setShowConfigModal(true)}
      />

      {/* Supabase Config Modal */}
      <SupabaseConfigModal
        isOpen={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        onSuccess={loadInvitations}
      />
    </div>
  );
};
