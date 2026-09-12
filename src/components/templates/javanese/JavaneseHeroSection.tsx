import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  GununganWayangSvg,
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
  KembarMayangSvg,
  JavaneseGebyokArch,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { Calendar, Clock } from 'lucide-react';

interface JavaneseHeroSectionProps {
  invitation: Invitation;
}

export const JavaneseHeroSection: React.FC<JavaneseHeroSectionProps> = ({ invitation }) => {
  const { t, language } = useLanguage();

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(`${invitation.wedding_date}T08:00:00`).getTime();

    const updateCountdown = () => {
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
        // If event passed, show zero or celebration
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [invitation.wedding_date]);

  return (
    <section
      id="javanese-hero"
      className="py-16 sm:py-24 px-4 relative overflow-hidden bg-[#1E110A] text-[#FAF6EE] text-center"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top, #3A2012 0%, #1E110A 70%, #120A05 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-10" />
      <JavaneseGoldenParticles count={20} showJasminePetals={true} />

      {/* Flanking Ornate Kembar Mayang */}
      <div className="hidden xl:block absolute left-8 top-1/4 pointer-events-none opacity-70">
        <KembarMayangSvg className="w-14 h-36" />
      </div>
      <div className="hidden xl:block absolute right-8 top-1/4 pointer-events-none opacity-70">
        <KembarMayangSvg className="w-14 h-36" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Carved Gebyok Arch at the Top */}
        <JavaneseGebyokArch className="w-64 sm:w-80 mx-auto text-[#D4AF37]/80 filter drop-shadow-md" />

        {/* Gunungan Silhouette with animated glow */}
        <div className="flex justify-center -mt-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <GununganWayangSvg className="w-24 h-36 sm:w-28 sm:h-40 filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.5)]" />
          </motion.div>
        </div>

        {/* Basmalah & Ayat Ar-Rum */}
        <div className="space-y-3 max-w-2xl mx-auto px-4">
          <p className="font-serif text-lg sm:text-xl text-[#E5C158] tracking-wider">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="font-serif text-xs sm:text-sm text-[#FAF6EE]/80 leading-relaxed italic">
            {language === 'JW'
              ? '“Maha Suci Gusti Allah Ingkang Sampun Nitiaken Makhlukipun Gegandhengan Kaliyan Katresnan. Mugi Tansah Pinaringan Berkah Lumampahing Palakrama Menika.”'
              : '“Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan hidup dari jenismu sendiri, supaya kamu cenderung dan merasa tenteram kepadanya, dan dijadikan-Nya di antaramu rasa kasih dan sayang.” (QS. Ar-Rum: 21)'}
          </p>
        </div>

        <JavaneseDivider />

        {/* Main Title & Couple Name */}
        <div className="space-y-3">
          <p className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'PAHARGYAN DHAUPING TEMANTEN' : 'THE SACRED WEDDING CELEBRATION'}
          </p>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-wide text-[#FAF6EE] drop-shadow-md">
            {invitation.groom_nickname}{' '}
            <span className="text-[#D4AF37] font-serif italic">&</span>{' '}
            {invitation.bride_nickname}
          </h1>
          <p className="font-serif text-sm sm:text-base text-[#E5C158] font-medium tracking-widest">
            April Pratama & Siti Nurjannah
          </p>
        </div>

        {/* Date & Javanese Weton Badge */}
        <div className="inline-flex flex-col items-center gap-1.5 px-6 py-3 rounded-2xl bg-[#24160E]/90 border border-[#D4AF37]/60 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-2 text-xs font-serif text-[#FAF6EE]/90">
            <Calendar className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="font-bold text-[#E5C158]">JUMAT PAHING, 17 SEPTEMBER 2021</span>
          </div>
          <p className="text-[11px] font-serif text-[#D4AF37]/80">
            {language === 'JW' ? 'Wuku Kulawu // Tanggal Jawi Manten' : 'Wuku Kulawu // Kalender Adat Jawa'}
          </p>
        </div>

        {/* Sacred Countdown Timer */}
        <div className="pt-4 max-w-xl mx-auto">
          <p className="text-xs font-serif text-[#D4AF37] uppercase tracking-[0.2em] mb-4">
            ❖ {language === 'JW' ? 'WANCI PAHARGYAN' : 'HITUNG MUNDUR HARI BAHAGIA'} ❖
          </p>

          <div className="grid grid-cols-4 gap-2 sm:gap-4">
            {[
              { label: t.days || 'Dinten', value: timeLeft.days },
              { label: t.hours || 'Jam', value: timeLeft.hours },
              { label: t.minutes || 'Menit', value: timeLeft.minutes },
              { label: t.seconds || 'Detik', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#24160E] border border-[#D4AF37]/60 rounded-xl p-3 sm:p-4 shadow-[0_4px_12px_rgba(0,0,0,0.4)] relative"
              >
                <div className="font-serif text-2xl sm:text-4xl font-bold text-[#E5C158]">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-[10px] sm:text-xs font-serif uppercase tracking-wider text-[#FAF6EE]/75 mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
