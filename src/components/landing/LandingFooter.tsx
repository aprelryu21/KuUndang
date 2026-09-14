import React from 'react';
import { Heart, Shield, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';

interface LandingFooterProps {
  onOpenAdminLogin: () => void;
}

export const LandingFooter: React.FC<LandingFooterProps> = ({ onOpenAdminLogin }) => {
  return (
    <footer className="bg-[#1C2D27] text-[#FFFCF7] border-t border-[#C2A56B]/30 pt-16 pb-12 relative overflow-hidden">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-1/4 w-80 h-80 rounded-full bg-[#C2A56B]/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 select-none">
              {/* Logo KU - SAMARAN / SECRET LOGIN TRIGGER FOR MOBILE & PC */}
              <button
                type="button"
                onClick={onOpenAdminLogin}
                className="w-11 h-11 rounded-2xl bg-[#283D52] flex items-center justify-center border border-[#C2A56B]/60 shadow-md active:scale-95 hover:scale-105 transition-all cursor-pointer group shrink-0"
                aria-label="KU UNDANG"
                title="KU UNDANG"
              >
                <span className="font-heading font-bold text-xl text-[#FFFCF7] group-hover:text-[#C2A56B] transition-colors">
                  K<span className="text-[#C2A56B] group-hover:text-[#FFFCF7]">U</span>
                </span>
              </button>

              <div>
                <span className="font-heading text-xl font-bold tracking-wider text-[#FFFCF7]">
                  KU UNDANG
                </span>
                <p className="text-[9px] tracking-[0.2em] uppercase text-[#C2A56B] font-semibold">
                  Wedding Invitation Studio
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#FFFCF7]/80 leading-relaxed max-w-sm font-sans">
              Platform dan Content Management System (CMS) undangan digital pernikahan eksklusif dengan
              arsitektur Frame Arch sinematik, multi-bahasa, RSVP realtime, dan amplop digital.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#C2A56B]">
              <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
              <span>Dibuat dengan segenap cinta untuk momen terindah hidup Anda.</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
              Navigasi Halaman
            </p>
            <ul className="space-y-2 text-xs text-[#FAF7F2]/80">
              <li>
                <a href="#fitur" className="hover:text-[#C9A86A] transition-colors">
                  Fitur Unggulan
                </a>
              </li>
              <li>
                <a href="#pilihan-tema" className="hover:text-[#C9A86A] transition-colors">
                  Pilihan Tema
                </a>
              </li>
              <li>
                <a href="#cuplikan" className="hover:text-[#C9A86A] transition-colors">
                  Cuplikan Desain Undangan
                </a>
              </li>
              <li>
                <a href="#pesan" className="hover:text-[#C9A86A] transition-colors font-semibold text-[#DFC28A]">
                  Pemesanan Undangan
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#C9A86A] transition-colors">
                  Pertanyaan Sering Diajukan
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Studio Ordering */}
          <div className="md:col-span-4 space-y-3">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C9A86A]">
              Kontak &amp; Konsultasi Studio
            </p>
            <p className="text-xs text-[#FAF7F2]/80 leading-relaxed">
              Hubungi tim kami untuk konsultasi pemilihan tema, input data mempelai, atau pemesanan paket khusus pernikahan Anda.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-[#C9A86A]/30 text-xs space-y-2">
              <a
                href="https://wa.me/6282114445631?text=Halo%20Tim%20KU%20UNDANG,%20saya%20ingin%20konsultasi%20pemesanan%20undangan%20digital%20pernikahan."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#25D366] hover:underline font-bold"
              >
                <span>WhatsApp: 0821-1444-5631</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <p className="text-[10px] text-[#A6B4C0] leading-relaxed">
                Respon Cepat setiap hari pukul 08.00 – 22.00 WIB. Konsultasi ramah dan tanpa biaya.
              </p>
            </div>

            <div className="flex items-center gap-2 text-[#C9A86A] pt-1">
              <Shield className="w-3.5 h-3.5" />
              <span className="font-semibold text-[11px]">Privasi Terjaga &amp; Bebas Iklan</span>
            </div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#768692]">
          <p>© {new Date().getFullYear()} KU UNDANG. Seluruh Hak Cipta Dilindungi.</p>

          <div className="flex items-center gap-4">
            <Link to="/april-siti" className="hover:text-[#C2A56B] transition-colors">
              Preview Undangan
            </Link>
            <span>•</span>
            <span className="text-[#768692]/70">Elegansi Pernikahan Indonesia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
