import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { LoveBirdsIllustration, VintageDivider } from './WeddingDecorations';
import { FloatingPetalsOverlay } from './FloatingPetalsOverlay';

interface PersonalGreetingProps {
  guestName: string;
  greetingText?: string;
}

export const PersonalGreeting: React.FC<PersonalGreetingProps> = ({
  guestName,
  greetingText,
}) => {
  const { t } = useLanguage();
  const displayName = guestName.trim() || t.honoredGuest;

  // Use dynamic translation if default or not set
  const displayGreeting =
    !greetingText ||
    greetingText === "We're so happy you're here ♡" ||
    greetingText === "We're so happy you're here"
      ? t.invitationGreeting
      : greetingText;

  return (
    <section id="greeting" className="relative py-14 px-6 bg-[#F7F2EA] text-center overflow-hidden">
      {/* Background Falling Petals & Hearts - Strictly Behind Text Content */}
      <FloatingPetalsOverlay className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" />

      <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
        {/* Adorable Lovebirds Illustration */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-3"
        >
          <LoveBirdsIllustration className="w-32 h-16 sm:w-36 sm:h-20" />
        </motion.div>

        <p className="font-accent text-3xl sm:text-4xl text-[#C2A56B] mb-1">
          {t.dearGuest}
        </p>

        <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl tracking-wider text-[#283D52] uppercase font-semibold max-w-lg leading-snug">
          {displayName}
        </h2>

        <p className="mt-3 text-xs sm:text-sm text-[#768692] italic font-medium max-w-md">
          "{displayGreeting}"
        </p>

        {/* Vintage Divider */}
        <div className="mt-5 mb-2">
          <VintageDivider className="w-48 sm:w-60 h-6 opacity-80" />
        </div>

        {/* Sacred Holy Verse (Ar-Rum 21) with Translation */}
        {t.content?.holyVerse && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 p-6 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/30 max-w-xl text-center shadow-xs"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-[#C2A56B]">
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-[10px] uppercase tracking-[0.25em] font-semibold text-[#768692]">
                {t.content.holyVerseRef}
              </span>
              <Sparkles className="w-3.5 h-3.5" />
            </div>

            <p className="text-xs sm:text-sm text-[#24313A]/90 font-serif italic leading-relaxed">
              "{t.content.holyVerse}"
            </p>
          </motion.div>
        )}

        <div className="mt-8 flex items-center justify-center gap-2">
          <span className="w-12 h-[1px] bg-[#C2A56B]/40" />
          <span className="text-[10px] text-[#C2A56B] tracking-[0.25em] uppercase font-medium">
            Wedding Celebration
          </span>
          <span className="w-12 h-[1px] bg-[#C2A56B]/40" />
        </div>
      </div>
    </section>
  );
};
