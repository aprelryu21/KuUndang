import React from 'react';
import { Couple } from '../../../types/wedding';
import { EucalyptusStem, MagnoliaBranch, HeirloomDivider } from './fleurBotanicaAssets';
import { Instagram, Heart, MapPin } from 'lucide-react';

interface FleurBotanicaCoupleSectionProps {
  bride: Couple;
  groom: Couple;
}

export const FleurBotanicaCoupleSection: React.FC<FleurBotanicaCoupleSectionProps> = ({ bride, groom }) => {
  return (
    <section id="fleur-couple" className="relative py-20 sm:py-28 px-4 bg-[#F5F2EB] text-[#293522] overflow-hidden scroll-mt-14">
      {/* Decorative botanical background accents */}
      <div className="absolute top-1/2 -left-8 -translate-y-1/2 pointer-events-none opacity-25">
        <EucalyptusStem className="w-44 h-56 rotate-45" />
      </div>
      <div className="absolute top-1/2 -right-8 -translate-y-1/2 pointer-events-none opacity-25">
        <MagnoliaBranch className="w-48 h-48 -rotate-45" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            PASANGAN MEMPELAI
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
            Sang Mempelai
          </h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
            Maha Suci Allah yang telah mempertemukan dua insan dalam ikatan suci pernikahan.
          </p>
          <HeirloomDivider className="my-4" />
        </div>

        {/* Two Columns: Bride & Groom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-3xl mx-auto items-center">
          {/* 1. Mempelai Wanita (Bride) */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Polaroid Heirloom Lace Frame */}
            <div className="relative p-3 bg-white border-2 border-[#BDA06C]/70 rounded-2xl shadow-[0_15px_35px_rgba(41,53,34,0.12)] max-w-[260px] w-full transform -rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 mb-3 border border-[#BDA06C]/30">
                <img
                  src={
                    bride.photo_url ||
                    'https://lh3.googleusercontent.com/d/17Mkq-ytzCKMJSM5jYUwfosOabtLLdUJz'
                  }
                  alt={bride.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif italic text-xs text-[#80683E] block pb-1">
                The Bride
              </span>
            </div>

            {/* 2. Nama Mempelai */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                {bride.full_name}
              </h3>
              {bride.nickname && (
                <p className="text-xs font-serif text-[#80683E]">({bride.nickname})</p>
              )}
            </div>

            {/* 3. Putri dari Pasangan */}
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
                {bride.child_order ? `${bride.child_order} dari Pasangan:` : 'Putri dari Pasangan:'}
                <br />
                <strong className="text-[#293522]">{bride.father_name}</strong> &amp;{' '}
                <strong className="text-[#293522]">{bride.mother_name}</strong>
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(bride.address || bride.description) && (
              <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#66705A] max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#BDA06C] shrink-0" />
                <span>{bride.address || bride.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {bride.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#BDA06C]/60 text-xs font-serif text-[#293522] hover:bg-[#FAF8F5] transition-colors shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5 text-[#BDA06C]" />
                <span>@{bride.instagram.replace('@', '')}</span>
              </a>
            )}
          </div>

          {/* 2. Mempelai Pria (Groom) */}
          <div className="flex flex-col items-center text-center space-y-4">
            {/* Polaroid Heirloom Lace Frame */}
            <div className="relative p-3 bg-white border-2 border-[#BDA06C]/70 rounded-2xl shadow-[0_15px_35px_rgba(41,53,34,0.12)] max-w-[260px] w-full transform rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="aspect-[4/5] rounded-xl overflow-hidden bg-stone-100 mb-3 border border-[#BDA06C]/30">
                <img
                  src={
                    groom.photo_url ||
                    'https://lh3.googleusercontent.com/d/1qr9VPrFkya17qAU_kLtpYBLSktn3mBzG'
                  }
                  alt={groom.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-serif italic text-xs text-[#80683E] block pb-1">
                The Groom
              </span>
            </div>

            {/* 2. Nama Mempelai */}
            <div className="space-y-1">
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                {groom.full_name}
              </h3>
              {groom.nickname && (
                <p className="text-xs font-serif text-[#80683E]">({groom.nickname})</p>
              )}
            </div>

            {/* 3. Putra dari Pasangan */}
            <div className="space-y-0.5">
              <p className="text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
                {groom.child_order ? `${groom.child_order} dari Pasangan:` : 'Putra dari Pasangan:'}
                <br />
                <strong className="text-[#293522]">{groom.father_name}</strong> &amp;{' '}
                <strong className="text-[#293522]">{groom.mother_name}</strong>
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(groom.address || groom.description) && (
              <div className="flex items-center justify-center gap-1.5 text-xs font-serif text-[#66705A] max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#BDA06C] shrink-0" />
                <span>{groom.address || groom.description}</span>
              </div>
            )}

            {/* 5. Akun IG */}
            {groom.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white border border-[#BDA06C]/60 text-xs font-serif text-[#293522] hover:bg-[#FAF8F5] transition-colors shadow-xs"
              >
                <Instagram className="w-3.5 h-3.5 text-[#BDA06C]" />
                <span>@{groom.instagram.replace('@', '')}</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
