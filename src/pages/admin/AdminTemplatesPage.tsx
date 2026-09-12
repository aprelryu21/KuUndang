import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Palette, Check, ExternalLink, Sparkles, Eye, ArrowRight, Settings } from 'lucide-react';
import { weddingService } from '../../services/weddingService';
import { Invitation } from '../../types/wedding';
import { Link } from 'react-router-dom';

interface TemplateOption {
  id: 'royal-arch' | 'persona-5';
  name: string;
  tagline: string;
  badge: string;
  accentColor: string;
  bgGradient: string;
  borderColor: string;
  description: string;
  highlights: string[];
  tags: string[];
}

const TEMPLATES: TemplateOption[] = [
  {
    id: 'royal-arch',
    name: 'The Royal Navy & Gold Arch',
    tagline: 'Klasik Ningrat & Kemewahan Tradisional Modern',
    badge: 'KLASIK & ELEGAN',
    accentColor: '#C2A56B',
    bgGradient: 'from-[#283D52] via-[#1E2E3E] to-[#141F2A]',
    borderColor: 'border-[#C2A56B]',
    description:
      'Desain arsitektur lengkungan emas klasik berpadu dengan nuansa navy biru malam dan krem hangat. Sangat ideal untuk resepsi tradisional-modern, adat Jawa, serta perhelatan sakral keluarga besar.',
    highlights: [
      'Bingkai Arch Emas Sinematik & Multi-Bahasa (Indonesia, Jawa Krama, Inggris, Jepang, Mandarin)',
      'Jadwal 3 Acara Lengkap (Akad Nikah, Resepsi Sidoarjo, Unduh Mantu Kediri)',
      'Galeri Romantis, Amplop Digital BCA/Mandiri, dan Buku Tamu Interaktif',
      'Floating Music Player dengan alunan romantis Canon in D Major',
    ],
    tags: ['Lengkungan Emas', 'Klasik Ningrat', 'Navy & Ivory', 'Formal'],
  },
  {
    id: 'persona-5',
    name: 'Phantom Crimson & Black (Persona 5 Theme)',
    tagline: 'Stylized Cyber-Action Anime UI terinspirasi Persona 5',
    badge: 'PERSONA 5 THEME',
    accentColor: '#E60012',
    bgGradient: 'from-[#0D0D0D] via-[#16161A] to-[#E60012]/30',
    borderColor: 'border-[#E60012]',
    description:
      'Gaya visual Persona 5 yang revolusioner dan berani. Sampul pembuka bergaya Calling Card "Take Your Heart", status screen pengantin, jadwal acara Target Operations, Confidant The Lovers Rank MAX, serta All-Out Attack photo finishes.',
    highlights: [
      'Calling Card "Take Your Heart" Sampul Interaktif dengan animasi stempel',
      'Cognitive Status Screen untuk April & Siti dengan stats & Arcana affinity',
      'Target Infiltration Operations (Akad Nikah, Resepsi, Unduh Mantu) + Google Calendar',
      'Confidant The Lovers Rank MAX timeline cerita cinta',
      'All-Out Attack "The Show\'s Over" photo gallery lightbox',
      'Battle Command RSVP & Phan-Site Transmission Board (Buku Tamu)',
    ],
    tags: ['Persona 5', 'Crimson & Black', 'Take Your Heart', 'All-Out Attack'],
  },
];

export const AdminTemplatesPage: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedInvId, setSelectedInvId] = useState<string>('');
  const [activeTemplate, setActiveTemplate] = useState<'royal-arch' | 'persona-5'>('royal-arch');
  const [, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  const loadData = async () => {
    setLoading(true);
    weddingService.init();
    const invs = await weddingService.getAllInvitations();
    setInvitations(invs);
    if (invs.length > 0) {
      setSelectedInvId(invs[0].id);
      setActiveTemplate((invs[0].template_id as any) || 'royal-arch');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSelectInvitation = (invId: string) => {
    setSelectedInvId(invId);
    const target = invitations.find((i) => i.id === invId);
    if (target) {
      setActiveTemplate((target.template_id as any) || 'royal-arch');
    }
  };

  const handleApplyTemplate = async (templateId: 'royal-arch' | 'persona-5') => {
    if (!selectedInvId) return;
    setSaving(true);
    try {
      await weddingService.updateInvitation(selectedInvId, {
        template_id: templateId,
      });
      setActiveTemplate(templateId);
      setInvitations((prev) =>
        prev.map((inv) => (inv.id === selectedInvId ? { ...inv, template_id: templateId } : inv))
      );
      setSuccessToast(`Tema berhasil diterapkan ke undangan! ♡`);
      setTimeout(() => setSuccessToast(null), 4000);
    } catch (err: any) {
      alert(err.message || 'Gagal mengubah tema');
    } finally {
      setSaving(false);
    }
  };

  const selectedInvitation = invitations.find((i) => i.id === selectedInvId);

  return (
    <div className="space-y-8 pb-16">
      {/* Notice Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#EFE8DE] border border-[#C2A56B]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="font-bold text-sm text-[#283D52] flex items-center gap-2">
            <Settings className="w-4 h-4 text-[#C2A56B]" />
            <span>Pengaturan Tema Telah Terintegrasi di Setiap Undangan</span>
          </h4>
          <p className="text-xs text-[#768692] mt-0.5">
            Anda dapat memilih tema tersendiri untuk setiap undangan melalui menu <strong>Daftar Undangan &gt; Edit &gt; Tab Tampilan & Tema</strong>.
          </p>
        </div>
        {selectedInvitation && (
          <Link
            to={`/admin/invitations/${selectedInvitation.id}/edit`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-white text-xs font-semibold uppercase tracking-wider shrink-0 transition-colors"
          >
            <span>Buka Pengaturan Undangan Ini</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* Top Header */}
      <div className="bg-[#FFFCF7] p-6 sm:p-8 rounded-3xl border border-[#283D52]/10 shadow-xs flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EFE8DE] text-xs font-semibold text-[#C2A56B] mb-2">
            <Palette className="w-3.5 h-3.5" />
            <span>Koleksi 2 Tema Undangan</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
            Katalog Tema Desain Undangan
          </h1>
          <p className="text-xs sm:text-sm text-[#768692] mt-1 max-w-xl">
            Pilih antara keanggunan klasik bangsawan kerajaan Jawa (The Royal Navy & Gold Arch) atau gaya cyber-RPG Persona 5 yang revolusioner.
          </p>
        </div>

        {/* Invitation Selector */}
        {invitations.length > 0 && (
          <div className="bg-[#F7F2EA] p-3.5 rounded-2xl border border-[#283D52]/15 min-w-[280px]">
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#768692] mb-1.5">
              Pilih Undangan Target:
            </label>
            <select
              value={selectedInvId}
              onChange={(e) => handleSelectInvitation(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFCF7] border border-[#283D52]/20 rounded-xl text-xs font-medium text-[#283D52] focus:outline-hidden"
            >
              {invitations.map((inv) => (
                <option key={inv.id} value={inv.id}>
                  {inv.title} ({inv.template_id === 'persona-5' ? 'Persona 5' : 'Royal Arch'})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Success Toast */}
      <AnimatePresence>
        {successToast && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 rounded-2xl bg-emerald-600 text-white flex items-center justify-between shadow-lg text-xs font-semibold"
          >
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4" />
              <span>{successToast}</span>
            </div>
            {selectedInvitation && (
              <a
                href={`/${selectedInvitation.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-90 flex items-center gap-1"
              >
                <span>Lihat Hasil Publik</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2 Templates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {TEMPLATES.map((tmpl) => {
          const isCurrentActive = activeTemplate === tmpl.id;
          const isP5 = tmpl.id === 'persona-5';

          return (
            <div
              key={tmpl.id}
              className={`rounded-3xl border-2 transition-all p-6 sm:p-8 flex flex-col justify-between ${
                isCurrentActive
                  ? isP5
                    ? 'bg-[#141418] border-[#E60012] shadow-xl text-white'
                    : 'bg-[#F7F2EA] border-[#C2A56B] shadow-xl text-[#283D52]'
                  : 'bg-[#FFFCF7] border-[#283D52]/10 hover:border-[#283D52]/30 shadow-xs text-[#283D52]'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isP5 ? 'bg-[#E60012] text-white -skew-x-6' : 'bg-[#EFE8DE] text-[#C2A56B]'
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                  {isCurrentActive && (
                    <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      <Check className="w-3 h-3" />
                      <span>Aktif Digunakan</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-2xl font-bold tracking-tight">{tmpl.name}</h3>
                <p className="text-xs text-[#768692] font-medium mt-1">{tmpl.tagline}</p>

                {/* Card Banner Preview */}
                <div
                  className={`mt-5 w-full h-44 rounded-2xl bg-gradient-to-br ${tmpl.bgGradient} p-5 flex flex-col justify-between border relative overflow-hidden text-white shadow-inner ${
                    isP5 ? 'border-[#E60012]' : 'border-[#C2A56B]/40'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-white/70">April & Siti Wedding</span>
                    <span style={{ color: tmpl.accentColor }} className="font-bold">
                      17.09.2021
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <p className="text-[10px] uppercase tracking-widest text-white/70">The Wedding Of</p>
                    <h4 className="text-xl font-bold mt-1">April Pratama & Siti Nurjannah</h4>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-white/60">Tamu Terhormat</span>
                    <span className="px-2 py-0.5 rounded-md bg-white/20 text-white font-semibold">
                      Buka Undangan
                    </span>
                  </div>
                </div>

                <p className="text-xs mt-5 leading-relaxed text-[#768692]">{tmpl.description}</p>

                {/* Highlights List */}
                <div className="mt-5 space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#768692]">
                    Fitur & Visual Highlights:
                  </p>
                  <ul className="space-y-1.5">
                    {tmpl.highlights.map((h, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <span style={{ color: tmpl.accentColor }} className="font-bold">
                          ✓
                        </span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-current/10 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  disabled={saving || isCurrentActive}
                  onClick={() => handleApplyTemplate(tmpl.id)}
                  className={`w-full sm:flex-1 py-3 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isCurrentActive
                      ? 'bg-emerald-600 text-white cursor-default'
                      : isP5
                      ? 'bg-[#E60012] hover:bg-[#FF0019] text-white -skew-x-3 shadow-md'
                      : 'bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] shadow-md'
                  }`}
                >
                  {isCurrentActive ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Tema Terpilih</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Terapkan ke Undangan Ini</span>
                    </>
                  )}
                </button>

                {/* Live Demo / Preview Link */}
                {selectedInvitation && (
                  <Link
                    to={`/preview/${selectedInvitation.id}?template=${tmpl.id}`}
                    target="_blank"
                    className="w-full sm:w-auto py-3 px-4 rounded-xl border border-current/20 hover:bg-black/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Lihat Preview</span>
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
