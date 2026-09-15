import React from 'react';
import { X, Instagram, MapPin, Heart } from 'lucide-react';
import { WeddingInvitation } from '../../../../types/wedding';

interface SeriMalaysiaCoupleModalProps {
  wedding: WeddingInvitation;
  onClose: () => void;
}

export const SeriMalaysiaCoupleModal: React.FC<SeriMalaysiaCoupleModalProps> = ({
  wedding,
  onClose,
}) => {
  const bride = wedding.couples?.find((c) => c.role === 'bride');
  const groom = wedding.couples?.find((c) => c.role === 'groom');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Title & Malay Ornamental Border */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>👑 Pelaminan Mahligai Cinta</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Mempelai Pengantin
          </h2>
          <p className="text-sm text-[#7A634F] mt-1 italic">
            Maha Suci Allah yang telah menciptakan makhluk-Nya berpasang-pasangan
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* Couple Cards Grid: Bride & Groom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {/* MEMPELAI WANITA */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/80 border border-[#D7BB83]/40 shadow-sm hover:shadow-md transition-shadow">
            {/* 1. Foto Mempelai */}
            <div className="relative mb-4 group">
              <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#D7BB83] shadow-md transition-transform duration-300 group-hover:scale-105 bg-[#F4ECD8]">
                <img
                  src={bride?.photo || '/templates/seri-malaysia/avatar-female-kebaya.png'}
                  alt={bride?.name || 'Mempelai Wanita'}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#4C030A] text-[#D7BB83] text-[11px] font-bold px-3 py-0.5 rounded-full shadow border border-[#D7BB83]/50">
                Mempelai Wanita
              </div>
            </div>

            {/* 2. Nama Mempelai */}
            <h3 
              className="text-xl sm:text-2xl font-bold text-[#4C030A] mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {bride?.name || 'Siti Nurjannah'}
            </h3>
            {bride?.nickname && (
              <span className="text-sm font-medium text-[#8A1B26] mb-3">
                ({bride.nickname})
              </span>
            )}

            {/* 3. Putri dari Pasangan Orang Tua */}
            <div className="text-xs text-[#5A3F30] leading-relaxed my-2 px-2">
              <p className="font-semibold text-[#4C030A]">
                {bride?.child_order ? `${bride.child_order} dari pasangan:` : 'Putri tercinta dari pasangan:'}
              </p>
              <p className="mt-0.5 text-sm font-medium">
                {bride?.father_name && bride?.mother_name
                  ? `Bpk. ${bride.father_name} & Ibu ${bride.mother_name}`
                  : 'Bpk. Poniman & Ibu Ngatenah'}
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(bride?.address || bride?.description) && (
              <div className="flex items-start justify-center gap-1.5 text-xs text-[#7A634F] my-2 max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#8A1B26] shrink-0 mt-0.5" />
                <span className="text-center line-clamp-2">
                  {bride.address || bride.description}
                </span>
              </div>
            )}

            {/* 5. Akun Instagram */}
            {bride?.instagram && (
              <a
                href={`https://instagram.com/${bride.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#4C030A] to-[#8A1B26] text-[#FFFCF3] text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>@{bride.instagram.replace('@', '')}</span>
              </a>
            )}
          </div>

          {/* MEMPELAI PRIA */}
          <div className="flex flex-col items-center text-center p-5 rounded-2xl bg-white/80 border border-[#D7BB83]/40 shadow-sm hover:shadow-md transition-shadow">
            {/* 1. Foto Mempelai */}
            <div className="relative mb-4 group">
              <div className="w-36 h-48 sm:w-40 sm:h-52 rounded-2xl overflow-hidden border-4 border-[#D7BB83] shadow-md transition-transform duration-300 group-hover:scale-105 bg-[#F4ECD8]">
                <img
                  src={groom?.photo || '/templates/seri-malaysia/avatar-male-batik.png'}
                  alt={groom?.name || 'Mempelai Pria'}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#4C030A] text-[#D7BB83] text-[11px] font-bold px-3 py-0.5 rounded-full shadow border border-[#D7BB83]/50">
                Mempelai Pria
              </div>
            </div>

            {/* 2. Nama Mempelai */}
            <h3 
              className="text-xl sm:text-2xl font-bold text-[#4C030A] mt-2"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {groom?.name || 'Apriliyanto Ratih Sukarno'}
            </h3>
            {groom?.nickname && (
              <span className="text-sm font-medium text-[#8A1B26] mb-3">
                ({groom.nickname})
              </span>
            )}

            {/* 3. Putra dari Pasangan Orang Tua */}
            <div className="text-xs text-[#5A3F30] leading-relaxed my-2 px-2">
              <p className="font-semibold text-[#4C030A]">
                {groom?.child_order ? `${groom.child_order} dari pasangan:` : 'Putra tercinta dari pasangan:'}
              </p>
              <p className="mt-0.5 text-sm font-medium">
                {groom?.father_name && groom?.mother_name
                  ? `Bpk. ${groom.father_name} & Ibu ${groom.mother_name}`
                  : 'Bpk. Imam Sodik & Ibu Rofiatin'}
              </p>
            </div>

            {/* 4. Alamat Mempelai */}
            {(groom?.address || groom?.description) && (
              <div className="flex items-start justify-center gap-1.5 text-xs text-[#7A634F] my-2 max-w-xs">
                <MapPin className="w-3.5 h-3.5 text-[#8A1B26] shrink-0 mt-0.5" />
                <span className="text-center line-clamp-2">
                  {groom.address || groom.description}
                </span>
              </div>
            )}

            {/* 5. Akun Instagram */}
            {groom?.instagram && (
              <a
                href={`https://instagram.com/${groom.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-[#4C030A] to-[#8A1B26] text-[#FFFCF3] text-xs font-medium hover:opacity-90 transition-opacity shadow-sm"
              >
                <Instagram className="w-3.5 h-3.5 text-[#D7BB83]" />
                <span>@{groom.instagram.replace('@', '')}</span>
              </a>
            )}
          </div>
        </div>

        {/* Footer Heart Ornament */}
        <div className="mt-8 pt-4 border-t border-[#D7BB83]/30 text-center flex items-center justify-center gap-2 text-xs text-[#7A634F]">
          <Heart className="w-4 h-4 text-[#8A1B26] fill-[#8A1B26]" />
          <span>KuUndang Wedding Garden Experience</span>
          <Heart className="w-4 h-4 text-[#8A1B26] fill-[#8A1B26]" />
        </div>
      </div>
    </div>
  );
};
