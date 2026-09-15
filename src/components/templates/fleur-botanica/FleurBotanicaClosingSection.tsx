import React from 'react';
import { Invitation, Couple } from '../../../types/wedding';
import { EucalyptusStem, MagnoliaBranch, HeirloomDivider } from './fleurBotanicaAssets';
import { Heart, RotateCcw } from 'lucide-react';

interface FleurBotanicaClosingSectionProps {
  invitation: Invitation;
  bride: Couple;
  groom: Couple;
  onReopenCover?: () => void;
}

export const FleurBotanicaClosingSection: React.FC<FleurBotanicaClosingSectionProps> = ({
  invitation,
  bride,
  groom,
  onReopenCover,
}) => {
  return (
    <footer className="relative py-24 sm:py-32 px-4 bg-[#1E2A20] text-[#FAF8F5] overflow-hidden text-center">
      {/* Background Forest Closing Atmosphere */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none bg-cover bg-bottom"
        style={{
          backgroundImage:
            'url(https://inveet.id/themes/modern-wedding/v1/background-forest-closing-v1.webp)',
        }}
      />

      {/* Decorative Botanical Stems */}
      <div className="absolute top-10 left-6 sm:left-16 pointer-events-none opacity-40">
        <EucalyptusStem className="w-24 h-36" />
      </div>
      <div className="absolute top-10 right-6 sm:right-16 pointer-events-none opacity-40">
        <MagnoliaBranch className="w-28 h-28" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-[#BDA06C]/50 text-[#BDA06C] text-[10px] font-serif uppercase tracking-[0.25em]">
          <Heart className="w-3 h-3 fill-[#BDA06C]" />
          <span>UNTIL EVERY MIST BECOMES A MEMORY</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-white">
          Terima Kasih
        </h2>

        <p className="text-xs sm:text-sm font-serif text-[#C4CDBB] leading-relaxed max-w-lg mx-auto">
          {invitation.closing_message ||
            'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu kepada kami.'}
        </p>

        <p className="text-xs font-serif italic text-[#BDA06C]">
          {invitation.closing_subtext || 'Kami yang berbahagia,'}
        </p>

        <div className="py-2">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#FAF8F5]">
            {bride.nickname || invitation.bride_nickname} &amp; {groom.nickname || invitation.groom_nickname}
          </h3>
          <p className="text-[11px] font-serif text-[#C4CDBB] mt-1">
            Beserta segenap keluarga besar kedua mempelai
          </p>
        </div>

        <HeirloomDivider className="my-6 opacity-60" />

        {onReopenCover && (
          <div className="pt-2">
            <button
              onClick={onReopenCover}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-[#BDA06C]/60 text-xs font-serif uppercase tracking-wider text-[#FAF8F5] transition-colors cursor-pointer shadow-sm"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#BDA06C]" />
              <span>Buka Sampul Kembali</span>
            </button>
          </div>
        )}

        {/* Bottom Floral Bouquet Assembly Silhouette */}
        <div className="pt-8 flex justify-center items-center gap-4 opacity-70">
          <EucalyptusStem className="w-16 h-20 -rotate-30 text-[#8A9A7B]" />
          <MagnoliaBranch className="w-20 h-20 text-[#BDA06C]" />
          <EucalyptusStem className="w-16 h-20 rotate-30 text-[#8A9A7B]" />
        </div>
      </div>
    </footer>
  );
};
