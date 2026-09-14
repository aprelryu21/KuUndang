import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteBowSvg,
  WashiTape,
  CuteFloralDivider,
} from './cuteFloralAssets';

interface CuteGreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const CuteGreetingBanner: React.FC<CuteGreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  const { language } = useLanguage();
  const displayName = guestName.trim() || 'Tamu Terhormat';

  const honorificText =
    language === 'JW'
      ? 'Katur Dhumateng Bp/Ibu/Sedherek:'
      : 'Kepada Yth. Bapak/Ibu/Saudara/i:';

  const defaultGreeting =
    language === 'JW'
      ? 'Kanthi bingahing manah, kula sakulawarga ngaturi rawuh panjenengan sedaya ing dinten pahargyan dhauping penganten.'
      : 'Tanpa mengurangi rasa hormat, dengan penuh sukacita kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan merayakan hari bahagia pernikahan kami.';

  const displayGreeting =
    invitation.greeting_text && invitation.greeting_text !== "We're so happy you're here ♡"
      ? invitation.greeting_text
      : defaultGreeting;

  return (
    <section
      id="cute-greeting"
      className="relative py-10 sm:py-14 px-4 bg-gradient-to-b from-[#FFF0F5] via-[#FFF9FA] to-[#FFF5F8] text-[#4A2E35] text-center border-b-2 border-[#FFCCD7] overflow-hidden"
    >
      {/* Background Floating Floral Accents */}
      <div className="absolute top-3 left-4 opacity-40 select-none animate-bounce">
        🌸
      </div>
      <div className="absolute bottom-3 right-5 opacity-40 select-none animate-pulse">
        💖
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Sweet Cute Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative bg-white/95 border-3 border-[#FF85A2]/70 rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(255,133,162,0.18)]"
        >
          {/* Cute Washi Tape at Top */}
          <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
            <WashiTape className="w-28 h-7" color="pink" />
          </div>

          {/* Daisy & Bow Header Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE4EC] border border-[#FF85A2] text-[#E03164] text-xs font-bold uppercase tracking-wider mb-3 shadow-xs">
            <CuteDaisyFlower className="w-4 h-4" />
            <span>UNDANGAN SPESIAL UNTUK</span>
            <CuteSakuraFlower className="w-4 h-4" />
          </div>

          <p className="text-xs font-sans text-[#7A4B56] uppercase tracking-wider">
            {honorificText}
          </p>

          {/* Prominent Recipient Name */}
          <h2 className="font-heading text-2xl sm:text-4xl md:text-5xl font-bold text-[#E03164] mt-1.5 mb-2 tracking-wide">
            {displayName}
          </h2>

          {/* Cute Floral Divider */}
          <div className="my-3">
            <CuteFloralDivider />
          </div>

          {/* Welcoming Message */}
          <p className="text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed max-w-lg mx-auto">
            &ldquo;{displayGreeting}&rdquo;
          </p>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-[#FF5C8D] font-medium">
            <CuteBowSvg className="w-5 h-4" />
            <span>Kami menantikan kehadiran Anda ♡</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
