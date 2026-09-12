import React from 'react';
import { Heart, Mail, Sparkles, KeyRound, Home } from 'lucide-react';

interface PastelPopTopHeaderProps {
  guestName: string;
  onBackToCover: () => void;
  onOpenAdminModal?: () => void;
}

export const PastelPopTopHeader: React.FC<PastelPopTopHeaderProps> = ({
  guestName,
  onBackToCover,
  onOpenAdminModal,
}) => {
  const scrollToRsvp = () => {
    const el = document.getElementById('cute-rsvp');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-[#FFD166] px-3 sm:px-6 py-2.5 shadow-xs">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Recipient Badge */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-8 h-8 rounded-full bg-[#FFE5EC] border border-[#FF6B8B] flex items-center justify-center shrink-0">
            <Heart className="w-4 h-4 text-[#FF6B8B] fill-[#FF6B8B]" />
          </div>
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-wider text-[#FF6B8B] leading-none">
              TAMU TERHORMAT
            </p>
            <p className="text-xs sm:text-sm font-black text-[#2B2D42] truncate leading-tight mt-0.5">
              {guestName || 'Tamu Tercinta'}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Back to Cover Button */}
          <button
            type="button"
            onClick={onBackToCover}
            className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-full bg-[#FFF9E6] hover:bg-[#FFD166] text-[#2B2D42] border border-[#FFD166] text-[11px] font-bold transition-all shadow-xs cursor-pointer"
            title="Buka kembali sampul pembuka"
          >
            <Home className="w-3.5 h-3.5 text-[#FF6B8B]" />
            <span className="hidden sm:inline">Sampul</span>
          </button>

          {/* Quick RSVP Button */}
          <button
            type="button"
            onClick={scrollToRsvp}
            className="flex items-center gap-1 px-3 sm:px-3.5 py-1.5 rounded-full bg-[#FF6B8B] hover:bg-[#FF5277] text-white text-[11px] font-extrabold shadow-[2px_2px_0px_0px_#FFD166] transition-all cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Konfirmasi RSVP</span>
          </button>

          {/* Secret Studio Access */}
          {onOpenAdminModal && (
            <button
              type="button"
              onClick={onOpenAdminModal}
              className="p-1.5 rounded-full bg-slate-100 hover:bg-[#FFE5EC] text-[#2B2D42] border border-slate-200 transition-colors cursor-pointer"
              title="Studio Access"
            >
              <KeyRound className="w-3.5 h-3.5 text-[#FF6B8B]" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
