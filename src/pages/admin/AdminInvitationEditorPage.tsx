import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { weddingService } from '../../services/weddingService';
import {
  Couple,
  FullInvitationData,
  GalleryItem,
  GiftAccount,
  Guest,
  Invitation,
  RSVP,
  SectionKey,
  SectionSetting,
  StoryItem,
  ThemeConfig,
  WeddingEvent,
  Wish,
} from '../../types/wedding';
import {
  ArrowLeft,
  Save,
  Eye,
  ExternalLink,
  Users,
  Calendar,
  MapPin,
  Image,
  Gift,
  Music,
  Palette,
  Layers,
  UserCheck,
  MessageSquareHeart,
  Heart,
  Plus,
  Trash2,
  Copy,
  Check,
  Clock,
  Sparkles,
  Info,
  CheckCircle2,
  AlertCircle,
  Upload,
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';
import { DriveUploader } from '../../components/DriveUploader';
import { getTemplatePreset } from '../../data/templatePresets';
import { INITIAL_DEMO_DATA } from '../../data/initialDemo';

type EditorTab =
  | 'general'
  | 'couple'
  | 'events'
  | 'story'
  | 'gallery'
  | 'gifts'
  | 'music'
  | 'theme'
  | 'sections'
  | 'guests'
  | 'rsvps'
  | 'wishes';

export const AdminInvitationEditorPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { showToast } = useToast();

  const [data, setData] = useState<FullInvitationData | null>(null);
  const [activeTab, setActiveTab] = useState<EditorTab>('general');
  const [loading, setLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');

  // Local state copy for editable items
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [bride, setBride] = useState<Couple | null>(null);
  const [groom, setGroom] = useState<Couple | null>(null);
  const [events, setEvents] = useState<WeddingEvent[]>([]);
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [gallery, setGallery] = useState<GalleryItem[]>([]);
  const [gifts, setGifts] = useState<GiftAccount[]>([]);
  const [sections, setSections] = useState<SectionSetting[]>([]);
  const [guests, setGuests] = useState<Guest[]>([]);
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [wishes, setWishes] = useState<Wish[]>([]);

  // Modals / inputs for adding sub-items
  const [newGuestName, setNewGuestName] = useState('');
  const [newGuestCategory, setNewGuestCategory] = useState('Umum');
  const [newGuestMax, setNewGuestMax] = useState(2);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);

  // New gallery image input
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageCaption, setNewImageCaption] = useState('');

  // Helper to safely get and update individual section setting
  const getSection = (key: SectionKey): SectionSetting => {
    const found = sections.find((s) => s.section_key === key);
    if (found) return found;
    const std = INITIAL_DEMO_DATA.sections.find((s) => s.section_key === key);
    return {
      id: `sec-${key}-${id || 'new'}`,
      invitation_id: id || '',
      section_key: key,
      title: std?.title || key,
      subtitle: std?.subtitle || '',
      enabled: true,
      sort_order: std?.sort_order || 99,
    };
  };

  const updateSection = (key: SectionKey, updates: Partial<SectionSetting>) => {
    const updated = [...sections];
    const idx = updated.findIndex((s) => s.section_key === key);
    if (idx !== -1) {
      updated[idx] = { ...updated[idx], ...updates };
    } else {
      const std = INITIAL_DEMO_DATA.sections.find((s) => s.section_key === key);
      updated.push({
        id: `sec-${key}-${id || 'new'}`,
        invitation_id: id || '',
        section_key: key,
        title: std?.title || key,
        subtitle: std?.subtitle || '',
        enabled: true,
        sort_order: std?.sort_order || 99,
        ...updates,
      });
    }
    setSections(updated);
    markDirty();
  };

  const loadData = async () => {
    if (!id) return;
    setLoading(true);
    weddingService.init();

    const fullData = await weddingService.getInvitationById(id);
    if (fullData) {
      setData(fullData);
      setInvitation(fullData.invitation);
      setBride(fullData.bride);
      setGroom(fullData.groom);
      setEvents(fullData.events);
      setStories(fullData.stories);
      setGallery(fullData.gallery);
      setGifts(fullData.gifts);
      setSections(fullData.sections);
      setWishes(fullData.wishes);

      // Load guests and RSVPs
      const gList = await weddingService.getGuests(id);
      setGuests(gList);
      const rList = await weddingService.getRSVPs(id);
      setRsvps(rList);
    }
    setLoading(false);
    setSaveStatus('saved');
  };

  useEffect(() => {
    loadData();
  }, [id]);

  // Mark unsaved when changes occur
  const markDirty = () => {
    if (saveStatus !== 'unsaved') {
      setSaveStatus('unsaved');
    }
  };

  // Save all changes
  const handleSaveAll = async () => {
    if (!id || !invitation || !bride || !groom) return;
    setIsSaving(true);
    setSaveStatus('saving');

    try {
      await weddingService.updateInvitation(id, invitation);
      await weddingService.updateCouple(id, 'bride', bride);
      await weddingService.updateCouple(id, 'groom', groom);
      await weddingService.updateEvents(id, events);
      await weddingService.updateStories(id, stories);
      await weddingService.updateGallery(id, gallery);
      await weddingService.updateGifts(id, gifts);
      await weddingService.updateSections(id, sections);

      setSaveStatus('saved');
      showToast('Seluruh perubahan berhasil disimpan! ♡', 'success');
    } catch (err: any) {
      console.error('Save error:', err);
      showToast(err.message || 'Gagal menyimpan perubahan', 'error');
      setSaveStatus('unsaved');
    } finally {
      setIsSaving(false);
    }
  };

  // Guest Management Actions
  const handleAddGuest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id || !newGuestName.trim()) return;

    try {
      const added = await weddingService.addGuest(id, {
        name: newGuestName.trim(),
        category: newGuestCategory,
        max_guests: newGuestMax,
      });
      setGuests([added, ...guests]);
      setNewGuestName('');
      showToast(`Tamu "${added.name}" berhasil ditambahkan!`, 'success');
    } catch (err: any) {
      showToast('Gagal menambahkan tamu', 'error');
    }
  };

  const handleDeleteGuest = async (guestId: string) => {
    if (confirm('Hapus tamu ini dari daftar?')) {
      await weddingService.deleteGuest(guestId);
      setGuests(guests.filter((g) => g.id !== guestId));
      showToast('Tamu berhasil dihapus', 'info');
    }
  };

  const copyWhatsAppMessage = (guestItem: Guest) => {
    if (!invitation) return;
    const origin = window.location.origin;
    const personalUrl = `${origin}/${invitation.slug}?to=${guestItem.guest_code}`;

    const text = `Assalamu'alaikum Wr. Wb.

Kepada Yth.
${guestItem.name}

Tanpa mengurangi rasa hormat, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.

Silakan membuka undangan melalui:
${personalUrl}

Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.

Terima kasih.
${invitation.groom_nickname} & ${invitation.bride_nickname}`;

    navigator.clipboard.writeText(text);
    setCopiedLink(guestItem.id);
    showToast('Pesan undangan WhatsApp disalin ke clipboard! ♡', 'success');
    setTimeout(() => setCopiedLink(null), 3000);
  };

  // Add gallery image
  const handleAddGalleryImage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newImageUrl.trim() || !id) return;
    const newItem: GalleryItem = {
      id: 'gal-' + Math.random().toString(36).substring(2, 9),
      invitation_id: id,
      image_url: newImageUrl.trim(),
      caption: newImageCaption.trim() || 'Wedding Photograph',
      sort_order: gallery.length + 1,
      featured: false,
    };
    setGallery([...gallery, newItem]);
    setNewImageUrl('');
    setNewImageCaption('');
    markDirty();
    showToast('Foto ditambahkan ke galeri', 'success');
  };

  // Wishes moderation
  const handleWishStatusChange = async (wishId: string, status: 'approved' | 'hidden') => {
    await weddingService.updateWishStatus(wishId, status);
    setWishes(wishes.map((w) => (w.id === wishId ? { ...w, status } : w)));
    showToast(`Status ucapan diperbarui menjadi ${status}`, 'info');
  };

  const handleDeleteWish = async (wishId: string) => {
    if (confirm('Hapus ucapan ini secara permanen?')) {
      await weddingService.deleteWish(wishId);
      setWishes(wishes.filter((w) => w.id !== wishId));
      showToast('Ucapan telah dihapus', 'info');
    }
  };

  if (loading || !invitation || !bride || !groom) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-[#283D52]">
        <div className="w-10 h-10 rounded-full border-2 border-[#C2A56B] border-t-transparent animate-spin mb-3" />
        <p className="text-xs font-semibold uppercase tracking-wider">Memuat Editor Undangan...</p>
      </div>
    );
  }

  const coupleDisplayName = `${groom?.nickname || invitation?.groom_nickname || ''} & ${bride?.nickname || invitation?.bride_nickname || ''}`.trim() || invitation?.couple_name || invitation?.title || 'Umum';

  const tabs: { id: EditorTab; label: string; icon: any }[] = [
    { id: 'general', label: 'Informasi Umum', icon: Info },
    { id: 'theme', label: 'Tampilan & Tema', icon: Palette },
    { id: 'couple', label: 'Profil Mempelai', icon: Users },
    { id: 'events', label: 'Rangkaian Acara', icon: Calendar },
    { id: 'story', label: 'Kisah Cinta', icon: Sparkles },
    { id: 'gallery', label: 'Galeri Foto', icon: Image },
    { id: 'gifts', label: 'Tanda Kasih (Gifts)', icon: Gift },
    { id: 'music', label: 'Musik Latar', icon: Music },
    { id: 'sections', label: 'Manajer Bagian', icon: Layers },
    { id: 'guests', label: 'Daftar Tamu & Link', icon: Users },
    { id: 'rsvps', label: 'Konfirmasi RSVP', icon: UserCheck },
    { id: 'wishes', label: 'Buku Doa Tamu', icon: MessageSquareHeart },
  ];

  return (
    <div className="space-y-6 pb-20">
      {/* Top Sticky Header */}
      <div className="bg-[#FFFCF7] p-4 sm:p-5 rounded-3xl border border-[#283D52]/10 shadow-xs flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-4 z-20">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/invitations"
            className="p-2 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] transition-colors"
            title="Kembali ke daftar undangan"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-heading text-xl sm:text-2xl font-bold text-[#283D52]">
                {invitation.title}
              </h1>
              <span
                className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${
                  invitation.status === 'published'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}
              >
                {invitation.status}
              </span>
            </div>
            <p className="text-[11px] text-[#768692]">
              Slug publik: <code className="text-[#283D52] font-mono">/{invitation.slug}</code>
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          {/* Save status badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-[#768692] pr-2">
            {saveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tersimpan</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <div className="w-3 h-3 rounded-full border border-neutral-400 border-t-transparent animate-spin" />
                <span>Menyimpan...</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-amber-700">Perubahan belum disimpan</span>
              </>
            )}
          </div>

          <Link
            to={`/preview/${invitation.id}?template=${invitation.template_id || 'royal-arch'}`}
            target="_blank"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Preview</span>
          </Link>

          <a
            href={`/${invitation.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Publik</span>
          </a>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={isSaving}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] disabled:opacity-60 text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider shadow-sm transition-colors cursor-pointer"
          >
            <Save className="w-4 h-4 text-[#DFBFC1]" />
            <span>{isSaving ? 'Menyimpan...' : 'SIMPAN'}</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-[#283D52]/10 scrollbar-none">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                  : 'bg-[#FFFCF7] text-[#24313A] hover:bg-[#EFE8DE] border border-[#283D52]/10'
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#DFBFC1]' : 'text-[#768692]'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT PANELS */}
      <div className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#283D52]/10 shadow-xs">
        {/* TAB 1: INFORMASI UMUM */}
        {activeTab === 'general' && (
          <div className="space-y-6 max-w-2xl">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Informasi Umum & Konten Sampul</h2>
              <p className="text-xs text-[#768692]">
                Atur judul undangan, alamat URL unik, tanggal acara, serta teks pembuka dan penutup.
              </p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Status Publikasi
                  </label>
                  <select
                    value={invitation.status}
                    onChange={(e) => {
                      setInvitation({ ...invitation, status: e.target.value as any });
                      markDirty();
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                  >
                    <option value="draft">Draft (Hanya dapat dilihat admin)</option>
                    <option value="published">Published (Dapat diakses publik)</option>
                    <option value="archived">Archived (Diarsipkan)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Pilihan Tema Undangan Ini
                  </label>
                  <select
                    value={invitation.template_id || 'royal-arch'}
                    onChange={(e) => {
                      setInvitation({ ...invitation, template_id: e.target.value as any });
                      markDirty();
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] font-medium"
                  >
                    <option value="royal-arch">The Royal Navy & Gold Arch (Klasik Ningrat)</option>
                    <option value="persona-5">Phantom Crimson & Black (Persona 5 Theme)</option>
                    <option value="javanese-royal">Adat Jawa Keraton & Gamelan Sakral</option>
                    <option value="cute-pink-floral">Pastel Bloom & Bunga Lucu (Pink & Floral Style)</option>
                    <option value="super-mario">8-Bit Retro Platformer (Super Wedding Bros - Game Mario)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Judul Undangan
                </label>
                <input
                  type="text"
                  value={invitation.title}
                  onChange={(e) => {
                    setInvitation({ ...invitation, title: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Slug URL
                  </label>
                  <input
                    type="text"
                    value={invitation.slug}
                    onChange={(e) => {
                      setInvitation({
                        ...invitation,
                        slug: (e.target.value || '').toLowerCase().replace(/[^a-z0-9-]/g, ''),
                      });
                      markDirty();
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Tanggal Pernikahan
                  </label>
                  <input
                    type="date"
                    value={invitation.wedding_date}
                    onChange={(e) => {
                      setInvitation({ ...invitation, wedding_date: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Teks Header Opening
                </label>
                <input
                  type="text"
                  value={invitation.opening_title}
                  onChange={(e) => {
                    setInvitation({ ...invitation, opening_title: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Kutipan Hero (Hero Quote)
                </label>
                <textarea
                  rows={2}
                  value={invitation.hero_quote}
                  onChange={(e) => {
                    setInvitation({ ...invitation, hero_quote: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Pesan Penutup (Closing Message)
                </label>
                <textarea
                  rows={2}
                  value={invitation.closing_message}
                  onChange={(e) => {
                    setInvitation({ ...invitation, closing_message: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Sub-teks Penutup Playful
                </label>
                <input
                  type="text"
                  value={invitation.closing_subtext}
                  onChange={(e) => {
                    setInvitation({ ...invitation, closing_subtext: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
              </div>

              {/* Photo URLs with Google Drive Uploader */}
              <div className="pt-3 border-t border-[#EFE8DE] space-y-4">
                <div>
                  <p className="text-xs font-bold text-[#283D52]">Foto Latar Belakang Setiap Sesi</p>
                  <p className="text-[11px] text-[#768692]">
                    Unggah langsung dari HP/Laptop ke Google Drive (folder KUUNDANG) atau masukkan URL foto.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <DriveUploader
                    label="Foto Sampul Cover Opening"
                    value={invitation.cover_image}
                    onChange={(url) => {
                      setInvitation({ ...invitation, cover_image: url });
                      markDirty();
                    }}
                    placeholder="Pilih foto sampul cover..."
                    coupleName={coupleDisplayName}
                  />
                  <DriveUploader
                    label="Foto Home / Hero Section"
                    value={invitation.hero_image}
                    onChange={(url) => {
                      setInvitation({ ...invitation, hero_image: url });
                      markDirty();
                    }}
                    placeholder="Pilih foto home / hero..."
                    coupleName={coupleDisplayName}
                  />
                  <DriveUploader
                    label="Foto Latar Rangkaian Acara (Events)"
                    value={invitation.events_image || ''}
                    onChange={(url) => {
                      setInvitation({ ...invitation, events_image: url });
                      markDirty();
                    }}
                    placeholder="Pilih foto latar acara..."
                    coupleName={coupleDisplayName}
                  />
                  <DriveUploader
                    label="Foto Latar Penutup / Footer (Closing)"
                    value={invitation.closing_image || ''}
                    onChange={(url) => {
                      setInvitation({ ...invitation, closing_image: url });
                      markDirty();
                    }}
                    placeholder="Pilih foto penutup..."
                    coupleName={coupleDisplayName}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: TAMPILAN & TEMA (APPEARANCE) */}
        {activeTab === 'theme' && (
          <div className="space-y-8 max-w-3xl">
            {/* 1. PILIHAN TEMPLATE UTAMA */}
            <div className="p-5 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/15">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-base font-bold text-[#283D52] flex items-center gap-2">
                    <Palette className="w-4 h-4 text-[#C2A56B]" />
                    <span>Pilihan Template Desain Undangan</span>
                  </h2>
                  <p className="text-xs text-[#768692] mt-0.5">
                    Pilih template desain yang digunakan khusus untuk undangan ini. Masing-masing undangan dapat memilih template yang berbeda.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Template 1: Royal Arch */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('royal-arch');
                    setInvitation({
                      ...invitation,
                      template_id: 'royal-arch',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    (invitation.template_id || 'royal-arch') === 'royal-arch'
                      ? 'bg-[#FFFCF7] border-[#283D52] shadow-md ring-2 ring-[#C2A56B]/40'
                      : 'bg-[#FFFCF7]/70 border-[#283D52]/15 hover:border-[#283D52]/40'
                  }`}
                >
                  <div className="w-full h-24 rounded-xl bg-[#182736] p-3 text-[#FFFCF7] flex flex-col justify-between mb-3 border border-[#C2A56B]/30 relative overflow-hidden">
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-white/10 w-fit text-[#C2A56B] border border-[#C2A56B]/40">
                      Classic Royal
                    </span>
                    <div className="text-center">
                      <p className="font-heading text-sm font-bold text-[#FFFCF7] truncate">
                        {invitation.groom_nickname || 'Mempelai Pria'} <span className="text-[#C2A56B]">&</span> {invitation.bride_nickname || 'Mempelai Wanita'}
                      </p>
                      <p className="text-[9px] text-[#FFFCF7]/70 font-mono">{invitation.wedding_date || '2026-10-10'}</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-[#C2A56B] uppercase font-mono">
                        Frame Arch Klasik
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-sm text-[#283D52]">The Royal Navy & Gold Arch</h3>
                      <p className="text-[11px] text-[#768692] mt-0.5">
                        Elegan, agung, bernuansa deep navy dengan ornamen arch keemasan.
                      </p>
                    </div>
                    {(invitation.template_id || 'royal-arch') === 'royal-arch' && (
                      <CheckCircle2 className="w-5 h-5 text-[#283D52] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 2: Persona 5 */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('persona-5');
                    setInvitation({
                      ...invitation,
                      template_id: 'persona-5',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'persona-5'
                      ? 'bg-[#141418] text-white border-[#E60012] shadow-md ring-2 ring-[#E60012]/40'
                      : 'bg-[#FFFCF7]/70 border-[#283D52]/15 hover:border-[#283D52]/40'
                  }`}
                >
                  <div className="w-full h-24 rounded-xl bg-[#0D0D0D] p-3 text-white flex flex-col justify-between mb-3 border-2 border-[#E60012] relative overflow-hidden -skew-x-2">
                    <span className="text-[9px] uppercase font-black tracking-widest px-2 py-0.5 bg-[#E60012] text-white w-fit -skew-x-6 border border-white">
                      PERSONA 5 THEME
                    </span>
                    <div className="text-center">
                      <p className="text-sm font-black italic uppercase text-white tracking-tight truncate">
                        {(invitation.groom_nickname || 'GROOM').toUpperCase()} <span className="text-[#E60012]">&</span> {(invitation.bride_nickname || 'BRIDE').toUpperCase()}
                      </p>
                      <p className="text-[9px] text-[#FFF000] font-mono font-bold">★ TAKE YOUR HEART ★</p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-white/70 uppercase font-mono">
                        Calling Card & Combat
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold text-sm ${invitation.template_id === 'persona-5' ? 'text-white' : 'text-[#283D52]'}`}>
                        Phantom Crimson & Black (Persona 5)
                      </h3>
                      <p className={`text-[11px] mt-0.5 ${invitation.template_id === 'persona-5' ? 'text-white/70' : 'text-[#768692]'}`}>
                        Visual ala Persona 5: Calling Card, Confidant story, dan All-Out Attack.
                      </p>
                    </div>
                    {invitation.template_id === 'persona-5' && (
                      <CheckCircle2 className="w-5 h-5 text-[#E60012] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 3: Adat Jawa Kasultanan */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('javanese-royal');
                    setInvitation({
                      ...invitation,
                      template_id: 'javanese-royal',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'javanese-royal'
                      ? 'bg-[#24160E] text-[#FAF6EE] border-[#D4AF37] shadow-md ring-2 ring-[#D4AF37]/40'
                      : 'bg-[#FFFCF7]/70 border-[#283D52]/15 hover:border-[#283D52]/40'
                  }`}
                >
                  <div className="w-full h-24 rounded-xl bg-[#1A1009] p-3 text-[#FAF6EE] flex flex-col justify-between mb-3 border-2 border-[#D4AF37] relative overflow-hidden font-serif">
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#D4AF37] text-[#1A1009] rounded-md w-fit font-sans">
                      ADAT JAWA SAKRAL
                    </span>
                    <div className="text-center">
                      <p className="text-xs text-[#E5C158] tracking-wider">ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀</p>
                      <p className="text-sm font-bold text-[#FAF6EE] truncate">
                        {invitation.groom_nickname || 'Mempelai Pria'} <span className="text-[#D4AF37]">&</span> {invitation.bride_nickname || 'Mempelai Wanita'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-[#D4AF37] uppercase font-sans">
                        Gamelan & Gunungan
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold text-sm ${invitation.template_id === 'javanese-royal' ? 'text-[#E5C158]' : 'text-[#283D52]'}`}>
                        Adat Jawa Keraton & Gamelan
                      </h3>
                      <p className={`text-[11px] mt-0.5 ${invitation.template_id === 'javanese-royal' ? 'text-[#FAF6EE]/80' : 'text-[#768692]'}`}>
                        Sakral & elegan: Gunungan Wayang emas, batik kawung, & backsound gamelan.
                      </p>
                    </div>
                    {invitation.template_id === 'javanese-royal' && (
                      <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 4: Pastel Bloom & Bunga Lucu (Pink) */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('cute-pink-floral');
                    setInvitation({
                      ...invitation,
                      template_id: 'cute-pink-floral',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'cute-pink-floral'
                      ? 'bg-[#FFF0F5] text-[#4A2E35] border-[#FF5C8D] shadow-md ring-2 ring-[#FF85A2]/40'
                      : 'bg-[#FFFCF7]/70 border-[#283D52]/15 hover:border-[#283D52]/40'
                  }`}
                >
                  <div className="w-full h-24 rounded-xl bg-[#FFE4EC] p-3 text-[#4A2E35] flex flex-col justify-between mb-3 border-2 border-[#FFA3B8] relative overflow-hidden font-sans">
                    <span className="text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 bg-[#FF5C8D] text-white rounded-full w-fit">
                      🌸 LUCU &amp; MANIS
                    </span>
                    <div className="text-center">
                      <p className="text-[9px] text-[#FF5C8D] font-bold">🌸 UNDANGAN MANIS 🌸</p>
                      <p className="text-sm font-bold text-[#E03164] truncate">
                        {invitation.groom_nickname || 'Mempelai Pria'} <span className="text-[#FF5C8D]">&amp;</span> {invitation.bride_nickname || 'Mempelai Wanita'}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-[8px] text-[#8A505F] uppercase font-sans font-semibold">
                        Bunga &amp; Pita Pink
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-bold text-sm ${invitation.template_id === 'cute-pink-floral' ? 'text-[#E03164]' : 'text-[#283D52]'}`}>
                        Pastel Bloom &amp; Bunga Lucu
                      </h3>
                      <p className={`text-[11px] mt-0.5 ${invitation.template_id === 'cute-pink-floral' ? 'text-[#4A2E35]' : 'text-[#768692]'}`}>
                        Ceria &amp; menggemaskan: warna merah muda, kelopak bunga, stiker lucu &amp; memo.
                      </p>
                    </div>
                    {invitation.template_id === 'cute-pink-floral' && (
                      <CheckCircle2 className="w-5 h-5 text-[#FF5C8D] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 5: 8-Bit Super Mario Platformer */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('super-mario');
                    setInvitation({
                      ...invitation,
                      template_id: 'super-mario',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'super-mario'
                      ? 'bg-[#5C94FC]/15 border-[#5C94FC] shadow-md ring-2 ring-[#5C94FC]/40'
                      : 'bg-white border-[#283D52]/15 hover:border-[#5C94FC]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono font-bold bg-[#E60012] text-white border border-white">
                      8-BIT RETRO GAME
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#FFD166] border border-[#283D52] flex items-center justify-center text-xs">
                      🎮
                    </div>
                  </div>

                  {/* Mockup Preview Box */}
                  <div className="w-full h-24 rounded-xl bg-gradient-to-b from-[#5C94FC] via-[#5C94FC] to-[#00A800] border-2 border-[#283D52] p-2 flex flex-col justify-between mb-3 relative overflow-hidden">
                    <div className="flex items-center justify-between font-mono text-[9px] text-white font-bold drop-shadow-xs">
                      <span>WORLD 1-1</span>
                      <span>❤ x03</span>
                    </div>
                    <div className="flex items-end justify-between px-1">
                      <div className="text-base">🤵</div>
                      <div className="w-4 h-4 bg-[#FFD166] border border-[#283D52] flex items-center justify-center text-[9px] font-mono font-bold">
                        ?
                      </div>
                      <div className="text-base">👰</div>
                    </div>
                    <div className="h-2 bg-[#B84418] -mx-2 -mb-2 border-t border-[#005800]" />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-mono font-bold text-sm ${
                          invitation.template_id === 'super-mario' ? 'text-[#1D4ED8]' : 'text-[#283D52]'
                        }`}
                      >
                        Super Mario 8-Bit
                      </h3>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          invitation.template_id === 'super-mario' ? 'text-stone-800' : 'text-[#768692]'
                        }`}
                      >
                        Game 2D platformer: petualangan mempelai, koin, balok [?] &amp; istana cinta.
                      </p>
                    </div>
                    {invitation.template_id === 'super-mario' && (
                      <CheckCircle2 className="w-5 h-5 text-[#5C94FC] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 6: Fleur Botanica & Conservatory Glasshouse */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('fleur-botanica');
                    setInvitation({
                      ...invitation,
                      template_id: 'fleur-botanica',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'fleur-botanica'
                      ? 'bg-[#1E2A20]/10 border-[#BDA06C] shadow-md ring-2 ring-[#BDA06C]/40'
                      : 'bg-white border-[#283D52]/15 hover:border-[#BDA06C]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-serif font-bold bg-[#BDA06C] text-[#1E2A20] border border-[#E0D0B5]">
                      BOTANICAL CONSERVATORY
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#EAE5D9] border border-[#BDA06C] flex items-center justify-center text-xs">
                      🌿
                    </div>
                  </div>

                  {/* Mockup Preview Box */}
                  <div className="w-full h-24 rounded-xl bg-[#1E2A20] border-2 border-[#BDA06C]/60 p-2 flex flex-col justify-between mb-3 relative overflow-hidden">
                    <div className="flex items-center justify-between font-serif text-[9px] text-[#BDA06C] tracking-wider">
                      <span>THE BOTANICAL</span>
                      <span>17.09.2021</span>
                    </div>
                    <div className="text-center my-auto">
                      <p className="text-[8px] uppercase tracking-widest text-[#BDA06C]/70">The Wedding Of</p>
                      <p className="font-serif font-bold text-xs text-[#FAF8F5]">April &amp; Siti</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#BDA06C] text-[#1E2A20] text-[8px] font-bold font-serif shadow-xs">
                        💌 Segel Lilin Interaktif
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-serif font-bold text-sm ${
                          invitation.template_id === 'fleur-botanica' ? 'text-[#BDA06C]' : 'text-[#283D52]'
                        }`}
                      >
                        Fleur Botanica
                      </h3>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          invitation.template_id === 'fleur-botanica' ? 'text-stone-800' : 'text-[#768692]'
                        }`}
                      >
                        Botanical conservatory: amplop vintage lipat, segel lilin wax seal &amp; eucalyptus.
                      </p>
                    </div>
                    {invitation.template_id === 'fleur-botanica' && (
                      <CheckCircle2 className="w-5 h-5 text-[#BDA06C] shrink-0" />
                    )}
                  </div>
                </div>

                {/* Template 7: Laman Seri Melayu (Interactive 2D Wedding Garden Quest) */}
                <div
                  onClick={() => {
                    const preset = getTemplatePreset('seri-malaysia');
                    setInvitation({
                      ...invitation,
                      template_id: 'seri-malaysia',
                      theme_config: {
                        ...preset.theme_config,
                        ...invitation.theme_config,
                        primary_color: preset.theme_config.primary_color,
                        secondary_color: preset.theme_config.secondary_color,
                        accent_color: preset.theme_config.accent_color,
                        background_color: preset.theme_config.background_color,
                        font_heading: preset.theme_config.font_heading,
                        font_body: preset.theme_config.font_body,
                      },
                    });
                    markDirty();
                  }}
                  className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    invitation.template_id === 'seri-malaysia'
                      ? 'bg-[#4C030A]/10 border-[#D7BB83] shadow-md ring-2 ring-[#D7BB83]/40'
                      : 'bg-white border-[#283D52]/15 hover:border-[#D7BB83]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-serif font-bold bg-[#D7BB83] text-[#4C030A] border border-[#FFF9F4]">
                      2D GARDEN QUEST
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#FFFCF3] border border-[#D7BB83] flex items-center justify-center text-xs">
                      👑
                    </div>
                  </div>

                  {/* Mockup Preview Box */}
                  <div className="w-full h-24 rounded-xl bg-[#4C030A] border-2 border-[#D7BB83]/60 p-2 flex flex-col justify-between mb-3 relative overflow-hidden">
                    <div className="flex items-center justify-between font-serif text-[9px] text-[#D7BB83] tracking-wider">
                      <span>LAMAN SERI</span>
                      <span>17.09.2021</span>
                    </div>
                    <div className="text-center my-auto">
                      <p className="text-[8px] uppercase tracking-widest text-[#D7BB83]/80">Walimatul 'Ursy</p>
                      <p className="font-serif font-bold text-xs text-[#FFFCF3]">April &amp; Siti</p>
                    </div>
                    <div className="flex items-center justify-center">
                      <span className="px-2 py-0.5 rounded-full bg-[#D7BB83] text-[#4C030A] text-[8px] font-bold font-serif shadow-xs">
                        🏰 Eksplorasi 2D RPG
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-serif font-bold text-sm ${
                          invitation.template_id === 'seri-malaysia' ? 'text-[#8A1B26]' : 'text-[#283D52]'
                        }`}
                      >
                        Laman Seri Melayu
                      </h3>
                      <p
                        className={`text-[11px] mt-0.5 ${
                          invitation.template_id === 'seri-malaysia' ? 'text-stone-800' : 'text-[#768692]'
                        }`}
                      >
                        Petualangan 2D RPG: pilih karakter tamu, jelajahi taman pelaminan &amp; stan interaktif.
                      </p>
                    </div>
                    {invitation.template_id === 'seri-malaysia' && (
                      <CheckCircle2 className="w-5 h-5 text-[#8A1B26] shrink-0" />
                    )}
                  </div>
                </div>
              </div>

              {/* Quick Preview Button */}
              <div className="mt-4 pt-3 border-t border-[#283D52]/10 flex items-center justify-between text-xs">
                <span className="text-[#768692]">
                  Template aktif saat ini:{' '}
                  <strong className="text-[#283D52]">
                    {invitation.template_id === 'persona-5'
                      ? 'Phantom Crimson & Black (Persona 5)'
                      : invitation.template_id === 'javanese-royal'
                      ? 'Adat Jawa Keraton & Gamelan Sakral'
                      : invitation.template_id === 'cute-pink-floral'
                      ? 'Pastel Bloom & Bunga Lucu (Pink)'
                      : invitation.template_id === 'super-mario'
                      ? '8-Bit Retro Platformer (Super Mario Bros)'
                      : invitation.template_id === 'fleur-botanica'
                      ? 'Fleur Botanica & Conservatory Glasshouse'
                      : invitation.template_id === 'seri-malaysia'
                      ? 'Laman Seri Melayu (Interactive Wedding Garden Quest)'
                      : 'The Royal Navy & Gold Arch'}
                  </strong>
                </span>
                <Link
                  to={`/preview/${invitation.id}?template=${invitation.template_id || 'royal-arch'}`}
                  target="_blank"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-white font-semibold text-xs transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-[#DFBFC1]" />
                  <span>Pratinjau Template Terpilih</span>
                </Link>
              </div>
            </div>

            <div>
              <h2 className="text-base font-bold text-[#283D52]">Tampilan, Warna & Tipografi</h2>
              <p className="text-xs text-[#768692]">
                Sesuaikan palet warna, tipografi, dan gaya visual tanpa menyentuh kode HTML/CSS.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-[#768692] mb-1.5">
                  Warna Primer
                </label>
                <div className="flex items-center gap-2 p-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl">
                  <input
                    type="color"
                    value={invitation.theme_config.primary_color}
                    onChange={(e) => {
                      setInvitation({
                        ...invitation,
                        theme_config: { ...invitation.theme_config, primary_color: e.target.value },
                      });
                      markDirty();
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  />
                  <span className="text-xs font-mono font-semibold">
                    {invitation.theme_config.primary_color}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#768692] mb-1.5">
                  Aksen Emas
                </label>
                <div className="flex items-center gap-2 p-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl">
                  <input
                    type="color"
                    value={invitation.theme_config.gold_color}
                    onChange={(e) => {
                      setInvitation({
                        ...invitation,
                        theme_config: { ...invitation.theme_config, gold_color: e.target.value },
                      });
                      markDirty();
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  />
                  <span className="text-xs font-mono font-semibold">
                    {invitation.theme_config.gold_color}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#768692] mb-1.5">
                  Latar Belakang
                </label>
                <div className="flex items-center gap-2 p-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl">
                  <input
                    type="color"
                    value={invitation.theme_config.background_color}
                    onChange={(e) => {
                      setInvitation({
                        ...invitation,
                        theme_config: { ...invitation.theme_config, background_color: e.target.value },
                      });
                      markDirty();
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  />
                  <span className="text-xs font-mono font-semibold">
                    {invitation.theme_config.background_color}
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-[#768692] mb-1.5">
                  Aksen Blush
                </label>
                <div className="flex items-center gap-2 p-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl">
                  <input
                    type="color"
                    value={invitation.theme_config.blush_color}
                    onChange={(e) => {
                      setInvitation({
                        ...invitation,
                        theme_config: { ...invitation.theme_config, blush_color: e.target.value },
                      });
                      markDirty();
                    }}
                    className="w-8 h-8 rounded-lg cursor-pointer border-0"
                  />
                  <span className="text-xs font-mono font-semibold">
                    {invitation.theme_config.blush_color}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[#EFE8DE]">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Font Heading & Mempelai
                </label>
                <select
                  value={invitation.theme_config.font_heading}
                  onChange={(e) => {
                    setInvitation({
                      ...invitation,
                      theme_config: { ...invitation.theme_config, font_heading: e.target.value },
                    });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                >
                  <option value="Cormorant Garamond">Cormorant Garamond (Editorial Luxury)</option>
                  <option value="Playfair Display">Playfair Display (Classic Elegant)</option>
                  <option value="Cinzel">Cinzel (Royal Roman)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Font Body & Konten
                </label>
                <select
                  value={invitation.theme_config.font_body}
                  onChange={(e) => {
                    setInvitation({
                      ...invitation,
                      theme_config: { ...invitation.theme_config, font_body: e.target.value },
                    });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                >
                  <option value="Manrope">Manrope (Clean Modern Sans)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                  <option value="Inter">Inter</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PROFIL MEMPELAI */}
        {activeTab === 'couple' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Profil Mempelai (Bride & Groom)</h2>
              <p className="text-xs text-[#768692]">
                Informasi detail kedua mempelai, nama orang tua, dan tautan sosial media.
              </p>
            </div>

            {/* Couple Section Configuration Card */}
            {(() => {
              const coupleSec = getSection('couple');
              return (
                <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${coupleSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">Tampilkan Sesi Profil Mempelai di Undangan</p>
                        <p className="text-[11px] text-[#768692]">
                          {coupleSec.enabled ? 'Sesi saat ini AKTIF di seluruh template' : 'Sesi saat ini DISEMBUNYIKAN dari undangan publik'}
                        </p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={coupleSec.enabled}
                        onChange={(e) => updateSection('couple', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-10 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">Judul Sesi Mempelai</label>
                      <input
                        type="text"
                        value={coupleSec.title || ''}
                        placeholder="Kedua Mempelai"
                        onChange={(e) => updateSection('couple', { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">Subjudul Sesi Mempelai</label>
                      <input
                        type="text"
                        value={coupleSec.subtitle || ''}
                        placeholder="Mempelai Pria & Mempelai Wanita Beserta Keluarga Besar"
                        onChange={(e) => updateSection('couple', { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mempelai Wanita */}
              <div className="p-6 rounded-3xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-4">
                <h3 className="font-heading text-xl font-bold text-[#283D52] flex items-center gap-2">
                  <span>Mempelai Wanita</span>
                  <span className="text-xs font-sans font-medium text-[#C2A56B]">(Bride)</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={bride.nickname}
                    onChange={(e) => {
                      setBride({ ...bride, nickname: e.target.value });
                      setInvitation({ ...invitation, bride_nickname: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    value={bride.full_name}
                    onChange={(e) => {
                      setBride({ ...bride, full_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    value={bride.father_name}
                    onChange={(e) => {
                      setBride({ ...bride, father_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    value={bride.mother_name}
                    onChange={(e) => {
                      setBride({ ...bride, mother_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Urutan Anak (Contoh: Putri Pertama)
                  </label>
                  <input
                    type="text"
                    value={bride.child_order}
                    onChange={(e) => {
                      setBride({ ...bride, child_order: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Username Instagram
                  </label>
                  <input
                    type="text"
                    value={bride.instagram || ''}
                    onChange={(e) => {
                      setBride({ ...bride, instagram: e.target.value });
                      markDirty();
                    }}
                    placeholder="allyamalida"
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Alamat Mempelai Wanita
                  </label>
                  <input
                    type="text"
                    value={bride.address || ''}
                    onChange={(e) => {
                      setBride({ ...bride, address: e.target.value, description: e.target.value });
                      markDirty();
                    }}
                    placeholder="Contoh: Desa Balonggarut, Krembung, Sidoarjo"
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <DriveUploader
                  label="Foto Portrait Mempelai Wanita"
                  value={bride.photo_url}
                  onChange={(url) => {
                    setBride({ ...bride, photo_url: url });
                    markDirty();
                  }}
                  placeholder="Pilih foto mempelai wanita..."
                  helperText="Format: Foto rasio portrait (3:4 atau 1:1)"
                  coupleName={coupleDisplayName}
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Deskripsi Singkat / Bio
                  </label>
                  <textarea
                    rows={2}
                    value={bride.description || ''}
                    onChange={(e) => {
                      setBride({ ...bride, description: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs resize-none"
                  />
                </div>
              </div>

              {/* Mempelai Pria */}
              <div className="p-6 rounded-3xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-4">
                <h3 className="font-heading text-xl font-bold text-[#283D52] flex items-center gap-2">
                  <span>Mempelai Pria</span>
                  <span className="text-xs font-sans font-medium text-[#C2A56B]">(Groom)</span>
                </h3>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Panggilan
                  </label>
                  <input
                    type="text"
                    value={groom.nickname}
                    onChange={(e) => {
                      setGroom({ ...groom, nickname: e.target.value });
                      setInvitation({ ...invitation, groom_nickname: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Lengkap & Gelar
                  </label>
                  <input
                    type="text"
                    value={groom.full_name}
                    onChange={(e) => {
                      setGroom({ ...groom, full_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Ayah
                  </label>
                  <input
                    type="text"
                    value={groom.father_name}
                    onChange={(e) => {
                      setGroom({ ...groom, father_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Nama Ibu
                  </label>
                  <input
                    type="text"
                    value={groom.mother_name}
                    onChange={(e) => {
                      setGroom({ ...groom, mother_name: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Urutan Anak (Contoh: Putra Kedua)
                  </label>
                  <input
                    type="text"
                    value={groom.child_order}
                    onChange={(e) => {
                      setGroom({ ...groom, child_order: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Username Instagram
                  </label>
                  <input
                    type="text"
                    value={groom.instagram || ''}
                    onChange={(e) => {
                      setGroom({ ...groom, instagram: e.target.value });
                      markDirty();
                    }}
                    placeholder="shofwan.ahmad"
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Alamat Mempelai Pria
                  </label>
                  <input
                    type="text"
                    value={groom.address || ''}
                    onChange={(e) => {
                      setGroom({ ...groom, address: e.target.value, description: e.target.value });
                      markDirty();
                    }}
                    placeholder="Contoh: Jl. Jombang, Kandangan, Kediri, Jawa Timur"
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                  />
                </div>

                <DriveUploader
                  label="Foto Portrait Mempelai Pria"
                  value={groom.photo_url}
                  onChange={(url) => {
                    setGroom({ ...groom, photo_url: url });
                    markDirty();
                  }}
                  placeholder="Pilih foto mempelai pria..."
                  helperText="Format: Foto rasio portrait (3:4 atau 1:1)"
                  coupleName={coupleDisplayName}
                />

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                    Deskripsi Singkat / Bio
                  </label>
                  <textarea
                    rows={2}
                    value={groom.description || ''}
                    onChange={(e) => {
                      setGroom({ ...groom, description: e.target.value });
                      markDirty();
                    }}
                    className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: RANGKAIAN ACARA (EVENTS) */}
        {activeTab === 'events' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Rangkaian Acara Pernikahan & Lokasi</h2>
              <p className="text-xs text-[#768692]">
                Kelola acara (Akad Nikah, Resepsi, dll). Mendukung multi-acara dengan lokasi Google Maps dan kalender.
              </p>
            </div>

            {/* Events Section Configuration Card */}
            {(() => {
              const eventsSec = getSection('events');
              const locSec = getSection('location');

              return (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Card Jadwal Acara */}
                  <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#283D52]/10">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${eventsSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                          <Calendar className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#283D52]">Sesi Rangkaian Acara</p>
                          <p className="text-[10px] text-[#768692]">{eventsSec.enabled ? 'Sesi AKTIF' : 'DISEMBUNYIKAN'}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={eventsSec.enabled}
                          onChange={(e) => updateSection('events', { enabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#283D52]"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#768692] mb-1">Judul Sesi Acara</label>
                      <input
                        type="text"
                        value={eventsSec.title || ''}
                        placeholder="Rangkaian Jadwal Acara"
                        onChange={(e) => updateSection('events', { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#768692] mb-1">Subjudul Sesi Acara</label>
                      <input
                        type="text"
                        value={eventsSec.subtitle || ''}
                        placeholder="Akad Nikah, Resepsi, & Tasyakuran"
                        onChange={(e) => updateSection('events', { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  {/* Card Denah & Lokasi Peta */}
                  <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-[#283D52]/10">
                      <div className="flex items-center gap-2.5">
                        <div className={`p-2 rounded-xl ${locSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#283D52]">Sesi Denah & Lokasi (Maps)</p>
                          <p className="text-[10px] text-[#768692]">{locSec.enabled ? 'Sesi AKTIF' : 'DISEMBUNYIKAN'}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={locSec.enabled}
                          onChange={(e) => updateSection('location', { enabled: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#283D52]"></div>
                      </label>
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#768692] mb-1">Judul Sesi Lokasi</label>
                      <input
                        type="text"
                        value={locSec.title || ''}
                        placeholder="Denah & Petunjuk Lokasi"
                        onChange={(e) => updateSection('location', { title: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-semibold text-[#768692] mb-1">Subjudul Sesi Lokasi</label>
                      <input
                        type="text"
                        value={locSec.subtitle || ''}
                        placeholder="Navigasi Peta Digital Menuju Tempat Acara"
                        onChange={(e) => updateSection('location', { subtitle: e.target.value })}
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between pt-2">
              <h3 className="text-sm font-bold text-[#283D52]">Daftar Mata Acara</h3>
              <button
                type="button"
                onClick={() => {
                  const newEv: WeddingEvent = {
                    id: 'event-' + Math.random().toString(36).substring(2, 9),
                    invitation_id: id!,
                    title: 'Acara Baru',
                    event_type: 'reception',
                    date: invitation.wedding_date,
                    start_time: '10.00 WIB',
                    end_time: 'Selesai',
                    venue: 'Nama Tempat Acara',
                    address: 'Alamat lengkap lokasi',
                    maps_url: 'https://maps.google.com',
                    sort_order: events.length + 1,
                  };
                  setEvents([...events, newEv]);
                  markDirty();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#283D52] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Acara</span>
              </button>
            </div>

            {/* Background Photo for Events Section */}
            <div className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Foto Latar Belakang Sesi Rangkaian Acara
                </label>
                <input
                  type="text"
                  placeholder="https://images.unsplash.com/..."
                  value={invitation.events_image || ''}
                  onChange={(e) => {
                    setInvitation({ ...invitation, events_image: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                />
                <p className="text-[11px] text-[#768692] mt-1">
                  Foto ini akan tampil sebagai latar belakang sinematik sesi Rangkaian Acara.
                </p>
              </div>
              {invitation.events_image && (
                <div className="w-24 h-16 rounded-xl overflow-hidden border border-[#C2A56B]/40 shrink-0 bg-[#283D52]">
                  <img
                    src={invitation.events_image}
                    alt="Events Background Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {events.map((ev, index) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#283D52]">
                      Acara #{index + 1}
                    </span>
                    {events.length > 1 && (
                      <button
                        type="button"
                        onClick={() => {
                          setEvents(events.filter((item) => item.id !== ev.id));
                          markDirty();
                        }}
                        className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Hapus</span>
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Judul Acara
                      </label>
                      <input
                        type="text"
                        value={ev.title}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].title = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Tipe Acara
                      </label>
                      <select
                        value={ev.event_type}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].event_type = e.target.value as any;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      >
                        <option value="akad">Akad Nikah</option>
                        <option value="reception">Resepsi</option>
                        <option value="ceremony">Upacara Adat</option>
                        <option value="party">After Party</option>
                        <option value="other">Lainnya</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Tanggal
                      </label>
                      <input
                        type="date"
                        value={ev.date}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].date = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Waktu Mulai (Contoh: 07.00 WIB)
                      </label>
                      <input
                        type="text"
                        value={ev.start_time}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].start_time = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Waktu Selesai (Contoh: 09.00 WIB / Selesai)
                      </label>
                      <input
                        type="text"
                        value={ev.end_time || ''}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].end_time = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Nama Gedung / Tempat
                      </label>
                      <input
                        type="text"
                        value={ev.venue}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].venue = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Tautan Google Maps
                      </label>
                      <input
                        type="text"
                        value={ev.maps_url || ''}
                        onChange={(e) => {
                          const updated = [...events];
                          updated[index].maps_url = e.target.value;
                          setEvents(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea
                      rows={2}
                      value={ev.address}
                      onChange={(e) => {
                        const updated = [...events];
                        updated[index].address = e.target.value;
                        setEvents(updated);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: KISAH CINTA (STORY) */}
        {activeTab === 'story' && (
          <div className="space-y-6">
            {/* Story Section Configuration Card */}
            {(() => {
              const storySec = getSection('story');

              return (
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${storySec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <Heart className="w-4 h-4 fill-current" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">
                          Tampilkan Sesi "Kisah Cinta Kami" (Love Story) di Undangan
                        </p>
                        <p className="text-[11px] text-[#768692]">
                          {storySec.enabled
                            ? 'Sesi saat ini AKTIF dan tertampil di seluruh template undangan publik.'
                            : 'Sesi saat ini DISEMBUNYIKAN dari seluruh template undangan publik.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={storySec.enabled}
                        onChange={(e) => updateSection('story', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>

                  {/* Editable Title & Subtitle for Story Section */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Judul Sesi Kisah Cinta (Muncul di Halaman Undangan)
                      </label>
                      <input
                        type="text"
                        value={storySec.title || ''}
                        placeholder="Kisah Cinta Kami"
                        onChange={(e) => updateSection('story', { title: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Subjudul Sesi Kisah Cinta (Keterangan di Bawah Judul)
                      </label>
                      <input
                        type="text"
                        value={storySec.subtitle || ''}
                        placeholder="Perjalanan cinta penuh makna yang membawa kami menuju ikatan suci pernikahan."
                        onChange={(e) => updateSection('story', { subtitle: e.target.value })}
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#283D52]">Timeline Kisah Cinta (Our Story)</h2>
                <p className="text-xs text-[#768692]">
                  Momen-momen penting perjalanan cinta pasangan.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newSt: StoryItem = {
                    id: 'story-' + Math.random().toString(36).substring(2, 9),
                    invitation_id: id!,
                    title: 'Momen Indah Baru',
                    date: 'Tanggal Momen',
                    description: 'Tuliskan kenangan manis momen ini...',
                    sort_order: stories.length + 1,
                  };
                  setStories([...stories, newSt]);
                  markDirty();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#283D52] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Momen</span>
              </button>
            </div>

            <div className="space-y-4">
              {stories.map((st, index) => (
                <div
                  key={st.id}
                  className="p-5 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#283D52]">Momen #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setStories(stories.filter((item) => item.id !== st.id));
                        markDirty();
                      }}
                      className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Judul Milestone
                      </label>
                      <input
                        type="text"
                        value={st.title}
                        onChange={(e) => {
                          const updated = [...stories];
                          updated[index].title = e.target.value;
                          setStories(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Tanggal (Contoh: 12 Februari 2022)
                      </label>
                      <input
                        type="text"
                        value={st.date}
                        onChange={(e) => {
                          const updated = [...stories];
                          updated[index].date = e.target.value;
                          setStories(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <DriveUploader
                    label="Foto Momen (Google Drive)"
                    value={st.photo_url || ''}
                    onChange={(url) => {
                      const updated = [...stories];
                      updated[index].photo_url = url;
                      setStories(updated);
                      markDirty();
                    }}
                    placeholder="Pilih foto kenangan momen ini..."
                    coupleName={coupleDisplayName}
                  />

                  <div>
                    <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                      Cerita Singkat
                    </label>
                    <textarea
                      rows={2}
                      value={st.description}
                      onChange={(e) => {
                        const updated = [...stories];
                        updated[index].description = e.target.value;
                        setStories(updated);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GALERI FOTO */}
        {activeTab === 'gallery' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Galeri Foto Undangan</h2>
              <p className="text-xs text-[#768692]">
                Koleksi foto pre-wedding dan momen bahagia yang ditampilkan dalam grid editorial.
              </p>
            </div>

            {/* Gallery Section Configuration Card */}
            {(() => {
              const gallerySec = getSection('gallery');
              return (
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${gallerySec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <Image className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">
                          Tampilkan Sesi "Galeri Foto" di Undangan
                        </p>
                        <p className="text-[11px] text-[#768692]">
                          {gallerySec.enabled
                            ? 'Sesi saat ini AKTIF dan tertampil di seluruh template undangan publik.'
                            : 'Sesi saat ini DISEMBUNYIKAN dari seluruh template undangan publik.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={gallerySec.enabled}
                        onChange={(e) => updateSection('gallery', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Judul Sesi Galeri Foto
                      </label>
                      <input
                        type="text"
                        value={gallerySec.title}
                        onChange={(e) => updateSection('gallery', { title: e.target.value })}
                        placeholder="Contoh: Galeri Momen Bahagia"
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Subjudul Sesi Galeri Foto
                      </label>
                      <input
                        type="text"
                        value={gallerySec.subtitle || ''}
                        onChange={(e) => updateSection('gallery', { subtitle: e.target.value })}
                        placeholder="Contoh: Potret kenangan perjalanan kasih kami"
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Add Photo Form with Google Drive Uploader */}
            <div className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-3">
              <p className="text-xs font-bold text-[#283D52]">Tambah Foto ke Galeri</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-start">
                <DriveUploader
                  label="Pilih Foto dari Perangkat"
                  value={newImageUrl}
                  onChange={(url) => setNewImageUrl(url)}
                  placeholder="Pilih foto untuk galeri..."
                  helperText="Tersimpan langsung di Google Drive folder /KUUNDANG/{coupleName}/"
                  coupleName={coupleDisplayName}
                />

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                      Keterangan Foto (Caption)
                    </label>
                    <input
                      type="text"
                      placeholder="Contoh: Senja di Medowo"
                      value={newImageCaption}
                      onChange={(e) => setNewImageCaption(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleAddGalleryImage(e as any)}
                    disabled={!newImageUrl}
                    className="w-full py-2.5 bg-[#283D52] disabled:opacity-50 hover:bg-[#1E2E3E] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    + Masukkan ke Grid Galeri
                  </button>
                </div>
              </div>
            </div>

            {/* Grid of gallery photos */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {gallery.map((item, idx) => (
                <div
                  key={item.id}
                  className="relative group rounded-2xl overflow-hidden border border-[#283D52]/10 bg-[#F7F2EA] shadow-xs"
                >
                  <img
                    src={item.image_url}
                    alt={item.caption || 'Foto'}
                    className="w-full h-36 object-cover"
                  />
                  <div className="p-2.5 text-left">
                    <p className="text-[11px] font-medium text-[#24313A] truncate">
                      {item.caption || 'Tanpa keterangan'}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => {
                          const updated = [...gallery];
                          updated[idx].featured = !updated[idx].featured;
                          setGallery(updated);
                          markDirty();
                        }}
                        className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase cursor-pointer ${
                          item.featured ? 'bg-[#C2A56B] text-white' : 'bg-[#EFE8DE] text-[#768692]'
                        }`}
                      >
                        {item.featured ? 'Featured' : 'Standar'}
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setGallery(gallery.filter((g) => g.id !== item.id));
                          markDirty();
                        }}
                        className="text-rose-600 hover:text-rose-800 p-1 cursor-pointer"
                        title="Hapus foto"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 6: TANDA KASIH (GIFTS) */}
        {activeTab === 'gifts' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#283D52]">Tanda Kasih / Rekening Hadiah</h2>
                <p className="text-xs text-[#768692]">
                  Informasi rekening transfer bank, dompet digital, atau alamat kirim kado fisik.
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  const newGf: GiftAccount = {
                    id: 'gift-' + Math.random().toString(36).substring(2, 9),
                    invitation_id: id!,
                    type: 'bank',
                    provider: 'Bank BCA',
                    account_name: 'Nama Pemilik',
                    account_number: '1234567890',
                    sort_order: gifts.length + 1,
                  };
                  setGifts([...gifts, newGf]);
                  markDirty();
                }}
                className="flex items-center gap-1.5 px-3 py-2 bg-[#283D52] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Rekening</span>
              </button>
            </div>

            {/* Gifts Section Configuration Card */}
            {(() => {
              const giftsSec = getSection('gifts');
              return (
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${giftsSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <Gift className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">
                          Tampilkan Sesi "Tanda Kasih / Hadiah" di Undangan
                        </p>
                        <p className="text-[11px] text-[#768692]">
                          {giftsSec.enabled
                            ? 'Sesi saat ini AKTIF dan tertampil di seluruh template undangan publik.'
                            : 'Sesi saat ini DISEMBUNYIKAN dari seluruh template undangan publik.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={giftsSec.enabled}
                        onChange={(e) => updateSection('gifts', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Judul Sesi Tanda Kasih
                      </label>
                      <input
                        type="text"
                        value={giftsSec.title}
                        onChange={(e) => updateSection('gifts', { title: e.target.value })}
                        placeholder="Contoh: Tanda Kasih"
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Subjudul Sesi Tanda Kasih
                      </label>
                      <input
                        type="text"
                        value={giftsSec.subtitle || ''}
                        onChange={(e) => updateSection('gifts', { subtitle: e.target.value })}
                        placeholder="Contoh: Doa restu Anda adalah karunia terindah bagi kami..."
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-4">
              {gifts.map((gf, index) => (
                <div
                  key={gf.id}
                  className="p-5 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#283D52]">Rekening #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setGifts(gifts.filter((item) => item.id !== gf.id));
                        markDirty();
                      }}
                      className="text-rose-600 hover:text-rose-800 text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Hapus</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        Jenis Hadiah
                      </label>
                      <select
                        value={gf.type}
                        onChange={(e) => {
                          const updated = [...gifts];
                          updated[index].type = e.target.value as any;
                          setGifts(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      >
                        <option value="bank">Transfer Bank</option>
                        <option value="ewallet">E-Wallet (Dana / GoPay / OVO)</option>
                        <option value="address">Alamat Pengiriman Kado Fisik</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        {gf.type === 'address' ? 'Keterangan Kado / Lokasi' : 'Nama Bank / Provider'}
                      </label>
                      <input
                        type="text"
                        value={gf.provider || (gf as any).bank_name || ''}
                        placeholder={gf.type === 'address' ? 'Contoh: Rumah Mempelai / Kantor' : 'Contoh: Bank BCA / Mandiri / GoPay'}
                        onChange={(e) => {
                          const updated = [...gifts];
                          updated[index].provider = e.target.value;
                          updated[index].bank_name = e.target.value;
                          setGifts(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                        {gf.type === 'address' ? 'Nama Penerima Paket' : 'Atas Nama (Pemilik)'}
                      </label>
                      <input
                        type="text"
                        value={gf.account_name || (gf as any).account_holder || ''}
                        placeholder={gf.type === 'address' ? 'Nama Penerima' : 'Nama Pemilik Rekening'}
                        onChange={(e) => {
                          const updated = [...gifts];
                          updated[index].account_name = e.target.value;
                          (updated[index] as any).account_holder = e.target.value;
                          setGifts(updated);
                          markDirty();
                        }}
                        className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                      {gf.type === 'address' ? 'Alamat Lengkap Pengiriman' : 'Nomor Rekening / Nomor HP'}
                    </label>
                    <input
                      type="text"
                      value={gf.account_number}
                      placeholder={gf.type === 'address' ? 'Jl. Mawar No. 12, Kel. Sukamaju, Jakarta...' : 'Contoh: 1234567890'}
                      onChange={(e) => {
                        const updated = [...gifts];
                        updated[index].account_number = e.target.value;
                        setGifts(updated);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                      Catatan / Petunjuk Tambahan (Opsional)
                    </label>
                    <input
                      type="text"
                      value={(gf as any).description || ''}
                      placeholder="Contoh: Mohon sertakan konfirmasi via WA jika sudah mengirim..."
                      onChange={(e) => {
                        const updated = [...gifts];
                        (updated[index] as any).description = e.target.value;
                        setGifts(updated);
                        markDirty();
                      }}
                      className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: MUSIK LATAR */}
        {activeTab === 'music' && (
          <div className="space-y-6 max-w-xl">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Musik Latar (Background Song)</h2>
              <p className="text-xs text-[#768692]">
                Musik romantis yang otomatis diputar begitu tamu menekan tombol Open Invitation.
              </p>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invitation.music_enabled}
                  onChange={(e) => {
                    setInvitation({ ...invitation, music_enabled: e.target.checked });
                    markDirty();
                  }}
                  className="rounded text-[#283D52] focus:ring-[#C2A56B] w-4 h-4"
                />
                <span className="text-xs font-semibold text-[#283D52]">
                  Aktifkan Musik Latar pada Undangan
                </span>
              </label>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Judul Lagu
                </label>
                <input
                  type="text"
                  value={invitation.music_title}
                  onChange={(e) => {
                    setInvitation({ ...invitation, music_title: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Penyanyi / Artis
                </label>
                <input
                  type="text"
                  value={invitation.music_artist}
                  onChange={(e) => {
                    setInvitation({ ...invitation, music_artist: e.target.value });
                    markDirty();
                  }}
                  className="w-full px-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs"
                />
              </div>

              <DriveUploader
                label="File Musik Latar (.mp3 / .m4a)"
                value={invitation.music_url}
                onChange={(url) => {
                  setInvitation({ ...invitation, music_url: url });
                  markDirty();
                }}
                accept="audio/*,.mp3,.m4a,.wav"
                fileType="audio"
                placeholder="Upload file musik MP3 dari perangkat..."
                helperText="Otomatis disimpan di folder /KUUNDANG/{coupleName}/ Google Drive"
                coupleName={coupleDisplayName}
              />

              {invitation.music_url && (
                <div className="p-4 bg-[#F7F2EA] rounded-2xl border border-[#283D52]/10">
                  <p className="text-[11px] font-semibold text-[#768692] mb-2">
                    Uji Pemutaran Audio:
                  </p>
                  <audio controls src={invitation.music_url} className="w-full h-10" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 9: MANAJER BAGIAN (SECTION MANAGER) */}
        {activeTab === 'sections' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Manajer Bagian Undangan (Section Manager)</h2>
              <p className="text-xs text-[#768692]">
                Kelola seluruh 13 bagian undangan: aktifkan/sembunyikan (tampil/sembunyi), sesuaikan judul dan subjudul, serta atur urutan tampilnya di seluruh template publik.
              </p>
            </div>

            <div className="space-y-3">
              {sections.map((sec, index) => (
                <div
                  key={sec.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    sec.enabled
                      ? 'bg-[#FFFCF7] border-[#283D52]/15 shadow-2xs'
                      : 'bg-[#F0ECE1]/60 border-gray-300 opacity-75'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-2.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#283D52]/10 text-[#283D52] font-mono text-[10px] font-bold">
                        #{index + 1}
                      </span>
                      <span className="text-xs font-bold text-[#283D52]">{sec.title || sec.section_key}</span>
                      <span className="px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-[#768692] font-mono text-[9px]">
                        {sec.section_key}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Toggle On/Off */}
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={sec.enabled}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[index].enabled = e.target.checked;
                            setSections(updated);
                            markDirty();
                          }}
                          className="sr-only peer"
                        />
                        <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#283D52]"></div>
                      </label>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${sec.enabled ? 'text-emerald-700' : 'text-gray-500'}`}>
                        {sec.enabled ? 'Aktif' : 'Sembunyi'}
                      </span>

                      {/* Reorder Buttons */}
                      <div className="flex items-center gap-1 ml-2 border-l border-[#283D52]/10 pl-2">
                        <button
                          type="button"
                          disabled={index === 0}
                          onClick={() => {
                            if (index === 0) return;
                            const updated = [...sections];
                            const temp = updated[index - 1];
                            updated[index - 1] = updated[index];
                            updated[index] = temp;
                            // update sort_order
                            updated.forEach((s, idx) => { s.sort_order = idx + 1; });
                            setSections(updated);
                            markDirty();
                          }}
                          className="p-1.5 rounded-lg bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[10px] disabled:opacity-30 cursor-pointer"
                          title="Geser Naik"
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          disabled={index === sections.length - 1}
                          onClick={() => {
                            if (index === sections.length - 1) return;
                            const updated = [...sections];
                            const temp = updated[index + 1];
                            updated[index + 1] = updated[index];
                            updated[index] = temp;
                            // update sort_order
                            updated.forEach((s, idx) => { s.sort_order = idx + 1; });
                            setSections(updated);
                            markDirty();
                          }}
                          className="p-1.5 rounded-lg bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[10px] disabled:opacity-30 cursor-pointer"
                          title="Geser Turun"
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Title and Subtitle inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#768692] mb-1">
                        Judul Bagian / Sesi
                      </label>
                      <input
                        type="text"
                        value={sec.title || ''}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[index].title = e.target.value;
                          setSections(updated);
                          markDirty();
                        }}
                        placeholder="Judul Sesi..."
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#768692] mb-1">
                        Subjudul / Keterangan Sesi
                      </label>
                      <input
                        type="text"
                        value={sec.subtitle || ''}
                        onChange={(e) => {
                          const updated = [...sections];
                          updated[index].subtitle = e.target.value;
                          setSections(updated);
                          markDirty();
                        }}
                        placeholder="Subjudul atau penjelasan singkat sesi..."
                        className="w-full px-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 10: DAFTAR TAMU (GUEST MANAGEMENT) */}
        {activeTab === 'guests' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Daftar Tamu & Personalisasi URL</h2>
              <p className="text-xs text-[#768692]">
                Kelola tamu undangan, hasilkan kode unik, dan salin pesan undangan WhatsApp dengan 1 klik.
              </p>
            </div>

            {/* Add Guest Form */}
            <form onSubmit={handleAddGuest} className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 flex flex-col sm:flex-row gap-3 items-end">
              <div className="flex-1 w-full">
                <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                  Nama Tamu / Keluarga
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Bapak April & Keluarga"
                  value={newGuestName}
                  onChange={(e) => setNewGuestName(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                />
              </div>

              <div className="w-full sm:w-40">
                <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                  Kategori
                </label>
                <select
                  value={newGuestCategory}
                  onChange={(e) => setNewGuestCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                >
                  <option value="VIP">VIP</option>
                  <option value="Keluarga">Keluarga</option>
                  <option value="Sahabat">Sahabat</option>
                  <option value="Teman">Teman</option>
                  <option value="Rekan Kerja">Rekan Kerja</option>
                  <option value="Umum">Umum</option>
                </select>
              </div>

              <div className="w-full sm:w-28">
                <label className="block text-[11px] font-semibold text-[#768692] mb-1">
                  Maks. Tamu
                </label>
                <input
                  type="number"
                  min={1}
                  max={10}
                  value={newGuestMax}
                  onChange={(e) => setNewGuestMax(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/15 rounded-xl text-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-4 py-2 bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap cursor-pointer"
              >
                + Tambah Tamu
              </button>
            </form>

            {/* Guests Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#283D52]/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F2EA] text-[#283D52] uppercase font-semibold text-[10px] tracking-wider border-b border-[#283D52]/10">
                  <tr>
                    <th className="p-3.5">Nama Tamu</th>
                    <th className="p-3.5">Kategori</th>
                    <th className="p-3.5">Kode Unik</th>
                    <th className="p-3.5">Status Buka</th>
                    <th className="p-3.5 text-right">Aksi Undangan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DE] bg-[#FFFCF7]">
                  {guests.map((g) => {
                    const isCopied = copiedLink === g.id;

                    return (
                      <tr key={g.id} className="hover:bg-[#F7F2EA]/60 transition-colors">
                        <td className="p-3.5 font-bold text-[#283D52]">{g.name}</td>
                        <td className="p-3.5">
                          <span className="px-2 py-0.5 rounded-full bg-[#DFBFC1]/30 text-[#283D52] font-semibold text-[10px]">
                            {g.category}
                          </span>
                        </td>
                        <td className="p-3.5 font-mono text-[#768692]">{g.guest_code}</td>
                        <td className="p-3.5">
                          {g.opened_at ? (
                            <span className="text-emerald-700 font-semibold flex items-center gap-1 text-[11px]">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Sudah Dibuka</span>
                            </span>
                          ) : (
                            <span className="text-[#768692] text-[11px]">Belum Dibuka</span>
                          )}
                        </td>
                        <td className="p-3.5 text-right space-x-2">
                          <button
                            type="button"
                            onClick={() => copyWhatsAppMessage(g)}
                            className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-[11px] font-semibold transition-colors cursor-pointer"
                            title="Salin pesan WA personal"
                          >
                            {isCopied ? (
                              <>
                                <Check className="w-3 h-3 text-[#DFBFC1]" />
                                <span>Tersalin!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-[#DFBFC1]" />
                                <span>Salin Teks WA</span>
                              </>
                            )}
                          </button>

                          <a
                            href={`/${invitation.slug}?to=${g.guest_code}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg text-[#768692] hover:text-[#283D52] inline-block align-middle"
                            title="Buka link tamu ini"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>

                          <button
                            type="button"
                            onClick={() => handleDeleteGuest(g.id)}
                            className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 inline-block align-middle cursor-pointer"
                            title="Hapus tamu"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 11: REKAP RSVP */}
        {activeTab === 'rsvps' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-[#283D52]">Rekap Konfirmasi Kehadiran (RSVP)</h2>
                <p className="text-xs text-[#768692]">
                  Daftar tamu yang telah mengisi form kehadiran di situs undangan.
                </p>
              </div>

              {/* Attendance Tally */}
              <div className="flex items-center gap-3 bg-[#F7F2EA] px-4 py-2 rounded-xl border border-[#283D52]/10 text-xs font-semibold text-[#283D52]">
                <span>
                  Total Hadir: <strong className="text-emerald-700">{rsvps.filter((r) => r.attendance === 'attending').reduce((acc, c) => acc + (c.guest_count || 1), 0)} orang</strong>
                </span>
                <span>•</span>
                <span>
                  Tidak Hadir: <strong className="text-rose-700">{rsvps.filter((r) => r.attendance === 'not_attending').length}</strong>
                </span>
              </div>
            </div>

            {/* RSVP Section Configuration Card */}
            {(() => {
              const rsvpSec = getSection('rsvp');
              return (
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${rsvpSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <Calendar className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">
                          Tampilkan Formulir Konfirmasi Kehadiran (RSVP) di Undangan
                        </p>
                        <p className="text-[11px] text-[#768692]">
                          {rsvpSec.enabled
                            ? 'Sesi RSVP saat ini AKTIF dan dapat diisi oleh tamu undangan.'
                            : 'Sesi RSVP saat ini DISEMBUNYIKAN dari seluruh template undangan publik.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={rsvpSec.enabled}
                        onChange={(e) => updateSection('rsvp', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Judul Sesi RSVP
                      </label>
                      <input
                        type="text"
                        value={rsvpSec.title}
                        onChange={(e) => updateSection('rsvp', { title: e.target.value })}
                        placeholder="Contoh: Konfirmasi Kehadiran"
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Subjudul Sesi RSVP
                      </label>
                      <input
                        type="text"
                        value={rsvpSec.subtitle || ''}
                        onChange={(e) => updateSection('rsvp', { subtitle: e.target.value })}
                        placeholder="Contoh: Mohon konfirmasi kehadiran Anda..."
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="overflow-x-auto rounded-2xl border border-[#283D52]/10">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#F7F2EA] text-[#283D52] uppercase font-semibold text-[10px] tracking-wider border-b border-[#283D52]/10">
                  <tr>
                    <th className="p-3.5">Nama Tamu</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5">Jumlah Tamu</th>
                    <th className="p-3.5">Pesan</th>
                    <th className="p-3.5 text-right">Waktu</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFE8DE] bg-[#FFFCF7]">
                  {rsvps.map((r) => (
                    <tr key={r.id} className="hover:bg-[#F7F2EA]/60 transition-colors">
                      <td className="p-3.5 font-bold text-[#283D52]">{r.guest_name}</td>
                      <td className="p-3.5">
                        <span
                          className={`px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase ${
                            r.attendance === 'attending'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {r.attendance === 'attending' ? 'Hadir' : 'Tidak Hadir'}
                        </span>
                      </td>
                      <td className="p-3.5 font-semibold">
                        {r.attendance === 'attending' ? `${r.guest_count} Orang` : '-'}
                      </td>
                      <td className="p-3.5 italic text-[#768692] max-w-xs truncate">
                        {r.message || '-'}
                      </td>
                      <td className="p-3.5 text-right text-[11px] text-[#768692]">
                        {new Date(r.created_at).toLocaleDateString('id-ID')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 12: BUKU DOA & MODERASI WISHES */}
        {activeTab === 'wishes' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-base font-bold text-[#283D52]">Moderasi Doa & Ucapan Tamu</h2>
              <p className="text-xs text-[#768692]">
                Kelola pesan ucapan yang tampil pada guestbook publik. Anda dapat menyetujui, menyembunyikan, atau menghapus ucapan.
              </p>
            </div>

            {/* Wishes Section Configuration Card */}
            {(() => {
              const wishesSec = getSection('wishes');
              return (
                <div className="p-5 rounded-2xl bg-[#FFFCF7] border border-[#283D52]/15 shadow-2xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10">
                    <div className="flex items-center gap-3">
                      <div className={`p-2.5 rounded-xl ${wishesSec.enabled ? 'bg-[#283D52] text-[#FFFCF7]' : 'bg-[#EFE8DE] text-[#768692]'}`}>
                        <MessageSquareHeart className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#283D52]">
                          Tampilkan Buku Tamu & Doa Restu (Wishes) di Undangan
                        </p>
                        <p className="text-[11px] text-[#768692]">
                          {wishesSec.enabled
                            ? 'Sesi Doa & Ucapan saat ini AKTIF dan dapat diisi/dibaca oleh tamu.'
                            : 'Sesi Doa & Ucapan saat ini DISEMBUNYIKAN dari seluruh template undangan publik.'}
                        </p>
                      </div>
                    </div>

                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wishesSec.enabled}
                        onChange={(e) => updateSection('wishes', { enabled: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#283D52]"></div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Judul Sesi Ucapan & Doa
                      </label>
                      <input
                        type="text"
                        value={wishesSec.title}
                        onChange={(e) => updateSection('wishes', { title: e.target.value })}
                        placeholder="Contoh: Ucapan & Doa Restu"
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-[#283D52] mb-1">
                        Subjudul Sesi Ucapan & Doa
                      </label>
                      <input
                        type="text"
                        value={wishesSec.subtitle || ''}
                        onChange={(e) => updateSection('wishes', { subtitle: e.target.value })}
                        placeholder="Contoh: Berikan ucapan manis serta doa restu untuk kedua mempelai..."
                        className="w-full px-3 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}

            <div className="space-y-3">
              {wishes.map((w) => (
                <div
                  key={w.id}
                  className="p-4 rounded-2xl bg-[#F7F2EA] border border-[#283D52]/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#283D52]">{w.guest_name}</span>
                      <span
                        className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase ${
                          w.status === 'approved'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-neutral-200 text-neutral-700'
                        }`}
                      >
                        {w.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#24313A] italic font-serif">"{w.message}"</p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {w.status === 'approved' ? (
                      <button
                        type="button"
                        onClick={() => handleWishStatusChange(w.id, 'hidden')}
                        className="px-3 py-1.5 rounded-lg bg-[#FFFCF7] border border-[#283D52]/15 text-xs text-[#283D52] hover:bg-[#EFE8DE] cursor-pointer"
                      >
                        Sembunyikan
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleWishStatusChange(w.id, 'approved')}
                        className="px-3 py-1.5 rounded-lg bg-[#283D52] text-[#FFFCF7] text-xs hover:bg-[#1E2E3E] cursor-pointer"
                      >
                        Tampilkan
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleDeleteWish(w.id)}
                      className="p-1.5 rounded-lg text-rose-600 hover:text-rose-800 hover:bg-rose-50 cursor-pointer"
                      title="Hapus permanen"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
