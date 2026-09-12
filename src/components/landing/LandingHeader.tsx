import React from 'react';
import { Sparkles, Heart, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingHeaderProps {
  onOpenAdminLogin?: () => void;
}

export const LandingHeader: React.FC<LandingHeaderProps> = () => {
  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/90 backdrop-blur-md border-b border-[#C2A56B]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
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

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-[#283D52]/80">
          <a href="#fitur" className="hover:text-[#C2A56B] transition-colors">
            Fitur Unggulan
          </a>
          <a
            href="#pilihan-tema"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFE8DE] text-[#283D52] font-semibold hover:text-[#C2A56B] transition-colors border border-[#C2A56B]/30"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
            <span>Pilihan Tema</span>
            <span className="text-[10px] px-1.5 py-0.2 bg-[#283D52] text-white rounded-full font-bold">2</span>
          </a>
          <a href="#cuplikan" className="hover:text-[#C2A56B] transition-colors">
            Cuplikan Desain
          </a>
          <a href="#bahasa" className="hover:text-[#C2A56B] transition-colors">
            Pilihan Bahasa
          </a>
          <a href="#faq" className="hover:text-[#C2A56B] transition-colors">
            Tanya Jawab (FAQ)
          </a>
        </nav>

        {/* Header Actions */}
        <div className="flex items-center gap-2.5">
          {/* Quick Tema Shortcut for Mobile & Desktop */}
          <a
            href="#pilihan-tema"
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#EFE8DE] text-[#283D52] text-xs font-semibold border border-[#C2A56B]/40 hover:bg-[#C2A56B]/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C2A56B]" />
            <span>Tema</span>
          </a>

          {/* Primary CTA: Buka Contoh Undangan */}
          <Link
            to="/april-siti"
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer group"
          >
            <Sparkles className="w-4 h-4 text-[#C2A56B]" />
            <span>Lihat Contoh Undangan</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#C2A56B] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </header>
  );
};
