import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Globe2,
  Music,
  Gift,
  ShieldCheck,
  ChevronDown,
  Layers,
  Sparkle,
} from 'lucide-react';

export const LandingHero: React.FC = () => {
  // Illustration card tab state (Purely visual presentation, NO hyperlinks)
  const [activeTab, setActiveTab] = useState<'cover' | 'couple' | 'events'>('cover');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 sm:pt-14 sm:pb-24 lg:pt-16 lg:pb-28 bg-[#F7F2EA]">
      {/* Background Subtle Patterns & Romantic Radial Accents */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: `radial-gradient(rgba(194, 165, 107, 0.25) 1.5px, transparent 1.5px), radial-gradient(rgba(40, 61, 82, 0.08) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          backgroundPosition: '0 0, 16px 16px',
        }}
      />
      <div className="absolute top-12 left-1/4 w-96 h-96 rounded-full bg-[#DFBFC1]/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-[#C2A56B]/20 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Copywriting & Feature Highlights */}
          <div className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left">
            {/* Pill Tag */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/40 shadow-xs mb-5"
            >
              <Sparkles className="w-4 h-4 text-[#C2A56B]" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#283D52]">
                Platform Undangan Pernikahan Digital Eksklusif
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="font-heading text-4xl sm:text-5xl md:text-6xl text-[#283D52] font-bold leading-[1.14] tracking-tight"
            >
              Abadikan Momen Sakral dalam{' '}
              <span className="text-[#C2A56B] font-accent text-5xl sm:text-6xl md:text-7xl font-normal lowercase block sm:inline">
                kemewahan cinta
              </span>{' '}
              yang Tak Terlupakan.
            </motion.h1>

            {/* Subheading */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-5 text-base sm:text-lg text-[#768692] leading-relaxed max-w-2xl font-sans"
            >
              <strong>KU UNDANG</strong> menghadirkan pengalaman undangan web modern bergaya klasik elegan.
              Menampilkan preset tema <strong>April & Siti</strong> dengan bingkai arch sinematik, taburan kelopak bunga,
              multibahasa (termasuk Basa Jawa Krama), RSVP buku tamu, serta kemudahan tanda kasih digital.
            </motion.p>

            {/* Quick Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-3.5 w-full"
            >
              <motion.a
                href="#pesan"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-sm font-bold tracking-wide shadow-md hover:shadow-xl transition-all cursor-pointer group"
              >
                <span>Pesan via WhatsApp (0821-1444-5631)</span>
              </motion.a>
              <motion.a
                href="#cuplikan"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#1E2E3E] hover:bg-[#15222E] text-[#FAF7F2] text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4 text-[#C9A86A]" />
                <span>Lihat Cuplikan Undangan</span>
              </motion.a>
            </motion.div>

            {/* Key Feature Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl text-left"
            >
              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-[#FFFCF7]/90 border border-[#C2A56B]/30 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[#283D52] font-semibold text-xs mb-1">
                  <Globe2 className="w-3.5 h-3.5 text-[#C2A56B]" />
                  <span>5 Bahasa</span>
                </div>
                <p className="text-[11px] text-[#768692]">ID, Jawa Krama, EN, JA, ZH</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-[#FFFCF7]/90 border border-[#C2A56B]/30 shadow-xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[#283D52] font-semibold text-xs mb-1">
                  <Music className="w-3.5 h-3.5 text-[#C2A56B]" />
                  <span>Autoplay Musik</span>
                </div>
                <p className="text-[11px] text-[#768692]">Canon in D Romantis</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                className="p-3 rounded-2xl bg-[#FFFCF7]/90 border border-[#C2A56B]/30 shadow-xs col-span-2 sm:col-span-1 transition-shadow hover:shadow-md"
              >
                <div className="flex items-center gap-2 text-[#283D52] font-semibold text-xs mb-1">
                  <Gift className="w-3.5 h-3.5 text-[#C2A56B]" />
                  <span>Amplop Digital</span>
                </div>
                <p className="text-[11px] text-[#768692]">Bank, QRIS, & Kado Fisik</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Column: Pure SVG & Graphic Art Illustration (No Hyperlinks) */}
          <div className="lg:col-span-5 flex flex-col items-center">
            {/* View Selector Tabs within the Illustration */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex items-center p-1 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/40 shadow-sm mb-4"
            >
              <button
                type="button"
                onClick={() => setActiveTab('cover')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'cover'
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                    : 'text-[#768692] hover:text-[#283D52]'
                }`}
              >
                Sampul (Cover)
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('couple')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'couple'
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                    : 'text-[#768692] hover:text-[#283D52]'
                }`}
              >
                Mempelai
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('events')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === 'events'
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                    : 'text-[#768692] hover:text-[#283D52]'
                }`}
              >
                Rantaman Acara
              </button>
            </motion.div>

            {/* Illustration Frame Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-[340px] sm:max-w-[370px]"
            >
              {/* Floating Decorative Micro-Badge 1 */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                animate={{ y: [0, -6, 0] }}
                className="hidden sm:flex absolute -left-7 top-20 z-30 items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#FFFCF7] text-[#283D52] shadow-xl border border-[#C2A56B]/50 text-[11px] font-semibold select-none"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <Heart className="w-3 h-3 text-[#DFBFC1] fill-[#DFBFC1]" />
                <span>Arch Emas Sinematik</span>
              </motion.div>

              {/* Floating Decorative Micro-Badge 2 */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.7 }}
                animate={{ y: [0, 6, 0] }}
                className="hidden sm:flex absolute -right-7 bottom-24 z-30 items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#FFFCF7] text-[#283D52] shadow-xl border border-[#C2A56B]/50 text-[11px] font-semibold select-none"
              >
                <Sparkles className="w-3 h-3 text-[#C2A56B]" />
                <span>RSVP & Musik Latar</span>
              </motion.div>
              {/* Soft Ambient Shadow Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#C2A56B]/25 via-[#DFBFC1]/25 to-transparent blur-2xl rounded-[52px] pointer-events-none" />

              {/* Physical Mockup Device Outer Shell */}
              <div className="relative rounded-[46px] p-3.5 bg-gradient-to-b from-[#3E4F63] via-[#203142] to-[#14202C] shadow-2xl border-2 border-[#C2A56B]/40 ring-1 ring-white/30">
                {/* Phone Notch & Sensor Bar */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#14202C] rounded-full z-20 flex items-center justify-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#203142] mr-2" />
                  <div className="w-8 h-1 rounded-full bg-[#203142]" />
                </div>

                {/* Inner Illustration Canvas */}
                <div className="relative rounded-[36px] overflow-hidden bg-[#182736] text-[#FFFCF7] aspect-[9/18.5] flex flex-col justify-between p-5 pt-9 select-none shadow-inner border border-white/10">
                  {/* Decorative Background Artwork */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#1C2C3D] via-[#23374B] to-[#162432]" />

                  {/* SVG Arch Outline Decoration */}
                  <svg
                    className="absolute inset-0 w-full h-full pointer-events-none opacity-20"
                    viewBox="0 0 340 680"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M 20 660 V 160 A 150 150 0 0 1 320 160 V 660"
                      stroke="#C2A56B"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 32 660 V 165 A 138 138 0 0 1 308 165 V 660"
                      stroke="#FFFCF7"
                      strokeWidth="0.8"
                    />
                    {/* Floral corner motifs in SVG */}
                    <circle cx="170" cy="40" r="16" stroke="#C2A56B" strokeWidth="1" />
                    <circle cx="170" cy="40" r="8" fill="#C2A56B" fillOpacity="0.4" />
                    <path d="M 160 40 Q 170 20 180 40 Q 170 60 160 40" fill="#DFBFC1" fillOpacity="0.6" />
                    <path d="M 170 30 Q 190 40 170 50 Q 150 40 170 30" fill="#DFBFC1" fillOpacity="0.6" />
                  </svg>

                  {/* TAB 1: COVER ILLUSTRATION */}
                  {activeTab === 'cover' && (
                    <motion.div
                      key="cover"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 flex flex-col justify-between h-full text-center"
                    >
                      {/* Header Badge */}
                      <div className="flex flex-col items-center">
                        <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#FFFCF7]/15 border border-[#C2A56B]/60 backdrop-blur-md text-[9px] font-semibold tracking-widest text-[#EAD99B] uppercase">
                          <Sparkles className="w-2.5 h-2.5 text-[#C2A56B]" />
                          THE WEDDING OF
                        </span>
                        <h3 className="font-heading text-2xl sm:text-3xl font-bold uppercase tracking-wide text-[#FFFCF7] mt-1.5">
                          APRIL <span className="font-accent text-3xl text-[#C2A56B] lowercase font-normal">&</span> SITI
                        </h3>
                        <div className="flex items-center justify-center gap-2 text-[10px] text-[#FFFCF7]/80 font-mono mt-1">
                          <Calendar className="w-3 h-3 text-[#C2A56B]" />
                          <span>17 · 09 · 2021</span>
                        </div>
                      </div>

                      {/* Center Decorative Arch Portrait Vector */}
                      <div className="my-auto py-2 flex flex-col items-center">
                        <div className="relative w-36 h-48 sm:w-40 sm:h-52 rounded-t-full rounded-b-xl border-2 border-[#C2A56B]/60 p-1 bg-[#1E3042]/80 shadow-lg overflow-hidden flex flex-col items-center justify-center">
                          {/* Stylized Silhouette / Vector Couple Graphic */}
                          <div className="w-20 h-20 rounded-full bg-[#C2A56B]/20 border border-[#C2A56B]/40 flex items-center justify-center mb-2">
                            <Heart className="w-9 h-9 text-[#DFBFC1] fill-[#DFBFC1]/40" />
                          </div>
                          <span className="font-accent text-2xl text-[#C2A56B]">April & Siti</span>
                          <span className="text-[9px] text-[#FFFCF7]/70 uppercase tracking-widest mt-1">
                            Kediri & Sidoarjo
                          </span>

                          {/* Botanical Sprig SVG on Bottom */}
                          <div className="absolute bottom-1 w-full flex justify-center opacity-60">
                            <Sparkle className="w-3 h-3 text-[#C2A56B]" />
                          </div>
                        </div>

                        {/* Guest Badge Placeholder */}
                        <div className="mt-3 w-full max-w-[220px] bg-[#FFFCF7]/90 backdrop-blur-md rounded-xl p-2 border border-[#C2A56B]/50 shadow-md text-center">
                          <p className="text-[8px] text-[#768692] uppercase tracking-wider">Kepada Yth:</p>
                          <p className="text-[11px] font-bold text-[#283D52] truncate">Tamu Undangan Terhormat</p>
                        </div>
                      </div>

                      {/* Bottom Visual Stamp */}
                      <div className="flex flex-col items-center pt-2">
                        <div className="w-full py-2 px-3 rounded-xl bg-gradient-to-r from-[#C2A56B] via-[#DFBFC1] to-[#C2A56B] text-[#1E2E3E] text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md">
                          <Heart className="w-3 h-3 text-[#1E2E3E] fill-current" />
                          <span>ILUSTRASI TAMPILAN RESMI</span>
                        </div>
                        <p className="text-[8px] text-[#FFFCF7]/60 mt-1.5">
                          Eksklusif dibuat dengan KU UNDANG Studio
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 2: COUPLE PROFILE ILLUSTRATION */}
                  {activeTab === 'couple' && (
                    <motion.div
                      key="couple"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 flex flex-col justify-between h-full text-center"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-accent text-2xl text-[#C2A56B]">The Happy Couple</span>
                        <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-[#FFFCF7]">
                          Mempelai Pengantin
                        </h4>
                      </div>

                      <div className="my-auto space-y-3 py-1 text-left">
                        {/* Bride Card */}
                        <div className="p-2.5 rounded-xl bg-[#FFFCF7]/95 text-[#283D52] border border-[#C2A56B]/40 shadow-xs">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-[#C2A56B]">
                            Mempelai Wanita
                          </span>
                          <h5 className="font-heading text-sm font-bold text-[#283D52]">Siti Nurjannah</h5>
                          <p className="text-[9px] text-[#768692] leading-tight mt-0.5">
                            Putri dari Bapak Poniman & Ibu Ngatenah
                          </p>
                          <p className="text-[8px] text-[#283D52]/80 mt-1 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-[#C2A56B]" /> Desa Balonggarut, Krembung, Sidoarjo
                          </p>
                        </div>

                        {/* Groom Card */}
                        <div className="p-2.5 rounded-xl bg-[#FFFCF7]/95 text-[#283D52] border border-[#C2A56B]/40 shadow-xs">
                          <span className="text-[8px] uppercase tracking-wider font-bold text-[#C2A56B]">
                            Mempelai Pria
                          </span>
                          <h5 className="font-heading text-sm font-bold text-[#283D52]">Apriliyanto Ratih Sukarno</h5>
                          <p className="text-[9px] text-[#768692] leading-tight mt-0.5">
                            Putra dari Bapak Imam Sodik & Ibu Rofiatin
                          </p>
                          <p className="text-[8px] text-[#283D52]/80 mt-1 flex items-center gap-1">
                            <MapPin className="w-2.5 h-2.5 text-[#C2A56B]" /> Desa Kandangan, Kandangan, Kediri
                          </p>
                        </div>
                      </div>

                      <div className="pt-2 text-center">
                        <span className="inline-flex items-center gap-1 text-[9px] text-[#EAD99B] font-medium">
                          <ShieldCheck className="w-3 h-3 text-[#C2A56B]" /> Data Terverifikasi Keluarga
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* TAB 3: EVENTS ILLUSTRATION */}
                  {activeTab === 'events' && (
                    <motion.div
                      key="events"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 flex flex-col justify-between h-full text-center"
                    >
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-accent text-2xl text-[#C2A56B]">Rangkaian Acara</span>
                        <h4 className="font-heading text-lg font-bold uppercase tracking-wider text-[#FFFCF7]">
                          Akad & Resepsi
                        </h4>
                      </div>

                      <div className="my-auto space-y-2 py-1 text-left">
                        {/* Akad */}
                        <div className="p-2 rounded-xl bg-[#FFFCF7]/95 text-[#283D52] border border-[#C2A56B]/40">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase text-[#C2A56B]">Akad Nikah</span>
                            <span className="text-[8px] font-mono bg-[#EFE8DE] px-1.5 py-0.5 rounded text-[#283D52]">
                              17 Sep 2021
                            </span>
                          </div>
                          <p className="text-[9px] font-semibold text-[#283D52] mt-0.5">08.00 WIB - Selesai</p>
                          <p className="text-[8px] text-[#768692]">Desa Balonggarut, Kec. Krembung, Kab. Sidoarjo</p>
                        </div>

                        {/* Resepsi Sidoarjo */}
                        <div className="p-2 rounded-xl bg-[#FFFCF7]/95 text-[#283D52] border border-[#C2A56B]/40">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase text-[#C2A56B]">Resepsi 1 (Wanita)</span>
                            <span className="text-[8px] font-mono bg-[#EFE8DE] px-1.5 py-0.5 rounded text-[#283D52]">
                              18 Sep 2021
                            </span>
                          </div>
                          <p className="text-[9px] font-semibold text-[#283D52] mt-0.5">09.00 WIB - Selesai</p>
                          <p className="text-[8px] text-[#768692]">Desa Balonggarut, Kec. Krembung, Kab. Sidoarjo</p>
                        </div>

                        {/* Resepsi Kediri */}
                        <div className="p-2 rounded-xl bg-[#FFFCF7]/95 text-[#283D52] border border-[#C2A56B]/40">
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold uppercase text-[#C2A56B]">Resepsi 2 (Pria)</span>
                            <span className="text-[8px] font-mono bg-[#EFE8DE] px-1.5 py-0.5 rounded text-[#283D52]">
                              19 Sep 2021
                            </span>
                          </div>
                          <p className="text-[9px] font-semibold text-[#283D52] mt-0.5">09.00 WIB - Selesai</p>
                          <p className="text-[8px] text-[#768692]">Desa Kandangan, Kec. Kandangan, Kab. Kediri</p>
                        </div>
                      </div>

                      <div className="pt-2 text-center">
                        <span className="text-[8px] text-[#FFFCF7]/70">
                          Dilengkapi panduan Google Maps & Kalender Digital
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Decorative Pill Label Below Illustration */}
              <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#768692]">
                <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
                <span className="italic">Ilustrasi tampilan template resmi April & Siti</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
