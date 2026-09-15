import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  ExternalLink,
  Music,
  Gift,
  Send,
  Camera,
  Check,
  User,
  Users,
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingInvitationSnippet: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'cover' | 'couple' | 'events' | 'gallery' | 'gift'>('cover');

  const tabs = [
    { id: 'cover', label: '1. Layar Pembuka Arch', icon: Sparkles },
    { id: 'couple', label: '2. Profil Mempelai', icon: Users },
    { id: 'events', label: '3. Akad & Resepsi', icon: Calendar },
    { id: 'gallery', label: '4. Galeri Kenangan', icon: Camera },
    { id: 'gift', label: '5. Amplop & RSVP', icon: Gift },
  ] as const;

  return (
    <section id="cuplikan" className="py-20 sm:py-28 bg-[#F7F2EA] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cuplikan Contoh Undangan</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
            Desain Mewah di Setiap Sentuhan Layar
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Klik tab di bawah untuk melihat cuplikan bagian-bagian utama dari undangan pernikahan nyata yang dibuat dengan KU UNDANG.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10"
        >
          {tabs.map((tab) => {
            const IconComp = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <motion.button
                key={tab.id}
                type="button"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-lg scale-105 border border-[#C2A56B]'
                    : 'bg-[#FFFCF7] text-[#768692] hover:text-[#283D52] hover:bg-[#EFE8DE] border border-[#C2A56B]/30'
                }`}
              >
                <IconComp className={`w-4 h-4 ${isActive ? 'text-[#C2A56B]' : 'text-[#768692]'}`} />
                <span>{tab.label}</span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Preview Container Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto rounded-3xl bg-[#FFFCF7] border-2 border-[#C2A56B]/40 p-5 sm:p-8 md:p-10 shadow-2xl relative"
        >
          {/* Top Decorative Vintage Corner Marks */}
          <div className="flex items-center justify-between border-b border-[#C2A56B]/30 pb-4 mb-6 text-xs text-[#768692]">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#DFBFC1]" />
              <span className="w-3 h-3 rounded-full bg-[#C2A56B]" />
              <span className="w-3 h-3 rounded-full bg-[#283D52]" />
              <span className="ml-2 font-mono text-[11px] text-[#283D52]">KU UNDANG Live Frame Preview</span>
            </div>
            <Link
              to="/april-siti"
              className="inline-flex items-center gap-1.5 font-bold text-[#283D52] hover:text-[#C2A56B] transition-colors"
            >
              <span>Buka Demo Penuh</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
            </Link>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === 'cover' && (
              <motion.div
                key="cover"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Arch Cover */}
                <div className="md:col-span-6 flex justify-center">
                  <div className="w-full max-w-[280px] h-[400px] rounded-t-[100px] rounded-b-[24px] overflow-hidden border-4 border-[#FFFCF7] ring-2 ring-[#C2A56B]/80 relative shadow-xl bg-[#1C2D27] flex flex-col justify-between p-4 text-center">
                    <img
                      src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop"
                      alt="Cover"
                      className="absolute inset-0 w-full h-full object-cover object-center brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-[#182736]/80 via-[#1E3042]/70 to-[#162330]/90 pointer-events-none" />

                    <div className="relative z-10 pt-2">
                      <span className="text-[9px] uppercase tracking-widest text-[#EAD99B]">The Wedding Of</span>
                      <h4 className="font-heading text-xl font-bold uppercase text-[#FFFCF7] my-0.5">
                        April <span className="font-accent text-xl text-[#C2A56B]">&</span> Siti
                      </h4>
                      <p className="text-[10px] text-[#FFFCF7]/80">17 · 09 · 2021</p>
                    </div>

                    <div className="relative z-10 bg-[#FFFCF7]/95 rounded-xl p-2.5 my-auto border border-[#C2A56B]/60 shadow-lg text-[#283D52]">
                      <p className="text-[9px] text-[#768692] italic">Kepada Yth:</p>
                      <p className="font-heading text-sm font-bold truncate">Tamu Undangan Terhormat</p>
                      <span className="inline-block mt-1 text-[8px] bg-[#DFBFC1]/30 px-2 py-0.5 rounded-full text-[#283D52]">
                        Tamu Terhormat
                      </span>
                    </div>

                    <div className="relative z-10 pb-1">
                      <div className="py-2 px-3 rounded-xl bg-gradient-to-r from-[#C2A56B] via-[#E8C288] to-[#C2A56B] text-[#1C2D27] text-[10px] font-bold tracking-wider uppercase flex items-center justify-center gap-1.5 shadow-md">
                        <span>BUKA UNDANGAN</span>
                        <Heart className="w-3 h-3 text-[#8A0B1E] fill-[#8A0B1E]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Explanation */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2A56B]">Layar Pembuka Signature</span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
                    Arsitektur Frame Arch yang Mengagumkan
                  </h3>
                  <p className="text-sm text-[#768692] leading-relaxed">
                    Setiap tamu disambut dengan frame lengkung foto seukuran layar penuh.
                    Nama penerima dicetak otomatis dengan tipografi premium, dan saat tombol emas ditekan,
                    frame meluncur ke atas secara sinematik sembari memutar alunan musik romantis.
                  </p>
                  <ul className="space-y-2 text-xs text-[#283D52] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Tombol Buka Undangan selalu konsisten dan kokoh
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Personalisasi nama langsung lewat parameter URL (?to=)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Efek meluncur kartu halus tanpa lag
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/april-siti"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2E3E] transition-all"
                    >
                      <span>Coba Buka Undangan Ini</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'couple' && (
              <motion.div
                key="couple"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Couple Portraits */}
                <div className="md:col-span-6 grid grid-cols-2 gap-3">
                  <div className="rounded-3xl p-3 bg-[#EFE8DE] border border-[#C2A56B]/30 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#C2A56B] mb-2 shadow-md">
                      <img
                        src="https://lh3.googleusercontent.com/d/1qr9VPrFkya17qAU_kLtpYBLSktn3mBzG"
                        alt="Groom"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="font-heading text-sm font-bold text-[#283D52]">April</h5>
                    <p className="text-[10px] text-[#C2A56B] font-semibold">Apriliyanto Ratih Sukarno</p>
                    <p className="text-[9px] text-[#768692] mt-1">Putra Bpk. Imam Sodik & Ibu Rofiatin (Kediri)</p>
                  </div>

                  <div className="rounded-3xl p-3 bg-[#EFE8DE] border border-[#C2A56B]/30 text-center">
                    <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#C2A56B] mb-2 shadow-md">
                      <img
                        src="https://lh3.googleusercontent.com/d/17Mkq-ytzCKMJSM5jYUwfosOabtLLdUJz"
                        alt="Bride"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h5 className="font-heading text-sm font-bold text-[#283D52]">Siti</h5>
                    <p className="text-[10px] text-[#C2A56B] font-semibold">Siti Nurjannah</p>
                    <p className="text-[9px] text-[#768692] mt-1">Putri Bpk. Poniman & Ibu Ngatenah (Sidoarjo)</p>
                  </div>
                </div>

                {/* Explanation */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2A56B]">Profil Pasangan Berbahagia</span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
                    Presentasi Dua Hati yang Saling Memilih
                  </h3>
                  <p className="text-sm text-[#768692] leading-relaxed">
                    Sesi profil mempelai menampilkan foto portrait kedua calon pengantin, nama lengkap dengan gelar,
                    silsilah keluarga tercinta, dan alamat asal mempelai dengan estetika minimalis modern.
                  </p>
                  <ul className="space-y-2 text-xs text-[#283D52] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Ornamen sudut klasik bermotif floral vintage
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Kutipan ayat suci & doa pernikahan yang mendalam
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/april-siti"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2E3E] transition-all"
                    >
                      <span>Lihat Tampilan Lengkap</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'events' && (
              <motion.div
                key="events"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Events Cards */}
                <div className="md:col-span-6 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-[#EFE8DE] border border-[#C2A56B]/40 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C2A56B]">Akad Nikah</span>
                      <h5 className="font-heading text-sm font-bold text-[#283D52]">Jumat, 17 September 2021</h5>
                      <p className="text-[11px] text-[#768692]">Pukul 08.00 WIB - Selesai</p>
                      <p className="text-[11px] text-[#283D52] mt-0.5 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#C2A56B]" /> Balonggarut, Krembung, Sidoarjo
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#283D52] text-[#FFFCF7] text-[9px] font-bold">
                      Akad
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FFFCF7] border-2 border-[#C2A56B]/60 shadow-md flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C2A56B]">Resepsi Sidoarjo</span>
                      <h5 className="font-heading text-sm font-bold text-[#283D52]">Sabtu, 18 September 2021</h5>
                      <p className="text-[11px] text-[#768692]">Pukul 09.00 WIB - Selesai</p>
                      <p className="text-[11px] text-[#283D52] mt-0.5 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#C2A56B]" /> Rumah Mempelai Wanita, Sidoarjo
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#C2A56B] text-[#1C2D27] text-[9px] font-bold">
                      Resepsi 1
                    </span>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EFE8DE] border border-[#C2A56B]/40 flex items-start justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-bold text-[#C2A56B]">Resepsi Kediri</span>
                      <h5 className="font-heading text-sm font-bold text-[#283D52]">Minggu, 19 September 2021</h5>
                      <p className="text-[11px] text-[#768692]">Pukul 09.00 WIB - Selesai</p>
                      <p className="text-[11px] text-[#283D52] mt-0.5 flex items-center gap-1 font-medium">
                        <MapPin className="w-3 h-3 text-[#C2A56B]" /> Kandangan, Kandangan, Kediri
                      </p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-[#283D52] text-[#FFFCF7] text-[9px] font-bold">
                      Resepsi 2
                    </span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2A56B]">Jadwal & Lokasi Acara</span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
                    Petunjuk Waktu & Navigasi Presisi
                  </h3>
                  <p className="text-sm text-[#768692] leading-relaxed">
                    Tamu dapat melihat hitung mundur waktu pernikahan, detail sesi Akad maupun Resepsi di dua lokasi keluarga,
                    serta langsung membuka aplikasi Google Maps untuk rute perjalanan dan petunjuk parkir.
                  </p>
                  <ul className="space-y-2 text-xs text-[#283D52] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Rangkaian acara multi-sesi lengkap (Akad, Resepsi 1, Resepsi 2)
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Tombol "Simpan ke Google Calendar" untuk pengingat otomatis
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/april-siti"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2E3E] transition-all"
                    >
                      <span>Lihat Tampilan Jadwal</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'gallery' && (
              <motion.div
                key="gallery"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Gallery Grid */}
                <div className="md:col-span-6 grid grid-cols-3 gap-2">
                  <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
                    alt="Memory 1"
                    className="rounded-2xl h-28 w-full object-cover shadow-xs hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=400&auto=format&fit=crop"
                    alt="Memory 2"
                    className="rounded-2xl h-28 w-full object-cover shadow-xs hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=400&auto=format&fit=crop"
                    alt="Memory 3"
                    className="rounded-2xl h-28 w-full object-cover shadow-xs hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop"
                    alt="Memory 4"
                    className="rounded-2xl h-28 w-full object-cover shadow-xs hover:scale-105 transition-transform col-span-2"
                  />
                  <img
                    src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=400&auto=format&fit=crop"
                    alt="Memory 5"
                    className="rounded-2xl h-28 w-full object-cover shadow-xs hover:scale-105 transition-transform"
                  />
                </div>

                {/* Explanation */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2A56B]">Galeri & Kisah Cinta</span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
                    Koleksi Potret Kenangan Sinematik
                  </h3>
                  <p className="text-sm text-[#768692] leading-relaxed">
                    Bagikan momen prewedding dan perjalanan cinta dengan galeri foto berbingkai mewah.
                    Tamu dapat memperbesar setiap foto dalam modal lightbox resolusi tinggi.
                  </p>
                  <ul className="space-y-2 text-xs text-[#283D52] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Efek partikel bunga melayang di background sesi
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Timeline lelampahan tresna dengan tahun dan cerita bermakna
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/april-siti"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2E3E] transition-all"
                    >
                      <span>Lihat Galeri Lengkap</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'gift' && (
              <motion.div
                key="gift"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
              >
                {/* Visual Gift Card */}
                <div className="md:col-span-6 space-y-3">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-[#283D52] to-[#1E2E3E] text-[#FFFCF7] border border-[#C2A56B]/40 shadow-xl relative overflow-hidden">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-[#C2A56B]">BCA DIGITAL</span>
                      <Gift className="w-4 h-4 text-[#C2A56B]" />
                    </div>
                    <p className="font-mono text-base tracking-widest font-bold text-[#FFFCF7]">8295 1234 56</p>
                    <div className="flex justify-between items-end mt-3">
                      <div>
                        <p className="text-[9px] text-[#768692] uppercase">Atas Nama</p>
                        <p className="text-xs font-semibold text-[#FFFCF7]">Apriliyanto Ratih Sukarno</p>
                      </div>
                      <span className="px-2 py-1 rounded bg-[#C2A56B] text-[#1C2D27] text-[10px] font-bold">
                        Salin Rekening
                      </span>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl bg-[#EFE8DE] border border-[#C2A56B]/30 flex items-center justify-between text-xs text-[#283D52]">
                    <div className="flex items-center gap-2">
                      <Send className="w-4 h-4 text-[#C2A56B]" />
                      <span>Form RSVP & Doa Restu Realtime</span>
                    </div>
                    <span className="font-bold text-[#C2A56B]">Aktif</span>
                  </div>
                </div>

                {/* Explanation */}
                <div className="md:col-span-6 space-y-4 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#C2A56B]">Tanda Kasih & Doa Tamu</span>
                  <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#283D52]">
                    Amplop Digital & Konfirmasi Kehadiran
                  </h3>
                  <p className="text-sm text-[#768692] leading-relaxed">
                    Tamu yang berhalangan hadir dapat mengirim kado tanda kasih dengan nomor rekening bank
                    yang dapat disalin dalam 1 klik atau melalui QRIS. Buku tamu realtime menampilkan doa restu tulus dari keluarga dan sahabat.
                  </p>
                  <ul className="space-y-2 text-xs text-[#283D52] font-medium">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Notifikasi salin nomor rekening otomatis
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#C2A56B]" /> Fitur kirim kado fisik via alamat rumah
                    </li>
                  </ul>
                  <div className="pt-2">
                    <Link
                      to="/april-siti"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#283D52] text-[#FFFCF7] text-xs font-bold uppercase tracking-wider hover:bg-[#1E2E3E] transition-all"
                    >
                      <span>Coba Fitur Amplop & RSVP</span>
                      <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
