import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingHeaderProps {
  onOpenAdminLogin?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = () => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#C2A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo - Kept clean on both mobile and desktop */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#283D52] flex items-center justify-center border border-[#C2A56B]/40 shadow-md group-hover:scale-105 transition-transform">
            <span className="font-heading font-bold text-xl text-[#FFFCF7] tracking-wider">
              K<span className="text-[#C2A56B]">U</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-[#283D52]">
                KU UNDANG
              </span>
              <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#C2A56B] font-semibold -mt-1">
              Wedding Invitation Studio
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links - Standard clean links, no box/number on Pilihan Tema */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#283D52]/80">
          <a
            href="#fitur"
            onClick={(e) => scrollToSection(e, 'fitur')}
            className="hover:text-[#C2A56B] transition-colors"
          >
            Fitur Unggulan
          </a>
          <a
            href="#pilihan-tema"
            onClick={(e) => scrollToSection(e, 'pilihan-tema')}
            className="hover:text-[#C2A56B] transition-colors"
          >
            Pilihan Tema
          </a>
          <a
            href="#cuplikan"
            onClick={(e) => scrollToSection(e, 'cuplikan')}
            className="hover:text-[#C2A56B] transition-colors"
          >
            Cuplikan Desain
          </a>
          <a
            href="#bahasa"
            onClick={(e) => scrollToSection(e, 'bahasa')}
            className="hover:text-[#C2A56B] transition-colors"
          >
            Pilihan Bahasa
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, 'faq')}
            className="hover:text-[#C2A56B] transition-colors"
          >
            Tanya Jawab (FAQ)
          </a>
        </nav>
      </div>
    </header>
  );
};
