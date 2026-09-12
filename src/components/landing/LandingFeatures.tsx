import React from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Heart,
  Globe2,
  Music,
  Gift,
  Calendar,
  Send,
  Camera,
  Layers,
  CheckCircle2,
  Compass,
} from 'lucide-react';

export const LandingFeatures: React.FC = () => {
  const features = [
    {
      id: 'arch-frame',
      title: 'Frame Foto Arch Sinematik',
      desc: 'Desain cover pembuka selayar penuh dengan model bingkai lengkung mewah, efek pencahayaan romantis, dan ornamen sudut floral klasik.',
      badge: 'Signature Design',
      icon: Layers,
      color: '#C2A56B',
    },
    {
      id: 'multi-lang',
      title: '5 Pilihan Bahasa Dinamis',
      desc: 'Mendukung Bahasa Indonesia, English, Basa Jawa (Krama Inggil), 日本語, dan 中文 dengan perpindahan bahasa instan tanpa memuat ulang halaman.',
      badge: 'Multilingual',
      icon: Globe2,
      color: '#283D52',
    },
    {
      id: 'particles',
      title: 'Partikel Romantis Kelopak & Hati',
      desc: 'Animasi kelopak sakura, mawar, dan kilau emas yang melayang lembut dengan ayunan alami di latar belakang sesi-sesi utama.',
      badge: 'Visual Effects',
      icon: Heart,
      color: '#DFBFC1',
    },
    {
      id: 'rsvp-guestbook',
      title: 'RSVP & Buku Tamu Realtime',
      desc: 'Konfirmasi kehadiran jumlah tamu, pesan doa restu, serta statistik kehadiran yang langsung terekap ke dasbor manajemen admin.',
      badge: 'Interactive',
      icon: Send,
      color: '#C2A56B',
    },
    {
      id: 'digital-gift',
      title: 'Amplop Digital & QRIS Interaktif',
      desc: 'Kemudahan bagi tamu untuk memberikan tanda kasih melalui transfer bank (BCA, Mandiri, dll) dengan fitur salin rekening dan kode QRIS.',
      badge: 'Fintech Ready',
      icon: Gift,
      color: '#283D52',
    },
    {
      id: 'music-player',
      title: 'Pemutar Musik Romantis Latar',
      desc: 'Musik latar autoplay lembut saat tamu membuka undangan, dilengkapi floating controller yang dapat diputar dan dihentikan kapan saja.',
      badge: 'Audio Ambience',
      icon: Music,
      color: '#DFBFC1',
    },
    {
      id: 'love-story-gallery',
      title: 'Kisah Cinta & Galeri Kenangan',
      desc: 'Timeline perjalanan cinta dari pertama kali bertemu hingga pelaminan, dipadukan galeri foto grid editorial yang memanjakan mata.',
      badge: 'Memory Keeper',
      icon: Camera,
      color: '#C2A56B',
    },
    {
      id: 'maps-countdown',
      title: 'Navigasi Peta & Pengingat Kalender',
      desc: 'Hitung mundur hari bahagia presisi per detik, integrasi Google Maps navigasi rute ke venue, dan tombol simpan ke Google Calendar.',
      badge: 'Smart Utility',
      icon: Compass,
      color: '#283D52',
    },
  ];

  return (
    <section id="fitur" className="py-20 sm:py-28 bg-[#FFFCF7] border-y border-[#C2A56B]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8DE] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Kelebihan Eksklusif KU UNDANG</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
            Fitur Canggih untuk Undangan Pernikahan Tanpa Cela
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Setiap elemen dirancang untuk menciptakan kesan pertama yang anggun, memudahkan tamu,
            serta memberikan kontrol penuh bagi kedua calon mempelai.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {features.map((f, idx) => {
            const IconComp = f.icon;
            return (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: idx * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="group relative rounded-3xl p-6 sm:p-7 bg-[#F7F2EA]/60 hover:bg-[#F7F2EA] border border-[#C2A56B]/30 hover:border-[#C2A56B] shadow-xs hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/40 flex items-center justify-center text-[#283D52] group-hover:scale-110 group-hover:text-[#C2A56B] transition-all shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-[#EFE8DE] text-[#283D52] border border-[#C2A56B]/20">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#283D52] group-hover:text-[#C2A56B] transition-colors leading-snug">
                    {f.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#768692] leading-relaxed font-sans">
                    {f.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#C2A56B]/20 flex items-center gap-1.5 text-xs font-semibold text-[#283D52]">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C2A56B]" />
                  <span>Fitur Aktif di Demo</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
