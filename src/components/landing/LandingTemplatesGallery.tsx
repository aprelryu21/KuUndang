import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart, Eye, ArrowRight, Check, Flame, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LandingTemplatesGallery: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('royal-arch');

  const themes = [
    {
      id: 'javanese-royal',
      name: 'Adat Jawa Keraton & Gamelan Sakral',
      category: 'Sacred Heritage Collection',
      tag: 'Adat Jawa Sakral',
      accentColor: '#D4AF37',
      bgColor: '#1A1009',
      desc: 'Nuansa Keraton Jawa sakral: Gerbang Gunungan Wayang Kulit emas, motif Batik Kawung, alunan backsound Gamelan Jawa (Udan Mas / Kebo Giro), dan busana Paes Ageng.',
      liveUrl: '/april-siti?template=javanese-royal',
      previewBtnText: 'Demo Adat Jawa',
    },
    {
      id: 'cute-pink-floral',
      name: 'Pastel Bloom & Bunga Lucu (Pink)',
      category: 'Sweet & Cute Floral Collection',
      tag: 'Lucu & Manis',
      accentColor: '#FF5C8D',
      bgColor: '#FFF0F5',
      desc: 'Desain manis nan menggemaskan dengan palet merah muda ceria, kelopak bunga melayang, stiker washi tape, dan frame polaroid yang imut.',
      liveUrl: '/april-siti?template=cute-pink-floral',
      previewBtnText: 'Demo Lucu & Manis',
    },
    {
      id: 'royal-arch',
      name: 'The Royal Navy & Gold Arch',
      category: 'Signature Classic Collection',
      tag: 'Klasik Ningrat',
      accentColor: '#C2A56B',
      bgColor: '#182736',
      desc: 'Perpaduan deep navy dengan emas tempa dan frame arch sinematik yang memberikan kesan agung, anggun, & ningrat Jawa modern.',
      liveUrl: '/april-siti?template=royal-arch',
      previewBtnText: 'Demo Royal Arch',
    },
    {
      id: 'persona-5',
      name: 'Phantom Crimson & Black (Persona 5 Theme)',
      category: 'Gaming & Pop-Culture Art',
      tag: 'Persona 5 Style',
      accentColor: '#E60012',
      bgColor: '#0D0D0D',
      desc: 'Konsep revolusioner bergaya Persona 5: kartu undangan Calling Card "Take Your Heart", palet Crimson-Black-White, dan All-Out Attack!',
      liveUrl: '/april-siti?template=persona-5',
      previewBtnText: 'Demo Persona 5',
    },
  ];

  return (
    <section id="pilihan-tema" className="py-20 sm:py-28 bg-[#FFFCF7] border-y border-[#C2A56B]/20 relative scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EFE8DE] border border-[#C2A56B]/40 text-xs font-semibold uppercase tracking-[0.2em] text-[#C2A56B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Koleksi Estetika Eksklusif</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold text-[#283D52] tracking-tight">
            4 Pilihan Tema Eksklusif Undangan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Pilih antara sakralnya Adat Jawa Kasultanan &amp; Gamelan, manisnya nuansa merah muda bunga lucu, keanggunan klasik Royal Arch bangsawan, atau gaya energik Persona 5. Coba demonya secara langsung!
          </p>
        </motion.div>

        {/* Templates Grid - 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {themes.map((theme, idx) => {
            const isSelected = selectedTheme === theme.id;
            const isP5 = theme.id === 'persona-5';
            const isJawa = theme.id === 'javanese-royal';
            const isCute = theme.id === 'cute-pink-floral';

            return (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedTheme(theme.id)}
                className={`cursor-pointer rounded-3xl p-5 sm:p-6 border-2 transition-all flex flex-col justify-between group ${
                  isSelected
                    ? isP5
                      ? 'bg-[#141418] border-[#E60012] shadow-2xl scale-[1.02] text-white'
                      : isJawa
                      ? 'bg-[#24160E] border-[#D4AF37] shadow-2xl scale-[1.02] text-[#FAF6EE]'
                      : isCute
                      ? 'bg-[#FFF0F5] border-[#FF5C8D] shadow-2xl scale-[1.02] text-[#4A2E35]'
                      : 'bg-[#F7F2EA] border-[#C2A56B] shadow-2xl scale-[1.02]'
                    : isJawa
                    ? 'bg-[#1A1009] border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-sm text-[#FAF6EE]'
                    : isCute
                    ? 'bg-[#FFF5F8] border-[#FFA3B8]/40 hover:border-[#FF5C8D]/60 shadow-sm text-[#4A2E35]'
                    : 'bg-[#FFFCF7] border-[#C2A56B]/20 hover:border-[#C2A56B]/60 shadow-sm'
                }`}
              >
                {/* Visual Mockup Illustration */}
                <div
                  className="w-full aspect-[9/13] rounded-2xl overflow-hidden relative p-5 flex flex-col justify-between shadow-inner border border-white/10"
                  style={{ backgroundColor: theme.bgColor }}
                >
                  {/* Decorative Graphics per theme */}
                  {isCute ? (
                    /* Cute Floral Petals & Smiling Daisy Graphic */
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                      <svg viewBox="0 0 100 100" className="w-32 h-32 fill-[#FFA3B8]">
                        <circle cx="50" cy="25" r="14" />
                        <circle cx="75" cy="50" r="14" />
                        <circle cx="50" cy="75" r="14" />
                        <circle cx="25" cy="50" r="14" />
                        <circle cx="50" cy="50" r="18" fill="#FFD166" />
                      </svg>
                    </div>
                  ) : isJawa ? (
                    /* Javanese Gunungan Graphic */
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-25">
                      <svg viewBox="0 0 100 150" className="w-44 h-56 fill-[#D4AF37]">
                        <path d="M50 8 C47 22 25 50 15 80 C8 100 15 125 25 140 C35 146 65 146 75 140 C85 125 92 100 85 80 C75 50 53 22 50 8 Z" />
                      </svg>
                    </div>
                  ) : !isP5 ? (
                    /* Classic Arch Vector */
                    <svg
                      className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
                      viewBox="0 0 200 310"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M 25 300 V 85 A 75 75 0 0 1 175 85 V 300"
                        stroke={theme.accentColor}
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                      <path
                        d="M 32 300 V 88 A 68 68 0 0 1 168 88 V 300"
                        stroke={theme.accentColor}
                        strokeWidth="0.75"
                      />
                      <circle cx="100" cy="40" r="14" stroke={theme.accentColor} strokeWidth="1" />
                      <circle cx="100" cy="40" r="4" fill={theme.accentColor} />
                      <path d="M 15 15 L 35 15 M 15 15 L 15 35" stroke={theme.accentColor} strokeWidth="1.5" />
                      <path d="M 185 15 L 165 15 M 185 15 L 185 35" stroke={theme.accentColor} strokeWidth="1.5" />
                    </svg>
                  ) : (
                    /* Persona 5 Halftone & Diagonal Slash Vector */
                    <div className="absolute inset-0 pointer-events-none overflow-hidden">
                      <div
                        className="absolute inset-0 opacity-20"
                        style={{
                          backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
                          backgroundSize: '16px 16px',
                        }}
                      />
                      <div className="absolute -top-16 -left-10 w-[150%] h-28 bg-[#E60012] -rotate-12 opacity-80" />
                      <div className="absolute -bottom-16 -right-10 w-[150%] h-24 bg-[#E60012] rotate-6 opacity-90" />
                    </div>
                  )}

                  {/* Top Badge */}
                  <div className="relative z-10 flex justify-between items-center">
                    <span
                      className={`text-[10px] uppercase font-black tracking-widest px-2.5 py-0.5 rounded-full ${
                        isP5
                          ? 'bg-[#E60012] text-white -skew-x-6 border border-white'
                          : isJawa
                          ? 'bg-[#D4AF37] text-[#1A1009] border border-[#E5C158]'
                          : isCute
                          ? 'bg-[#FF5C8D] text-white border border-[#FFA3B8]'
                          : 'bg-white/15 text-[#FFFCF7] border border-white/20'
                      }`}
                    >
                      {theme.tag}
                    </span>
                    {isP5 ? (
                      <Flame className="w-4 h-4 text-[#FFF000]" />
                    ) : (
                      <Heart className="w-4 h-4" style={{ color: theme.accentColor, fill: theme.accentColor }} />
                    )}
                  </div>

                  {/* Center Mockup Content */}
                  <div className="relative z-10 text-center my-auto px-2">
                    <p
                      className={`text-[9px] uppercase tracking-[0.25em] font-mono mb-1 ${
                        isP5
                          ? 'text-[#FFF000] font-black'
                          : isJawa
                          ? 'text-[#E5C158] font-serif'
                          : isCute
                          ? 'text-[#FF5C8D] font-sans font-bold'
                          : 'text-[#FFFCF7]/70'
                      }`}
                    >
                      {isP5 ? '★ CALLING CARD ★' : isJawa ? 'ꦱꦼꦫꦠ꧀ꦲꦸꦊꦩ꧀' : isCute ? '🌸 UNDANGAN MANIS 🌸' : 'The Wedding Of'}
                    </p>
                    <h4
                      className={`text-xl font-bold leading-tight ${
                        isP5
                          ? 'font-black uppercase italic tracking-tighter text-[#FFFCF7]'
                          : isJawa
                          ? 'font-serif text-[#FAF6EE]'
                          : isCute
                          ? 'font-heading text-[#E03164]'
                          : 'font-heading text-[#FFFCF7]'
                      }`}
                    >
                      April <span style={{ color: theme.accentColor }}>&</span> Siti
                    </h4>
                    <p
                      className={`text-[10px] mt-1 font-mono ${
                        isP5 ? 'text-[#FFF000]' : isJawa ? 'text-[#D4AF37] font-serif' : isCute ? 'text-[#8A505F]' : 'text-[#FFFCF7]/80'
                      }`}
                    >
                      17 . 09 . 2021
                    </p>

                    <div
                      className={`mt-4 p-2.5 rounded-xl border text-[10px] ${
                        isP5
                          ? 'bg-black/80 border-[#E60012] -skew-x-2 text-[#FFFCF7]'
                          : isJawa
                          ? 'bg-[#1A1009]/80 border-[#D4AF37]/50 font-serif text-[#FAF6EE]'
                          : isCute
                          ? 'bg-white/90 border-[#FFA3B8] text-[#4A2E35]'
                          : 'bg-white/10 backdrop-blur-xs border-white/15 text-[#FFFCF7]'
                      }`}
                    >
                      <p
                        className={`text-[8px] uppercase font-mono ${
                          isCute ? 'text-[#FF5C8D]' : 'text-[#FFFCF7]/60'
                        }`}
                      >
                        {isP5 ? 'TARGET INVITEE:' : isJawa ? 'Katur Dhumateng:' : 'Kepada Yth:'}
                      </p>
                      <p className="font-bold truncate">Tamu Terhormat</p>
                    </div>
                  </div>

                  {/* Bottom Mockup Button */}
                  <div className="relative z-10 text-center">
                    <div
                      className={`w-full py-2 text-[10px] font-black uppercase tracking-wider shadow-md flex items-center justify-center gap-1.5 ${
                        isP5
                          ? 'bg-[#E60012] text-white -skew-x-6 border border-white'
                          : isJawa
                          ? 'rounded-xl text-[#1A1009] font-serif font-bold bg-[#D4AF37]'
                          : 'rounded-xl text-[#1C2D27]'
                      }`}
                      style={!isP5 && !isJawa ? { backgroundColor: theme.accentColor } : {}}
                    >
                      {isP5 && <Zap className="w-3 h-3 text-[#FFF000] skew-x-6" />}
                      <span className={isP5 ? 'skew-x-6' : ''}>{isJawa ? 'Bikak Ulem' : 'Buka Undangan'}</span>
                    </div>
                  </div>
                </div>

                {/* Card Text Description */}
                <div className="mt-5 text-left">
                  <span
                    className="text-[11px] font-bold uppercase tracking-wider"
                    style={{ color: theme.accentColor }}
                  >
                    {theme.category}
                  </span>
                  <h3
                    className={`font-heading text-lg sm:text-xl font-bold mt-1 leading-snug ${
                      isSelected && isP5 ? 'text-white' : 'text-[#283D52]'
                    }`}
                  >
                    {theme.name}
                  </h3>
                  <p
                    className={`text-xs mt-2 line-clamp-2 leading-relaxed ${
                      isSelected && isP5 ? 'text-white/70' : 'text-[#768692]'
                    }`}
                  >
                    {theme.desc}
                  </p>
                </div>

                {/* Card Footer Link - Direct live demo without login */}
                <div
                  className={`mt-5 pt-4 border-t flex items-center justify-between ${
                    isSelected && isP5 ? 'border-white/20' : 'border-[#C2A56B]/20'
                  }`}
                >
                  <Link
                    to={theme.liveUrl}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-all group-hover:translate-x-1 ${
                      isSelected && isP5
                        ? 'text-[#FFF000] hover:text-white'
                        : 'text-[#283D52] hover:text-[#C2A56B]'
                    }`}
                  >
                    <Eye className="w-4 h-4" style={{ color: theme.accentColor }} />
                    <span>Lihat Live Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" style={{ color: theme.accentColor }} />
                  </Link>

                  {isSelected && (
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-white ${
                        isP5 ? 'bg-[#E60012]' : 'bg-[#283D52]'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

