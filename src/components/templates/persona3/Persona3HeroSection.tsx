import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Moon, Calendar, Clock, MapPin, Sparkles, Heart, Compass } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona3HeroSectionProps {
  invitation: Invitation;
  guestName?: string;
}

export const Persona3HeroSection: React.FC<Persona3HeroSectionProps> = ({
  invitation,
  guestName,
}) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(invitation.wedding_date + 'T08:00:00');

    const updateTimer = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        // Event has passed or is ongoing
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / 1000 / 60) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [invitation.wedding_date]);

  return (
    <section id="hero" className="relative pt-24 pb-20 sm:pt-28 sm:pb-28 overflow-hidden bg-[#070E22] text-[#F0F8FF]">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#00D2FF_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Persona 3 Top Date & Calendar Bar */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-xl bg-[#0B1A3D] border-2 border-[#00D2FF] shadow-[0_0_20px_rgba(0,210,255,0.2)] mb-12 transform -skew-x-3"
        >
          <div className="flex items-center gap-3 transform skew-x-3">
            <div className="px-2.5 py-1 rounded-sm bg-[#FFE600] text-[#070E22] text-xs font-black font-mono tracking-widest uppercase">
              CALENDAR 09/17
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-[#00D2FF] font-bold">
              <Moon className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
              <span>FULL MOON CLIMAX</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-[#A0C4E2] transform skew-x-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-[#00D2FF]" />
              <span>08:00 WIB</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-[#FFE600]" />
              <span>SIDOARJO & KEDIRI</span>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Hero Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Stylized Title & Quote */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Guest Personal Greeting Badge */}
            {guestName && (
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-[#0E224E] border border-[#FFE600] text-xs font-mono text-[#FFE600] tracking-wider shadow-sm">
                <Sparkles className="w-3.5 h-3.5" />
                <span>WELCOME, AGENT: <strong className="text-white font-sans">{guestName}</strong></span>
              </div>
            )}

            <div className="space-y-2">
              <p className="text-xs sm:text-sm font-mono tracking-[0.3em] text-[#00D2FF] uppercase font-bold">
                // OPERATION: SACRED MATRIMONY
              </p>
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white uppercase font-sans leading-none">
                {invitation.groom_nickname}
                <span className="text-[#FFE600] inline-block mx-2 sm:mx-3 transform -rotate-12">&</span>
                {invitation.bride_nickname}
              </h1>
            </div>

            {/* Persona 3 Dialogue Box for Wedding Quote */}
            <div className="relative rounded-2xl bg-[#091530] border-2 border-[#00D2FF] p-5 sm:p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 px-3 py-1 bg-[#00D2FF] text-[#070E22] text-[10px] font-mono font-black tracking-widest uppercase">
                SYSTEM MESSAGE // QUOTE
              </div>
              <p className="pt-4 text-sm sm:text-base text-[#D0E2F5] leading-relaxed font-sans italic">
                "{invitation.hero_quote || 'Dua jiwa berjanji merajut takdir bersama, mengarungi samudra waktu dengan cinta dan ketulusan.'}"
              </p>
              <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#00D2FF]/80 border-t border-[#00D2FF]/20 pt-2">
                <span>SOCIAL LINK: LOVERS</span>
                <span className="text-[#FFE600] font-bold">RANK 10 [MAX]</span>
              </div>
            </div>

            {/* Tactical Countdown Timer */}
            <div className="space-y-2 pt-2">
              <p className="text-xs font-mono tracking-widest text-[#00D2FF] uppercase font-bold">
                // COUNTDOWN TO CEREMONY
              </p>
              <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-md mx-auto lg:mx-0">
                {[
                  { label: 'DAYS', val: timeLeft.days },
                  { label: 'HOURS', val: timeLeft.hours },
                  { label: 'MINUTES', val: timeLeft.minutes },
                  { label: 'SECONDS', val: timeLeft.seconds },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#0B1A3D] border border-[#00D2FF]/60 text-center shadow-md transform hover:-translate-y-1 transition-transform"
                  >
                    <span className="block text-2xl sm:text-3xl font-mono font-black text-[#FFE600]">
                      {String(item.val).padStart(2, '0')}
                    </span>
                    <span className="block text-[9px] sm:text-[10px] font-mono text-[#A0C4E2] font-semibold tracking-wider">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Slanted Character Visuals */}
          <motion.div
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-sm">
              {/* Persona 3 Stylized Photo Frame */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-[#00D2FF] shadow-[0_0_35px_rgba(0,210,255,0.35)] bg-[#070E22] transform rotate-1 group">
                <div className="aspect-3/4 relative overflow-hidden">
                  <img
                    src={invitation.hero_image}
                    alt={`${invitation.groom_nickname} & ${invitation.bride_nickname}`}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle persona blue gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070E22] via-transparent to-transparent opacity-80" />
                </div>

                {/* Floating All-Out Attack Style Badge */}
                <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-[#081226]/90 border border-[#00D2FF] backdrop-blur-md">
                  <div className="flex items-center justify-between text-[10px] font-mono font-bold text-[#FFE600]">
                    <span>ALL-OUT ATTACK FINISH</span>
                    <span>100% SYNC</span>
                  </div>
                  <p className="text-sm font-black text-white uppercase font-sans tracking-wide">
                    APRIL & SITI'S WEDDING
                  </p>
                </div>
              </div>

              {/* Decorative Corner Accents */}
              <div className="absolute -top-3 -left-3 px-3 py-1 bg-[#FFE600] text-[#070E22] text-xs font-mono font-black uppercase tracking-wider rounded-xs shadow-md transform -skew-x-12">
                LEVEL 99 COUPLE
              </div>
              <div className="absolute -bottom-3 -right-3 px-3 py-1 bg-[#00D2FF] text-[#070E22] text-xs font-mono font-black uppercase tracking-wider rounded-xs shadow-md transform -skew-x-12">
                SEPT 2021
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
