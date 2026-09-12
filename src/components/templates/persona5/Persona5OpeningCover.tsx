import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Flame } from 'lucide-react';
import { Invitation, Guest } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import { Persona5LanguageSwitcher } from './Persona5LanguageSwitcher';

interface Persona5OpeningCoverProps {
  invitation: Invitation;
  guestName: string;
  guest?: Guest | null;
  onOpen: (name: string) => void;
  onOpenAdminModal?: () => void;
}

export const Persona5OpeningCover: React.FC<Persona5OpeningCoverProps> = ({
  invitation,
  guestName,
  guest,
  onOpen,
  onOpenAdminModal,
}) => {
  const { t } = useLanguage();
  const [customName, setCustomName] = useState(guestName || '');
  const [isSlashing, setIsSlashing] = useState(false);

  // Secret badge click count for admin modal (3 clicks within 2s)
  const secretClicksRef = useRef<number[]>([]);
  const handleSecretBadgeClick = () => {
    const now = Date.now();
    secretClicksRef.current = [...secretClicksRef.current.filter((time) => now - time < 2000), now];
    if (secretClicksRef.current.length >= 3) {
      secretClicksRef.current = [];
      if (onOpenAdminModal) {
        onOpenAdminModal();
      }
    }
  };

  const playSlashSfx = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.3);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    } catch {
      // Audio context may fail if user hasn't interacted or unsupported
    }
  };

  const handleOpenClick = () => {
    if (isSlashing) return;
    setIsSlashing(true);
    playSlashSfx();

    // Trigger audio synchronously within direct click gesture
    const bgAudio = document.getElementById('p5-audio-element') as HTMLAudioElement | null;
    if (bgAudio) {
      bgAudio.play().catch((err) => {
        console.warn('Audio play on cover open deferred:', err);
      });
    }

    setTimeout(() => {
      onOpen(customName.trim() || guestName || t.honoredGuest || 'Tamu Terhormat');
    }, 650);
  };

  const p5Translations = t.p5;
  const callingCardBadge = p5Translations?.callingCardTag || '★ CALLING CARD ★';
  const takeYourHeartBtn = p5Translations?.takeYourHeart || 'BUKA KARTU UNDANGAN // TAKE YOUR HEART';
  const recipientTag = p5Translations?.recipientTag || 'TO THE HONORED RECIPIENT';

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-[#0D0D0D] text-[#FFFFFF] flex flex-col justify-between select-none">
      {/* Dynamic Persona 5 Background Graphics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Halftone / Grid Dots Overlay */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* Diagonal Crimson Slashes & Comic Polygon Slices */}
        <div className="absolute -top-32 -left-20 w-[140%] h-80 bg-[#E60012] -rotate-6 transform origin-top-left shadow-2xl opacity-90" />
        <div className="absolute -top-24 -left-10 w-[130%] h-12 bg-[#000000] -rotate-6 transform origin-top-left" />
        <div className="absolute -bottom-28 -right-20 w-[140%] h-72 bg-[#E60012] 6 rotate-3 transform origin-bottom-right shadow-2xl opacity-95" />
        <div className="absolute -bottom-20 -right-10 w-[130%] h-10 bg-[#FFFFFF] rotate-3 transform origin-bottom-right" />

        {/* Big Stylized Star & Phantom Mask Silhouette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-10 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full fill-[#E60012]">
            <polygon points="50,0 63,35 100,38 72,63 80,100 50,78 20,100 28,63 0,38 37,35" />
          </svg>
        </div>

        {/* Japanese Watermark Text */}
        <div className="absolute top-28 right-6 text-right font-black tracking-widest text-[#FFFFFF]/5 text-6xl md:text-8xl select-none uppercase pointer-events-none -rotate-12">
          TAKE YOUR HEART
        </div>
      </div>

      {/* Top Header Bar: Stylized protocol tag on left, Language switcher on right (Studio access button removed) */}
      <header className="relative z-20 px-4 sm:px-8 pt-4 sm:pt-6 flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#000000] border-2 border-[#E60012] -skew-x-12 shadow-lg">
          <Flame className="w-4 h-4 text-[#FFF000] animate-pulse skew-x-12" />
          <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FFFFFF] skew-x-12">
            P5 // PHANTOM WEDDING PROTOCOL
          </span>
        </div>

        {/* Persona 5 Styled Language Switcher */}
        <div className="relative">
          <Persona5LanguageSwitcher variant="cover" />
        </div>
      </header>

      {/* Main Calling Card Centerpiece */}
      <main className="relative z-20 max-w-xl w-full mx-auto px-4 sm:px-6 my-auto text-center py-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative bg-[#000000] border-4 border-[#FFFFFF] p-6 sm:p-8 shadow-[12px_12px_0px_0px_#E60012] -skew-x-2"
        >
          {/* Jagged Corner Badges - Secret triple-click on badge opens admin modal discreetly */}
          <button
            type="button"
            onClick={handleSecretBadgeClick}
            className="absolute -top-4 left-4 bg-[#E60012] text-[#FFFFFF] text-[11px] font-black uppercase tracking-[0.25em] px-3 py-1 -skew-x-12 border-2 border-white shadow-md cursor-default text-left"
            title="Protocol Badge"
          >
            {callingCardBadge}
          </button>

          <div className="absolute -bottom-3 right-4 bg-[#FFF000] text-[#000000] text-[10px] font-black tracking-widest px-2.5 py-0.5 skew-x-6 border border-black">
            CONFIDANT: RANK 10
          </div>

          {/* Subtitle / Calling Card Header */}
          <div className="mt-2 mb-4">
            <p className="text-xs font-mono font-bold tracking-[0.3em] text-[#FFF000] uppercase">
              {recipientTag}
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-[#FFFFFF] mt-1 uppercase italic leading-none">
              TAKE YOUR <span className="text-[#E60012] bg-[#FFFFFF] px-2 py-0.5 not-italic inline-block -rotate-2">HEART</span>
            </h1>
          </div>

          {/* Bride & Groom Staged Names */}
          <div className="my-5 py-4 border-y-2 border-dashed border-[#FFFFFF]/30 relative">
            <div className="text-xs font-mono tracking-widest text-[#FFFFFF]/70 uppercase mb-1">
              {t.weddingOf.toUpperCase()}
            </div>
            <div className="flex items-center justify-center gap-3 text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-[#FFFFFF] uppercase">
              <span className="bg-[#E60012] text-white px-2 py-0.5 -skew-x-6 shadow-sm">
                {invitation.groom_nickname}
              </span>
              <span className="text-[#FFF000] font-mono">&</span>
              <span className="bg-[#FFFFFF] text-[#000000] px-2 py-0.5 skew-x-6 shadow-sm">
                {invitation.bride_nickname}
              </span>
            </div>
            <p className="text-xs font-mono tracking-widest text-[#FFF000] mt-2 font-bold">
              {p5Translations?.dateFormat || '17 . 09 . 2021 // SHIBUYA & SIDOARJO'}
            </p>
          </div>

          {/* Personalized Invitee Box */}
          <div className="bg-[#1A1A1E] border-2 border-[#E60012] p-4 text-left my-4 relative">
            <div className="flex items-center justify-between text-[11px] font-mono text-[#FFFFFF]/60 uppercase mb-1">
              <span>{t.guestNameLabel.toUpperCase()}:</span>
              <span className="text-[#FFF000] font-bold">STATUS: {t.attending.toUpperCase()}</span>
            </div>
            <div className="text-lg sm:text-xl font-black text-[#FFFFFF] tracking-wide uppercase">
              {guestName || t.honoredGuest}
            </div>
            <p className="text-[11px] text-[#FFFFFF]/80 font-mono mt-1.5 leading-relaxed">
              {t.closingHonorMessage ||
                'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Anda berkenan hadir dan memberikan doa restu.'}
            </p>

            {/* Optional Input to customize name */}
            <div className="mt-3 pt-2 border-t border-white/10">
              <label htmlFor="p5-guest-input" className="block text-[10px] font-mono text-[#FFF000] uppercase mb-1">
                {p5Translations?.openPrompt || 'UBAH NAMA ANDA (JIKA PERLU):'}
              </label>
              <input
                id="p5-guest-input"
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder={t.guestNamePlaceholder}
                className="w-full px-3 py-1.5 bg-[#000000] border border-[#FFFFFF]/40 text-[#FFFFFF] text-xs font-mono focus:border-[#E60012] focus:outline-none"
              />
            </div>
          </div>

          {/* Persona 5 Battle Style Open Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.03, x: 2, y: -2 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleOpenClick}
            className="w-full mt-2 py-3.5 sm:py-4 bg-[#E60012] hover:bg-[#FF0019] text-[#FFFFFF] text-base sm:text-lg font-black uppercase tracking-wider border-2 border-[#FFFFFF] shadow-[6px_6px_0px_0px_#FFFFFF] transition-all cursor-pointer flex items-center justify-center gap-3 -skew-x-6 group"
          >
            <Zap className="w-5 h-5 text-[#FFF000] group-hover:scale-125 transition-transform skew-x-6" />
            <span className="skew-x-6">{takeYourHeartBtn}</span>
          </motion.button>
        </motion.div>
      </main>

      {/* Footer Disclaimer */}
      <footer className="relative z-20 pb-4 sm:pb-6 px-4 text-center">
        <p className="text-[11px] font-mono text-[#FFFFFF]/50 tracking-widest uppercase">
          INSPIRED BY THE STYLISTIC AESTHETICS OF PERSONA 5 // TAKE OVER
        </p>
      </footer>

      {/* Screen Slash Transition on Open */}
      <AnimatePresence>
        {isSlashing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center overflow-hidden"
          >
            {/* Diagonal Slash 1 (Top Left to Bottom Right) */}
            <motion.div
              initial={{ x: '-100%', y: '-100%' }}
              animate={{ x: '0%', y: '0%' }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[#E60012] -skew-y-12 origin-top"
            />

            {/* Diagonal Slash 2 (Bottom Right to Top Left) */}
            <motion.div
              initial={{ x: '100%', y: '100%' }}
              animate={{ x: '0%', y: '0%' }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 bg-[#000000] skew-y-12 origin-bottom border-t-8 border-white"
            />

            {/* Comic Speed Line Cut */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.2, delay: 0.15 }}
              className="absolute w-[150%] h-4 bg-[#FFF000] -rotate-12 shadow-[0_0_20px_#FFF000]"
            />

            {/* Huge All-Out Attack Splash Text */}
            <motion.div
              initial={{ scale: 2, rotate: -8, opacity: 0 }}
              animate={{ scale: 1, rotate: -4, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2, type: 'spring', damping: 12 }}
              className="relative z-10 text-center select-none"
            >
              <div className="inline-block bg-[#000000] text-[#FFFFFF] text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter px-6 py-2 border-4 border-[#FFF000] shadow-[10px_10px_0px_0px_#E60012] -skew-x-12">
                ALL-OUT <span className="text-[#E60012]">ATTACK!</span>
              </div>
              <p className="text-sm sm:text-lg font-mono font-black text-[#FFF000] tracking-[0.4em] uppercase mt-3 bg-black/80 px-4 py-1 inline-block -skew-x-6">
                ★ THE HEIST COMMENCES ★
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
