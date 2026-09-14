import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  MessageCircle,
  Phone,
  Send,
  Sparkles,
  Heart,
  CheckCircle2,
  Calendar,
  User,
  Palette,
  Clock,
  ShieldCheck,
  Copy,
  Check,
  ArrowRight,
} from 'lucide-react';
import {
  GoldenRingsSvg,
  FloralFiligreeDivider,
  LuxuryCornerOrnament,
  WaxSealSvg,
} from './LandingLuxurySvg';

export const LandingOrderSection: React.FC = () => {
  // Order Form State
  const [customerName, setCustomerName] = useState('');
  const [coupleNames, setCoupleNames] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('The Royal Navy & Gold Arch');
  const [packageTier, setPackageTier] = useState('Paket Lengkap Eksklusif (All-in-One)');
  const [specialNotes, setSpecialNotes] = useState('');
  const [copied, setCopied] = useState(false);

  const waNumber = '6282114445631';
  const displayWaNumber = '0821-1444-5631';

  // Available themes list
  const themeOptions = [
    'The Royal Navy & Gold Arch (Klasik Mewah)',
    'Adat Jawa Keraton & Gamelan Sakral',
    'Pastel Bloom & Bunga Lucu (Pink Manis)',
    'Phantom Crimson & Black (Persona 5 Theme)',
    'Custom Desain Khusus Sesuai Permintaan',
  ];

  // Generate automated message
  const generateMessage = () => {
    const nameStr = customerName.trim() || '[Nama Anda]';
    const coupleStr = coupleNames.trim() || '[Nama Kedua Mempelai]';
    const dateStr = weddingDate.trim() || '[Tanggal Acara]';
    const notesStr = specialNotes.trim() ? `\n• Catatan Tambahan: ${specialNotes.trim()}` : '';

    return `Halo Tim KU UNDANG, saya ingin memesan Undangan Pernikahan Digital Eksklusif:

• Nama Pemesan: ${nameStr}
• Mempelai: ${coupleStr}
• Tanggal Acara: ${dateStr}
• Pilihan Tema: ${selectedTheme}
• Paket: ${packageTier}${notesStr}

Mohon informasi ketersediaan jadwal pengerjaan dan detail pemesanannya. Terima kasih!`;
  };

  const currentMessage = generateMessage();
  const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(currentMessage)}`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(currentMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="pesan" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden scroll-mt-16">
      {/* Ambient background glow and watermark */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#C9A86A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#DFBFC1]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="flex justify-center mb-3">
            <GoldenRingsSvg className="w-14 h-14" />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF7] border border-[#C9A86A]/40 text-xs font-semibold uppercase tracking-[0.25em] text-[#A68244] mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A86A]" />
            <span>Layanan Pemesanan Studio</span>
          </div>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#1E2E3E] tracking-tight">
            Pemesanan &amp; Konsultasi Undangan
          </h2>

          <p className="mt-4 text-base sm:text-lg text-[#607282] font-sans leading-relaxed">
            Wujudkan undangan pernikahan digital berkelas dan berkarakter. Isi formulir di bawah ini untuk menghasilkan draf pemesanan otomatis langsung ke tim desainer kami via WhatsApp.
          </p>

          <div className="mt-5">
            <FloralFiligreeDivider className="w-64 h-5" />
          </div>
        </motion.div>

        {/* Main Grid: Order Form (Left) & WhatsApp Preview Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start max-w-6xl mx-auto">
          {/* LEFT: Interactive Order Form */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#C9A86A]/35 shadow-[0_10px_40px_rgba(40,61,82,0.06)] relative overflow-hidden"
          >
            <LuxuryCornerOrnament position="top-left" className="absolute top-3 left-3 w-8 h-8 text-[#C9A86A]" />
            <LuxuryCornerOrnament position="top-right" className="absolute top-3 right-3 w-8 h-8 text-[#C9A86A]" />

            <div className="mb-6 pb-4 border-b border-[#C9A86A]/20">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-heading text-xl font-bold text-[#1E2E3E]">
                    Formulir Pemesanan Otomatis
                  </h3>
                  <p className="text-xs text-[#768692] mt-0.5">
                    Data Anda akan otomatis terangkum dalam format chat pesan WhatsApp resmi.
                  </p>
                </div>
                <WaxSealSvg className="w-12 h-14 shrink-0 hidden sm:block" text="KU" />
              </div>
            </div>

            <div className="space-y-4">
              {/* Nama Pemesan */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Nama Pemesan / Kontak PIC</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Contoh: Muhammad Aprilian / Siti Rahayu"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#283D52]/15 text-sm text-[#1E2E3E] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/50 focus:border-[#C9A86A] transition-all"
                />
              </div>

              {/* Nama Mempelai */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5 flex items-center gap-1.5">
                  <Heart className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Nama Panggilan Mempelai (Pria &amp; Wanita)</span>
                </label>
                <input
                  type="text"
                  value={coupleNames}
                  onChange={(e) => setCoupleNames(e.target.value)}
                  placeholder="Contoh: April &amp; Siti"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#283D52]/15 text-sm text-[#1E2E3E] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/50 focus:border-[#C9A86A] transition-all"
                />
              </div>

              {/* Tanggal Acara */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Tanggal Acara Pernikahan</span>
                </label>
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  placeholder="Contoh: 17 September 2026 / Bulan Oktober 2026"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#283D52]/15 text-sm text-[#1E2E3E] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/50 focus:border-[#C9A86A] transition-all"
                />
              </div>

              {/* Pilihan Tema */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5 flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>Pilihan Desain Tema Undangan</span>
                </label>
                <select
                  value={selectedTheme}
                  onChange={(e) => setSelectedTheme(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#283D52]/15 text-sm text-[#1E2E3E] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/50 focus:border-[#C9A86A] transition-all cursor-pointer"
                >
                  {themeOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Catatan Tambahan */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                  Catatan / Permintaan Khusus (Opsional)
                </label>
                <textarea
                  rows={2}
                  value={specialNotes}
                  onChange={(e) => setSpecialNotes(e.target.value)}
                  placeholder="Contoh: Tambah lagu instrumen khusus, panduan rute gedung, atau foto prewedding..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FAF7F2] border border-[#283D52]/15 text-sm text-[#1E2E3E] focus:outline-none focus:ring-2 focus:ring-[#C9A86A]/50 focus:border-[#C9A86A] transition-all"
                />
              </div>
            </div>

            {/* Direct Send WA Button */}
            <div className="mt-6 pt-4 border-t border-[#C9A86A]/20">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all cursor-pointer group"
              >
                <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                <span>Kirim Pesanan ke WhatsApp ({displayWaNumber})</span>
              </a>
              <p className="text-center text-[11px] text-[#768692] mt-2">
                Otomatis membuka WhatsApp dengan pesan yang telah tersusun rapi.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Live Message Preview & Studio Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Live WhatsApp Chat Bubble Preview */}
            <div className="bg-[#121E2B] text-[#FAF7F2] rounded-3xl p-6 border border-[#C9A86A]/35 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/20 border border-[#25D366]/40 flex items-center justify-center text-[#25D366]">
                    <MessageCircle className="w-5 h-5 fill-[#25D366]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>Customer Care KU UNDANG</span>
                      <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    </h4>
                    <p className="text-[11px] text-[#C9A86A] font-mono">{displayWaNumber}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-[11px] text-[#C9A86A] font-medium transition-colors cursor-pointer"
                  title="Salin Teks Pesan"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>

              {/* Chat Bubble Simulation */}
              <div className="bg-[#0B151F] p-4 rounded-2xl border border-white/10 text-xs font-mono text-[#D8E2EC] leading-relaxed whitespace-pre-line shadow-inner max-h-64 overflow-y-auto">
                {currentMessage}
              </div>

              <div className="mt-4 flex items-center justify-between text-[11px] text-[#A6B4C0]">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#C9A86A]" /> Respon Cepat (08.00 - 22.00 WIB)
                </span>
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] font-bold hover:underline flex items-center gap-1"
                >
                  <span>Buka Chat</span>
                  <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Guarantees & Benefits Card */}
            <div className="bg-[#FFFCF7] rounded-3xl p-6 border border-[#C9A86A]/25 shadow-xs space-y-3.5">
              <h4 className="font-heading text-base font-bold text-[#1E2E3E] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C9A86A]" />
                <span>Keunggulan Layanan KU UNDANG Studio</span>
              </h4>

              <div className="space-y-2.5 text-xs text-[#607282]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1E2E3E]">Pengerjaan Cepat 1–2 Hari:</strong> Undangan siap disebarkan ke tamu dalam waktu singkat tanpa ribet.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1E2E3E]">Revisi Data Sepuasnya:</strong> Perubahan susunan acara, foto, atau ejaan dibantu tuntas sampai hari H.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1E2E3E]">Masa Aktif Selamanya:</strong> Tautan undangan kenangan abadi dapat dibuka kembali kapan saja.
                  </p>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#C9A86A] shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-[#1E2E3E]">Integrasi Google Drive &amp; Sheets:</strong> Seluruh foto, audio, dan buku tamu otomatis tersimpan rapi.
                  </p>
                </div>
              </div>

              {/* Direct Call / Contact Bar */}
              <div className="pt-3 border-t border-[#C9A86A]/20 flex items-center justify-between text-xs">
                <span className="text-[#768692]">Kontak Langsung:</span>
                <a
                  href={`tel:${waNumber}`}
                  className="font-bold text-[#1E2E3E] hover:text-[#C9A86A] transition-colors flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5 text-[#C9A86A]" />
                  <span>+{waNumber.slice(0, 2)} {waNumber.slice(2, 6)}-{waNumber.slice(6, 10)}-{waNumber.slice(10)}</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
