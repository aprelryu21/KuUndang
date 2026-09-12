import React from 'react';
import { Sparkles, Palette, Layers, Globe, HelpCircle } from 'lucide-react';

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
    { id: 'faq', label: 'FAQ', icon: HelpCircle },
  ];

  return (
    <nav
      id="landing-mobile-bottom-nav"
      aria-label="Navigasi Menu Mobile"
      className="md:hidden fixed bottom-3 inset-x-3 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border border-[#C2A56B]/30 rounded-2xl shadow-[0_8px_30px_rgba(40,61,82,0.15)] px-2 py-2"
    >
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollTo(item.id)}
              className="flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl text-[#283D52] hover:text-[#C2A56B] active:bg-[#EFE8DE] transition-colors cursor-pointer"
            >
              <Icon className="w-4 h-4 text-[#C2A56B]" />
              <span className="text-[10px] font-semibold tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
