import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { weddingService } from '../../services/weddingService';
import { Invitation } from '../../types/wedding';
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
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

export const AdminInvitationsListPage: React.FC = () => {
  const { showToast } = useToast();
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);

  // Create Modal State
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newGroom, setNewGroom] = useState('');
  const [newBride, setNewBride] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [newDate, setNewDate] = useState('2026-10-10');
  const [newTemplate, setNewTemplate] = useState<'royal-arch' | 'persona-5'>('royal-arch');

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
    setLoading(false);
  };

  useEffect(() => {
    loadInvitations();
  }, []);

  // Handle Slug auto-generation for create modal
  const handleNamesChange = (groom: string, bride: string) => {
    setNewGroom(groom);
    setNewBride(bride);
    if (groom && bride) {
      const gSlug = groom.toLowerCase().replace(/[^a-z0-9]/g, '');
      const bSlug = bride.toLowerCase().replace(/[^a-z0-9]/g, '');
      setNewSlug(`${gSlug}-${bSlug}`);
      if (!newTitle) {
        setNewTitle(`The Wedding of ${groom} & ${bride}`);
      }
    }
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlug || !newGroom || !newBride) {
      showToast('Harap lengkapi nama mempelai dan slug URL', 'error');
      return;
    }

    try {
      const created = await weddingService.createInvitation({
        title: newTitle || `The Wedding of ${newGroom} & ${newBride}`,
        bride_nickname: newBride,
        groom_nickname: newGroom,
        slug: newSlug.trim().toLowerCase(),
        wedding_date: newDate,
        template_id: newTemplate,
      });

      showToast(`Undangan "${created.title}" berhasil dibuat! ♡`, 'success');
      setShowCreateModal(false);
      // Reset form
      setNewTitle('');
      setNewGroom('');
      setNewBride('');
      setNewSlug('');
      loadInvitations();
    } catch (err: any) {
      showToast(err.message || 'Gagal membuat undangan', 'error');
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

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Apakah Anda yakin ingin menghapus undangan "${title}"?`)) {
      await weddingService.deleteInvitation(id);
      showToast('Undangan berhasil dihapus', 'info');
      loadInvitations();
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

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Undangan Baru</span>
        </button>
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
                      inv.template_id === 'persona-5'
                        ? 'bg-[#E60012] text-white -skew-x-3'
                        : 'bg-[#283D52] text-[#FFFCF7]'
                    }`}
                  >
                    {inv.template_id === 'persona-5' ? 'Persona 5 Style' : 'The Royal Arch'}
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
                {invitations.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleDelete(inv.id, inv.title)}
                    className="p-2 rounded-xl bg-[#FFFCF7] hover:bg-rose-50 border border-rose-200 text-rose-700 transition-colors cursor-pointer"
                    title="Hapus Undangan"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
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
                    onChange={(e) => setNewSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
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
                </select>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-[#EFE8DE]">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-[#283D52]/20 text-xs font-semibold uppercase tracking-wider text-[#283D52]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider shadow-sm"
                >
                  Buat Undangan
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
                    onChange={(e) => setDupSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
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
    </div>
  );
};
