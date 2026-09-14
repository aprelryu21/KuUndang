import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Instagram, Sparkles, Star, Smile, Crown } from 'lucide-react';
import { Couple } from '../../../types/wedding';
import { CoupleAvatar } from '../../common/CoupleAvatar';

interface PastelPopCoupleSectionProps {
  bride: Couple;
  groom: Couple;
}

export const PastelPopCoupleSection: React.FC<PastelPopCoupleSectionProps> = ({ bride, groom }) => {
  const [activeTab, setActiveTab] = useState<'bride' | 'groom'>('bride');

  return (
    <section id="cute-couple" className="py-20 sm:py-28 bg-gradient-to-b from-[#FFF9E6]/60 via-white to-[#EDF5FF]/50 relative overflow-hidden">
      {/* Decorative Doodles */}
      <div className="absolute top-8 left-8 text-3xl opacity-30 select-none animate-pulse">
        👑
      </div>
      <div className="absolute bottom-12 right-10 text-3xl opacity-30 select-none animate-pulse">
        💐
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] border-2 border-[#FF6B8B] text-[#FF6B8B] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <Heart className="w-3.5 h-3.5 fill-[#FF6B8B]" />
          <span>PROFIL DUA INSAN BERBAHAGIA</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
          Mempelai Pengantin Pria &amp; Wanita ♡
        </h2>
        <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-md mx-auto">
          Mengenal lebih dekat kedua calon mempelai yang siap mengarungi bahtera rumah tangga.
        </p>

        {/* Playful Tab Switcher on Mobile */}
        <div className="flex sm:hidden justify-center gap-2 mt-8 mb-4">
          <button
            type="button"
            onClick={() => setActiveTab('bride')}
            className={`px-5 py-2 rounded-full font-black text-xs border-2 transition-all ${
              activeTab === 'bride'
                ? 'bg-[#FF6B8B] text-white border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42]'
                : 'bg-white text-[#2B2D42] border-slate-200'
            }`}
          >
            👰 Mempelai Wanita
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('groom')}
            className={`px-5 py-2 rounded-full font-black text-xs border-2 transition-all ${
              activeTab === 'groom'
                ? 'bg-[#4D96FF] text-white border-[#2B2D42] shadow-[3px_3px_0px_0px_#2B2D42]'
                : 'bg-white text-[#2B2D42] border-slate-200'
            }`}
          >
            🤵 Mempelai Pria
          </button>
        </div>

        {/* Side-by-side or responsive cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:gap-10 mt-10">
          {/* 1. BRIDE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`p-6 sm:p-8 rounded-4xl bg-[#FFF0F3] border-4 border-[#FF6B8B] shadow-[8px_8px_0px_0px_#FFD166] text-center relative overflow-hidden transition-all ${
              activeTab === 'bride' ? 'block' : 'hidden sm:block'
            }`}
          >
            {/* Cute Corner Sticker */}
            <div className="absolute top-4 right-4 bg-[#FF6B8B] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white shadow-xs">
              THE BRIDE 🌸
            </div>

            {/* Photo Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto my-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <CoupleAvatar
                  photoUrl={bride.photo_url}
                  role="bride"
                  name={bride.full_name}
                  theme="pastel"
                  className="w-full h-full rounded-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#FFD166] border-2 border-white flex items-center justify-center text-lg shadow-xs">
                💖
              </span>
            </div>

            {/* Name & Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#2B2D42]">
              {bride.nickname}
            </h3>
            <p className="text-sm font-bold text-[#FF6B8B] mt-0.5">
              {bride.full_name}
            </p>

            {/* Cute Personality Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 my-4">
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#FF6B8B]/40 text-[10px] font-extrabold text-[#FF6B8B]">
                ✨ Si Paling Ramah
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#FFE5EC] text-[10px] font-extrabold text-[#2B2D42]">
                🍰 Pecinta Kue
              </span>
            </div>

            {/* Parents info */}
            <div className="p-3 bg-white/80 rounded-2xl border border-[#FF6B8B]/20 text-xs text-[#2B2D42]/80 space-y-1">
              <p className="font-bold text-[#2B2D42]">
                {bride.child_order || 'Putri Pertama'} dari Pasangan:
              </p>
              <p className="font-semibold">
                Bapak {bride.father_name} &amp; Ibu {bride.mother_name}
              </p>
            </div>

            {/* Instagram Link */}
            {bride.instagram && (
              <div className="mt-5">
                <a
                  href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#FF6B8B] hover:bg-[#FF6B8B] hover:text-white text-[#FF6B8B] text-xs font-bold transition-all shadow-xs"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@{bride.instagram.replace('@', '')}</span>
                </a>
              </div>
            )}
          </motion.div>

          {/* 2. GROOM CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className={`p-6 sm:p-8 rounded-4xl bg-[#EDF5FF] border-4 border-[#4D96FF] shadow-[8px_8px_0px_0px_#06D6A0] text-center relative overflow-hidden transition-all ${
              activeTab === 'groom' ? 'block' : 'hidden sm:block'
            }`}
          >
            {/* Cute Corner Sticker */}
            <div className="absolute top-4 right-4 bg-[#4D96FF] text-white text-[10px] font-black uppercase px-3 py-1 rounded-full border border-white shadow-xs">
              THE GROOM 🎩
            </div>

            {/* Photo Avatar */}
            <div className="relative w-36 h-36 sm:w-44 sm:h-44 mx-auto my-4">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-md bg-white">
                <CoupleAvatar
                  photoUrl={groom.photo_url}
                  role="groom"
                  name={groom.full_name}
                  theme="pastel"
                  className="w-full h-full rounded-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-10 h-10 rounded-full bg-[#06D6A0] border-2 border-white flex items-center justify-center text-lg shadow-xs">
                ⭐
              </span>
            </div>

            {/* Name & Title */}
            <h3 className="text-2xl sm:text-3xl font-black text-[#2B2D42]">
              {groom.nickname}
            </h3>
            <p className="text-sm font-bold text-[#4D96FF] mt-0.5">
              {groom.full_name}
            </p>

            {/* Cute Personality Badges */}
            <div className="flex flex-wrap justify-center gap-1.5 my-4">
              <span className="px-2.5 py-1 rounded-full bg-white border border-[#4D96FF]/40 text-[10px] font-extrabold text-[#4D96FF]">
                🚀 Si Paling Humoris
              </span>
              <span className="px-2.5 py-1 rounded-full bg-[#D6E8FF] text-[10px] font-extrabold text-[#2B2D42]">
                🎮 Gamer Romantis
              </span>
            </div>

            {/* Parents info */}
            <div className="p-3 bg-white/80 rounded-2xl border border-[#4D96FF]/20 text-xs text-[#2B2D42]/80 space-y-1">
              <p className="font-bold text-[#2B2D42]">
                {groom.child_order || 'Putra Pertama'} dari Pasangan:
              </p>
              <p className="font-semibold">
                Bapak {groom.father_name} &amp; Ibu {groom.mother_name}
              </p>
            </div>

            {/* Instagram Link */}
            {groom.instagram && (
              <div className="mt-5">
                <a
                  href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border-2 border-[#4D96FF] hover:bg-[#4D96FF] hover:text-white text-[#4D96FF] text-xs font-bold transition-all shadow-xs"
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
