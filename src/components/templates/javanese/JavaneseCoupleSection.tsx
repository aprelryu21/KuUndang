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
import { Heart, Instagram, MapPin } from 'lucide-react';
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
      className="py-20 sm:py-28 px-4 bg-[#1A1009] text-[#FAF6EE] relative overflow-hidden"
    >
      {/* Background Batik Kawung Texture */}
      <BatikKawungPattern className="absolute inset-0 opacity-15 pointer-events-none" />

      {/* Floating Gold Dust Particles */}
      <JavaneseGoldenParticles count={15} className="opacity-40" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-serif text-[#D4AF37] tracking-[0.3em] uppercase mb-2">
            {language === 'JW' ? '— SANG PINANGANTEN —' : '— MEMPELAI PENGANTIN —'}
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#E5C158] tracking-wide">
            {language === 'JW' ? 'Sri Atmaja Pinanganten' : 'Mempelai Yang Berbahagia'}
          </h2>
          <p className="text-xs sm:text-sm text-[#FAF6EE]/70 max-w-md mx-auto mt-2 font-serif italic">
            {language === 'JW'
              ? 'Nyuwun donga pangestu dhumateng bapa biyung miwah para pinisepuh.'
              : 'Memohon doa restu dari ayahanda, ibunda, serta segenap keluarga dan sesepuh.'}
          </p>
          <div className="flex justify-center mt-3">
            <JavaneseGebyokArch className="w-48 h-8 text-[#D4AF37]" />
          </div>
        </div>

        {/* 2 Cards: Temanten Putri & Kakung */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-start max-w-3xl mx-auto">
          {/* 1. Penganten Putri (Bride): Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-8 relative shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-center"
          >
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>

            {/* 1. Foto Mempelai */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] p-1 bg-[#1A1009] shadow-md mb-5">
              <CoupleAvatar
                photoUrl={bride.photo_url}
                role="bride"
                name={bride.full_name}
                theme="javanese"
                className="w-full h-full rounded-t-full rounded-b-lg object-cover"
              />
            </div>

            {/* 2. Nama Mempelai */}
            <p className="text-[11px] font-serif text-[#D4AF37] tracking-widest uppercase mb-1">
              {language === 'JW' ? 'TEMANTEN PUTRI' : 'MEMPELAI WANITA'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C158]">
              {bride.full_name}
            </h3>
            {bride.nickname && (
              <p className="font-serif text-xs text-[#FAF6EE]/80 mt-1">
                ({bride.nickname})
              </p>
            )}

            <JavaneseDivider className="my-3 max-w-xs mx-auto" />

            {/* 3. Putri dari Pasangan */}
            <div className="text-xs font-serif text-[#FAF6EE]/80 space-y-1">
              <p className="text-[#D4AF37]/90 font-medium">
                {language === 'JW'
                  ? `${bride.child_order || 'Putri'} saking panjenenganipun:`
                  : `${bride.child_order || 'Putri tercinta'} dari:`}
              </p>
              <p className="font-bold text-[#FAF6EE] text-sm">
                {bride.father_name} &amp; {bride.mother_name}
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(bride.address || bride.description) && (
              <div className="mt-3 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1009] border border-[#D4AF37]/40 text-xs font-serif text-[#FAF6EE]/80 max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{bride.address || bride.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {bride.instagram && (
              <div className="mt-4">
                <a
                  href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#1A1009] text-xs font-serif font-bold transition-all shadow-md"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{bride.instagram.replace('@', '')}</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* 2. Penganten Kakung (Groom): Foto -> Nama -> Orang Tua -> Alamat -> Akun IG */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 sm:p-8 relative shadow-[0_8px_30px_rgba(0,0,0,0.7)] text-center"
          >
            {/* Corner flourishes */}
            <div className="absolute top-2 left-2">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>
            <div className="absolute top-2 right-2 rotate-90">
              <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37]" />
            </div>

            {/* 1. Foto Mempelai */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-t-full rounded-b-xl overflow-hidden border-2 border-[#D4AF37] p-1 bg-[#1A1009] shadow-md mb-5">
              <CoupleAvatar
                photoUrl={groom.photo_url}
                role="groom"
                name={groom.full_name}
                theme="javanese"
                className="w-full h-full rounded-t-full rounded-b-lg object-cover"
              />
            </div>

            {/* 2. Nama Mempelai */}
            <p className="text-[11px] font-serif text-[#D4AF37] tracking-widest uppercase mb-1">
              {language === 'JW' ? 'TEMANTEN KAKUNG' : 'MEMPELAI PRIA'}
            </p>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#E5C158]">
              {groom.full_name}
            </h3>
            {groom.nickname && (
              <p className="font-serif text-xs text-[#FAF6EE]/80 mt-1">
                ({groom.nickname})
              </p>
            )}

            <JavaneseDivider className="my-3 max-w-xs mx-auto" />

            {/* 3. Putra dari Pasangan */}
            <div className="text-xs font-serif text-[#FAF6EE]/80 space-y-1">
              <p className="text-[#D4AF37]/90 font-medium">
                {language === 'JW'
                  ? `${groom.child_order || 'Putra'} kakung saking panjenenganipun:`
                  : `${groom.child_order || 'Putra tercinta'} dari:`}
              </p>
              <p className="font-bold text-[#FAF6EE] text-sm">
                {groom.father_name} &amp; {groom.mother_name}
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(groom.address || groom.description) && (
              <div className="mt-3 inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#1A1009] border border-[#D4AF37]/40 text-xs font-serif text-[#FAF6EE]/80 max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                <span>{groom.address || groom.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {groom.instagram && (
              <div className="mt-4">
                <a
                  href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37] hover:bg-[#E5C158] text-[#1A1009] text-xs font-serif font-bold transition-all shadow-md"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{groom.instagram.replace('@', '')}</span>
                </a>
              </div>
            )}
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
