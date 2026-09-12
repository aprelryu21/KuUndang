import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import { JavaneseLanguageSwitcher } from './JavaneseLanguageSwitcher';
import {
  GununganWayangSvg,
  JavaneseCornerFlourish,
  JavaneseDivider,
  BatikKawungPattern,
  KembarMayangSvg,
  playGongAgeng,
  startWebAudioGamelan,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { MailOpen, Sparkles } from 'lucide-react';

interface JavaneseCoverProps {
  invitation: Invitation;
  initialGuestName: string;
  isOpen: boolean;
  onOpen: (enteredName: string) => void;
}

export const JavaneseCover: React.FC<JavaneseCoverProps> = ({
  invitation,
  initialGuestName,
  isOpen,
  onOpen,
}) => {
  const { t, language } = useLanguage();
  const [guestName, setGuestName] = useState(initialGuestName || 'Tamu Terhormat');

  const handleOpenClick = () => {
    // 1. Play ceremonial sacred Gong Ageng chime
    playGongAgeng();

    // 2. Immediately trigger background gamelan audio on user click to satisfy browser autoplay policy
    const bgAudio = document.getElementById('javanese-bg-audio') as HTMLAudioElement | null;
    if (bgAudio) {
      bgAudio.volume = 0.75;
      bgAudio.play().catch((err) => {
        console.warn('Audio play error, starting Web Audio Gamelan synth:', err);
        startWebAudioGamelan();
      });
    } else {
      startWebAudioGamelan();
    }

    onOpen(guestName);
  };

  if (!isOpen) return null;

  return (
    <div
      id="javanese-cover"
      className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1009] text-[#FAF6EE] flex flex-col justify-between items-center px-4 py-8 sm:py-12"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #2C1810 0%, #1A1009 70%, #120A05 100%)',
      }}
    >
      {/* Background Batik Kawung Overlay */}
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-10" />

      {/* Floating Golden Particles & Melati Petals */}
      <JavaneseGoldenParticles count={28} showJasminePetals={true} />

      {/* Flanking Kembar Mayang (Desktop & Tablet) */}
      <div className="hidden lg:flex absolute left-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center pointer-events-none opacity-80">
        <KembarMayangSvg className="w-16 h-36" />
        <span className="text-[10px] font-serif text-[#D4AF37] tracking-widest uppercase mt-2">Kembar Mayang</span>
      </div>
      <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 z-10 flex-col items-center pointer-events-none opacity-80">
        <KembarMayangSvg className="w-16 h-36" />
        <span className="text-[10px] font-serif text-[#D4AF37] tracking-widest uppercase mt-2">Kembar Mayang</span>
      </div>

      {/* Top Bar with Language Selector */}
      <div className="w-full max-w-4xl flex justify-between items-center relative z-20">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
          <span className="text-[11px] sm:text-xs font-serif tracking-[0.2em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'Serat Ulem Palakrama' : 'Undangan Pernikahan Adat Jawa'}
          </span>
        </div>
        <JavaneseLanguageSwitcher />
      </div>

      {/* Main Sacred Keraton Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full max-w-lg my-auto relative z-10 bg-[#24160E]/90 border-2 border-[#D4AF37] p-6 sm:p-10 shadow-[0_12px_40px_rgba(0,0,0,0.85)] rounded-2xl text-center relative overflow-hidden backdrop-blur-sm"
      >
        {/* Four Gold Corner Flourishes */}
        <div className="absolute top-2 left-2">
          <JavaneseCornerFlourish className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <div className="absolute top-2 right-2 rotate-90">
          <JavaneseCornerFlourish className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-2 left-2 -rotate-90">
          <JavaneseCornerFlourish className="w-8 h-8 text-[#D4AF37]" />
        </div>
        <div className="absolute bottom-2 right-2 rotate-180">
          <JavaneseCornerFlourish className="w-8 h-8 text-[#D4AF37]" />
        </div>

        {/* Inner Ornate Border */}
        <div className="absolute inset-3 border border-[#D4AF37]/30 rounded-xl pointer-events-none" />

        {/* Gunungan Wayang Centerpiece */}
        <div className="flex justify-center mb-3">
          <div className="relative">
            <GununganWayangSvg className="w-20 h-28 sm:w-24 sm:h-32 filter drop-shadow-[0_4px_12px_rgba(212,175,55,0.4)]" />
          </div>
        </div>

        {/* Aksara Jawa Header */}
        <div className="mb-2">
          <p className="font-serif text-sm sm:text-base text-[#E5C158] tracking-widest opacity-90">
            ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀ꦥꦭꦏꦿꦩ
          </p>
          <h1 className="font-serif text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-[#D4AF37] mt-1">
            {t.weddingOf || 'PAHARGYAN DHAUPING PENGANTEN'}
          </h1>
        </div>

        {/* Couple Names */}
        <div className="my-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-wide text-[#FAF6EE] drop-shadow-md">
            {invitation.groom_nickname}{' '}
            <span className="text-[#D4AF37] font-serif italic">&</span>{' '}
            {invitation.bride_nickname}
          </h2>
          <p className="text-[11px] sm:text-xs font-serif text-[#D4AF37]/80 tracking-widest mt-1">
            {invitation.wedding_date ? 'JUMAT PAHING, 17 SEPTEMBER 2021' : '17 SEPTEMBER 2021'}
          </p>
        </div>

        <JavaneseDivider />

        {/* Guest Salutation Box */}
        <div className="my-5 p-4 rounded-xl bg-[#1A1009]/80 border border-[#D4AF37]/40 shadow-inner">
          <p className="text-[11px] font-serif text-[#FAF6EE]/70 uppercase tracking-widest">
            {t.dearGuest || 'Katur Panjenenganipun:'}
          </p>
          <div className="font-serif text-lg sm:text-xl font-bold text-[#E5C158] my-1 tracking-wide">
            {guestName}
          </div>
          <p className="text-[10px] text-[#FAF6EE]/50 font-serif italic">
            {language === 'JW'
              ? 'Nyuwun pangapunten menawi wonten lepat ing panyeratan asma/gelar'
              : 'Mohon maaf apabila ada kesalahan penulisan nama/gelar'}
          </p>
        </div>

        {/* Open Invitation Button */}
        <button
          type="button"
          onClick={handleOpenClick}
          className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#9C7A1D] via-[#D4AF37] to-[#9C7A1D] hover:from-[#B58E23] hover:via-[#E5C158] hover:to-[#B58E23] text-[#1A1009] font-serif font-bold text-sm uppercase tracking-[0.2em] shadow-[0_6px_20px_rgba(212,175,55,0.4)] flex items-center justify-center gap-2.5 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
        >
          <MailOpen className="w-4 h-4 text-[#1A1009]" />
          <span>{t.openInvitation || 'BIKAK SERAT ULEM'}</span>
          <Sparkles className="w-4 h-4 text-[#1A1009]" />
        </button>

        <p className="mt-4 text-[10px] text-[#FAF6EE]/60 font-serif">
          {language === 'JW'
            ? 'Katerangan: Katutul tombol ing nginggil kangge mirengaken gending gamelan'
            : 'Ketuk tombol di atas untuk membuka undangan & memutar gending gamelan Jawa'}
        </p>
      </motion.div>

      {/* Footer Ornament */}
      <div className="relative z-20 text-center text-[10px] font-serif text-[#D4AF37]/60 tracking-wider">
        ❖ NINGRAT SAKRAL TRADISIONAL // KU UNDANG ❖
      </div>
    </div>
  );
};
