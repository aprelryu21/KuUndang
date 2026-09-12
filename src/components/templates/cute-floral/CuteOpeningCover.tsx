import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  WashiTape,
  CuteFloralDivider,
  playCuteChimeSfx,
  startCuteMusicBoxSynth,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { MailOpen, Heart, Sparkles, Send } from 'lucide-react';

interface CuteOpeningCoverProps {
  invitation: Invitation;
  initialGuestName: string;
  isOpen: boolean;
  onOpen: (enteredName: string) => void;
}

export const CuteOpeningCover: React.FC<CuteOpeningCoverProps> = ({
  invitation,
  initialGuestName,
  isOpen,
  onOpen,
}) => {
  const { t, language } = useLanguage();
  const [guestName, setGuestName] = useState(initialGuestName || 'Tamu Terhormat');

  const handleOpenClick = () => {
    // 1. Play sweet magical chime sound
    playCuteChimeSfx();

    // 2. Immediately trigger background cute audio on user click to comply with browser autoplay policy
    const bgAudio = document.getElementById('cute-bg-audio') as HTMLAudioElement | null;
    if (bgAudio) {
      bgAudio.volume = 0.7;
      bgAudio.play().catch((err) => {
        console.warn('Cute audio play error, starting synthesized music box:', err);
        startCuteMusicBoxSynth();
      });
    } else {
      startCuteMusicBoxSynth();
    }

    onOpen(guestName);
  };

  if (!isOpen) return null;

  return (
    <div
      id="cute-opening-cover"
      className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#FFF5F8] via-[#FFE4EC] to-[#FFD6E2] text-[#4A2E35] flex flex-col justify-between items-center px-4 py-8 sm:py-12 select-none"
    >
      {/* Floating Cherry Blossoms & Smiling Petals */}
      <CuteFloralParticles count={28} showFlowers={true} />

      {/* Top Banner Tag */}
      <div className="relative z-20 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-[#FF85A2]/40 shadow-xs text-xs font-sans font-bold text-[#FF5C8D]">
        <CuteSakuraFlower className="w-4 h-4" />
        <span className="tracking-wide uppercase">
          {language === 'JW' ? 'Serat Ulem Manis' : 'Undangan Pernikahan Manis'}
        </span>
        <CuteSakuraFlower className="w-4 h-4" />
      </div>

      {/* Main Sweet Love Letter Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md my-auto relative z-20 bg-white/95 rounded-3xl border-3 border-[#FF85A2]/60 p-6 sm:p-8 shadow-[0_16px_50px_rgba(255,101,132,0.2)] text-center relative overflow-hidden backdrop-blur-md"
      >
        {/* Washi Tape Stickers on Corners */}
        <div className="absolute -top-2 left-6 rotate-[-4deg]">
          <WashiTape className="w-20 h-5" color="pink" />
        </div>
        <div className="absolute -top-2 right-6 rotate-[5deg]">
          <WashiTape className="w-20 h-5" color="yellow" />
        </div>

        {/* Top Smiling Flowers Greeting */}
        <div className="flex items-center justify-center gap-3 mt-3 mb-2">
          <CuteTulipFlower className="w-9 h-9" />
          <CuteDaisyFlower className="w-12 h-12 animate-bounce" style={{ animationDuration: '2.5s' }} />
          <CuteTulipFlower className="w-9 h-9 -scale-x-100" />
        </div>

        {/* Title & Couple Heading */}
        <div className="space-y-1">
          <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#FF5C8D]">
            THE WEDDING OF
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-[#E03164] tracking-wide">
            {invitation.groom_nickname || 'April'}{' '}
            <span className="text-[#FFA3B8] font-accent text-4xl">&</span>{' '}
            {invitation.bride_nickname || 'Siti'}
          </h1>
          <div className="flex items-center justify-center gap-2 pt-1">
            <CuteBowSvg className="w-7 h-5" />
            <span className="text-xs font-sans font-semibold text-[#8A505F]">
              {invitation.wedding_date ? 'Jumat, 17 September 2021' : '17 September 2021'}
            </span>
            <CuteBowSvg className="w-7 h-5 -scale-x-100" />
          </div>
        </div>

        <CuteFloralDivider className="my-4" />

        {/* Dear Guest Envelope Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#FFF0F5] to-[#FFE4EC] border-2 border-dashed border-[#FFA3B8] shadow-inner relative">
          <p className="text-[11px] font-sans font-semibold uppercase tracking-wider text-[#FF5C8D]">
            {t.dearGuest || 'Kepada Yth. Tamu Istimewa:'}
          </p>
          <div className="font-heading text-xl sm:text-2xl font-bold text-[#4A2E35] my-1 tracking-wide">
            {guestName}
          </div>
          <p className="text-[11px] text-[#8A505F] font-sans italic">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami atas kehadiran serta doa restu Anda ♡
          </p>
        </div>

        {/* Bubbly Open Button */}
        <motion.button
          type="button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={handleOpenClick}
          className="w-full mt-6 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#FF5C8D] via-[#FF477E] to-[#FF5C8D] hover:from-[#E03164] hover:to-[#E03164] text-white font-sans font-bold text-sm tracking-wider uppercase shadow-[0_8px_25px_rgba(255,71,126,0.4)] flex items-center justify-center gap-2.5 transition-all cursor-pointer group"
        >
          <MailOpen className="w-4 h-4 text-white group-hover:rotate-12 transition-transform" />
          <span>{t.openInvitation || 'Buka Undangan'} 🌸</span>
          <Sparkles className="w-4 h-4 text-[#FFF0F5] group-hover:scale-125 transition-transform" />
        </motion.button>

        <p className="mt-3.5 text-[11px] text-[#8A505F] font-sans">
          ✨ Sentuh tombol di atas untuk membuka undangan & memutar musik ceria
        </p>
      </motion.div>

      {/* Adorable Footer Note */}
      <div className="relative z-20 text-center text-xs font-sans font-semibold text-[#8A505F] tracking-wide flex items-center gap-1">
        <span>Dibuat dengan penuh cinta & bunga-bunga manis</span>
        <Heart className="w-3.5 h-3.5 text-[#FF5C8D] fill-[#FF5C8D]" />
      </div>
    </div>
  );
};
