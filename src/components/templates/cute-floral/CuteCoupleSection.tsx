import React from 'react';
import { motion } from 'motion/react';
import { Couple } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  WashiTape,
  CuteFloralDivider,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Heart, Instagram, MapPin } from 'lucide-react';
import { CoupleAvatar } from '../../common/CoupleAvatar';

interface CuteCoupleSectionProps {
  bride: Couple;
  groom: Couple;
}

export const CuteCoupleSection: React.FC<CuteCoupleSectionProps> = ({ bride, groom }) => {
  const { language } = useLanguage();

  return (
    <section
      id="cute-couple"
      className="py-20 sm:py-28 px-4 bg-[#FFF5F8] text-[#4A2E35] relative overflow-hidden text-center border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={16} showFlowers={true} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-14 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteSakuraFlower className="w-6 h-6" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              {language === 'JW' ? 'SANG PINANGANTEN MANIS' : 'SANG MEMPELAI BAHAGIA'}
            </p>
            <CuteSakuraFlower className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {language === 'JW' ? 'Temanten Putri & Temanten Kakung' : 'Mempelai Wanita & Pria'}
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            {language === 'JW'
              ? 'Nyuwun donga pangestu dhumateng bapa biyung saha sedaya kulawarga, mugi anggenipun mangun bale wisma tansah kebak katresnan lan karaharjan.'
              : 'Dengan memohon doa restu dari orang tua dan keluarga tercinta, kami melangkah bersama menuju ikatan suci yang penuh cinta dan kebahagiaan.'}
          </p>
          <CuteFloralDivider />
        </div>

        {/* Couple Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 max-w-4xl mx-auto items-center">
          {/* 1. Mempelai Wanita (Bride) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF85A2]/60 shadow-[0_12px_40px_rgba(255,133,162,0.18)] relative text-center group hover:border-[#FF5C8D] transition-all"
          >
            {/* Washi Tape Pin at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[-2deg]">
              <WashiTape className="w-24 h-6" color="pink" />
            </div>

            {/* Photo Polaroid Frame */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-[#FFA3B8] p-1.5 bg-[#FFF0F5] shadow-inner mb-5">
              <CoupleAvatar
                photoUrl={bride.photo_url}
                role="bride"
                name={bride.full_name}
                theme="cute"
                className="w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2">
                <CuteSakuraFlower className="w-6 h-6" />
              </div>
            </div>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] border border-[#FF85A2] text-xs font-sans font-bold text-[#E03164] mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#FF5C8D] text-[#FF5C8D]" />
              <span>Calon Pengantin Wanita</span>
            </div>

            {/* Names & Parents */}
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2E35]">
              {bride.full_name || bride.nickname || 'Mempelai Wanita'}
            </h3>
            {bride.nickname && (
              <p className="text-xs font-sans font-semibold text-[#FF5C8D] mt-0.5">
                ( {bride.nickname} )
              </p>
            )}

            {(bride.father_name || bride.mother_name) ? (
              <p className="text-xs sm:text-sm font-sans text-[#6B3E48] mt-3 leading-relaxed">
                {bride.child_order ? `${bride.child_order} tercinta dari pasangan:` : 'Putri tercinta dari pasangan:'}
                <br />
                <strong className="text-[#4A2E35]">
                  {bride.father_name || 'Bpk. Orang Tua'}
                </strong>{' '}
                &amp;{' '}
                <strong className="text-[#4A2E35]">
                  {bride.mother_name || 'Ibu Orang Tua'}
                </strong>
              </p>
            ) : null}

            {/* 4. Alamat Mempelai */}
            {(bride.address || bride.description) && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FFA3B8]/60 text-xs font-sans text-[#6B3E48]">
                <MapPin className="w-3.5 h-3.5 text-[#FF5C8D] shrink-0" />
                <span>{bride.address || bride.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {bride.instagram && (
              <div className="mt-4">
                <a
                  href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] border border-[#FFA3B8] text-xs font-sans font-bold text-[#FF5C8D] transition-all hover:scale-105 shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{bride.instagram.replace('@', '')}</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* 2. Mempelai Pria (Groom) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-3xl p-6 sm:p-8 border-3 border-[#FF85A2]/60 shadow-[0_12px_40px_rgba(255,133,162,0.18)] relative text-center group hover:border-[#FF5C8D] transition-all"
          >
            {/* Washi Tape Pin at Top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 rotate-[2deg]">
              <WashiTape className="w-24 h-6" color="yellow" />
            </div>

            {/* Photo Polaroid Frame */}
            <div className="relative mx-auto w-44 h-56 sm:w-48 sm:h-60 rounded-2xl overflow-hidden border-2 border-[#FFA3B8] p-1.5 bg-[#FFF0F5] shadow-inner mb-5">
              <CoupleAvatar
                photoUrl={groom.photo_url}
                role="groom"
                name={groom.full_name}
                theme="cute"
                className="w-full h-full rounded-xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 right-2">
                <CuteDaisyFlower className="w-6 h-6" />
              </div>
            </div>

            {/* Role Badge */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] border border-[#FF85A2] text-xs font-sans font-bold text-[#E03164] mb-2">
              <Heart className="w-3.5 h-3.5 fill-[#FF5C8D] text-[#FF5C8D]" />
              <span>Calon Pengantin Pria</span>
            </div>

            {/* Names & Parents */}
            <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#4A2E35]">
              {groom.full_name || groom.nickname || 'Mempelai Pria'}
            </h3>
            {groom.nickname && (
              <p className="text-xs font-sans font-semibold text-[#FF5C8D] mt-0.5">
                ( {groom.nickname} )
              </p>
            )}

            {(groom.father_name || groom.mother_name) ? (
              <p className="text-xs sm:text-sm font-sans text-[#6B3E48] mt-3 leading-relaxed">
                {groom.child_order ? `${groom.child_order} tercinta dari pasangan:` : 'Putra tercinta dari pasangan:'}
                <br />
                <strong className="text-[#4A2E35]">
                  {groom.father_name || 'Bpk. Orang Tua'}
                </strong>{' '}
                &amp;{' '}
                <strong className="text-[#4A2E35]">
                  {groom.mother_name || 'Ibu Orang Tua'}
                </strong>
              </p>
            ) : null}

            {/* 4. Alamat Mempelai */}
            {(groom.address || groom.description) && (
              <div className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] border border-[#FFA3B8]/60 text-xs font-sans text-[#6B3E48]">
                <MapPin className="w-3.5 h-3.5 text-[#FF5C8D] shrink-0" />
                <span>{groom.address || groom.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {groom.instagram && (
              <div className="mt-4">
                <a
                  href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#FFF0F5] hover:bg-[#FFE4EC] border border-[#FFA3B8] text-xs font-sans font-bold text-[#FF5C8D] transition-all hover:scale-105 shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{groom.instagram.replace('@', '')}</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
