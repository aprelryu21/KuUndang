import React from 'react';
import { Users, Calendar, Heart, Image as ImageIcon, MessageSquareHeart } from 'lucide-react';

interface FleurBotanicaBottomNavProps {
  enabledKeys?: string[];
}

export const FleurBotanicaBottomNav: React.FC<FleurBotanicaBottomNavProps> = () => {
  return (
    <nav className="fixed bottom-6 inset-x-0 z-30 flex justify-center px-4 pointer-events-none select-none">
      <div className="pointer-events-auto bg-[#293522]/90 backdrop-blur-md border border-[#BDA06C]/60 rounded-full px-4 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center gap-4 sm:gap-6 text-[#FAF8F5]">
        <a
          href="#fleur-couple"
          className="p-1.5 hover:text-[#BDA06C] transition-colors flex flex-col items-center gap-0.5"
          title="Mempelai"
        >
          <Users className="w-4 h-4" />
          <span className="text-[9px] font-serif uppercase tracking-wider hidden sm:inline">
            Mempelai
          </span>
        </a>

        <a
          href="#fleur-events"
          className="p-1.5 hover:text-[#BDA06C] transition-colors flex flex-col items-center gap-0.5"
          title="Acara"
        >
          <Calendar className="w-4 h-4" />
          <span className="text-[9px] font-serif uppercase tracking-wider hidden sm:inline">
            Acara
          </span>
        </a>

        <a
          href="#fleur-story"
          className="p-1.5 hover:text-[#BDA06C] transition-colors flex flex-col items-center gap-0.5"
          title="Kisah"
        >
          <Heart className="w-4 h-4" />
          <span className="text-[9px] font-serif uppercase tracking-wider hidden sm:inline">
            Kisah
          </span>
        </a>

        <a
          href="#fleur-gallery"
          className="p-1.5 hover:text-[#BDA06C] transition-colors flex flex-col items-center gap-0.5"
          title="Galeri"
        >
          <ImageIcon className="w-4 h-4" />
          <span className="text-[9px] font-serif uppercase tracking-wider hidden sm:inline">
            Galeri
          </span>
        </a>

        <a
          href="#fleur-rsvp"
          className="p-1.5 text-[#BDA06C] hover:text-white transition-colors flex flex-col items-center gap-0.5 font-bold"
          title="RSVP"
        >
          <MessageSquareHeart className="w-4 h-4" />
          <span className="text-[9px] font-serif uppercase tracking-wider hidden sm:inline">
            RSVP
          </span>
        </a>
      </div>
    </nav>
  );
};
