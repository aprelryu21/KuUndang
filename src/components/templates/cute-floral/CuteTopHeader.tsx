import React from 'react';
import { Invitation } from '../../../types/wedding';
import { CuteDaisyFlower, CuteBowSvg } from './cuteFloralAssets';
import { JavaneseLanguageSwitcher } from '../javanese/JavaneseLanguageSwitcher';

interface CuteTopHeaderProps {
  invitation?: Invitation;
}

export const CuteTopHeader: React.FC<CuteTopHeaderProps> = ({ invitation }) => {
  const groomName = invitation?.groom_nickname || 'Mempelai Pria';
  const brideName = invitation?.bride_nickname || 'Mempelai Wanita';

  return (
    <header
      id="cute-header"
      className="sticky top-0 z-30 bg-white/90 border-b-2 border-[#FFCCD7] backdrop-blur-md px-4 py-2.5 shadow-xs"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CuteDaisyFlower className="w-6 h-6 animate-spin-slow" />
          <span className="font-sans text-xs sm:text-sm text-[#E03164] font-bold tracking-wider uppercase flex items-center gap-1.5">
            KU UNDANG ♡ {groomName} & {brideName}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <CuteBowSvg className="hidden sm:inline w-6 h-4 text-[#FF85A2]" />
          <JavaneseLanguageSwitcher />
        </div>
      </div>
    </header>
  );
};
