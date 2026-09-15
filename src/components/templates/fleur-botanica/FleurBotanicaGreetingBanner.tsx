import React from 'react';
import { Invitation } from '../../../types/wedding';
import { EucalyptusStem, HeirloomDivider } from './fleurBotanicaAssets';
import { Heart } from 'lucide-react';

interface FleurBotanicaGreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const FleurBotanicaGreetingBanner: React.FC<FleurBotanicaGreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  return (
    <section className="relative py-12 sm:py-16 px-4 bg-[#F5F2EB] text-[#293522] border-b border-[#BDA06C]/30 overflow-hidden text-center">
      {/* Subtle Background Accents */}
      <div className="absolute top-0 right-0 pointer-events-none opacity-20 translate-x-6 -translate-y-6">
        <EucalyptusStem className="w-36 h-36" />
      </div>
      <div className="absolute bottom-0 left-0 pointer-events-none opacity-20 -translate-x-6 translate-y-6 rotate-180">
        <EucalyptusStem className="w-36 h-36" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#BDA06C]/40 text-[#80683E] text-[10px] font-serif uppercase tracking-[0.2em]">
          <Heart className="w-3 h-3 text-[#BDA06C] fill-[#BDA06C]" />
          <span>SALAM HANGAT &amp; PENGHORMATAN</span>
        </div>

        <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#293522]">
          Kepada Yth. Bapak / Ibu / Saudara / i
        </h2>

        <div className="inline-block px-5 py-2 rounded-xl bg-white border border-[#BDA06C]/60 shadow-xs">
          <span className="font-serif font-bold text-lg sm:text-xl text-[#293522]">
            {guestName || 'Tamu Istimewa'}
          </span>
        </div>

        <p className="text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed max-w-xl mx-auto pt-2">
          {invitation.greeting_text ||
            'Dengan penuh rasa syukur dan sukacita, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari istimewa pernikahan kami.'}
        </p>

        <HeirloomDivider className="mt-4" />
      </div>
    </section>
  );
};
