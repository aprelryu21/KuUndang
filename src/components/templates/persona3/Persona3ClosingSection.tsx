import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, RefreshCw, ArrowUp } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface Persona3ClosingSectionProps {
  invitation: Invitation;
  onBackToCover: () => void;
}

export const Persona3ClosingSection: React.FC<Persona3ClosingSectionProps> = ({
  invitation,
  onBackToCover,
}) => {
  return (
    <footer className="py-20 sm:py-28 bg-[#050B18] text-[#F0F8FF] border-t-2 border-[#00D2FF]/40 text-center relative overflow-hidden">
      {/* Background Graphic Lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#FFE600_1px,transparent_1px)] [background-size:32px_32px]" />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">
        <div className="w-16 h-16 rounded-2xl bg-[#0B1A3D] border-2 border-[#FFE600] flex items-center justify-center mx-auto text-[#FFE600] shadow-[0_0_20px_rgba(255,230,0,0.4)]">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-3">
          <p className="text-xs font-mono uppercase tracking-[0.3em] text-[#00D2FF] font-bold">
            // OPERATION PROTOCOL FINALE
          </p>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase font-sans">
            Sampai Jumpa di Hari Bahagia
          </h2>
          <p className="text-sm sm:text-base text-[#D0E2F5] font-sans max-w-xl mx-auto leading-relaxed">
            {invitation.closing_message ||
              'Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir dan memberikan doa restu.'}
          </p>
          <p className="text-xs font-mono text-[#FFE600] font-bold">
            {invitation.closing_subtext || 'Eat, laugh, dance, repeat. ♡'}
          </p>
        </div>

        <div className="pt-4">
          <p className="text-xs font-mono text-[#A0C4E2] uppercase tracking-wider mb-2">
            TURUT BERBAHAGIA KELUARGA BESAR:
          </p>
          <p className="text-lg sm:text-xl font-black text-white font-sans uppercase">
            Keluarga Besar Bpk. Imam Sodik & Ibu Rofiatin (Kediri)
          </p>
          <p className="text-base text-[#00D2FF] font-mono font-bold my-1">&</p>
          <p className="text-lg sm:text-xl font-black text-white font-sans uppercase">
            Keluarga Besar Bpk. Poniman & Ibu Ngatenah (Sidoarjo)
          </p>
        </div>

        {/* Back to Cover Button */}
        <div className="pt-8">
          <button
            type="button"
            onClick={onBackToCover}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0E1E42] hover:bg-[#00D2FF] hover:text-[#050B18] text-[#00D2FF] border border-[#00D2FF] font-mono text-xs font-black uppercase tracking-wider shadow-lg transition-all cursor-pointer transform -skew-x-6 hover:skew-x-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>&gt; REPLAY INVITATION / KEMBALI KE COVER &lt;</span>
          </button>
        </div>

        <div className="pt-10 border-t border-[#00D2FF]/20 text-[11px] font-mono text-[#768692]">
          KU UNDANG &bull; PERSONA 3 NEO WEDDING EDITION &bull; 2021
        </div>
      </div>
    </footer>
  );
};
