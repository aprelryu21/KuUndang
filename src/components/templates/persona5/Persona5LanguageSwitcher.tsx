import React, { useState, useEffect, useRef } from 'react';
import { useLanguage, LANGUAGES, LanguageCode } from '../../../context/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Globe, Sparkles } from 'lucide-react';
import { FlagSVG } from '../../common/LanguageSwitcher';

interface Persona5LanguageSwitcherProps {
  className?: string;
  variant?: 'cover' | 'floating' | 'header';
}

// Subtle Web Audio API sound effect for Persona 5 menu navigation
function playP5SelectSfx() {
  try {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.08, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch {
    // AudioContext blocked or not supported
  }
}

export const Persona5LanguageSwitcher: React.FC<Persona5LanguageSwitcherProps> = ({
  className = '',
  variant = 'floating',
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const handleSelectLanguage = (code: LanguageCode) => {
    playP5SelectSfx();
    setLanguage(code);
    setIsOpen(false);
  };

  const p5LangLabel = t.p5?.langLabel || 'LANG';

  return (
    <div ref={containerRef} className={`relative select-none ${className}`}>
      {/* Trigger Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        onClick={() => {
          playP5SelectSfx();
          setIsOpen(!isOpen);
        }}
        className={`group flex items-center gap-2 px-3 py-1.5 bg-[#000000] border-2 border-[#FFFFFF] hover:border-[#E60012] text-white shadow-[3px_3px_0px_0px_#E60012] -skew-x-6 cursor-pointer transition-all ${
          isOpen ? 'ring-2 ring-[#FFF000]' : ''
        }`}
        title="Ubah Bahasa / Change Language (Persona 5)"
        aria-label="Pilih Bahasa"
      >
        <div className="flex items-center gap-1.5 skew-x-6">
          <FlagSVG code={language} className="w-4 h-3 rounded-[1px] shadow-xs" />
          <span className="text-[10px] font-mono font-bold tracking-widest text-[#FFF000] uppercase hidden xs:inline">
            {p5LangLabel} //
          </span>
          <span className="text-xs font-black font-mono tracking-wider text-white">
            {currentLang.code}
          </span>
          <ChevronDown
            className={`w-3.5 h-3.5 text-[#FFF000] transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-[#E60012]' : ''
            }`}
          />
        </div>
      </motion.button>

      {/* Persona 5 Menu Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className={`absolute right-0 z-50 w-56 sm:w-60 bg-[#000000] border-3 border-[#E60012] p-1.5 shadow-[8px_8px_0px_0px_#FFFFFF] -skew-x-3 text-left ${
              variant === 'cover' ? 'top-full mt-2' : 'top-full mt-2'
            }`}
          >
            {/* Header / Subtitle */}
            <div className="px-2.5 py-1.5 border-b border-[#FFFFFF]/20 mb-1 flex items-center justify-between skew-x-3">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-[#FFF000]" />
                <span className="text-[10px] font-mono font-black text-[#FFF000] tracking-widest uppercase">
                  COGNITIVE LANGUAGE SELECT
                </span>
              </div>
              <span className="text-[9px] font-mono text-[#FFFFFF]/50">P5 PROTOCOL</span>
            </div>

            {/* Language Options List */}
            <div className="flex flex-col gap-1 skew-x-3">
              {LANGUAGES.map((langOption) => {
                const isSelected = langOption.code === language;
                return (
                  <button
                    key={langOption.code}
                    type="button"
                    onClick={() => handleSelectLanguage(langOption.code)}
                    className={`flex items-center justify-between px-2.5 py-2 text-left text-xs font-mono transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#E60012] text-[#FFFFFF] font-black -skew-x-3 shadow-xs'
                        : 'text-[#FFFFFF] hover:bg-[#1A1A20] hover:text-[#FFF000]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <FlagSVG code={langOption.code} className="w-4 h-3 shrink-0" />
                      <div className="leading-tight">
                        <span className="font-bold block tracking-wider text-[11px]">
                          {langOption.nativeName}
                        </span>
                        <span
                          className={`text-[9px] uppercase tracking-wider block ${
                            isSelected ? 'text-[#FFF000]' : 'text-[#FFFFFF]/60'
                          }`}
                        >
                          {langOption.name}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      {isSelected ? (
                        <span className="px-1.5 py-0.5 bg-[#000000] text-[#FFF000] text-[9px] font-black tracking-widest border border-white/40">
                          ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#FFFFFF]/40 group-hover:text-white">
                          ▶
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom accent banner */}
            <div className="mt-1.5 pt-1 border-t border-[#FFFFFF]/10 text-center skew-x-3">
              <span className="text-[8px] font-mono text-[#FFF000] uppercase tracking-widest">
                ★ MULTILINGUAL WEDDING TRANSMISSION ★
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
