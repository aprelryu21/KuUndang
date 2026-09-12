import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Heart,
  Sparkles,
  Music,
  UserCheck,
  Edit3,
  Calendar,
  Check,
} from 'lucide-react';
import { Invitation } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { LanguageSwitcher } from '../common/LanguageSwitcher';
import { FloralCornerOrnament, VintageDivider } from './WeddingDecorations';

interface OpeningCoverProps {
  invitation: Invitation;
  initialGuestName?: string;
  isOpen: boolean;
  onOpen: (guestName: string) => void;
  onTriggerAdminModal?: () => void;
}

// Romantic floating petals & heart sparkles configuration
const FLOATING_PARTICLES = [
  { id: 1, type: 'petal', x: 8, delay: 0, duration: 9, size: 22, rotate: 35 },
  { id: 2, type: 'heart', x: 18, delay: 1.5, duration: 8, size: 18, rotate: -15 },
  { id: 3, type: 'petal', x: 28, delay: 3, duration: 10, size: 24, rotate: 50 },
  { id: 4, type: 'heart', x: 38, delay: 0.8, duration: 7.5, size: 16, rotate: 20 },
  { id: 5, type: 'petal', x: 50, delay: 2.2, duration: 11, size: 26, rotate: -30 },
  { id: 6, type: 'heart', x: 62, delay: 4, duration: 8.5, size: 20, rotate: 10 },
  { id: 7, type: 'petal', x: 74, delay: 1, duration: 9.5, size: 22, rotate: 45 },
  { id: 8, type: 'heart', x: 84, delay: 2.8, duration: 7, size: 17, rotate: -25 },
  { id: 9, type: 'petal', x: 92, delay: 3.5, duration: 10.5, size: 25, rotate: 30 },
  { id: 10, type: 'sparkle', x: 14, delay: 2, duration: 6, size: 14, rotate: 0 },
  { id: 11, type: 'sparkle', x: 88, delay: 4.5, duration: 6.5, size: 15, rotate: 0 },
  { id: 12, type: 'petal', x: 42, delay: 5, duration: 9, size: 20, rotate: -40 },
];

export const OpeningCover: React.FC<OpeningCoverProps> = ({
  invitation,
  initialGuestName = '',
  isOpen,
  onOpen,
  onTriggerAdminModal,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(initialGuestName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isOpening, setIsOpening] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  // Synchronize when initialGuestName updates
  useEffect(() => {
    if (initialGuestName) {
      setName(initialGuestName);
      setIsEditingName(false);
    }
  }, [initialGuestName]);

  // Reset opening animation state whenever cover becomes active again
  useEffect(() => {
    if (isOpen) {
      setIsOpening(false);
    }
  }, [isOpen]);

  // Lock body scroll completely while opening cover is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [isOpen]);

  // Format wedding date
  const dateObj = new Date(invitation.wedding_date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const formattedDate = `${day} · ${month} · ${year}`;

  const triggerOpen = () => {
    if (isOpening) return;
    setIsOpening(true);
    setIsEditingName(false);

    const cleanName = (name || '').trim().slice(0, 80) || t.honoredGuest;
    // Animate frame scaling down and scrolling away up to reveal invitation
    setTimeout(() => {
      onOpen(cleanName);
    }, 950);
  };

  // Secret triple click on heart badge to trigger admin modal
  const handleSecretClick = () => {
    const nextCount = clickCount + 1;
    setClickCount(nextCount);
    if (nextCount >= 3) {
      onTriggerAdminModal?.();
      setClickCount(0);
    }
  };

  if (!isOpen) return null;

  const displayName = (name || '').trim() || t.honoredGuest;

  return (
    <AnimatePresence>
      <motion.div
        id="opening-cover"
        initial={{ opacity: 1 }}
        animate={{ opacity: isOpening ? 0 : 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, delay: isOpening ? 0.2 : 0 }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-[#F7F2EA] text-[#24313A] select-none min-h-screen h-[100dvh] p-3 sm:p-6 md:p-8"
      >
        {/* Editorial Textured Linen & Gold Pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-40 z-0"
          style={{
            backgroundImage: `radial-gradient(rgba(194, 165, 107, 0.25) 1.5px, transparent 1.5px), radial-gradient(rgba(40, 61, 82, 0.08) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            backgroundPosition: '0 0, 16px 16px',
          }}
        />

        {/* Soft Romantic Ambient Gradient Blushes */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#DFBFC1]/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#C2A56B]/20 blur-3xl pointer-events-none" />

        {/* Floating Petals, Hearts, and Cute Sparkles in Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {FLOATING_PARTICLES.map((item) => (
            <motion.div
              key={item.id}
              initial={{
                y: '-10vh',
                x: `${item.x}vw`,
                opacity: 0,
                rotate: item.rotate,
              }}
              animate={{
                y: ['-5vh', '105vh'],
                x: [`${item.x}vw`, `${item.x + (item.id % 2 === 0 ? 5 : -5)}vw`, `${item.x}vw`],
                opacity: [0, 0.85, 0.85, 0],
                rotate: [item.rotate, item.rotate + (item.id % 2 === 0 ? 180 : -180)],
              }}
              transition={{
                duration: item.duration,
                repeat: Infinity,
                delay: item.delay,
                ease: 'linear',
              }}
              className="absolute pointer-events-none"
            >
              {item.type === 'petal' && (
                <svg
                  width={item.size}
                  height={item.size * 1.3}
                  viewBox="0 0 30 40"
                  fill="none"
                  className="opacity-75 drop-shadow-xs"
                >
                  <path
                    d="M15 0 C 25 10 30 25 20 35 C 10 40 0 30 5 18 C 8 8 12 3 15 0 Z"
                    fill="url(#opening-petal-gradient)"
                  />
                  <defs>
                    <linearGradient id="opening-petal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#DFBFC1" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#C2A56B" stopOpacity="0.75" />
                    </linearGradient>
                  </defs>
                </svg>
              )}

              {item.type === 'heart' && (
                <Heart
                  className="text-[#DFBFC1] fill-[#DFBFC1]/50"
                  style={{ width: item.size, height: item.size }}
                />
              )}

              {item.type === 'sparkle' && (
                <Sparkles
                  className="text-[#C2A56B]"
                  style={{ width: item.size, height: item.size, opacity: 0.7 }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Floating Top Bar: Language Switcher with SVG Flags */}
        <div className="absolute top-3 sm:top-5 right-3 sm:right-6 z-30">
          <LanguageSwitcher theme="light" />
        </div>

        {/* 
          GRAND PHOTO FRAME WRAPPER (SELAYAR DENGAN MODEL FRAME ARCH):
          Envelops the entire opening content within the arch photo frame.
          When user taps "Buka Undangan", this frame scales down and slides
          smoothly upward like a card scroll away to reveal the invitation.
        */}
        <motion.div
          id="grand-opening-frame"
          initial={{ y: '-115vh', scale: 0.88, opacity: 0 }}
          animate={{
            y: isOpening ? '-130vh' : 0,
            scale: isOpening ? 0.82 : 1,
            opacity: isOpening ? [1, 0.95, 0] : 1,
          }}
          transition={{
            duration: isOpening ? 1.05 : 0.9,
            ease: isOpening ? [0.32, 0.72, 0, 1] : [0.16, 1, 0.3, 1],
          }}
          className="relative w-full max-w-[420px] sm:max-w-[480px] md:max-w-[540px] lg:max-w-[580px] h-[92vh] max-h-[840px] min-h-[580px] rounded-t-[120px] sm:rounded-t-[160px] md:rounded-t-[200px] rounded-b-[36px] sm:rounded-b-[44px] overflow-hidden shadow-2xl border-[6px] sm:border-[8px] md:border-[10px] border-[#FFFCF7] ring-2 ring-[#C2A56B]/75 bg-[#1C2D27] flex flex-col justify-between items-center text-center p-5 sm:p-7 md:p-8 z-20 group"
        >
          {/* Ambient Glowing Halo around the grand frame */}
          <div className="absolute -inset-3 bg-gradient-to-b from-[#DFBFC1]/40 via-[#C2A56B]/25 to-transparent blur-xl pointer-events-none rounded-t-[130px] sm:rounded-t-[170px] md:rounded-t-[210px] rounded-b-[42px]" />

          {/* Background Couple Photo with Atmospheric Romantic Scrim */}
          <img
            src={invitation.cover_image || invitation.hero_image}
            alt={`${invitation.groom_nickname} & ${invitation.bride_nickname}`}
            className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
          />

          {/* Luxurious Dark Romantic Vignette & Veil Over Photo for Flawless Readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#182736]/85 via-[#1E3042]/75 to-[#162330]/92 backdrop-blur-[1px] pointer-events-none" />

          {/* Elegant Floral Corner Ornaments inside the frame */}
          <div className="absolute top-4 left-4 pointer-events-none opacity-40">
            <FloralCornerOrnament className="w-12 h-12" />
          </div>
          <div className="absolute top-4 right-4 pointer-events-none opacity-40">
            <FloralCornerOrnament className="w-12 h-12" flip />
          </div>

          {/* 
            TOP SECTION INSIDE FRAME:
            - The Wedding Invitation Header
            - The Wedding Of Title
            - Couple Names (Groom & Bride)
            - Wedding Date Badge
          */}
          <div className="relative z-10 w-full flex flex-col items-center shrink-0 pt-2 sm:pt-4">
            {/* Sparkling Pill Header */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFCF7]/15 border border-[#C2A56B]/50 backdrop-blur-md text-[10px] sm:text-xs font-semibold uppercase tracking-[0.25em] text-[#EAD99B] mb-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
              <span>The Wedding Invitation</span>
              <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
            </motion.div>

            {/* "The Wedding Of" */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-[#DFBFC1] font-medium font-sans"
            >
              {invitation.opening_title || t.weddingOf}
            </motion.p>

            {/* Couple Names */}
            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wide text-[#FFFCF7] uppercase font-bold leading-tight drop-shadow-md my-1"
            >
              <span>{invitation.groom_nickname}</span>
              <span className="font-accent lowercase text-3xl sm:text-5xl text-[#C2A56B] mx-2 font-normal">
                &
              </span>
              <span>{invitation.bride_nickname}</span>
            </motion.h1>

            {/* Wedding Date Badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFFCF7]/15 border border-[#C2A56B]/50 backdrop-blur-md text-xs sm:text-sm tracking-[0.2em] font-medium text-[#FFFCF7] mt-1 shadow-xs"
            >
              <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
              <span>{formattedDate}</span>
            </motion.div>
          </div>

          {/* 
            MIDDLE SECTION INSIDE FRAME:
            - Recipient Card / Input Nama Tamu ("Kepada Yth.")
          */}
          <div className="relative z-10 w-full my-auto py-2 sm:py-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="w-full bg-[#FFFCF7]/95 backdrop-blur-md border border-[#C2A56B]/60 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-2xl text-center relative overflow-hidden"
            >
              {/* Top gold accent line */}
              <div className="absolute top-0 inset-x-8 h-[2px] bg-gradient-to-r from-transparent via-[#C2A56B] to-transparent" />

              {/* "Kepada Yth." Header */}
              <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-[#768692] font-medium italic mb-1.5">
                <Sparkles className="w-3 h-3 text-[#C2A56B]" />
                <span className="font-serif">{t.dearGuest}</span>
                <Sparkles className="w-3 h-3 text-[#C2A56B]" />
              </div>

              {/* Guest Name Display & Seamless Edit Mode */}
              <div className="py-1">
                {isEditingName ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setIsEditingName(false);
                    }}
                    className="flex items-center justify-center gap-2 max-w-full"
                  >
                    <input
                      id="recipient-name-input"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          setIsEditingName(false);
                        }
                      }}
                      onBlur={() => setIsEditingName(false)}
                      placeholder={t.guestNamePlaceholder}
                      maxLength={80}
                      autoFocus
                      className="font-heading text-xl sm:text-2xl md:text-3xl text-[#283D52] font-bold tracking-wide text-center bg-transparent border-b-2 border-[#C2A56B] rounded-none px-1 py-0.5 focus:outline-none w-full max-w-[280px] sm:max-w-[340px] leading-snug transition-all"
                    />
                    <button
                      type="button"
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent onBlur from canceling click
                        setIsEditingName(false);
                      }}
                      className="p-1.5 rounded-full bg-[#C2A56B]/25 hover:bg-[#C2A56B]/40 text-[#283D52] transition-colors cursor-pointer shrink-0"
                      title="Simpan nama"
                    >
                      <Check className="w-3.5 h-3.5 text-[#283D52]" />
                    </button>
                  </form>
                ) : (
                  <div className="flex items-center justify-center gap-2 flex-wrap">
                    <h2
                      onClick={() => setIsEditingName(true)}
                      className="font-heading text-xl sm:text-2xl md:text-3xl text-[#283D52] font-bold tracking-wide break-words max-w-full leading-snug cursor-pointer hover:text-[#182736] transition-colors"
                      title="Klik untuk mengubah nama"
                    >
                      {displayName}
                    </h2>
                    <button
                      type="button"
                      onClick={() => setIsEditingName(true)}
                      className="p-1.5 rounded-full hover:bg-[#EFE8DE] text-[#768692] hover:text-[#283D52] transition-colors cursor-pointer"
                      title="Ubah nama tamu"
                    >
                      <Edit3 className="w-3.5 h-3.5 text-[#C2A56B]" />
                    </button>
                  </div>
                )}

                <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#DFBFC1]/25 text-[11px] font-semibold text-[#283D52] border border-[#DFBFC1]/50 shadow-2xs">
                  <UserCheck className="w-3 h-3 text-[#C2A56B]" />
                  <span>{t.honoredGuest}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 
            BOTTOM SECTION INSIDE FRAME:
            - Tombol Buka Undangan (Magnificent Golden Button) - Always visible
            - Music / Invitation Notice
          */}
          <div className="relative z-10 w-full shrink-0 pb-1 sm:pb-2 flex flex-col items-center">
            <motion.button
              id="open-invitation-btn"
              type="button"
              onClick={triggerOpen}
              disabled={isOpening}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 py-3.5 sm:py-4 px-6 sm:px-8 rounded-2xl bg-gradient-to-r from-[#C2A56B] via-[#E8C288] to-[#C2A56B] hover:brightness-105 text-[#1C2D27] text-xs sm:text-sm font-bold tracking-[0.18em] uppercase shadow-xl hover:shadow-2xl transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Subtle animated light shimmer bar */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />

              <span>{isOpening ? 'MEMBUKA UNDANGAN...' : t.openInvitation}</span>
              <Heart className="w-4 h-4 text-[#8A0B1E] fill-[#8A0B1E] group-hover:scale-125 transition-transform" />
            </motion.button>

            <p className="mt-3 text-[10px] sm:text-xs text-[#FFFCF7]/85 flex items-center justify-center gap-1.5 leading-relaxed font-sans">
              <Music className="w-3 h-3 text-[#C2A56B] shrink-0" />
              <span>{t.invitationNotice}</span>
            </p>

            {/* Secret Clickable Heart Badge (Triple Click for Admin Shortcut) */}
            <button
              type="button"
              onClick={handleSecretClick}
              className="mt-2 text-[#DFBFC1]/50 hover:text-[#C2A56B] transition-colors cursor-pointer p-1"
              title="A & S ♡"
            >
              <Heart className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
