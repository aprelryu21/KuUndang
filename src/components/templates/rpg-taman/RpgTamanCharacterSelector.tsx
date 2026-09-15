import React from 'react';
import { X, Check, UserCheck, Sparkles } from 'lucide-react';

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
    name: 'Batik Nusantara',
    gender: 'male',
    style: 'Batik & Songkok',
    description: 'Kemeja motif batik khas Nusantara bernuansa mewah dan bersahaja.',
    avatarUrl: '/templates/seri-malaysia/avatar-male-batik.png',
    spriteUrl: '/templates/seri-malaysia/player-male-batik.png',
  },
  {
    id: 'male-formal',
    name: 'Jas Formal',
    gender: 'male',
    style: 'Setelan Dasi Kupu',
    description: 'Setelan tuksedo navy modern dan rapi untuk resepsi mewah.',
    avatarUrl: '/templates/seri-malaysia/avatar-male.png',
    spriteUrl: '/templates/seri-malaysia/player-male.png',
  },
  {
    id: 'female-kebaya-hijab',
    name: 'Kebaya Hijab',
    gender: 'female',
    style: 'Kebaya Muslimah',
    description: 'Busana kebaya anggun berpadu hijab selaras yang santun dan memesona.',
    avatarUrl: '/templates/seri-malaysia/avatar-female-kebaya-hijab.png',
    spriteUrl: '/templates/seri-malaysia/player-female-kebaya-hijab.png',
  },
  {
    id: 'female-kebaya',
    name: 'Kebaya Klasik',
    gender: 'female',
    style: 'Bordir & Sanggul',
    description: 'Kebaya brokat elegan berhias motif bunga dengan kain songket klasik.',
    avatarUrl: '/templates/seri-malaysia/avatar-female-kebaya.png',
    spriteUrl: '/templates/seri-malaysia/player-female-kebaya.png',
  },
  {
    id: 'female-formal',
    name: 'Gaun Pesta',
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
  onConfirm?: (char: CharacterOption) => void;
  onClose?: () => void;
}

export const SeriMalaysiaCharacterSelector: React.FC<SeriMalaysiaCharacterSelectorProps> = ({
  selectedId,
  onSelect,
  onConfirm,
  onClose,
}) => {
  const maleList = CHARACTER_OPTIONS.filter((c) => c.gender === 'male');
  const femaleList = CHARACTER_OPTIONS.filter((c) => c.gender === 'female');

  const handleConfirm = () => {
    const current = CHARACTER_OPTIONS.find((c) => c.id === selectedId) || CHARACTER_OPTIONS[0];
    onSelect(current);
    if (onConfirm) {
      onConfirm(current);
    } else if (onClose) {
      onClose();
    }
  };

  const renderCard = (char: CharacterOption) => {
    const isSelected = char.id === selectedId;
    return (
      <div
        key={char.id}
        onClick={() => onSelect(char)}
        className={`flex items-center gap-3 p-2.5 sm:p-3 rounded-2xl cursor-pointer border-2 transition-all duration-200 select-none ${
          isSelected
            ? 'bg-[#4C030A]/10 border-[#8A1B26] shadow-md scale-[1.01]'
            : 'bg-white/80 border-[#D7BB83]/40 hover:border-[#D7BB83] hover:bg-white'
        }`}
      >
        {/* Avatar Portrait */}
        <div className="w-12 h-14 sm:w-14 sm:h-16 rounded-xl overflow-hidden border-2 border-[#D7BB83] bg-[#F4ECD8] shrink-0 shadow-inner flex items-center justify-center">
          <img
            src={char.avatarUrl}
            alt={char.name}
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Details */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <h4 className="text-xs sm:text-sm font-bold text-[#4C030A] truncate">
              {char.name}
            </h4>
            {isSelected && (
              <span className="px-1.5 py-0.5 rounded-full bg-[#4C030A] text-[#D7BB83] text-[9px] font-bold shrink-0">
                Dipilih
              </span>
            )}
          </div>
          <div className="text-[11px] font-semibold text-[#8A1B26] truncate">
            {char.style}
          </div>
          <p className="text-[10px] text-[#7A634F] line-clamp-1 mt-0.5">
            {char.description}
          </p>
        </div>

        {/* Radio Check Circle */}
        <div className="shrink-0">
          <div
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
              isSelected
                ? 'bg-[#4C030A] border-[#D7BB83] text-[#D7BB83]'
                : 'border-[#D7BB83] text-transparent hover:border-[#4C030A]'
            }`}
          >
            <Check className="w-3.5 h-3.5 stroke-[3]" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[92vh] flex flex-col rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-5 sm:p-7 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Header Close Button & ESC Hint */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] text-[#7A634F] bg-[#4C030A]/5 px-2 py-1 rounded border border-[#D7BB83]/40">
            ESC untuk tutup
          </span>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
              aria-label="Tutup Dialog"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>

        {/* Title */}
        <div className="text-center mb-4 sm:mb-5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
            <Sparkles className="w-3 h-3 text-[#D7BB83]" />
            <span>Pilihan Busana Tamu Undangan</span>
          </div>
          <h2 
            className="text-xl sm:text-2xl font-serif font-bold text-[#4C030A]"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Pilih Karakter Jelajah Anda
          </h2>
          <p className="text-[11px] sm:text-xs text-[#7A634F] mt-0.5">
            Pilih busana avatar yang mewakili Anda di taman pernikahan
          </p>
        </div>

        {/* 2-Column Character Selection Grid (Pria vs Wanita) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-y-auto px-1 py-1 max-h-[58vh]">
          {/* Column 1: Karakter Pria */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pb-1 border-b border-[#D7BB83]/40">
              <span className="text-sm font-bold text-[#4C030A]">👨 Karakter Pria</span>
              <span className="text-[10px] text-[#7A634F] bg-white px-2 py-0.5 rounded-full border border-[#D7BB83]/40">
                {maleList.length} Pilihan
              </span>
            </div>
            <div className="space-y-2">
              {maleList.map(renderCard)}
            </div>
          </div>

          {/* Column 2: Karakter Wanita */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 pb-1 border-b border-[#D7BB83]/40">
              <span className="text-sm font-bold text-[#4C030A]">👩 Karakter Wanita</span>
              <span className="text-[10px] text-[#7A634F] bg-white px-2 py-0.5 rounded-full border border-[#D7BB83]/40">
                {femaleList.length} Pilihan
              </span>
            </div>
            <div className="space-y-2">
              {femaleList.map(renderCard)}
            </div>
          </div>
        </div>

        {/* Confirmation Action Button */}
        <div className="mt-4 sm:mt-5 pt-3 border-t border-[#D7BB83]/30 text-center">
          <button
            onClick={handleConfirm}
            className="w-full py-3 sm:py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#4C030A] via-[#8A1B26] to-[#4C030A] text-[#FFFCF3] font-semibold text-xs sm:text-sm uppercase tracking-widest hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 shadow-lg flex items-center justify-center gap-2 border border-[#D7BB83]/50"
          >
            <UserCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[#D7BB83]" />
            <span>Konfirmasi & Mulai Jelajah</span>
            <Sparkles className="w-4 h-4 text-[#D7BB83] animate-pulse" />
          </button>
        </div>
      </div>
    </div>
  );
};

export const RpgTamanCharacterSelector = SeriMalaysiaCharacterSelector;
export default SeriMalaysiaCharacterSelector;
