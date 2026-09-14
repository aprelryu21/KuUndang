import React from 'react';
import { motion } from 'motion/react';
import { Couple } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JavaneseCornerFlourish,
  JavaneseDivider,
  BatikKawungPattern,
  JavaneseGebyokArch,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { Heart } from 'lucide-react';
import { CoupleAvatar } from '../../common/CoupleAvatar';

interface JavaneseCoupleSectionProps {
  bride: Couple;
  groom: Couple;
}

export const JavaneseCoupleSection: React.FC<JavaneseCoupleSectionProps> = ({ bride, groom }) => {
  const { t, language } = useLanguage();

  return (
    <section
      id="javanese-couple"
      className="py-20 sm:py-28 px-4 bg-[#180E07] text-[#FAF6EE] relative overflow-hidden text-center border-t border-[#D4AF37]/30"
      style={{
        backgroundImage:
          'radial-gradient(circle at center, #2C1810 0%, #180E07 70%, #0F0804 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />
      <JavaneseGoldenParticles count={14} showJasminePetals={true} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="mb-14 space-y-3">
          <JavaneseGebyokArch className="w-56 mx-auto mb-2 text-[#D4AF37]/80" />
          <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'SANG PINANGANTEN KEGANDHENG' : 'MEMPELAI BERBAHAGIA'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
            {language === 'JW' ? 'Temanten Putri & Temanten Kakung' : 'Pengantin Pria & Wanita'}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
            {language === 'JW'
              ? 'Nyuwun donga pangestu dhumateng para sepuh saha para rawuh, mugi anggenipun mangun bale wisma tansah binerkahan Gusti Ingkang Maha Agung.'
              : 'Memohon doa restu dari para sesepuh dan keluarga handai taulan, agar ikrar suci pernikahan ini senantiasa dilimpahi keberkahan dan keharmonisan abadi.'}
          </p>
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto items-center">
          {/* 1. Penganten Putri (Bride) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-8 relative shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>

            {/* Photo with Paes / Javanese Arch Frame */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] p-1 bg-[#1A1009] shadow-md mb-5">
              <CoupleAvatar
                photoUrl={bride.photo_url}
                role="bride"
                name={bride.full_name}
                theme="javanese"
                className="w-full h-full rounded-t-full rounded-b-lg"
              />
            </div>

            {/* Title & Name */}
            <p className="text-[11px] font-serif text-[#D4AF37] tracking-widest uppercase mb-1">
              {language === 'JW' ? 'TEMANTEN PUTRI' : 'MEMPELAI WANITA'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C158]">
              {bride.full_name}
            </h3>
            <p className="font-serif text-xs text-[#FAF6EE]/80 mt-1">
              ({bride.nickname})
            </p>

            <JavaneseDivider className="my-3 max-w-xs" />

            {/* Lineage / Orang Tua */}
            <div className="text-xs font-serif text-[#FAF6EE]/80 space-y-1">
              <p className="text-[#D4AF37]/90 font-medium">
                {language === 'JW' ? 'Putri saking panjenenganipun:' : 'Putri tercinta dari:'}
              </p>
              <p className="font-bold text-[#FAF6EE]">
                {bride.father_name} & {bride.mother_name}
              </p>
              <p className="text-[11px] text-[#FAF6EE]/60 pt-1">
                Krembung, Sidoarjo, Jawa Timur
              </p>
            </div>
          </motion.div>

          {/* 2. Penganten Kakung (Groom) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-8 relative shadow-[0_8px_30px_rgba(0,0,0,0.7)]"
          >
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>

            {/* Photo with Javanese Beskap Arch Frame */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] p-1 bg-[#1A1009] shadow-md mb-5">
              <CoupleAvatar
                photoUrl={groom.photo_url}
                role="groom"
                name={groom.full_name}
                theme="javanese"
                className="w-full h-full rounded-t-full rounded-b-lg"
              />
            </div>

            {/* Title & Name */}
            <p className="text-[11px] font-serif text-[#D4AF37] tracking-widest uppercase mb-1">
              {language === 'JW' ? 'TEMANTEN KAKUNG' : 'MEMPELAI PRIA'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C158]">
              {groom.full_name}
            </h3>
            <p className="font-serif text-xs text-[#FAF6EE]/80 mt-1">
              ({groom.nickname})
            </p>

            <JavaneseDivider className="my-3 max-w-xs" />

            {/* Lineage / Orang Tua */}
            <div className="text-xs font-serif text-[#FAF6EE]/80 space-y-1">
              <p className="text-[#D4AF37]/90 font-medium">
                {language === 'JW' ? 'Putra kakung saking panjenenganipun:' : 'Putra tercinta dari:'}
              </p>
              <p className="font-bold text-[#FAF6EE]">
                {groom.father_name} & {groom.mother_name}
              </p>
              <p className="text-[11px] text-[#FAF6EE]/60 pt-1">
                Kandangan, Kediri, Jawa Timur
              </p>
            </div>
          </motion.div>
        </div>

        {/* Mimi & Mintuna Javanese Philosophy Badge */}
        <div className="mt-12 p-4 rounded-xl bg-[#24160E]/80 border border-[#D4AF37]/40 max-w-2xl mx-auto flex items-center justify-center gap-3">
          <Heart className="w-5 h-5 text-[#D4AF37] shrink-0 fill-[#D4AF37]" />
          <p className="font-serif text-xs sm:text-sm text-[#E5C158] italic">
            {language === 'JW'
              ? '“Rukun kados mimi lan mintuna, atut runtut dumugi kaken-kaken lan ninen-ninen.”'
              : '“Saling mengasihi, setia, dan harmonis mengarungi bahtera rumah tangga hingga akhir hayat.”'}
          </p>
        </div>
      </div>
    </section>
  );
};
