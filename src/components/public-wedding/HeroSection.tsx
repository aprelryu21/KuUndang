import React from 'react';
import { motion } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { Invitation } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';

interface HeroSectionProps {
  invitation: Invitation;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ invitation }) => {
  const { t, language } = useLanguage();
  const dateObj = new Date(invitation.wedding_date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const locale = language === 'ID' ? 'id-ID' : language === 'JP' ? 'ja-JP' : language === 'CN' ? 'zh-CN' : 'en-US';
  const monthName = dateObj
    .toLocaleString(locale, { month: 'long' })
    .toUpperCase();
  const year = dateObj.getFullYear();
  const formattedDate = `${day} · ${monthName} · ${year}`;

  const isDefaultQuote =
    !invitation.hero_quote ||
    invitation.hero_quote.includes('Dua jiwa berjanji merajut takdir bersama');

  const displayQuote = isDefaultQuote
    ? t.heroQuote || t.content?.heroQuote || invitation.hero_quote
    : invitation.hero_quote;

  const scrollToNext = () => {
    const el = document.getElementById('countdown') || document.getElementById('couple');
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative w-full min-h-[90vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#24313A]">
      {/* Background Couple Photo with Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={invitation.hero_image || invitation.cover_image}
          alt={`${invitation.bride_nickname} & ${invitation.groom_nickname}`}
          className="w-full h-full object-cover object-center filter brightness-[0.82] contrast-[1.05]"
        />
        {/* Subtle dual gradient overlay for editorial magazine look */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#24313A]/90 via-[#24313A]/35 to-[#24313A]/60" />
        <div className="absolute inset-0 bg-[#283D52]/20 mix-blend-multiply" />
      </div>

      {/* Magazine Editorial Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center text-[#FFFCF7] flex flex-col items-center justify-between min-h-[80vh]">
        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.35em] uppercase text-[#DFBFC1] font-medium"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
          <span>CELEBRATING LOVE & ETERNITY</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
        </motion.div>

        {/* Big Names Centerpiece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="my-auto py-8"
        >
          <h1 className="font-heading text-5xl sm:text-7xl md:text-8xl tracking-tight uppercase leading-[0.95] text-[#FFFCF7] drop-shadow-md">
            <span>{invitation.groom_nickname}</span>
            <span className="block font-accent lowercase text-4xl sm:text-6xl md:text-7xl text-[#C2A56B] my-2 sm:my-3">
              and
            </span>
            <span>{invitation.bride_nickname}</span>
          </h1>

          <div className="mt-6 flex items-center justify-center gap-4">
            <span className="w-12 h-[1px] bg-[#C2A56B]" />
            <p className="text-xs sm:text-sm tracking-[0.3em] font-semibold text-[#FFFCF7] uppercase">
              ARE GETTING MARRIED
            </p>
            <span className="w-12 h-[1px] bg-[#C2A56B]" />
          </div>

          <p className="mt-4 text-sm sm:text-base tracking-[0.25em] text-[#DFBFC1] font-medium font-sans">
            {formattedDate}
          </p>

          {displayQuote && (
            <p className="mt-6 max-w-lg mx-auto text-xs sm:text-sm italic text-[#FFFCF7]/80 font-serif leading-relaxed px-4">
              "{displayQuote}"
            </p>
          )}
        </motion.div>

        {/* Scroll Indicator */}
        <motion.button
          type="button"
          onClick={scrollToNext}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2 text-[#DFBFC1] hover:text-[#FFFCF7] transition-colors cursor-pointer"
          aria-label="Scroll ke bagian selanjutnya"
        >
          <span className="text-[10px] tracking-[0.25em] uppercase font-semibold">
            Scroll Down
          </span>
          <ChevronDown className="w-4 h-4 text-[#C2A56B]" />
        </motion.button>
      </div>
    </section>
  );
};
