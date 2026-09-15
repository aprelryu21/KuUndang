import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Sparkles, Heart } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import {
  BotanicalWaxSeal,
  EucalyptusStem,
  MagnoliaBranch,
  BotanicalCorner,
  playEnvelopeChime,
} from './fleurBotanicaAssets';

export interface FleurBotanicaCoverProps {
  invitation: Invitation;
  initialGuestName?: string;
  isOpen: boolean;
  onOpen: (name: string) => void;
}

export const FleurBotanicaCover: React.FC<FleurBotanicaCoverProps> = ({
  invitation,
  initialGuestName = '',
  isOpen,
  onOpen,
}) => {
  const [guestName, setGuestName] = useState(initialGuestName);
  const [isOpening, setIsOpening] = useState(false);

  const groomName = invitation.groom_nickname || 'Dias';
  const brideName = invitation.bride_nickname || 'Azalia';
  const monogram = `${groomName.charAt(0)} & ${brideName.charAt(0)}`;

  const handleOpenInvitation = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (isOpening) return;

    playEnvelopeChime();
    setIsOpening(true);

    setTimeout(() => {
      onOpen(guestName.trim() || initialGuestName || 'Tamu Istimewa');
    }, 900);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E2A20] select-none overflow-hidden"
      >
        {/* Background Atmosphere - Conservatory & Forest Mist */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-luminosity scale-105 transition-transform duration-1000"
          style={{
            backgroundImage:
              'url(https://inveet.id/themes/modern-wedding/v1/background-conservatory-v1.webp)',
          }}
        />

        {/* Soft Vignette & Botanical Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#141C16]/80 via-[#1E2A20]/90 to-[#121A13]" />

        {/* Floating Eucalyptus & Magnolia Sprigs in Corners */}
        <div className="absolute -top-6 -left-6 pointer-events-none opacity-60">
          <EucalyptusStem className="w-40 h-40 rotate-45 text-[#66705A]" />
        </div>
        <div className="absolute -bottom-8 -right-6 pointer-events-none opacity-60 rotate-180">
          <MagnoliaBranch className="w-48 h-48 text-[#8A9A7B]" />
        </div>

        {/* Main Royal Postal Envelope & Invitation Card Container */}
        <motion.div
          initial={{ scale: 0.94, opacity: 0, y: 20 }}
          animate={{
            scale: isOpening ? 1.05 : 1,
            opacity: isOpening ? 0 : 1,
            y: isOpening ? -40 : 0,
          }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 w-full max-w-lg mx-4"
        >
          {/* Envelope Body / Card Frame */}
          <div className="relative bg-[#FAF8F5] border-2 border-[#BDA06C]/70 rounded-3xl p-6 sm:p-10 shadow-[0_25px_60px_rgba(0,0,0,0.65)] text-[#293522] overflow-hidden">
            {/* Fine Double Gold Inset Border */}
            <div className="absolute inset-2 sm:inset-3 border border-[#BDA06C]/40 rounded-2xl pointer-events-none" />

            {/* Corner Botanical Flourishes */}
            <div className="absolute top-3 left-3 pointer-events-none">
              <BotanicalCorner className="w-12 h-12" />
            </div>
            <div className="absolute top-3 right-3 pointer-events-none -scale-x-100">
              <BotanicalCorner className="w-12 h-12" />
            </div>
            <div className="absolute bottom-3 left-3 pointer-events-none -scale-y-100">
              <BotanicalCorner className="w-12 h-12" />
            </div>
            <div className="absolute bottom-3 right-3 pointer-events-none -scale-x-100 -scale-y-100">
              <BotanicalCorner className="w-12 h-12" />
            </div>

            <div className="relative z-10 text-center space-y-4">
              {/* Header Monogram & Subtitle */}
              <div className="space-y-1.5 pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#293522]/5 border border-[#BDA06C]/40 text-[#80683E] text-[10px] font-serif uppercase tracking-[0.25em]">
                  <Sparkles className="w-3 h-3 text-[#BDA06C]" />
                  <span>THE WEDDING INVITATION</span>
                </div>

                <p className="text-[11px] font-serif tracking-[0.2em] text-[#66705A] uppercase">
                  MOHON DOA RESTU PERNIKAHAN
                </p>
              </div>

              {/* Couple Names in Elegant Editorial Serif */}
              <div className="py-2">
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#293522] leading-tight">
                  {brideName}
                </h1>
                <div className="flex items-center justify-center gap-3 my-1 text-[#BDA06C]">
                  <span className="h-[1px] w-12 bg-[#BDA06C]/50" />
                  <span className="font-serif italic text-lg sm:text-xl">&amp;</span>
                  <span className="h-[1px] w-12 bg-[#BDA06C]/50" />
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-wide text-[#293522] leading-tight">
                  {groomName}
                </h1>
              </div>

              {/* Wedding Date */}
              <div className="text-xs sm:text-sm font-serif text-[#66705A] tracking-wider uppercase">
                {invitation.wedding_date || 'Sabtu, 18 April 2026'}
              </div>

              {/* Guest Recipient Box */}
              <div className="bg-[#F3EFE6] border border-[#BDA06C]/50 rounded-2xl p-4 max-w-sm mx-auto shadow-inner space-y-1.5">
                <span className="block text-[10px] font-serif uppercase tracking-[0.2em] text-[#80683E]">
                  KEPADA YTH. BAPAK/IBU/SAUDARA/I:
                </span>
                <input
                  type="text"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  placeholder="Ketik Nama Tamu..."
                  className="w-full text-center bg-transparent border-b border-[#BDA06C]/60 pb-1 text-sm sm:text-base font-serif font-bold text-[#293522] focus:outline-none focus:border-[#293522] placeholder:font-normal placeholder:text-stone-400"
                />
              </div>

              {/* Interactive Wax Seal & Open Button */}
              <div className="pt-2 flex flex-col items-center gap-3">
                <BotanicalWaxSeal
                  monogram={monogram}
                  onClick={() => handleOpenInvitation()}
                />

                <button
                  type="button"
                  onClick={() => handleOpenInvitation()}
                  disabled={isOpening}
                  className="group inline-flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[#293522] hover:bg-[#1F2E22] active:scale-95 text-[#FAF8F5] font-serif text-xs uppercase tracking-[0.2em] border border-[#BDA06C]/60 shadow-[0_8px_20px_rgba(41,53,34,0.35)] transition-all cursor-pointer"
                >
                  <Mail className="w-4 h-4 text-[#BDA06C] group-hover:scale-110 transition-transform" />
                  <span>{isOpening ? 'Membuka Amplop...' : 'Buka Undangan'}</span>
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
