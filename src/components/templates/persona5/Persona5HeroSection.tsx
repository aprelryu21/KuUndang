import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Flame, Heart, Sparkles, Star } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface Persona5HeroSectionProps {
  invitation: Invitation;
}

export const Persona5HeroSection: React.FC<Persona5HeroSectionProps> = ({ invitation }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(`${invitation.wedding_date}T08:00:00`).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [invitation.wedding_date]);

  return (
    <section id="p5-home" className="relative pt-24 pb-20 sm:py-28 bg-[#0D0D0D] text-[#FFFFFF] overflow-hidden">
      {/* Background Graphic Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Halftone Pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }}
        />

        {/* Diagonal Slashes */}
        <div className="absolute top-0 right-0 w-[500px] h-32 bg-[#E60012] rotate-12 origin-top-right opacity-80" />
        <div className="absolute top-12 right-0 w-[450px] h-6 bg-[#FFFFFF] rotate-12 origin-top-right" />
        <div className="absolute bottom-0 left-0 w-[600px] h-40 bg-[#E60012] -rotate-12 origin-bottom-left opacity-70" />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Slanted Comic Badge */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E60012] text-[#FFFFFF] border-2 border-white -skew-x-12 shadow-[4px_4px_0px_0px_#FFF000]">
            <Flame className="w-4 h-4 text-[#FFF000] skew-x-12" />
            <span className="text-xs font-black uppercase tracking-[0.2em] skew-x-12">
              TARGET INFILTRATION // WEDDING CELEBRATION
            </span>
          </div>
        </div>

        {/* Main Title Typography */}
        <div className="text-center space-y-4">
          <p className="text-xs sm:text-sm font-mono tracking-[0.35em] text-[#FFF000] uppercase font-bold">
            STEAL THE WEDDING STAGE
          </p>

          <div className="relative inline-block">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tighter leading-tight text-[#FFFFFF]">
              <span className="inline-block bg-[#000000] border-2 border-[#E60012] px-4 py-1 -skew-x-6 text-[#FFFFFF] shadow-[6px_6px_0px_0px_#E60012]">
                {invitation.groom_nickname}
              </span>
              <span className="text-[#FFF000] not-italic px-3 font-mono">&</span>
              <span className="inline-block bg-[#FFFFFF] text-[#000000] px-4 py-1 skew-x-6 shadow-[6px_6px_0px_0px_#FFFFFF]">
                {invitation.bride_nickname}
              </span>
            </h1>
          </div>

          <p className="text-sm sm:text-base font-mono text-[#FFFFFF]/80 max-w-xl mx-auto pt-2">
            Jumat, 17 September 2021 // Akad & Resepsi Pernikahan
          </p>
        </div>

        {/* Persona 5 Mission Deadline / Countdown Section */}
        <div className="mt-12 max-w-2xl mx-auto bg-[#16161A] border-4 border-[#E60012] p-5 sm:p-7 shadow-[10px_10px_0px_0px_#000000] -skew-x-2 relative">
          <div className="absolute -top-4 left-6 bg-[#FFF000] text-[#000000] font-black text-xs uppercase tracking-widest px-3 py-0.5 border border-black -skew-x-6">
            ★ MISSION DEADLINE / COUNTDOWN ★
          </div>

          <div className="grid grid-cols-4 gap-2 sm:gap-4 text-center mt-2">
            <div className="bg-[#000000] border-2 border-[#FFFFFF]/40 p-2.5 sm:p-4 -skew-x-3 shadow-sm">
              <div className="text-2xl sm:text-4xl font-black font-mono text-[#FFF000] skew-x-3">
                {String(timeLeft.days).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFFFFF]/70 mt-1 skew-x-3">
                HARI
              </div>
            </div>

            <div className="bg-[#000000] border-2 border-[#FFFFFF]/40 p-2.5 sm:p-4 -skew-x-3 shadow-sm">
              <div className="text-2xl sm:text-4xl font-black font-mono text-[#FFFFFF] skew-x-3">
                {String(timeLeft.hours).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFFFFF]/70 mt-1 skew-x-3">
                JAM
              </div>
            </div>

            <div className="bg-[#000000] border-2 border-[#FFFFFF]/40 p-2.5 sm:p-4 -skew-x-3 shadow-sm">
              <div className="text-2xl sm:text-4xl font-black font-mono text-[#FFFFFF] skew-x-3">
                {String(timeLeft.minutes).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFFFFF]/70 mt-1 skew-x-3">
                MENIT
              </div>
            </div>

            <div className="bg-[#000000] border-2 border-[#E60012] p-2.5 sm:p-4 -skew-x-3 shadow-sm">
              <div className="text-2xl sm:text-4xl font-black font-mono text-[#E60012] skew-x-3">
                {String(timeLeft.seconds).padStart(2, '0')}
              </div>
              <div className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#FFFFFF]/70 mt-1 skew-x-3">
                DETIK
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Quote Comic Dialogue Box */}
        <div className="mt-8 max-w-xl mx-auto relative bg-[#000000] border-2 border-[#FFFFFF] p-5 shadow-[6px_6px_0px_0px_#E60012] text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-[#FFF000] font-bold uppercase mb-2">
            <Star className="w-3.5 h-3.5 fill-[#FFF000]" />
            <span>METAVERSE COGNITIVE DIALOGUE:</span>
          </div>
          <p className="text-sm font-sans italic text-[#FFFFFF] leading-relaxed">
            &quot;{invitation.hero_quote || 'Dua jiwa berjanji merajut takdir bersama, mengarungi samudra waktu dengan cinta dan ketulusan.'}&quot;
          </p>
          <div className="text-right text-[11px] font-mono text-[#FFFFFF]/60 mt-2">
            — April & Siti, Tokyo & East Java
          </div>
        </div>
      </div>
    </section>
  );
};
