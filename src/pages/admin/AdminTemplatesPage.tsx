import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Palette, Check, ExternalLink, Sparkles, Eye, ArrowRight, Settings } from 'lucide-react';
import { weddingService } from '../../services/weddingService';
import { Invitation } from '../../types/wedding';
import { Link } from 'react-router-dom';

import { TemplateId } from '../../types/wedding';

interface TemplateOption {
  id: TemplateId;
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
    id: 'javanese-royal',
    name: 'Adat Jawa Keraton & Gamelan Sakral',
    tagline: 'Filosofi Kasultanan Jawa, Gapura Gunungan Wayang & Backsound Gamelan',
    badge: 'ADAT JAWA SAKRAL',
    accentColor: '#D4AF37',
    bgGradient: 'from-[#1A1009] via-[#2C1810] to-[#120A05]',
    borderColor: 'border-[#D4AF37]',
    description:
      'Nuansa sakral adat Jawa bernuansa Keraton. Gerbang Gapura Gunungan Wayang Kulit emas, motif Batik Kawung & Parang, alunan backsound Gamelan Jawa (Udan Mas / Kebo Giro), busana Paes Ageng & Jawi Jangkep, serta reroncening adicara panggih.',
    highlights: [
      'Gerbang Sakral Gunungan Wayang Kulit Emas dengan efek audio denting Gong Ageng',
      'Backsound Gamelan Jawa Sakral (Udan Mas / Kebo Giro) dengan floating player',
      'Ornamen khas Keraton: Batik Kawung, lung-lungan ukir kayu Jepara & aksara Jawa',
      'Profil Sang Pinanganten busana Paes Ageng & Beskap Jangkep beserta sungkem restu',
      'Reroncening Adicara (Siraman, Ijab Kabul, Upacara Panggih, Resepsi) + Kalender',
      'Pasugatan Tali Asih (Amplop Digital), Serat Rawuh (RSVP), & Donga Pangestu',
    ],
    tags: ['Adat Jawa', 'Gamelan Sakral', 'Gunungan Wayang', 'Batik Kawung', 'Keraton'],
  },
  {
    id: 'cute-pink-floral',
    name: 'Pastel Bloom & Bunga Lucu (Pink)',
    tagline: 'Nuansa Merah Muda Menggemaskan, Kelopak Bunga Berjatuhan & Stiker Lucu',
    badge: 'LUCU & MENGGEMASKAN',
    accentColor: '#FF5C8D',
    bgGradient: 'from-[#FFF0F5] via-[#FFE4EC] to-[#FFD1DC]',
    borderColor: 'border-[#FF85A2]',
    description:
      'Tema manis nan menggemaskan yang dipenuhi palet merah muda ceria, kelopak bunga melayang, stiker washi tape, frame polaroid memo cinta, dan iringan melodi romantis.',
    highlights: [
      'Sampul Surat Cinta Romantis dengan stempel lilin pita & bunga merah muda',
      'Efek Partikel Bunga Mengapung (Daisy, Sakura, Tulip) bertebaran lembut',
      'Frame Foto Polaroid & Pita Lucu bergaya scrapbook manis',
      'Rangkaian Acara Lengkap dengan countdown dan tombol Kalender Google',
      'Kisah Cinta "Our Love Story" bergaya lembaran memo ceria',
      'Buku Tamu Doa Restu & Amplop Digital Manis berornamen bunga',
    ],
    tags: ['Merah Muda', 'Bunga Lucu', 'Scrapbook', 'Sweet & Cute', 'Pastel Bloom'],
  },
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
  {
    id: 'super-mario',
    name: '8-Bit Retro Platformer (Super Wedding Bros)',
    tagline: 'Undangan Interaktif HTML5 Canvas ala Game Super Mario & Suara Chiptune',
    badge: 'GAME PLATFORMER 8-BIT',
    accentColor: '#5C94FC',
    bgGradient: 'from-[#5C94FC] via-[#283D52] to-[#B84418]',
    borderColor: 'border-[#5C94FC]',
    description:
      'Konsep inovatif undangan pernikahan berbasis permainan platformer retro 8-bit. Tamu memilih karakter (Tuan / Nyonya), melompat memukul blok [?], mengumpulkan koin, membaca setiap babak undangan di awan langit, dan bertemu pasangan di istana pelaminan cinta.',
    highlights: [
      'Layar Awal Retro Arcade dengan form nama tamu, pilihan karakter Tuan / Nyonya, & tombol Mulai',
      'Mesin Fisika Platformer 2D Canvas (Jalan, Lompat, Gravitasi, Kamera Halus & Kontrol Sentuh D-Pad)',
      'Kartu Informasi Mengapung di Awan Langit yang terorganisir rapi & bisa dijelajahi bolak-balik',
      'Efek Suara 8-Bit Web Audio API & Backsound Melodi Chiptune Pernikahan Ceria',
      'Pertemuan Romantis dengan Pasangan di Garis Finish (Istana Pernikahan) dengan pesta kembang api',
      'Buku Tamu RSVP & Amplop Digital Lengkap dengan tombol salin rekening langsung',
    ],
    tags: ['Super Mario', '8-Bit Retro', 'HTML5 Canvas', 'Game Platformer', 'Chiptune'],
  },
  {
    id: 'fleur-botanica',
    name: 'Fleur Botanica & Conservatory Glasshouse',
    tagline: 'Estetika Botanical Heirloom Eropa, Daun Eucalyptus & Segel Lilin Wax Seal',
    badge: 'BOTANICAL & WAX SEAL',
    accentColor: '#BDA06C',
    bgGradient: 'from-[#1E2A20] via-[#293522] to-[#FAF8F5]',
    borderColor: 'border-[#BDA06C]',
    description:
      'Desain botani editorial mewah terinspirasi arsitektur Conservatory Glasshouse Eropa. Dilengkapi amplop pembuka vintage interaktif dengan segel lilin wax seal, aksen daun eucalyptus perunggu, frame polaroid renda, dan alunan melodi romantis.',
    highlights: [
      'Amplop Surat Lipat Interaktif dengan animasi kupas segel lilin (Wax Seal)',
      'Ornamen Botani Eksklusif (Eucalyptus, Ranting Magnolia, & flourish sudut emas)',
      'Profil Mempelai berbingkai polaroid renda botani & info orang tua terhormat',
      'Jadwal Acara Akad & Resepsi lengkap dengan petunjuk Google Maps & Kalender',
      'Galeri Foto Masonry Romantis dengan viewer lightbox layar penuh',
      'Buku Tamu RSVP & Tali Asih (Amplop Digital) dengan salin rekening instan',
    ],
    tags: ['Botanical', 'Conservatory', 'Wax Seal', 'Eucalyptus', 'Editorial'],
  },
];

export const AdminTemplatesPage: React.FC = () => {
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [selectedInvId, setSelectedInvId] = useState<string>('');
  const [activeTemplate, setActiveTemplate] = useState<TemplateId>('royal-arch');
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

  const handleApplyTemplate = async (templateId: TemplateId) => {
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
            <span>Koleksi 6 Tema Undangan</span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
            Katalog Tema Desain Undangan
          </h1>
          <p className="text-xs sm:text-sm text-[#768692] mt-1 max-w-xl">
            Pilih antara sakralnya Adat Jawa Kasultanan &amp; Gamelan, cantiknya Botanical Conservatory &amp; Segel Lilin, manisnya nuansa merah muda bunga lucu, keanggunan klasik Royal Arch bangsawan, gaya cyber-RPG Persona 5, atau tema platformer interaktif Super Mario 8-Bit.
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
                  {inv.title} (
                  {inv.template_id === 'super-mario'
                    ? 'Super Mario 8-Bit'
                    : inv.template_id === 'persona-5'
                    ? 'Persona 5'
                    : inv.template_id === 'javanese-royal'
                    ? 'Adat Jawa'
                    : inv.template_id === 'cute-pink-floral'
                    ? 'Bunga Lucu (Pink)'
                    : inv.template_id === 'fleur-botanica'
                    ? 'Fleur Botanica'
                    : 'Royal Arch'}
                  )
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

      {/* 5 Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {TEMPLATES.map((tmpl) => {
          const isCurrentActive = activeTemplate === tmpl.id;
          const isP5 = tmpl.id === 'persona-5';
          const isJawa = tmpl.id === 'javanese-royal';
          const isCute = tmpl.id === 'cute-pink-floral';
          const isMario = tmpl.id === 'super-mario';
          const isBotanica = tmpl.id === 'fleur-botanica';

          return (
            <div
              key={tmpl.id}
              className={`rounded-3xl border-2 transition-all p-5 sm:p-6 flex flex-col justify-between ${
                isCurrentActive
                  ? isMario
                    ? 'bg-[#1C2C40] border-[#5C94FC] shadow-xl text-white'
                    : isP5
                    ? 'bg-[#141418] border-[#E60012] shadow-xl text-white'
                    : isJawa
                    ? 'bg-[#24160E] border-[#D4AF37] shadow-xl text-[#FAF6EE]'
                    : isCute
                    ? 'bg-[#FFF0F5] border-[#FF5C8D] shadow-xl text-[#4A2E35]'
                    : isBotanica
                    ? 'bg-[#1E2A20] border-[#BDA06C] shadow-xl text-[#FAF8F5]'
                    : 'bg-[#F7F2EA] border-[#C2A56B] shadow-xl text-[#283D52]'
                  : isMario
                  ? 'bg-[#182635] border-[#5C94FC]/40 hover:border-[#5C94FC] shadow-xs text-[#E0EFFF]'
                  : isJawa
                  ? 'bg-[#1A1009] border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-xs text-[#FAF6EE]'
                  : isCute
                  ? 'bg-[#FFF5F8] border-[#FFA3B8]/40 hover:border-[#FF5C8D]/60 shadow-xs text-[#4A2E35]'
                  : isBotanica
                  ? 'bg-[#243326] border-[#BDA06C]/40 hover:border-[#BDA06C]/70 shadow-xs text-[#FAF8F5]'
                  : 'bg-[#FFFCF7] border-[#283D52]/10 hover:border-[#283D52]/30 shadow-xs text-[#283D52]'
              }`}
            >
              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${
                      isBotanica
                        ? 'bg-[#BDA06C] text-[#1E2A20] font-serif'
                        : isMario
                        ? 'bg-[#5C94FC] text-white font-mono'
                        : isP5
                        ? 'bg-[#E60012] text-white -skew-x-6'
                        : isJawa
                        ? 'bg-[#D4AF37] text-[#1A1009]'
                        : isCute
                        ? 'bg-[#FF5C8D] text-white'
                        : 'bg-[#EFE8DE] text-[#C2A56B]'
                    }`}
                  >
                    {tmpl.badge}
                  </span>
                  {isCurrentActive && (
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider">
                      <Check className="w-3 h-3" />
                      <span>Aktif</span>
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold tracking-tight">{tmpl.name}</h3>
                <p className="text-xs text-[#768692] font-medium mt-1">{tmpl.tagline}</p>

                {/* Card Banner Preview */}
                <div
                  className={`mt-4 w-full h-40 rounded-2xl bg-gradient-to-br ${tmpl.bgGradient} p-4 flex flex-col justify-between border relative overflow-hidden shadow-inner ${
                    isMario
                      ? 'border-[#5C94FC] text-white font-mono'
                      : isP5
                      ? 'border-[#E60012] text-white'
                      : isJawa
                      ? 'border-[#D4AF37] text-white'
                      : isCute
                      ? 'border-[#FF85A2] text-[#4A2E35]'
                      : 'border-[#C2A56B]/40 text-white'
                  }`}
                >
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className={isCute ? 'text-[#8A505F]' : 'text-white/70'}>April & Siti Wedding</span>
                    <span style={{ color: tmpl.accentColor }} className="font-bold">
                      17.09.2021
                    </span>
                  </div>

                  <div className="text-center my-auto">
                    <p className={`text-[9px] uppercase tracking-widest ${isCute ? 'text-[#FF5C8D] font-bold' : isMario ? 'text-[#FFE082] font-mono' : 'text-white/70'}`}>
                      {isMario ? 'WORLD 1-1 WEDDING QUEST' : isJawa ? 'Serat Ulem Palakrama' : isCute ? 'Undangan Manis & Ceria' : 'The Wedding Of'}
                    </p>
                    <h4 className="text-base sm:text-lg font-bold mt-0.5">April Pratama & Siti Nurjannah</h4>
                  </div>

                  <div className="flex justify-between items-center text-[11px]">
                    <span className={isCute ? 'text-[#8A505F]' : 'text-white/60'}>Tamu Terhormat</span>
                    <span
                      className={`px-2 py-0.5 rounded-md text-xs font-semibold ${
                        isMario
                          ? 'bg-[#E60012] text-white border border-white font-mono'
                          : isCute
                          ? 'bg-[#FF5C8D] text-white'
                          : 'bg-white/20 text-white'
                      }`}
                    >
                      {isMario ? 'START GAME' : isJawa ? 'Bikak Ulem' : 'Buka Undangan'}
                    </span>
                  </div>
                </div>

                <p className="text-xs mt-4 leading-relaxed text-[#768692]">{tmpl.description}</p>

                {/* Highlights List */}
                <div className="mt-4 space-y-1.5">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-[#768692]">
                    Fitur &amp; Visual Highlights:
                  </p>
                  <ul className="space-y-1">
                    {tmpl.highlights.slice(0, 4).map((h, i) => (
                      <li key={i} className="text-xs flex items-start gap-2">
                        <span style={{ color: tmpl.accentColor }} className="font-bold">
                          ✓
                        </span>
                        <span className="line-clamp-1">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-current/10 flex flex-col gap-2">
                <button
                  type="button"
                  disabled={saving || isCurrentActive}
                  onClick={() => handleApplyTemplate(tmpl.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCurrentActive
                      ? 'bg-emerald-600 text-white cursor-default'
                      : isBotanica
                      ? 'bg-[#293522] hover:bg-[#1E2A20] text-[#FAF8F5] border border-[#BDA06C] shadow-md'
                      : isMario
                      ? 'bg-[#E60012] hover:bg-[#CC0010] text-white font-mono shadow-md border border-white/40'
                      : isP5
                      ? 'bg-[#E60012] hover:bg-[#FF0019] text-white -skew-x-3 shadow-md'
                      : isJawa
                      ? 'bg-[#D4AF37] hover:bg-[#E5C158] text-[#1A1009] shadow-md'
                      : isCute
                      ? 'bg-[#FF5C8D] hover:bg-[#E03164] text-white shadow-md'
                      : 'bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] shadow-md'
                  }`}
                >
                  {isCurrentActive ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Tema Terpilih</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Terapkan</span>
                    </>
                  )}
                </button>

                {/* Live Demo / Preview Link */}
                {selectedInvitation && (
                  <Link
                    to={`/preview/${selectedInvitation.id}?template=${tmpl.id}`}
                    target="_blank"
                    className="w-full py-2 px-3 rounded-xl border border-current/20 hover:bg-black/5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
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
