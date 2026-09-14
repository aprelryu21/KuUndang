import React from 'react';
import { Sparkles, Palette, Layers, Globe, MessageCircle } from 'lucide-react';

export const LandingMobileBottomNav: React.FC = () => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'fitur', label: 'Fitur', icon: Sparkles },
    { id: 'pilihan-tema', label: 'Tema', icon: Palette },
    { id: 'cuplikan', label: 'Cuplikan', icon: Layers },
    { id: 'bahasa', label: 'Bahasa', icon: Globe },
    { id: 'pesan', label: 'Pesan', icon: MessageCircle, highlight: true },
  ];

  return (
    <nav
      id="landing-mobile-bottom-nav"
      aria-label="Navigasi Menu Mobile"
      className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border border-[#C9A86A]/35 rounded-2xl shadow-[0_8px_30px_rgba(40,61,82,0.18)] px-2 py-2"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className={`flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer ${
                item.highlight
                  ? 'text-white bg-[#25D366] px-3 shadow-xs'
                  : 'text-[#1E2E3E] hover:text-[#C9A86A] active:bg-[#EFE8DE]'
              }`}
            >
              <Icon className={`w-4 h-4 ${item.highlight ? 'text-white fill-white' : 'text-[#C9A86A]'}`} />
              <span className="text-[10px] font-bold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
