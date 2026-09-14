import React from 'react';
import { Heart, MessageCircle } from 'lucide-react';
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
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#C9A86A]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl bg-[#1E2E3E] flex items-center justify-center border border-[#C9A86A]/50 shadow-md group-hover:scale-105 transition-transform">
            <span className="font-heading font-bold text-xl text-[#FAF7F2] tracking-wider">
              K<span className="text-[#C9A86A]">U</span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-[#1E2E3E]">
                KU UNDANG
              </span>
              <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
            </div>
            <p className="text-[10px] tracking-[0.25em] uppercase text-[#A68244] font-semibold -mt-1">
              Wedding Invitation Studio
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#1E2E3E]/80">
          <a
            href="#fitur"
            onClick={(e) => scrollToSection(e, 'fitur')}
            className="hover:text-[#A68244] transition-colors"
          >
            Fitur
          </a>
          <a
            href="#pilihan-tema"
            onClick={(e) => scrollToSection(e, 'pilihan-tema')}
            className="hover:text-[#A68244] transition-colors"
          >
            Pilihan Tema
          </a>
          <a
            href="#cuplikan"
            onClick={(e) => scrollToSection(e, 'cuplikan')}
            className="hover:text-[#A68244] transition-colors"
          >
            Cuplikan
          </a>
          <a
            href="#bahasa"
            onClick={(e) => scrollToSection(e, 'bahasa')}
            className="hover:text-[#A68244] transition-colors"
          >
            5 Bahasa
          </a>
          <a
            href="#pesan"
            onClick={(e) => scrollToSection(e, 'pesan')}
            className="hover:text-[#A68244] transition-colors font-semibold text-[#1E2E3E]"
          >
            Pemesanan
          </a>
          <a
            href="#faq"
            onClick={(e) => scrollToSection(e, 'faq')}
            className="hover:text-[#A68244] transition-colors"
          >
            FAQ
          </a>
        </nav>

        {/* Right CTA: WhatsApp Quick Contact */}
        <div className="flex items-center gap-3">
          <a
            href="https://wa.me/6282114445631?text=Halo%20Tim%20KU%20UNDANG,%20saya%20ingin%20konsultasi%20pemesanan%20undangan%20digital%20pernikahan."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold tracking-wide shadow-sm hover:shadow-md transition-all group"
          >
            <MessageCircle className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Pesan WA</span>
            <span className="font-mono text-[11px] font-semibold hidden md:inline">0821-1444-5631</span>
          </a>
        </div>
      </div>
    </header>
  );
};
