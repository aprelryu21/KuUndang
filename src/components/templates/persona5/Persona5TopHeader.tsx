import React from 'react';
import { Mail, ArrowLeft, Send, Sparkles, Flame, UserCheck } from 'lucide-react';

interface Persona5TopHeaderProps {
  guestName: string;
  onBackToCover: () => void;
  onOpenAdminModal?: () => void;
}

export const Persona5TopHeader: React.FC<Persona5TopHeaderProps> = ({
  guestName,
  onBackToCover,
  onOpenAdminModal,
}) => {
  const scrollToRsvp = () => {
    const el = document.getElementById('p5-rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-[#0D0D0D]/95 backdrop-blur-md border-b-2 border-[#E60012] px-3 sm:px-6 py-2.5 flex items-center justify-between text-[#FFFFFF] select-none shadow-md">
      {/* Left: Target Invitee Info */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-hidden">
        <button
          type="button"
          onClick={onBackToCover}
          className="flex items-center gap-1 px-2.5 py-1 bg-[#1A1A1E] hover:bg-[#E60012] border border-white/40 text-white text-[10px] sm:text-xs font-mono font-bold tracking-wider -skew-x-6 transition-colors cursor-pointer shrink-0"
          title="Buka Kembali Sampul Calling Card"
        >
          <ArrowLeft className="w-3 h-3 skew-x-6" />
          <span className="skew-x-6 hidden sm:inline">SAMPUL</span>
        </button>

        <div className="flex items-center gap-1.5 min-w-0">
          <span className="bg-[#E60012] text-white text-[9px] font-black uppercase px-1.5 py-0.5 -skew-x-6 shrink-0 hidden sm:inline-block">
            INVITEE
          </span>
          <p className="text-xs sm:text-sm font-black font-mono uppercase tracking-wide truncate">
            <span className="text-[#FFFFFF]/60 text-[11px] mr-1 hidden xs:inline">KEPADA:</span>
            <span className="text-[#FFF000]">{guestName || 'TAMU TERHORMAT'}</span>
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 shrink-0">
        <button
          type="button"
          onClick={scrollToRsvp}
          className="flex items-center gap-1.5 px-3 py-1 bg-[#E60012] hover:bg-[#FF0019] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider -skew-x-6 shadow-[2px_2px_0px_0px_#FFFFFF] cursor-pointer transition-transform hover:scale-105"
        >
          <Send className="w-3 h-3 text-[#FFF000] skew-x-6" />
          <span className="skew-x-6">RSVP</span>
        </button>
      </div>
    </header>
  );
};
