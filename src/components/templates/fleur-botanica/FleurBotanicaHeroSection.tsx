import React, { useState, useEffect } from 'react';
import { Invitation } from '../../../types/wedding';
import { EucalyptusStem, MagnoliaBranch, HeirloomDivider } from './fleurBotanicaAssets';
import { Calendar, Clock } from 'lucide-react';

interface FleurBotanicaHeroSectionProps {
  invitation: Invitation;
}

export const FleurBotanicaHeroSection: React.FC<FleurBotanicaHeroSectionProps> = ({ invitation }) => {
  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Default target date if not provided
    const targetDateStr = invitation.wedding_date || '2026-09-30T09:00:00';
    const targetDate = new Date(targetDateStr).getTime() || new Date('2026-09-30').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [invitation.wedding_date]);

  const brideName = invitation.bride_nickname || 'Azalia';
  const groomName = invitation.groom_nickname || 'Dias';

  return (
    <section className="relative py-20 sm:py-28 px-4 bg-[#FAF8F5] text-[#293522] overflow-hidden text-center">
      {/* Background Subtle Texture */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none bg-repeat bg-center"
        style={{
          backgroundImage:
            'url(https://inveet.id/themes/modern-wedding/v1/background-conservatory-v1.webp)',
        }}
      />

      {/* Decorative Botanical Stems on Side */}
      <div className="absolute top-10 left-4 sm:left-12 pointer-events-none opacity-40">
        <EucalyptusStem className="w-24 h-36 -rotate-12" />
      </div>
      <div className="absolute top-12 right-4 sm:right-12 pointer-events-none opacity-40">
        <MagnoliaBranch className="w-28 h-28 rotate-12" />
      </div>

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <span className="inline-block text-[11px] font-serif uppercase tracking-[0.3em] text-[#80683E] border-b border-[#BDA06C]/50 pb-1">
          THE WEDDING CELEBRATION OF
        </span>

        {/* Couple Big Names */}
        <div className="py-3">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#293522] leading-none">
            {brideName}
          </h1>
          <div className="flex items-center justify-center gap-4 my-2 text-[#BDA06C]">
            <span className="h-[1px] w-16 bg-[#BDA06C]/60" />
            <span className="font-serif italic text-2xl sm:text-3xl">&amp;</span>
            <span className="h-[1px] w-16 bg-[#BDA06C]/60" />
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-wide text-[#293522] leading-none">
            {groomName}
          </h1>
        </div>

        {/* Hero Image or Archival Photo if present */}
        {(invitation.hero_image || invitation.cover_image) && (
          <div className="max-w-md mx-auto my-6 px-4">
            <div className="relative p-2.5 bg-white border border-[#BDA06C]/60 rounded-3xl shadow-[0_12px_35px_rgba(41,53,34,0.15)] overflow-hidden">
              <img
                src={invitation.hero_image || invitation.cover_image}
                alt="Foto Pengantin"
                className="w-full h-72 sm:h-80 object-cover rounded-2xl"
              />
            </div>
          </div>
        )}

        {/* Sacred Quote */}
        <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif italic text-[#66705A] leading-relaxed px-4">
          {invitation.hero_quote ||
            '“Dan di antara tanda-tanda kebesaran-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.” (QS. Ar-Rum: 21)'}
        </p>

        <HeirloomDivider className="my-6" />

        {/* Countdown Timer Block */}
        <div className="space-y-3">
          <span className="text-[10px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            MENGHITUNG HARI BAHAGIA
          </span>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-sm mx-auto">
            <div className="bg-white/90 border border-[#BDA06C]/60 rounded-2xl p-3 shadow-xs">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#66705A]">
                Hari
              </span>
            </div>

            <div className="bg-white/90 border border-[#BDA06C]/60 rounded-2xl p-3 shadow-xs">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#66705A]">
                Jam
              </span>
            </div>

            <div className="bg-white/90 border border-[#BDA06C]/60 rounded-2xl p-3 shadow-xs">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#66705A]">
                Menit
              </span>
            </div>

            <div className="bg-white/90 border border-[#BDA06C]/60 rounded-2xl p-3 shadow-xs">
              <span className="block font-serif text-2xl sm:text-3xl font-bold text-[#BDA06C]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-serif uppercase tracking-wider text-[#66705A]">
                Detik
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
