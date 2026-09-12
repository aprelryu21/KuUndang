import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteFloralDivider,
  CuteBowSvg,
  WashiTape,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Calendar, Clock, Heart, Sparkles } from 'lucide-react';

interface CuteHeroSectionProps {
  invitation: Invitation;
}

export const CuteHeroSection: React.FC<CuteHeroSectionProps> = ({ invitation }) => {
  const { language } = useLanguage();

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const target = new Date(invitation.wedding_date || '2026-09-17').getTime();
      const now = new Date().getTime();
      const diff = target - now;

      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((diff % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation.wedding_date]);

  return (
    <section
      id="cute-hero"
      className="py-16 sm:py-24 px-4 relative overflow-hidden bg-gradient-to-b from-[#FFF0F5] via-[#FFF9FB] to-[#FFE8F0] text-[#4A2E35] text-center"
    >
      <CuteFloralParticles count={20} showFlowers={true} />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Adorable Floral Mascot Header */}
        <div className="flex items-center justify-center gap-2">
          <CuteTulipFlower className="w-8 h-8" />
          <CuteDaisyFlower className="w-12 h-12 animate-spin-slow" />
          <CuteTulipFlower className="w-8 h-8 -scale-x-100" />
        </div>

        {/* Sacred / Romantic Sweet Quote */}
        <div className="space-y-3 max-w-xl mx-auto px-4 bg-white/80 p-6 rounded-3xl border-2 border-[#FFCCD7] shadow-sm backdrop-blur-xs relative">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2">
            <WashiTape className="w-24 h-6" color="pink" />
          </div>
          <p className="font-heading text-lg sm:text-xl text-[#E03164] font-semibold">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-sans text-xs sm:text-sm text-[#6B3E48] leading-relaxed italic">
            {language === 'JW'
              ? '“Maha Suci Gusti Allah Ingkang Sampun Nitiaken Makhlukipun Kanthi Katresnan Suci. Mugi Tansah Binerkahan Lumampahing Gesang Bebrayan.”'
              : '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.” (QS. Ar-Rum: 21)'}
          </p>
        </div>

        {/* Couple Big Headline */}
        <div className="space-y-2">
          <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
            MOHON DOA RESTU PERNIKAHAN
          </p>
          <h2 className="font-heading text-4xl sm:text-6xl font-bold text-[#E03164] tracking-wide">
            {invitation.groom_nickname || 'April'}{' '}
            <span className="text-[#FF85A2] font-accent text-5xl sm:text-7xl">&</span>{' '}
            {invitation.bride_nickname || 'Siti'}
          </h2>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#FFA3B8] shadow-xs text-xs sm:text-sm font-sans font-bold text-[#6B3E48]">
            <Calendar className="w-4 h-4 text-[#FF5C8D]" />
            <span>Jumat, 17 September 2021</span>
          </div>
        </div>

        <CuteFloralDivider />

        {/* Adorable Countdown Timer Cards */}
        <div className="space-y-3">
          <p className="text-xs font-sans font-bold uppercase tracking-wider text-[#FF5C8D] flex items-center justify-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            <span>MENGHITUNG HARI BAHAGIA</span>
            <Sparkles className="w-3.5 h-3.5 text-[#FFD166]" />
          </p>

          <div className="grid grid-cols-4 gap-3 sm:gap-4 max-w-md mx-auto">
            {/* Days */}
            <div className="bg-gradient-to-b from-[#FFE4EC] to-[#FFD1DC] p-3 sm:p-4 rounded-2xl border-2 border-[#FF85A2] shadow-sm relative group hover:scale-105 transition-transform">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <CuteSakuraFlower className="w-4 h-4" />
              </div>
              <div className="font-heading text-2xl sm:text-4xl font-bold text-[#E03164]">
                {timeLeft.days}
              </div>
              <div className="text-[10px] sm:text-xs font-sans font-bold text-[#6B3E48] uppercase tracking-wider mt-0.5">
                Hari
              </div>
            </div>

            {/* Hours */}
            <div className="bg-gradient-to-b from-[#FFF2DE] to-[#FFE3BA] p-3 sm:p-4 rounded-2xl border-2 border-[#FFB74D] shadow-sm relative group hover:scale-105 transition-transform">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <CuteDaisyFlower className="w-4 h-4" />
              </div>
              <div className="font-heading text-2xl sm:text-4xl font-bold text-[#E65100]">
                {timeLeft.hours}
              </div>
              <div className="text-[10px] sm:text-xs font-sans font-bold text-[#6B3E48] uppercase tracking-wider mt-0.5">
                Jam
              </div>
            </div>

            {/* Minutes */}
            <div className="bg-gradient-to-b from-[#E8F5E9] to-[#C8E6C9] p-3 sm:p-4 rounded-2xl border-2 border-[#81C784] shadow-sm relative group hover:scale-105 transition-transform">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <CuteTulipFlower className="w-4 h-4" />
              </div>
              <div className="font-heading text-2xl sm:text-4xl font-bold text-[#2E7D32]">
                {timeLeft.minutes}
              </div>
              <div className="text-[10px] sm:text-xs font-sans font-bold text-[#6B3E48] uppercase tracking-wider mt-0.5">
                Menit
              </div>
            </div>

            {/* Seconds */}
            <div className="bg-gradient-to-b from-[#F3E5F5] to-[#E1BEE7] p-3 sm:p-4 rounded-2xl border-2 border-[#BA68C8] shadow-sm relative group hover:scale-105 transition-transform">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                <CuteSakuraFlower className="w-4 h-4" />
              </div>
              <div className="font-heading text-2xl sm:text-4xl font-bold text-[#7B1FA2]">
                {timeLeft.seconds}
              </div>
              <div className="text-[10px] sm:text-xs font-sans font-bold text-[#6B3E48] uppercase tracking-wider mt-0.5">
                Detik
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
