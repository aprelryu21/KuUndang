import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Heart, MapPin } from 'lucide-react';
import { Couple, SectionSetting } from '../../types/wedding';
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
  section?: SectionSetting;
}

export const CoupleSection: React.FC<CoupleSectionProps> = ({ bride, groom, section }) => {
  const { t } = useLanguage();

  return (
    <section id="couple" className="py-20 px-6 bg-[#F7F2EA] text-[#24313A] relative overflow-hidden">
      {/* Background Falling Petals & Hearts - Strictly Behind Couple Content */}
      <FloatingPetalsOverlay count={12} className="opacity-35 pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <FloralWreathIllustration className="w-12 h-12 text-[#C2A56B] mb-3" />
          <h2 className="font-heading text-3xl sm:text-4xl text-[#283D52] font-normal tracking-wide">
            {section?.title || t.coupleTitle}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-[#768692] max-w-lg font-light tracking-wide">
            {section?.subtitle || t.coupleSubtitle}
          </p>
          <div className="w-12 h-0.5 bg-[#C2A56B] mt-4" />
        </div>

        {/* Couples Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* 1. Bride Profile: Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center text-center group"
          >
            {/* 1. Foto Mempelai */}
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

            {/* 2. Nama Mempelai */}
            <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
              {bride.full_name}
            </h3>
            {bride.nickname && (
              <p className="font-accent text-2xl text-[#C2A56B] mt-0.5">
                ({bride.nickname})
              </p>
            )}

            {/* 3. Putri dari Pasangan */}
            <div className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed max-w-xs">
              <p className="font-medium text-[#24313A]">
                {bride.child_order || t.content?.bride?.childOrder || 'Putri Tercinta'}
              </p>
              <p className="mt-1">
                {t.daughterOf} <strong className="text-[#24313A]">{bride.father_name || 'Bpk. Orang Tua'}</strong> &amp; <strong className="text-[#24313A]">{bride.mother_name || 'Ibu Orang Tua'}</strong>
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(bride.address || bride.description) && (
              <div className="mt-3 flex items-start justify-center gap-1.5 text-xs text-[#768692] max-w-xs leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#C2A56B] shrink-0 mt-0.5" />
                <span>{bride.address || bride.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] border border-[#283D52]/15 text-xs text-[#283D52] hover:border-[#C2A56B] hover:text-[#C2A56B] transition-colors shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5 text-[#C2A56B]" />
                <span>@{bride.instagram.replace('@', '')}</span>
              </a>
            )}
          </motion.div>

          {/* 2. Groom Profile: Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center group"
          >
            {/* 1. Foto Mempelai */}
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

            {/* 2. Nama Mempelai */}
            <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
              {groom.full_name}
            </h3>
            {groom.nickname && (
              <p className="font-accent text-2xl text-[#C2A56B] mt-0.5">
                ({groom.nickname})
              </p>
            )}

            {/* 3. Putra dari Pasangan */}
            <div className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed max-w-xs">
              <p className="font-medium text-[#24313A]">
                {groom.child_order || t.content?.groom?.childOrder || 'Putra Tercinta'}
              </p>
              <p className="mt-1">
                {t.sonOf} <strong className="text-[#24313A]">{groom.father_name || 'Bpk. Orang Tua'}</strong> &amp; <strong className="text-[#24313A]">{groom.mother_name || 'Ibu Orang Tua'}</strong>
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(groom.address || groom.description) && (
              <div className="mt-3 flex items-start justify-center gap-1.5 text-xs text-[#768692] max-w-xs leading-relaxed">
                <MapPin className="w-3.5 h-3.5 text-[#C2A56B] shrink-0 mt-0.5" />
                <span>{groom.address || groom.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFFCF7] border border-[#283D52]/15 text-xs text-[#283D52] hover:border-[#C2A56B] hover:text-[#C2A56B] transition-colors shadow-xs"
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
