import React from 'react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  CuteFloralDivider,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Heart, ArrowUp } from 'lucide-react';

interface CuteClosingSectionProps {
  invitation: Invitation;
  onReopenCover: () => void;
}

export const CuteClosingSection: React.FC<CuteClosingSectionProps> = ({
  invitation,
  onReopenCover,
}) => {
  const { language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="cute-closing"
      className="py-20 sm:py-24 px-4 bg-[#FFE8F0] text-[#4A2E35] relative overflow-hidden text-center border-t-2 border-[#FFA3B8]"
    >
      <CuteFloralParticles count={18} showFlowers={true} />

      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <div className="flex items-center justify-center gap-3">
          <CuteTulipFlower className="w-8 h-8" />
          <CuteDaisyFlower className="w-12 h-12 animate-bounce" style={{ animationDuration: '3s' }} />
          <CuteTulipFlower className="w-8 h-8 -scale-x-100" />
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-bold text-[#E03164]">
          {language === 'JW' ? 'Matur Nuwun Sanget' : 'Terima Kasih Banyak'}
        </h2>

        <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
          {language === 'JW'
            ? 'Awit rawuh panjenengan sedaya saha puji donga pangestu ingkang sampun kaparingaken, mugi Gusti Kang Murbeng Dumadi tansah paring berkah lan katresnan.'
            : 'Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, atas kehadiran serta doa restu yang tulus dari Bapak/Ibu/Saudara/i sekalian.'}
        </p>

        <CuteFloralDivider />

        <div className="space-y-1">
          <p className="text-xs font-sans font-bold uppercase tracking-[0.2em] text-[#FF5C8D]">
            KAMI YANG BERBAHAGIA
          </p>
          <div className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164]">
            {invitation.groom_nickname || 'Mempelai Pria'} &amp; {invitation.bride_nickname || 'Mempelai Wanita'}
          </div>
          <p className="text-xs font-sans text-[#8A505F] pt-1">
            Beserta Seluruh Keluarga Besar
          </p>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={scrollToTop}
            className="px-5 py-2.5 rounded-full bg-white hover:bg-[#FFF0F5] border border-[#FFA3B8] text-[#FF5C8D] text-xs font-sans font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>Kembali ke Atas</span>
          </button>

          <button
            type="button"
            onClick={onReopenCover}
            className="px-5 py-2.5 rounded-full bg-[#FF5C8D] hover:bg-[#E03164] text-white text-xs font-sans font-bold flex items-center gap-1.5 shadow-xs transition-all hover:scale-105 cursor-pointer"
          >
            <CuteSakuraFlower className="w-3.5 h-3.5" />
            <span>Buka Ulang Sampul Undangan</span>
          </button>
        </div>

        <div className="pt-8 text-[11px] font-sans text-[#8A505F] flex items-center justify-center gap-1.5">
          <span>Didesain dengan Cinta &amp; Bunga Merah Muda</span>
          <Heart className="w-3 h-3 text-[#FF5C8D] fill-[#FF5C8D]" />
        </div>
      </div>
    </footer>
  );
};
