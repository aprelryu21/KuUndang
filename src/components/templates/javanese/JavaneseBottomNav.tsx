import React from 'react';
import { useLanguage } from '../../../context/LanguageContext';
import { Home, Users, Calendar, MapPin, Heart, Image, CheckSquare } from 'lucide-react';

export const JavaneseBottomNav: React.FC = () => {
  const { language } = useLanguage();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'javanese-hero', label: language === 'JW' ? 'Gapura' : 'Beranda', icon: Home },
    { id: 'javanese-couple', label: language === 'JW' ? 'Manten' : 'Mempelai', icon: Users },
    { id: 'javanese-events', label: language === 'JW' ? 'Adicara' : 'Acara', icon: Calendar },
    { id: 'javanese-location', label: language === 'JW' ? 'Papan' : 'Lokasi', icon: MapPin },
    { id: 'javanese-story', label: language === 'JW' ? 'Kisah' : 'Kisah', icon: Heart },
    { id: 'javanese-gallery', label: language === 'JW' ? 'Potret' : 'Galeri', icon: Image },
    { id: 'javanese-rsvp', label: language === 'JW' ? 'Rawuh' : 'RSVP', icon: CheckSquare },
  ];

  return (
    <nav
      id="javanese-bottom-nav"
      className="fixed bottom-3 inset-x-0 z-40 flex justify-center px-3 pointer-events-none"
    >
      <div className="pointer-events-auto flex items-center gap-1 sm:gap-1.5 px-3 py-2 rounded-full bg-[#1A1009]/95 border border-[#D4AF37]/70 shadow-[0_8px_25px_rgba(0,0,0,0.85)] backdrop-blur-md">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center justify-center p-1.5 sm:px-2.5 rounded-full text-[#FAF6EE]/75 hover:text-[#E5C158] hover:bg-[#2C1810] transition-colors cursor-pointer group"
              title={item.label}
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
              <span className="text-[9px] sm:text-[10px] font-serif font-medium mt-0.5 whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
