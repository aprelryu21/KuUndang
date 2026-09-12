import React, { useState, useRef, useEffect } from 'react';
import { useLanguage, LANGUAGES, LanguageCode } from '../../../context/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export const JavaneseLanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  return (
    <div ref={containerRef} className="relative select-none">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1A1009]/90 hover:bg-[#24160E] border border-[#D4AF37]/70 text-[#FAF6EE] shadow-md transition-all cursor-pointer text-xs"
        aria-label="Pilih Bahasa"
      >
        <Globe className="w-3.5 h-3.5 text-[#D4AF37]" />
        <span className="font-serif font-bold text-[#E5C158]">{currentLang.code}</span>
        <span className="text-[11px] text-[#FAF6EE]/80 hidden sm:inline">{currentLang.nativeName}</span>
        <ChevronDown className={`w-3 h-3 text-[#D4AF37] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 rounded-xl bg-[#1A1009] border-2 border-[#D4AF37] shadow-[0_8px_24px_rgba(0,0,0,0.8)] py-1.5 z-50 overflow-hidden backdrop-blur-md">
          <div className="px-3 py-1 border-b border-[#D4AF37]/30 text-[10px] font-serif text-[#D4AF37] uppercase tracking-wider">
            Pilihan Basa / Language
          </div>
          {LANGUAGES.map((l) => {
            const isSelected = l.code === language;
            return (
              <button
                key={l.code}
                type="button"
                onClick={() => {
                  setLanguage(l.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2 text-xs font-serif transition-colors text-left cursor-pointer ${
                  isSelected
                    ? 'bg-[#D4AF37]/20 text-[#FFF2B2] font-bold'
                    : 'text-[#FAF6EE]/80 hover:bg-[#2C1810] hover:text-[#FAF6EE]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{l.flag}</span>
                  <span>{l.nativeName}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#D4AF37]" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
