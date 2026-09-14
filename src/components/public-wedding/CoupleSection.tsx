import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart } from 'lucide-react';
import { Couple } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import {
  FloralWreathIllustration,
  EntwinedRingsIllustration,
  VintageDivider,
} from './WeddingDecorations';
import { FloatingPetalsOverlay } from './FloatingPetalsOverlay';
import { CoupleAvatar } from '../common/CoupleAvatar';

interface CoupleSectionProps {
  bride: Couple;
  groom: Couple;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ bride, groom }) => {
  const { t } = useLanguage();

  return (
    <section id="couple" className="py-20 px-6 bg-[#F7F2EA] text-[#24313A] relative overflow-hidden">
      {/* Background Falling Petals & Hearts - Strictly Behind Couple Content */}
      <FloatingPetalsOverlay className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Section Header with Floral Wreath */}
        <div className="mb-14 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-2"
          >
            <FloralWreathIllustration className="w-20 h-20 sm:w-24 sm:h-24" />
          </motion.div>

          <p className="font-accent text-3xl sm:text-4xl text-[#C2A56B]">{t.theCoupleTitle}</p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase text-[#283D52] font-semibold mt-1">
            {groom.nickname} & {bride.nickname}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {t.weAreGettingMarried}
          </p>
        </div>

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 sm:gap-16 items-start">
          {/* Bride Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Elegant Arch Portrait */}
            <div className="relative mb-6">
              <div className="w-52 h-72 sm:w-60 sm:h-80 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#FFFCF7] shadow-xl p-1 bg-[#FFFCF7]">
                <CoupleAvatar
                  photoUrl={bride.photo_url}
                  role="bride"
                  name={bride.full_name}
                  theme="royal"
                  className="w-full h-full rounded-t-full rounded-b-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#FFFCF7] text-[#DFBFC1] p-2.5 rounded-full shadow-md border border-[#C2A56B]/30">
                <Heart className="w-5 h-5 fill-current" />
              </div>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
              {bride.full_name}
            </h3>

            <p className="font-accent text-2xl text-[#C2A56B] mt-0.5">
              ({bride.nickname})
            </p>

            <div className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed max-w-xs">
              <p className="font-medium text-[#24313A]">
                {t.content?.bride?.childOrder || bride.child_order}
              </p>
              <p className="mt-1">
                {t.daughterOf} {bride.father_name} & {bride.mother_name}
              </p>
            </div>

            {(t.content?.bride?.bio || bride.description) && (
              <p className="mt-4 text-xs italic text-[#768692] max-w-xs leading-relaxed">
                "{t.content?.bride?.bio || bride.description}"
              </p>
            )}

            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFCF7] border border-[#283D52]/15 text-xs text-[#283D52] hover:border-[#C2A56B] hover:text-[#C2A56B] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C2A56B]" />
                <span>@{bride.instagram.replace('@', '')}</span>
              </a>
            )}
          </motion.div>

          {/* Groom Profile */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            {/* Elegant Arch Portrait */}
            <div className="relative mb-6">
              <div className="w-52 h-72 sm:w-60 sm:h-80 rounded-t-full rounded-b-2xl overflow-hidden border-4 border-[#FFFCF7] shadow-xl p-1 bg-[#FFFCF7]">
                <CoupleAvatar
                  photoUrl={groom.photo_url}
                  role="groom"
                  name={groom.full_name}
                  theme="royal"
                  className="w-full h-full object-cover rounded-t-full rounded-b-xl group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-[#FFFCF7] text-[#283D52] p-2.5 rounded-full shadow-md border border-[#C2A56B]/30">
                <Heart className="w-5 h-5 fill-[#C2A56B] text-[#C2A56B]" />
              </div>
            </div>

            <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
              {groom.full_name}
            </h3>

            <p className="font-accent text-2xl text-[#C2A56B] mt-0.5">
              ({groom.nickname})
            </p>

            <div className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed max-w-xs">
              <p className="font-medium text-[#24313A]">
                {t.content?.groom?.childOrder || groom.child_order}
              </p>
              <p className="mt-1">
                {t.sonOf} {groom.father_name} & {groom.mother_name}
              </p>
            </div>

            {(t.content?.groom?.bio || groom.description) && (
              <p className="mt-4 text-xs italic text-[#768692] max-w-xs leading-relaxed">
                "{t.content?.groom?.bio || groom.description}"
              </p>
            )}

            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFFCF7] border border-[#283D52]/15 text-xs text-[#283D52] hover:border-[#C2A56B] hover:text-[#C2A56B] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C2A56B]" />
                <span>@{groom.instagram.replace('@', '')}</span>
              </a>
            )}
          </motion.div>
        </div>

        {/* Entwined Rings and Vintage Divider */}
        <div className="mt-14 flex flex-col items-center justify-center gap-3">
          <EntwinedRingsIllustration className="w-20 h-14" />
          <VintageDivider className="w-56 sm:w-72 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
};
