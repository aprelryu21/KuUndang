import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Swords, Moon, Heart, ChevronRight, Volume2, Shield } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona3OpeningCoverProps {
  invitation: Invitation;
  initialGuestName?: string;
  isOpen: boolean;
  onOpen: (enteredName: string) => void;
  onTriggerAdminModal: () => void;
}

export const Persona3OpeningCover: React.FC<Persona3OpeningCoverProps> = ({
  invitation,
  initialGuestName = '',
  isOpen,
  onOpen,
  onTriggerAdminModal,
}) => {
  const { t } = useLanguage();
  const [name, setName] = useState(initialGuestName);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onOpen(name.trim());
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, scale: 1.05 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 overflow-y-auto bg-[#050B18] text-[#F0F8FF] flex flex-col justify-between select-none"
      >
        {/* Background Visual Atmosphere */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Persona 3 deep gradient aura */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[900px] h-[600px] sm:h-[800px] rounded-full bg-gradient-to-b from-[#00D2FF]/20 via-[#0077B6]/15 to-transparent blur-3xl" />
          <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#FFE600]/10 blur-3xl" />

          {/* Persona 3 Diagonal Hazard/Accent Stripes */}
          <div className="absolute inset-0 opacity-[0.03] bg-[repeating-linear-gradient(45deg,#00D2FF,#00D2FF_20px,transparent_20px,transparent_40px)]" />

          {/* Tartarus Full Moon Graphic */}
          <div className="absolute top-12 sm:top-20 right-6 sm:right-24 w-32 sm:w-48 h-32 sm:h-48 rounded-full border-2 border-[#00D2FF]/30 flex items-center justify-center">
            <div className="w-24 sm:w-36 h-24 sm:h-36 rounded-full bg-gradient-to-tr from-[#00D2FF]/20 to-transparent border border-[#00D2FF]/40 animate-pulse" />
          </div>
        </div>

        {/* Top Header Strip: S.E.E.S. Status & Moon Indicator */}
        <header className="relative z-10 max-w-5xl mx-auto w-full px-6 pt-6 sm:pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="px-2.5 py-1 rounded-sm bg-[#FFE600] text-[#050B18] text-[10px] sm:text-xs font-black tracking-widest uppercase font-mono shadow-md transform -skew-x-12">
              S.E.E.S. ARCHIVE
            </div>
            <span className="text-[10px] sm:text-xs font-mono text-[#00D2FF] tracking-wider uppercase hidden xs:inline">
              OPERATIONAL LOG // 2021.09.17
            </span>
          </div>

          {/* Secret Admin Shortcut Badge */}
          <button
            type="button"
            onClick={onTriggerAdminModal}
            className="group flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 hover:bg-[#00D2FF]/20 border border-[#00D2FF]/40 text-[10px] sm:text-xs font-mono text-[#00D2FF] transition-all cursor-pointer"
            title="Studio Portal (Ctrl+Shift+A)"
          >
            <Shield className="w-3 h-3 text-[#FFE600]" />
            <span className="opacity-80 group-hover:opacity-100">STUDIO ACCESS</span>
          </button>
        </header>

        {/* Center Content: Persona 3 Stylized Banner */}
        <div className="relative z-10 max-w-2xl mx-auto w-full px-5 sm:px-8 py-8 sm:py-12 text-center my-auto">
          {/* Moon Phase & Theme Tag */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0E1E42] border border-[#00D2FF] text-[11px] font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-6 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.3)]"
          >
            <Moon className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
            <span>FULL MOON PROTOCOL: THE WEDDING</span>
          </motion.div>

          {/* Stylized Persona 3 Title Box */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative mb-6"
          >
            <div className="inline-block relative">
              {/* Slanted Backing Ribbon */}
              <div className="absolute inset-0 bg-[#00D2FF]/20 transform -skew-y-2 translate-y-2 blur-sm rounded-lg" />
              <div className="relative px-6 py-4 rounded-xl bg-gradient-to-r from-[#0E1E42] via-[#091530] to-[#0E1E42] border-2 border-[#00D2FF] shadow-[0_0_30px_rgba(0,210,255,0.25)]">
                <p className="text-[10px] sm:text-xs font-mono tracking-[0.35em] text-[#FFE600] uppercase font-black mb-1">
                  MEMENTO VIVERE // SACRED BOND
                </p>
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-[#FFFFFF] font-sans uppercase">
                  {invitation.groom_nickname}{' '}
                  <span className="text-[#00D2FF] drop-shadow-[0_0_12px_#00D2FF]">&</span>{' '}
                  {invitation.bride_nickname}
                </h1>
                <p className="mt-2 text-xs sm:text-sm font-mono text-[#A0C4E2] tracking-widest uppercase">
                  ARCANA VI: THE LOVERS // RANK MAX
                </p>
              </div>
            </div>
          </motion.div>

          {/* Couple Persona Avatars in Hexagonal / Slanted Frames */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4 sm:gap-6 my-6"
          >
            <div className="relative transform -rotate-3 hover:rotate-0 transition-transform">
              <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.4)] bg-[#0A1428]">
                <img
                  src={invitation.hero_image}
                  alt={invitation.groom_nickname}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute -bottom-2 -left-1 px-2 py-0.5 rounded-xs bg-[#FFE600] text-[#050B18] text-[9px] font-mono font-black tracking-wider uppercase shadow-xs">
                GROOM
              </span>
            </div>

            <div className="flex flex-col items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-[#00D2FF]/20 border border-[#00D2FF] flex items-center justify-center text-[#FFE600] animate-bounce">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <span className="text-[9px] font-mono text-[#00D2FF] tracking-widest font-bold mt-1">
                ALLIANCE
              </span>
            </div>

            <div className="relative transform rotate-3 hover:rotate-0 transition-transform">
              <div className="w-20 sm:w-28 h-20 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#00D2FF] shadow-[0_0_15px_rgba(0,210,255,0.4)] bg-[#0A1428]">
                <img
                  src={invitation.cover_image}
                  alt={invitation.bride_nickname}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-xs bg-[#FFE600] text-[#050B18] text-[9px] font-mono font-black tracking-wider uppercase shadow-xs">
                BRIDE
              </span>
            </div>
          </motion.div>

          {/* Invitation Guest Ticket Box */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-md mx-auto rounded-2xl bg-[#0B1736]/90 border-2 border-[#00D2FF]/60 p-5 sm:p-6 shadow-[0_0_25px_rgba(0,210,255,0.25)] backdrop-blur-md relative transform -skew-x-2"
          >
            <div className="transform skew-x-2 space-y-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-[#FFE600] font-bold uppercase tracking-wider border-b border-[#00D2FF]/30 pb-2">
                <span>// VELVET ROOM INVITATION PASS</span>
                <span>STATUS: DISPATCHED</span>
              </div>

              <div className="text-left">
                <label
                  htmlFor="p3-guest-name"
                  className="block text-[11px] font-mono uppercase tracking-widest text-[#A0C4E2] font-semibold mb-1.5"
                >
                  Kepada Yth. Tamu Undangan:
                </label>
                <div className="relative">
                  <input
                    id="p3-guest-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Nama Anda / Tamu Terhormat"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#050B18] border-2 border-[#00D2FF] text-[#FFFFFF] placeholder-[#768692] text-sm font-sans font-semibold focus:outline-hidden focus:border-[#FFE600] focus:ring-2 focus:ring-[#FFE600]/40 transition-all"
                  />
                </div>
              </div>

              {/* Persona 3 Action Summon Button */}
              <button
                type="submit"
                className="w-full group mt-2 flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00D2FF] via-[#38BDF8] to-[#00D2FF] hover:from-[#FFE600] hover:via-[#FACC15] hover:to-[#FFE600] text-[#050B18] text-sm font-black font-mono tracking-widest uppercase shadow-[0_0_20px_rgba(0,210,255,0.5)] hover:shadow-[0_0_25px_rgba(255,230,0,0.6)] active:scale-98 transition-all cursor-pointer"
              >
                <Swords className="w-4 h-4 text-[#050B18] group-hover:rotate-45 transition-transform" />
                <span>&gt; BUKA UNDANGAN / AWAKEN &lt;</span>
                <ChevronRight className="w-4 h-4 text-[#050B18] group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center justify-center gap-2 pt-1 text-[10px] font-mono text-[#00D2FF]">
                <Volume2 className="w-3 h-3 text-[#FFE600] animate-pulse" />
                <span>Audio latar romantis akan terputar otomatis</span>
              </div>
            </div>
          </motion.form>
        </div>

        {/* Footer Bar */}
        <footer className="relative z-10 max-w-5xl mx-auto w-full px-6 pb-6 text-center text-[10px] font-mono text-[#768692] tracking-wider uppercase">
          KU UNDANG ENGINE // PERSONA 3 NEO-EDITION &bull; SIDOARJO - KEDIRI &bull; 2021
        </footer>
      </motion.div>
    </AnimatePresence>
  );
};
