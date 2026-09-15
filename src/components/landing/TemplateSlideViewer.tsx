import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Heart,
  Calendar,
  MapPin,
  Flame,
  Zap,
  Gamepad2,
  Users,
  Image as ImageIcon,
  Gift,
  MailOpen,
  Music,
} from 'lucide-react';

export interface TemplateThemeItem {
  id: string;
  name: string;
  category: string;
  tag: string;
  accentColor: string;
  bgColor: string;
  desc: string;
  liveUrl: string;
  previewBtnText: string;
}

interface TemplateSlideViewerProps {
  theme: TemplateThemeItem;
  isSelected?: boolean;
}

export const TemplateSlideViewer: React.FC<TemplateSlideViewerProps> = ({
  theme,
  isSelected = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const groomPhoto = 'https://lh3.googleusercontent.com/d/1qr9VPrFkya17qAU_kLtpYBLSktn3mBzG';
  const bridePhoto = 'https://lh3.googleusercontent.com/d/17Mkq-ytzCKMJSM5jYUwfosOabtLLdUJz';

  const isSeri = theme.id === 'seri-malaysia';
  const isBotanica = theme.id === 'fleur-botanica';
  const isMario = theme.id === 'super-mario';
  const isP5 = theme.id === 'persona-5';
  const isJawa = theme.id === 'javanese-royal';
  const isCute = theme.id === 'cute-pink-floral';

  // 4 Standard Slide Sections
  const slideTabs = [
    { label: 'Sampul', icon: MailOpen },
    { label: 'Mempelai', icon: Users },
    { label: 'Acara', icon: Calendar },
    { label: isSeri || isMario ? 'Game 2D' : 'Galeri & Doa', icon: isMario ? Gamepad2 : isSeri ? Sparkles : ImageIcon },
  ];

  // Auto-advance slides every 5 seconds if not hovered
  useEffect(() => {
    if (isHovered) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 5000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev === 0 ? 3 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const handleSelectSlide = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSlide(idx);
  };

  return (
    <div
      className="w-full flex flex-col gap-2.5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Main Slide Viewport */}
      <div
        className="w-full aspect-[9/13] rounded-2xl overflow-hidden relative shadow-inner border border-white/10 select-none group/slide"
        style={{ backgroundColor: theme.bgColor }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${theme.id}-${currentSlide}`}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="absolute inset-0 p-3.5 sm:p-4 flex flex-col justify-between overflow-hidden"
          >
            {/* Top Bar on Slide: Section badge & Theme icon */}
            <div className="relative z-20 flex justify-between items-center">
              <span
                className={`text-[8.5px] sm:text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full shadow-xs ${
                  isSeri
                    ? 'bg-[#D7BB83] text-[#4C030A] font-serif border border-[#FFF9F4]'
                    : isBotanica
                    ? 'bg-[#BDA06C] text-[#1E2A20] font-serif border border-[#E0D0B5]'
                    : isMario
                    ? 'bg-[#E60012] text-white font-mono border border-white'
                    : isP5
                    ? 'bg-[#E60012] text-white -skew-x-6 border border-white'
                    : isJawa
                    ? 'bg-[#D4AF37] text-[#1A1009] border border-[#E5C158]'
                    : isCute
                    ? 'bg-[#FF5C8D] text-white border border-[#FFA3B8]'
                    : 'bg-white/20 text-[#FFFCF7] border border-white/20'
                }`}
              >
                {currentSlide + 1}/4 • {slideTabs[currentSlide].label}
              </span>

              <div className="flex items-center gap-1">
                {isSeri ? (
                  <span className="text-xs">👑</span>
                ) : isBotanica ? (
                  <span className="text-xs">🌿</span>
                ) : isMario ? (
                  <Gamepad2 className="w-4 h-4 text-[#FFE082]" />
                ) : isP5 ? (
                  <Flame className="w-4 h-4 text-[#FFF000]" />
                ) : isJawa ? (
                  <span className="text-xs">⚜️</span>
                ) : isCute ? (
                  <span className="text-xs">🌸</span>
                ) : (
                  <Heart className="w-3.5 h-3.5" style={{ color: theme.accentColor, fill: theme.accentColor }} />
                )}
              </div>
            </div>

            {/* ============================================================
                SLIDE CONTENTS ACCORDING TO CURRENT SLIDE & THEME
            ============================================================ */}

            {/* --- SLIDE 0: SAMPUL PEMBUKA (COVER SCREEN) --- */}
            {currentSlide === 0 && (
              <>
                {/* Visual background layers */}
                {isSeri && (
                  <div className="absolute inset-0">
                    <img
                      src="/templates/seri-malaysia/cover-garden.jpg"
                      alt="Taman Senja"
                      className="w-full h-full object-cover opacity-35 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#3A0207] via-black/40 to-transparent" />
                  </div>
                )}

                {isBotanica && (
                  <div className="absolute inset-0 pointer-events-none opacity-25 flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-32 h-32 stroke-[#BDA06C] fill-none" strokeWidth="1.2">
                      <circle cx="50" cy="50" r="42" strokeDasharray="3 2" />
                      <circle cx="50" cy="50" r="35" />
                      <path d="M50 20 C54 34 62 46 50 60 C38 46 46 34 50 20 Z" fill="#BDA06C" opacity="0.4" />
                    </svg>
                  </div>
                )}

                {isMario && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden font-mono">
                    <div className="absolute top-4 left-3 bg-white/70 w-14 h-4 rounded-md" />
                    <div className="absolute top-8 right-4 bg-white/60 w-10 h-3 rounded-md" />
                    <div className="absolute bottom-11 inset-x-3 flex justify-center gap-1.5 opacity-90">
                      <div className="w-5 h-5 bg-[#D85800] border border-white/60 flex items-center justify-center text-[8px] text-white font-bold">#</div>
                      <div className="w-5 h-5 bg-[#FCB42C] border border-white flex items-center justify-center text-[10px] text-black font-black animate-bounce">?</div>
                      <div className="w-5 h-5 bg-[#D85800] border border-white/60 flex items-center justify-center text-[8px] text-white font-bold">#</div>
                    </div>
                  </div>
                )}

                {isP5 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
                        backgroundSize: '14px 14px',
                      }}
                    />
                    <div className="absolute -top-12 -left-8 w-[140%] h-24 bg-[#E60012] -rotate-12 opacity-80" />
                  </div>
                )}

                {isJawa && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <svg viewBox="0 0 100 150" className="w-40 h-52 fill-[#D4AF37]">
                      <path d="M50 8 C47 22 25 50 15 80 C8 100 15 125 25 140 C35 146 65 146 75 140 C85 125 92 100 85 80 C75 50 53 22 50 8 Z" />
                    </svg>
                  </div>
                )}

                {isCute && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-35">
                    <svg viewBox="0 0 100 100" className="w-28 h-28 fill-[#FFA3B8]">
                      <circle cx="50" cy="25" r="14" />
                      <circle cx="75" cy="50" r="14" />
                      <circle cx="50" cy="75" r="14" />
                      <circle cx="25" cy="50" r="14" />
                      <circle cx="50" cy="50" r="18" fill="#FFD166" />
                    </svg>
                  </div>
                )}

                {/* Center Cover Info */}
                <div className="relative z-10 text-center my-auto px-1">
                  <p
                    className={`text-[8px] sm:text-[8.5px] uppercase tracking-[0.2em] font-mono mb-1 ${
                      isSeri
                        ? 'text-[#D7BB83] font-serif font-bold'
                        : isBotanica
                        ? 'text-[#BDA06C] font-serif'
                        : isMario
                        ? 'text-[#FFE082] font-black'
                        : isP5
                        ? 'text-[#FFF000] font-black'
                        : isJawa
                        ? 'text-[#E5C158] font-serif'
                        : isCute
                        ? 'text-[#FF5C8D] font-sans font-bold'
                        : 'text-[#FFFCF7]/70'
                    }`}
                  >
                    {isSeri
                      ? "WALIMATUL 'URSY · 2D RPG"
                      : isBotanica
                      ? 'BOTANICAL CONSERVATORY'
                      : isMario
                      ? '★ WORLD 1-1 QUEST ★'
                      : isP5
                      ? '★ CALLING CARD ★'
                      : isJawa
                      ? 'ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀'
                      : isCute
                      ? '🌸 UNDANGAN MANIS 🌸'
                      : 'The Wedding Of'}
                  </p>

                  <h4
                    className={`text-xl sm:text-2xl font-bold leading-tight ${
                      isSeri
                        ? 'font-serif text-[#FFFCF3]'
                        : isBotanica
                        ? 'font-serif text-[#FAF8F5]'
                        : isMario
                        ? 'font-mono text-white font-black tracking-tight'
                        : isP5
                        ? 'font-black uppercase italic tracking-tighter text-[#FFFCF7]'
                        : isJawa
                        ? 'font-serif text-[#FAF6EE]'
                        : isCute
                        ? 'font-heading text-[#E03164]'
                        : 'font-heading text-[#FFFCF7]'
                    }`}
                  >
                    April <span style={{ color: isMario ? '#FFE082' : theme.accentColor }}>&</span> Siti
                  </h4>

                  <p
                    className={`text-[9px] mt-1 font-mono ${
                      isSeri
                        ? 'text-[#D7BB83] font-serif'
                        : isBotanica
                        ? 'text-[#BDA06C]'
                        : isMario
                        ? 'text-[#FFE082]'
                        : isP5
                        ? 'text-[#FFF000]'
                        : isJawa
                        ? 'text-[#D4AF37] font-serif'
                        : isCute
                        ? 'text-[#8A505F]'
                        : 'text-[#FFFCF7]/80'
                    }`}
                  >
                    17 . 09 . 2021
                  </p>

                  <div
                    className={`mt-2.5 p-2 rounded-xl border text-[9px] ${
                      isSeri
                        ? 'bg-[#3A0207]/90 border-[#D7BB83]/60 text-[#FFFCF3]'
                        : isBotanica
                        ? 'bg-[#1E2A20]/90 border-[#BDA06C]/60 text-[#FAF8F5]'
                        : isMario
                        ? 'bg-black/75 border-white/70 font-mono text-white'
                        : isP5
                        ? 'bg-black/80 border-[#E60012] -skew-x-2 text-[#FFFCF7]'
                        : isJawa
                        ? 'bg-[#1A1009]/80 border-[#D4AF37]/50 font-serif text-[#FAF6EE]'
                        : isCute
                        ? 'bg-white/90 border-[#FFA3B8] text-[#4A2E35]'
                        : 'bg-white/10 backdrop-blur-xs border-white/15 text-[#FFFCF7]'
                    }`}
                  >
                    <p
                      className={`text-[7px] uppercase font-mono ${
                        isSeri
                          ? 'text-[#D7BB83]'
                          : isBotanica
                          ? 'text-[#BDA06C]'
                          : isMario
                          ? 'text-[#FFE082]'
                          : isCute
                          ? 'text-[#FF5C8D]'
                          : 'text-[#FFFCF7]/60'
                      }`}
                    >
                      {isSeri
                        ? 'KEPADA YTH:'
                        : isBotanica
                        ? 'DEAR HONORED GUEST:'
                        : isMario
                        ? 'PLAYER 1 INVITEE:'
                        : isP5
                        ? 'TARGET INVITEE:'
                        : isJawa
                        ? 'Katur Dhumateng:'
                        : 'Kepada Yth:'}
                    </p>
                    <p className="font-bold truncate">Tamu Terhormat</p>
                  </div>
                </div>

                {/* Bottom Mockup Button */}
                <div className="relative z-10 text-center">
                  <div
                    className={`w-full py-1.5 text-[8.5px] sm:text-[9px] font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1 ${
                      isSeri
                        ? 'rounded-xl text-[#4C030A] font-serif font-bold bg-[#D7BB83] border border-[#FFF9F4]'
                        : isBotanica
                        ? 'rounded-xl text-[#1E2A20] font-serif font-bold bg-[#BDA06C] border border-[#E0D0B5]'
                        : isMario
                        ? 'bg-[#E60012] text-white font-mono border border-white'
                        : isP5
                        ? 'bg-[#E60012] text-white -skew-x-6 border border-white'
                        : isJawa
                        ? 'rounded-xl text-[#1A1009] font-serif font-bold bg-[#D4AF37]'
                        : 'rounded-xl text-[#1C2D27]'
                    }`}
                    style={
                      !isP5 && !isJawa && !isMario && !isBotanica && !isSeri
                        ? { backgroundColor: theme.accentColor }
                        : {}
                    }
                  >
                    {isSeri && <span>🏰</span>}
                    {isBotanica && <span>💌</span>}
                    {isMario && <span>🍄</span>}
                    {isP5 && <Zap className="w-3 h-3 text-[#FFF000] skew-x-6" />}
                    <span className={isP5 ? 'skew-x-6' : ''}>
                      {isSeri
                        ? 'Jelajahi Taman 2D'
                        : isBotanica
                        ? 'Buka Segel Lilin'
                        : isMario
                        ? 'START GAME'
                        : isJawa
                        ? 'Bikak Serat Ulem'
                        : 'Buka Undangan'}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* --- SLIDE 1: PROFIL MEMPELAI (THE COUPLE) --- */}
            {currentSlide === 1 && (
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                <span className="text-[8px] uppercase tracking-widest text-[#D7BB83] font-semibold mb-1">
                  Mempelai Pengantin
                </span>

                {/* Twin Couple Photos Side-by-Side */}
                <div className="flex items-center justify-center gap-2.5 my-2">
                  {/* Groom */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 shadow-md bg-black/20" style={{ borderColor: theme.accentColor }}>
                      <img src={groomPhoto} alt="April" className="w-full h-full object-cover object-center" />
                    </div>
                    <span className="text-[9px] font-bold mt-1 leading-tight">April</span>
                    <span className="text-[7.5px] opacity-70">@aprelryu</span>
                  </div>

                  {/* Heart / Monogram Divider */}
                  <div className="flex flex-col items-center justify-center px-1">
                    <span className="text-xs font-serif" style={{ color: theme.accentColor }}>&</span>
                    <Heart className="w-3.5 h-3.5 mt-0.5 fill-current" style={{ color: theme.accentColor }} />
                  </div>

                  {/* Bride */}
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 shadow-md bg-black/20" style={{ borderColor: theme.accentColor }}>
                      <img src={bridePhoto} alt="Siti" className="w-full h-full object-cover object-center" />
                    </div>
                    <span className="text-[9px] font-bold mt-1 leading-tight">Siti</span>
                    <span className="text-[7.5px] opacity-70">@este.en</span>
                  </div>
                </div>

                {/* Couple Full Details */}
                <div className="mt-1 px-2 text-[8px] leading-relaxed opacity-90">
                  <p className="font-semibold">Apriliyanto Ratih Sukarno & Siti Nurjannah</p>
                  <p className="text-[7.5px] opacity-70 mt-0.5">
                    Kediri, Jawa Timur • Sidoarjo, Jawa Timur
                  </p>
                </div>

                <div className="mt-2.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[7.5px] flex items-center gap-1">
                  <span>👑</span>
                  <span>Putra Bpk Imam Sodik & Putri Bpk Poniman</span>
                </div>
              </div>
            )}

            {/* --- SLIDE 2: RANGKAIAN ACARA (EVENTS & SCHEDULE) --- */}
            {currentSlide === 2 && (
              <div className="relative z-10 my-auto flex flex-col justify-center text-center space-y-2">
                <span className="text-[8px] uppercase tracking-widest text-[#D7BB83] font-semibold">
                  Agenda Pernikahan
                </span>

                {/* Event 1: Akad Nikah */}
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                      Akad Nikah
                    </span>
                    <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-bold">
                      08.00 WIB
                    </span>
                  </div>
                  <p className="text-[7.5px] opacity-75 mt-1">Jumat, 17 September 2021</p>
                  <p className="text-[7.5px] opacity-85 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color: theme.accentColor }} />
                    <span className="truncate">Rumah Mempelai Wanita, Sidoarjo</span>
                  </p>
                </div>

                {/* Event 2: Resepsi */}
                <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/20 text-left">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: theme.accentColor }} />
                      Resepsi Pernikahan
                    </span>
                    <span className="text-[7.5px] font-mono px-1.5 py-0.5 rounded bg-black/30 font-bold">
                      09.00 WIB
                    </span>
                  </div>
                  <p className="text-[7.5px] opacity-75 mt-1">Sabtu, 18 September 2021</p>
                  <p className="text-[7.5px] opacity-85 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-2.5 h-2.5 shrink-0" style={{ color: theme.accentColor }} />
                    <span className="truncate">Tasyakuran Bersama Keluarga Besar</span>
                  </p>
                </div>

                <div className="pt-1 flex items-center justify-center gap-1.5 text-[8px] font-bold" style={{ color: theme.accentColor }}>
                  <Calendar className="w-3 h-3" />
                  <span>Petunjuk Google Maps & Countdown Timer</span>
                </div>
              </div>
            )}

            {/* --- SLIDE 3: FITUR KHAS / GAMEPLAY / GALERI --- */}
            {currentSlide === 3 && (
              <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
                {isSeri ? (
                  /* 2D RPG Garden Exploration Preview */
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full h-28 rounded-xl overflow-hidden relative border-2 border-[#D7BB83] shadow-md">
                      <img
                        src="/templates/seri-malaysia/world-garden-bright.jpg"
                        alt="Peta 2D RPG"
                        className="w-full h-full object-cover"
                      />
                      {/* Character avatar badge in center of mini map */}
                      <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-white/90 p-0.5 shadow-lg border border-[#D7BB83] animate-bounce">
                          <img
                            src="/templates/seri-malaysia/avatar-female-kebaya.png"
                            alt="Avatar"
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span className="text-[7px] font-bold mt-1 px-1.5 py-0.5 rounded-full bg-[#4C030A] text-[#D7BB83] border border-[#D7BB83]/60 shadow">
                          Eksplorasi Taman 2D
                        </span>
                      </div>
                    </div>
                    <p className="text-[8px] font-bold mt-2 text-[#D7BB83]">
                      Jelajahi Pos Stan Pernikahan dengan Pilihan Karakter
                    </p>
                    <p className="text-[7px] opacity-75 mt-0.5">
                      Pelaminan • Acara • Galeri • Hadiah • Buku Tamu
                    </p>
                  </div>
                ) : isMario ? (
                  /* 8-Bit Platformer Gameplay Canvas Preview */
                  <div className="w-full flex flex-col items-center font-mono">
                    <div className="w-full h-28 rounded-xl bg-[#5C94FC] relative border-2 border-white flex flex-col justify-between p-2 shadow-md">
                      <div className="flex justify-between text-[8px] text-white font-bold">
                        <span>MARIO x99</span>
                        <span>WORLD 1-1</span>
                        <span>TIME 365</span>
                      </div>
                      {/* Character and Coin Blocks */}
                      <div className="flex items-center justify-around my-auto">
                        <div className="text-lg animate-bounce">🍄</div>
                        <div className="w-5 h-5 bg-[#FCB42C] border border-white flex items-center justify-center text-[9px] text-black font-black">?</div>
                        <div className="text-lg">🏰</div>
                      </div>
                      <div className="h-4 bg-[#D85800] border-t border-white rounded-xs" />
                    </div>
                    <p className="text-[8px] font-bold mt-2 text-[#FFE082]">
                      Gamifikasi Retro 8-Bit Jump & Quest
                    </p>
                  </div>
                ) : isP5 ? (
                  /* Persona 5 All-Out Attack Finisher */
                  <div className="w-full flex flex-col items-center">
                    <div className="w-full h-28 rounded-xl bg-[#0D0D0D] border-2 border-[#E60012] relative overflow-hidden flex flex-col justify-center items-center p-2 shadow-md">
                      <div className="absolute inset-0 bg-[#E60012]/30 -skew-x-12" />
                      <span className="relative z-10 text-xs font-black italic tracking-tighter text-[#FFF000] -skew-x-6">
                        ★ THE SHOW'S OVER ★
                      </span>
                      <span className="relative z-10 text-[8px] font-black uppercase text-white mt-1">
                        ALL-OUT ATTACK FINISH
                      </span>
                    </div>
                    <p className="text-[8px] font-bold mt-2 text-[#FFF000]">
                      Phan-Site Board, Calling Card & Live Wishes
                    </p>
                  </div>
                ) : (
                  /* Standard Rich Gallery & Guestbook */
                  <div className="w-full flex flex-col items-center">
                    <div className="grid grid-cols-2 gap-1.5 w-full h-28">
                      <div className="rounded-lg overflow-hidden border border-white/20">
                        <img src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop" alt="Gallery 1" className="w-full h-full object-cover" />
                      </div>
                      <div className="rounded-lg overflow-hidden border border-white/20">
                        <img src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=400&auto=format&fit=crop" alt="Gallery 2" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <p className="text-[8px] font-bold mt-2" style={{ color: theme.accentColor }}>
                      Galeri Foto Fullscreen Lightbox & Buku Tamu RSVP
                    </p>
                    <p className="text-[7.5px] opacity-75 mt-0.5">
                      Amplop Tanda Kasih Digital BCA / Mandiri 1-Klik Salin
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Bottom Slider Dots */}
            <div className="relative z-20 flex justify-center items-center gap-1.5 pt-1">
              {[0, 1, 2, 3].map((dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={(e) => handleSelectSlide(dotIdx, e)}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentSlide === dotIdx
                      ? 'w-5 shadow-xs'
                      : 'w-1.5 bg-white/35 hover:bg-white/60'
                  }`}
                  style={{
                    backgroundColor: currentSlide === dotIdx ? theme.accentColor : undefined,
                  }}
                  title={`Buka tampilan ${slideTabs[dotIdx].label}`}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrow Controls on Hover / Mobile */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover/slide:opacity-100 transition-opacity cursor-pointer shadow-md"
          title="Tampilan Sebelumnya"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-30 w-7 h-7 rounded-full bg-black/40 hover:bg-black/75 backdrop-blur-md text-white border border-white/20 flex items-center justify-center opacity-80 sm:opacity-0 group-hover/slide:opacity-100 transition-opacity cursor-pointer shadow-md"
          title="Tampilan Berikutnya"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* 2. Quick Section Switcher Buttons */}
      <div className="grid grid-cols-4 gap-1 px-0.5">
        {slideTabs.map((tab, idx) => {
          const Icon = tab.icon;
          const isActive = currentSlide === idx;
          return (
            <button
              key={idx}
              onClick={(e) => handleSelectSlide(idx, e)}
              className={`py-1 px-1 rounded-lg text-[8px] sm:text-[8.5px] font-semibold transition-all flex items-center justify-center gap-1 border cursor-pointer ${
                isActive
                  ? 'bg-black/80 text-white shadow-xs'
                  : 'bg-white/60 hover:bg-white text-[#4A5568] border-black/5 hover:border-black/15'
              }`}
              style={
                isActive
                  ? {
                      borderColor: theme.accentColor,
                      color: isSelected ? '#FFF' : undefined,
                    }
                  : {}
              }
              title={`Lihat slide: ${tab.label}`}
            >
              <Icon className="w-2.5 h-2.5 shrink-0" style={{ color: isActive ? theme.accentColor : undefined }} />
              <span className="truncate">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
