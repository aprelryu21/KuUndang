import React from 'react';
import { ArrowUp, Star } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5ClosingSectionProps {
  invitation: Invitation;
  onBackToCover: () => void;
}

export const Persona5ClosingSection: React.FC<Persona5ClosingSectionProps> = ({
  invitation,
  onBackToCover,
}) => {
  const { t } = useLanguage();
  const p5Translations = t.p5;

  return (
    <footer className="py-20 sm:py-28 bg-[#000000] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#FFFFFF] select-none">
      {/* Background Graphic Slashes */}
      <div className="absolute inset-0 pointer-events-none opacity-15 overflow-hidden">
        <div className="absolute -bottom-24 -left-20 w-[140%] h-60 bg-[#E60012] rotate-3" />
        <div className="absolute -bottom-16 -left-10 w-[130%] h-8 bg-[#FFFFFF] rotate-3" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-8">
        {/* Slanted Stamp */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#E60012] text-white text-xs font-black uppercase tracking-[0.25em] -skew-x-12 border-2 border-white shadow-[4px_4px_0px_0px_#FFF000]">
          <Star className="w-3.5 h-3.5 fill-[#FFF000] text-[#FFF000] skew-x-12" />
          <span className="skew-x-12">
            {p5Translations?.missionAccomplished || 'MISSION ACCOMPLISHED // TAKE OVER'}
          </span>
        </div>

        {/* Thank you statement */}
        <div className="bg-[#141418] border-4 border-white p-6 sm:p-8 -skew-x-2 shadow-[10px_10px_0px_0px_#E60012] space-y-4">
          <h2 className="text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-white">
            {p5Translations?.thankYouTitle ? (
              p5Translations.thankYouTitle
            ) : (
              <>TERIMA KASIH ATAS <span className="text-[#E60012] not-italic">DOA & KEHADIRAN ANDA</span></>
            )}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/80 leading-relaxed max-w-xl mx-auto">
            {t.closingHonorMessage ||
              invitation.closing_message ||
              'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.'}
          </p>

          <div className="pt-4 border-t border-white/20">
            <p className="text-xs font-mono text-[#FFF000] uppercase font-bold tracking-widest mb-1">
              {t.warmRegards || 'KAMI YANG BERBAHAGIA:'}
            </p>
            <div className="text-2xl sm:text-3xl font-black uppercase tracking-wide text-white">
              {invitation.groom_nickname} <span className="text-[#E60012]">&</span> {invitation.bride_nickname}
            </div>
            <p className="text-[11px] font-mono text-[#FFFFFF]/60 mt-1">
              {t.familyAndFriends || 'Beserta Seluruh Keluarga Besar Bpk. Suwardi & Bpk. Poniman'}
            </p>
          </div>
        </div>

        {/* Return to Calling Card Cover Button */}
        <div>
          <button
            type="button"
            onClick={onBackToCover}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#E60012] hover:bg-[#FF0019] text-white text-xs font-black uppercase tracking-wider transition-colors border-2 border-white -skew-x-6 shadow-[4px_4px_0px_0px_#FFF000] cursor-pointer"
          >
            <ArrowUp className="w-4 h-4 skew-x-6" />
            <span className="skew-x-6">
              {p5Translations?.backToCallingCard || 'KEMBALI KE SAMPUL UNDANGAN (CALLING CARD)'}
            </span>
          </button>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-8 border-t border-white/10 text-[11px] font-mono text-[#FFFFFF]/40 space-y-1">
          <p>© 2021 — 2026 The Wedding of April Pratama & Siti Nurjannah.</p>
          <p>Crafted with Persona 5 Stylistic Visual Direction // KU UNDANG Platform.</p>
        </div>
      </div>
    </footer>
  );
};
