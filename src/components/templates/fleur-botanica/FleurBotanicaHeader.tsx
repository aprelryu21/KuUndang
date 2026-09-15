import React from 'react';
import { Invitation } from '../../../types/wedding';
import { Sparkles } from 'lucide-react';

interface FleurBotanicaHeaderProps {
  invitation: Invitation;
}

export const FleurBotanicaHeader: React.FC<FleurBotanicaHeaderProps> = ({ invitation }) => {
  const monogram = `${invitation.bride_nickname?.charAt(0) || 'A'} & ${invitation.groom_nickname?.charAt(0) || 'D'}`;

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#BDA06C]/40 px-4 sm:px-8 py-3 flex items-center justify-between text-[#293522] shadow-xs select-none">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-[#293522] border border-[#BDA06C] flex items-center justify-center text-[#BDA06C] font-serif font-bold text-xs">
          {monogram}
        </div>
        <span className="font-serif font-bold text-sm tracking-wide hidden sm:inline">
          {invitation.bride_nickname} &amp; {invitation.groom_nickname}
        </span>
      </div>

      <nav className="flex items-center gap-4 sm:gap-6 text-xs font-serif uppercase tracking-wider text-[#66705A]">
        <a href="#fleur-couple" className="hover:text-[#293522] transition-colors">
          Mempelai
        </a>
        <a href="#fleur-events" className="hover:text-[#293522] transition-colors">
          Acara
        </a>
        <a href="#fleur-story" className="hover:text-[#293522] transition-colors hidden sm:inline">
          Kisah
        </a>
        <a href="#fleur-gallery" className="hover:text-[#293522] transition-colors">
          Galeri
        </a>
        <a href="#fleur-rsvp" className="hover:text-[#293522] transition-colors font-bold text-[#293522]">
          RSVP
        </a>
      </nav>
    </header>
  );
};
