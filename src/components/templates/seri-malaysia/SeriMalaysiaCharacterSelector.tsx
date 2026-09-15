import React from 'react';
import { X, Check, UserCheck } from 'lucide-react';

export interface CharacterOption {
  id: string;
  name: string;
  gender: 'male' | 'female';
  style: string;
  description: string;
  avatarUrl: string;
  spriteUrl: string;
}

export const CHARACTER_OPTIONS: CharacterOption[] = [
  {
    id: 'male-batik',
    name: 'Pria Batik Nusantara',
    gender: 'male',
    style: 'Batik & Songkok Tradisional',
    description: 'Kemeja motif batik khas Nusantara bernuansa mewah, sopan, dan bersahaja.',
    avatarUrl: '/templates/seri-malaysia/avatar-male-batik.png',
    spriteUrl: '/templates/seri-malaysia/player-male-batik.png',
  },
  {
    id: 'female-kebaya-hijab',
    name: 'Wanita Kebaya Hijab',
    gender: 'female',
    style: 'Kebaya Muslimah & Hijab',
    description: 'Busana kebaya anggun berpadu hijab selaras yang santun dan memesona.',
    avatarUrl: '/templates/seri-malaysia/avatar-female-kebaya-hijab.png',
    spriteUrl: '/templates/seri-malaysia/player-female-kebaya-hijab.png',
  },
  {
    id: 'female-kebaya',
    name: 'Wanita Kebaya Klasik',
    gender: 'female',
    style: 'Kebaya Bordir & Sanggul',
    description: 'Kebaya brokat elegan berhias motif bunga dengan kain songket klasik.',
    avatarUrl: '/templates/seri-malaysia/avatar-female-kebaya.png',
    spriteUrl: '/templates/seri-malaysia/player-female-kebaya.png',
  },
  {
    id: 'male-formal',
    name: 'Pria Jas Formal',
    gender: 'male',
    style: 'Setelan Jas & Dasi Kupu',
    description: 'Setelan tuksedo navy modern dan rapi untuk suasana pesta resepsi.',
    avatarUrl: '/templates/seri-malaysia/avatar-male.png',
    spriteUrl: '/templates/seri-malaysia/player-male.png',
  },
  {
    id: 'female-formal',
    name: 'Wanita Gaun Pesta',
    gender: 'female',
    style: 'Gaun Malam Anggun',
    description: 'Gaun pesta modern beraksen renda lembut yang memesona.',
    avatarUrl: '/templates/seri-malaysia/avatar-female.png',
    spriteUrl: '/templates/seri-malaysia/player-female.png',
  },
];

interface SeriMalaysiaCharacterSelectorProps {
  selectedId: string;
  onSelect: (char: CharacterOption) => void;
  onClose?: () => void;
}

export const SeriMalaysiaCharacterSelector: React.FC<SeriMalaysiaCharacterSelectorProps> = ({
  selectedId,
  onSelect,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
            aria-label="Tutup Dialog"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        {/* Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🎭 Pilihan Busana Tamu Undangan</span>
          </div>
          <h2 
            className="text-2xl sm:text-3xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pilih Karakter Jelajah Anda
          </h2>
          <p className="text-xs sm:text-sm text-[#7A634F] mt-1">
            Pilih karakter avatar yang mewakili kehadiran Anda di taman pernikahan
          </p>
          <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-2" />
        </div>

        {/* Character Cards List */}
        <div className="space-y-3 sm:space-y-4">
          {CHARACTER_OPTIONS.map((char) => {
            const isSelected = char.id === selectedId;
            return (
              <div
                key={char.id}
                onClick={() => {
                  onSelect(char);
                  if (onClose) onClose();
                }}
                className={`flex items-center gap-4 p-3.5 sm:p-4 rounded-2xl cursor-pointer border-2 transition-all duration-200 ${
                  isSelected
                    ? 'bg-[#4C030A]/10 border-[#8A1B26] shadow-md scale-[1.01]'
                    : 'bg-white/80 border-[#D7BB83]/40 hover:border-[#D7BB83] hover:bg-white'
                }`}
              >
                {/* Avatar Portrait */}
                <div className="w-16 h-20 sm:w-18 sm:h-22 rounded-xl overflow-hidden border-2 border-[#D7BB83] bg-[#F4ECD8] shrink-0 shadow-inner flex items-center justify-center">
                  <img
                    src={char.avatarUrl}
                    alt={char.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm sm:text-base font-bold text-[#4C030A]">
                      {char.name}
                    </h3>
                    {isSelected && (
                      <span className="px-2 py-0.5 rounded-full bg-[#4C030A] text-[#D7BB83] text-[10px] font-bold">
                        Aktif
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-[#8A1B26] mt-0.5">
                    {char.style}
                  </div>
                  <p className="text-[11px] text-[#7A634F] line-clamp-2 mt-1 leading-snug">
                    {char.description}
                  </p>
                </div>

                {/* Select Radio / Check Button */}
                <div className="shrink-0">
                  <div
                    className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                      isSelected
                        ? 'bg-[#4C030A] border-[#D7BB83] text-[#D7BB83]'
                        : 'border-[#D7BB83] text-transparent hover:border-[#4C030A]'
                    }`}
                  >
                    <Check className="w-4 h-4 stroke-[3]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="mt-6 text-center">
          <button
            onClick={() => {
              const current = CHARACTER_OPTIONS.find((c) => c.id === selectedId) || CHARACTER_OPTIONS[0];
              onSelect(current);
              if (onClose) onClose();
            }}
            className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#4C030A] to-[#8A1B26] text-[#FFFCF3] font-semibold text-xs uppercase tracking-widest hover:opacity-95 transition-opacity shadow-lg flex items-center justify-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-[#D7BB83]" />
            <span>Konfirmasi & Mulai Jelajah</span>
          </button>
        </div>
      </div>
    </div>
  );
};
