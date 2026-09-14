import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Heart, Calendar, Clock, Sparkles, MapPin, Gift, Bell } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface PastelPopHeroSectionProps {
  invitation: Invitation;
}

export const PastelPopHeroSection: React.FC<PastelPopHeroSectionProps> = ({ invitation }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(invitation.wedding_date).getTime();
      const now = new Date().getTime();
      const difference = target - now;

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

  const formattedDate = new Date(invitation.wedding_date).toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <section id="cute-home" className="py-16 sm:py-24 bg-gradient-to-b from-[#FFE5EC]/40 via-white to-[#FFF9E6]/60 relative overflow-hidden">
      {/* Playful Floating Emojis */}
      <div className="absolute top-10 right-10 text-4xl select-none animate-bounce" style={{ animationDuration: '3.8s' }}>
        🎈
      </div>
      <div className="absolute top-1/2 left-4 text-3xl select-none animate-bounce" style={{ animationDuration: '4.2s' }}>
        🍭
      </div>
      <div className="absolute bottom-10 right-6 text-3xl select-none animate-bounce" style={{ animationDuration: '3.2s' }}>
        ⭐
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Top Playful Ribbon */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#FFD166] border-2 border-[#2B2D42] text-[#2B2D42] text-xs font-black uppercase tracking-widest mb-6 shadow-[3px_3px_0px_0px_#FF6B8B]"
        >
          <Sparkles className="w-4 h-4 text-[#FF6B8B]" />
          <span>OUR SWEET LOVE STORY ♡</span>
        </motion.div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl font-black text-[#2B2D42] tracking-tight leading-tight">
          <span className="text-[#FF6B8B] inline-block hover:scale-105 transition-transform">
            {invitation.bride_nickname || 'Mempelai Wanita'}
          </span>{' '}
          <span className="text-3xl sm:text-5xl text-[#FFD166] font-normal">&amp;</span>{' '}
          <span className="text-[#4D96FF] inline-block hover:scale-105 transition-transform">
            {invitation.groom_nickname || 'Mempelai Pria'}
          </span>
        </h1>

        <p className="text-sm sm:text-base font-bold text-[#2B2D42]/70 mt-3">
          {invitation.opening_subtext || 'Kami Mengundang Anda Menjadi Saksi Hari Bahagia Penuh Senyuman'}
        </p>

        {/* Hero Image in Cute Polaroid Frame with Washi Tape */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="my-10 relative max-w-sm sm:max-w-md mx-auto"
        >
          {/* Top Washi Tape */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-[#06D6A0] border border-white/60 rounded-sm -rotate-2 z-20 shadow-xs flex items-center justify-center">
            <span className="text-[10px] font-black text-white uppercase tracking-wider">SWEET COUPLE</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-3xl border-4 border-[#FF6B8B] shadow-[8px_8px_0px_0px_#FFD166] transform hover:rotate-1 transition-transform">
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-rose-50 border-2 border-slate-100 relative">
              <img
                src={invitation.hero_image || 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80'}
                alt={`${invitation.bride_nickname || 'Bride'} & ${invitation.groom_nickname || 'Groom'} Wedding`}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-full border border-[#FF6B8B]/40 text-[#FF6B8B] text-xs font-black shadow-xs flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 fill-[#FF6B8B]" />
                <span>Together Forever</span>
              </div>
            </div>

            {/* Date Tag under photo */}
            <div className="mt-3 flex items-center justify-center gap-2 text-xs font-black text-[#2B2D42]">
              <Calendar className="w-4 h-4 text-[#FF6B8B]" />
              <span>{formattedDate}</span>
            </div>
          </div>
        </motion.div>

        {/* Cute Love Meter / Countdown Timer */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border-2 border-[#06D6A0] text-[#06D6A0] text-xs font-black mb-4 shadow-xs">
            <Clock className="w-3.5 h-3.5" />
            <span>COUNTDOWN MENUJU HARI BAHAGIA</span>
          </div>

          <div className="grid grid-cols-4 gap-2.5 sm:gap-4 max-w-lg mx-auto">
            {/* Hari */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-3 sm:p-4 rounded-3xl bg-[#FFE5EC] border-3 border-[#FF6B8B] shadow-[4px_4px_0px_0px_#2B2D42] text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-[#FF6B8B]">{timeLeft.days}</div>
              <div className="text-[10px] sm:text-xs font-black uppercase text-[#2B2D42] mt-1">Hari</div>
            </motion.div>

            {/* Jam */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-3 sm:p-4 rounded-3xl bg-[#FFF9E6] border-3 border-[#FFD166] shadow-[4px_4px_0px_0px_#2B2D42] text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-[#FFD166]">{timeLeft.hours}</div>
              <div className="text-[10px] sm:text-xs font-black uppercase text-[#2B2D42] mt-1">Jam</div>
            </motion.div>

            {/* Menit */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-3 sm:p-4 rounded-3xl bg-[#E8FBF5] border-3 border-[#06D6A0] shadow-[4px_4px_0px_0px_#2B2D42] text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-[#06D6A0]">{timeLeft.minutes}</div>
              <div className="text-[10px] sm:text-xs font-black uppercase text-[#2B2D42] mt-1">Menit</div>
            </motion.div>

            {/* Detik */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-3 sm:p-4 rounded-3xl bg-[#EDF5FF] border-3 border-[#4D96FF] shadow-[4px_4px_0px_0px_#2B2D42] text-center"
            >
              <div className="text-2xl sm:text-4xl font-black text-[#4D96FF]">{timeLeft.seconds}</div>
              <div className="text-[10px] sm:text-xs font-black uppercase text-[#2B2D42] mt-1">Detik</div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
