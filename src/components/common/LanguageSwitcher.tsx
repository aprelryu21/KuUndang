import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, LANGUAGES, LanguageCode } from '../../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { Check, ChevronDown, Sparkles } from 'lucide-react';

interface LanguageSwitcherProps {
  className?: string;
  theme?: 'dark' | 'light' | 'auto';
  forceCompact?: boolean;
}

export const FlagSVG: React.FC<{ code: LanguageCode; className?: string }> = ({
  code,
  className = 'w-5 h-3.5 sm:w-6 sm:h-4',
}) => {
  switch (code) {
    case 'ID':
    case 'JW':
      return (
        <svg
          viewBox="0 0 24 16"
          className={`${className} rounded-[2px] overflow-hidden shadow-2xs border border-[#283D52]/20 shrink-0`}
        >
          <rect width="24" height="8" fill="#E70011" />
          <rect y="8" width="24" height="8" fill="#FFFFFF" />
        </svg>
      );
    case 'EN':
      return (
        <svg
          viewBox="0 0 24 16"
          className={`${className} rounded-[2px] overflow-hidden shadow-2xs border border-[#283D52]/20 shrink-0`}
        >
          <rect width="24" height="16" fill="#012169" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M0 0 L24 16 M24 0 L0 16" stroke="#C8102E" strokeWidth="1.5" />
          <path d="M12 0 v16 M0 8 h24" stroke="#FFFFFF" strokeWidth="5" />
          <path d="M12 0 v16 M0 8 h24" stroke="#C8102E" strokeWidth="3" />
        </svg>
      );
    case 'JP':
      return (
        <svg
          viewBox="0 0 24 16"
          className={`${className} rounded-[2px] overflow-hidden shadow-2xs border border-[#283D52]/20 shrink-0`}
        >
          <rect width="24" height="16" fill="#FFFFFF" />
          <circle cx="12" cy="8" r="4.5" fill="#BC002D" />
        </svg>
      );
    case 'CN':
      return (
        <svg
          viewBox="0 0 24 16"
          className={`${className} rounded-[2px] overflow-hidden shadow-2xs border border-[#283D52]/20 shrink-0`}
        >
          <rect width="24" height="16" fill="#DE2910" />
          {/* Main star */}
          <polygon
            points="4,2.5 4.8,4.5 7,4.5 5.2,5.8 5.8,8 4,6.7 2.2,8 2.8,5.8 1,4.5 3.2,4.5"
            fill="#FFDE00"
          />
          {/* 4 smaller arc stars */}
          <circle cx="8" cy="2.5" r="0.6" fill="#FFDE00" />
          <circle cx="9.5" cy="4" r="0.6" fill="#FFDE00" />
          <circle cx="9.5" cy="6" r="0.6" fill="#FFDE00" />
          <circle cx="8" cy="7.5" r="0.6" fill="#FFDE00" />
        </svg>
      );
  }
};

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  className = '',
  theme = 'auto',
  forceCompact = false,
}) => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Monitor window scroll to collapse into a compact single-flag box
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  const activeLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const isCompact = forceCompact || isScrolled;

  return (
    <div ref={containerRef} id="language-switcher-container" className={`relative inline-block ${className}`}>
      {/* 
        COMPACT BUTTON ON SCROLL:
        Displays ONLY the square box with the selected language flag.
        Tapping opens the full language selection menu.
      */}
      {isCompact ? (
        <motion.button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          title={`Ubah Bahasa: ${activeLang.nativeName}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center justify-center gap-1.5 p-2 sm:p-2.5 rounded-2xl border shadow-lg backdrop-blur-md cursor-pointer transition-all ${
            theme === 'dark'
              ? 'bg-[#24313A]/90 border-[#C2A56B]/60 text-[#FFFCF7]'
              : 'bg-[#FFFCF7]/95 border-[#C2A56B]/60 text-[#24313A]'
          } hover:border-[#C2A56B]`}
          aria-expanded={isOpen}
          aria-label="Pilih Bahasa Undangan"
        >
          <FlagSVG code={activeLang.code} className="w-5 h-3.5 sm:w-6 sm:h-4" />
          <span className="text-[11px] font-bold tracking-wider uppercase font-sans text-[#283D52]">
            {activeLang.code}
          </span>
          <ChevronDown
            className={`w-3 h-3 text-[#C2A56B] transition-transform duration-200 ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </motion.button>
      ) : (
        /* EXPANDED BAR (WHEN AT THE TOP) */
        <div
          className={`inline-flex items-center gap-1 p-1 rounded-2xl backdrop-blur-md border shadow-md transition-all ${
            theme === 'dark'
              ? 'bg-[#24313A]/85 border-[#C2A56B]/40 text-[#FFFCF7]'
              : 'bg-[#FFFCF7]/95 border-[#C2A56B]/40 text-[#24313A]'
          }`}
        >
          {LANGUAGES.map((item) => {
            const isSelected = language === item.code;

            return (
              <button
                key={item.code}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setLanguage(item.code);
                }}
                title={`${item.name} (${item.nativeName})`}
                className={`flex flex-col items-center justify-center px-2 py-1 sm:px-2.5 sm:py-1.5 rounded-xl transition-all cursor-pointer min-w-[36px] sm:min-w-[42px] ${
                  isSelected
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs scale-105 ring-1 ring-[#C2A56B]/50'
                    : 'hover:bg-[#C2A56B]/15 text-[#768692] hover:text-[#283D52]'
                }`}
              >
                <div className="flex items-center justify-center">
                  <FlagSVG code={item.code} />
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wider mt-0.5">
                  {item.code}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* POPUP DROPDOWN MENU WHEN COMPACT BUTTON IS CLICKED */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute right-0 top-full mt-2 w-52 sm:w-56 bg-[#FFFCF7] rounded-2xl border border-[#C2A56B]/50 shadow-2xl p-2 z-50 text-[#24313A] backdrop-blur-md overflow-hidden"
          >
            <div className="px-3 py-1.5 border-b border-[#283D52]/10 mb-1 flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#768692]">
                Pilih Bahasa
              </span>
              <Sparkles className="w-3 h-3 text-[#C2A56B]" />
            </div>

            <div className="space-y-1">
              {LANGUAGES.map((item) => {
                const isSelected = language === item.code;
                return (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      setLanguage(item.code);
                      setIsOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left transition-colors cursor-pointer ${
                      isSelected
                        ? 'bg-[#283D52] text-[#FFFCF7] font-semibold'
                        : 'hover:bg-[#F7F2EA] text-[#283D52]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagSVG code={item.code} />
                      <div>
                        <p className="text-xs leading-tight">{item.nativeName}</p>
                        <p
                          className={`text-[10px] ${
                            isSelected ? 'text-[#DFBFC1]' : 'text-[#768692]'
                          }`}
                        >
                          {item.name}
                        </p>
                      </div>
                    </div>
                    {isSelected && <Check className="w-4 h-4 text-[#DFBFC1]" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
