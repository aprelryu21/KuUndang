import React from 'react';
import { JavaneseLanguageSwitcher } from './JavaneseLanguageSwitcher';
import { useLanguage } from '../../../context/LanguageContext';
import { Invitation } from '../../../types/wedding';

interface JavaneseHeaderProps {
  invitation?: Invitation;
}

export const JavaneseHeader: React.FC<JavaneseHeaderProps> = ({ invitation }) => {
  const { language } = useLanguage();

  const groomName = invitation?.groom_nickname || 'April';
  const brideName = invitation?.bride_nickname || 'Siti';

  return (
    <header
      id="javanese-header"
      className="sticky top-0 z-30 bg-[#1A1009]/95 border-b border-[#D4AF37]/40 backdrop-blur-md px-4 py-2.5 shadow-md"
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rotate-45 bg-[#D4AF37]" />
          <span className="font-serif text-xs sm:text-sm text-[#E5C158] font-bold tracking-wider uppercase">
            KU UNDANG — {groomName} & {brideName}
          </span>
          <span className="hidden sm:inline text-xs font-serif text-[#D4AF37]/60">
            — ꦱꦸꦒꦼꦁꦫꦮꦸꦃ
          </span>
        </div>

        <div className="flex items-center gap-3">
          <JavaneseLanguageSwitcher />
        </div>
      </div>
    </header>
  );
};

