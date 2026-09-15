import React from 'react';
import { Sparkles, MailOpen, Compass } from 'lucide-react';
import { WeddingInvitation } from '../../../types/wedding';

interface SeriMalaysiaCoverProps {
  wedding: WeddingInvitation;
  guestName?: string;
  onOpen: () => void;
}

export const SeriMalaysiaCover: React.FC<SeriMalaysiaCoverProps> = ({
  wedding,
  guestName,
  onOpen,
}) => {
  const bride = wedding.couples?.find((c) => c.role === 'bride');
  const groom = wedding.couples?.find((c) => c.role === 'groom');

  const brideName = bride?.nickname || bride?.name || 'Siti';
  const groomName = groom?.nickname || groom?.name || 'April';

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden bg-[#1A1015]">
      {/* Garden Sunset Background */}
      <div className="absolute inset-0">
        <img
          src="/templates/seri-malaysia/cover-garden.jpg"
          alt="Laman Seri Taman Pernikahan"
          className="w-full h-full object-cover object-center filter brightness-90 transform scale-105 animate-subtleZoom"
        />
        {/* Soft Vignette & Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#1A1015]/90" />
      </div>

      {/* Floating Petals / Sparkles Accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-[#D7BB83] animate-ping opacity-60" />
        <div className="absolute top-1/4 right-12 w-3 h-3 rounded-full bg-[#FFF] animate-pulse opacity-40" />
        <div className="absolute bottom-1/3 left-16 w-2 h-2 rounded-full bg-[#D7BB83] animate-ping delay-1000 opacity-50" />
      </div>

      {/* Content Card */}
      <div 
        className="relative z-10 max-w-md w-full mx-4 p-6 sm:p-8 rounded-3xl bg-[#FFFCF3]/90 backdrop-blur-md border-4 border-[#D7BB83] shadow-2xl text-center text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Bismillah Header */}
        <div className="mb-4">
          <div className="text-sm sm:text-base font-serif text-[#8A1B26] tracking-widest uppercase mb-1">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </div>
          <div className="text-[11px] font-semibold text-[#7A634F] uppercase tracking-widest">
            Walimatul 'Ursy · Undangan Pernikahan
          </div>
        </div>

        <div className="w-16 h-0.5 bg-[#D7BB83] mx-auto my-3" />

        {/* Couple Names */}
        <div className="my-5 space-y-1">
          <h1 
            className="text-3xl sm:text-4xl font-serif font-bold text-[#4C030A] leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {groomName} & {brideName}
          </h1>
          <p className="text-xs text-[#7A634F] italic">
            Menjalin Kasih Menuju Mahligai Ridho Ilahi
          </p>
        </div>

        {/* Wedding Date */}
        {wedding.wedding_date && (
          <div className="inline-block px-4 py-1.5 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold my-2 border border-[#D7BB83]/40">
            {new Date(wedding.wedding_date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </div>
        )}

        {/* Guest Name Invitation Badge */}
        <div className="my-6 p-4 rounded-2xl bg-white/80 border border-[#D7BB83]/50 shadow-inner">
          <span className="text-[11px] text-[#7A634F] block uppercase tracking-wider mb-1">
            Kepada Yth. Bapak/Ibu/Saudara/i:
          </span>
          <strong className="text-base sm:text-lg font-bold text-[#4C030A] block capitalize">
            {guestName || 'Tamu Undangan Yang Berbahagia'}
          </strong>
          <span className="text-[10px] text-[#A38C5E] mt-0.5 block italic">
            *Mohon maaf jika ada kesalahan penulisan nama/gelar
          </span>
        </div>

        {/* Open Button */}
        <button
          onClick={onOpen}
          className="w-full group relative py-3.5 px-6 rounded-2xl bg-gradient-to-r from-[#4C030A] via-[#8A1B26] to-[#4C030A] text-[#FFFCF3] font-semibold text-xs uppercase tracking-widest hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 shadow-lg border border-[#D7BB83]/60"
        >
          <MailOpen className="w-4 h-4 text-[#D7BB83] group-hover:rotate-12 transition-transform" />
          <span>Buka Undangan & Jelajahi Taman</span>
          <Compass className="w-4 h-4 text-[#D7BB83] animate-spin" style={{ animationDuration: '6s' }} />
        </button>

        {/* Footnote */}
        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-[#7A634F]">
          <Sparkles className="w-3 h-3 text-[#8A1B26]" />
          <span>Pengalaman Eksplorasi 2D Taman Pengantin Interaktif</span>
        </div>
      </div>
    </div>
  );
};
