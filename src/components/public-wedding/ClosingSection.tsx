import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowUp, BookOpen } from 'lucide-react';
import { Invitation } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { FloralWreathIllustration, VintageDivider } from './WeddingDecorations';

interface ClosingSectionProps {
  invitation: Invitation;
  onBackToCover?: () => void;
}

export const ClosingSection: React.FC<ClosingSectionProps> = ({ invitation, onBackToCover }) => {
  const { t } = useLanguage();
  const dateObj = new Date(invitation.wedding_date);
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const formattedDate = `${day} · ${month} · ${year}`;

  const isDefaultClosing =
    !invitation.closing_message ||
    invitation.closing_message.includes('Merupakan suatu kehormatan dan kebahagiaan bagi kami');
  const displayClosingMessage = isDefaultClosing
    ? t.closingHonorMessage || t.content?.closingMessage || invitation.closing_message
    : invitation.closing_message;

  return (
    <section id="closing" className="relative py-24 px-6 bg-[#24313A] text-[#FFFCF7] text-center overflow-hidden">
      {/* Background Image with Dark Romantic Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src={invitation.closing_image || invitation.hero_image}
          alt="Couple Closing"
          className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#24313A] via-[#24313A]/70 to-[#24313A]/50" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-4"
        >
          <FloralWreathIllustration className="w-20 h-20 sm:w-24 sm:h-24 opacity-90" />
        </motion.div>

        <div className="inline-flex items-center gap-2 text-xs tracking-[0.3em] uppercase text-[#DFBFC1] mb-6">
          <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
          <span>{t.ourGratitude}</span>
          <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
        </div>

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wide font-normal leading-relaxed text-[#FFFCF7] max-w-xl">
          "{displayClosingMessage}"
        </h2>

        <p className="mt-4 text-sm sm:text-base text-[#DFBFC1] font-serif italic max-w-lg">
          {t.closingSubtitle}
        </p>

        {/* Vintage Divider */}
        <div className="my-8">
          <VintageDivider className="w-48 sm:w-60 h-6 opacity-80" />
        </div>

        <div className="text-center">
          <p className="font-heading text-4xl sm:text-5xl uppercase tracking-wider text-[#FFFCF7]">
            {invitation.groom_nickname} <span className="font-accent text-3xl sm:text-4xl text-[#C2A56B] lowercase">&</span> {invitation.bride_nickname}
          </p>
          <p className="mt-2 text-xs tracking-[0.3em] text-[#DFBFC1] font-medium font-sans">
            {formattedDate}
          </p>
        </div>

        {/* Playful closing text */}
        <div className="mt-10 px-4 py-2 rounded-full bg-[#FFFCF7]/10 border border-[#C2A56B]/40 backdrop-blur-xs flex items-center gap-2 text-xs text-[#FFFCF7]">
          <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
          <span className="font-sans font-medium">
            {invitation.closing_subtext || t.closingPlayful}
          </span>
          <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
        </div>

        {/* Return to Opening Button */}
        {onBackToCover && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-10"
          >
            <motion.button
              id="back-to-cover-btn"
              type="button"
              onClick={onBackToCover}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#FFFCF7] hover:bg-[#F7F2EA] text-[#283D52] border-2 border-[#C2A56B] shadow-lg hover:shadow-xl transition-all cursor-pointer font-bold text-xs sm:text-sm tracking-[0.18em] uppercase group"
            >
              <ArrowUp className="w-4 h-4 text-[#C2A56B] group-hover:-translate-y-1 transition-transform" />
              <span>{t.backToCover || 'Kembali ke Sampul Undangan'}</span>
              <BookOpen className="w-4 h-4 text-[#283D52] opacity-70 group-hover:opacity-100 transition-opacity" />
            </motion.button>
          </motion.div>
        )}

        {/* Platform watermark */}
        <div className="mt-14 text-[10px] text-[#768692] tracking-wider uppercase">
          Crafted with love via <span className="text-[#DFBFC1]">KU UNDANG</span>
        </div>
      </div>
    </section>
  );
};
