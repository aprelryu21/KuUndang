import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, ArrowRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TemplateSlideViewer, TemplateThemeItem } from './TemplateSlideViewer';

export const LandingTemplatesGallery: React.FC = () => {
  const [selectedTheme, setSelectedTheme] = useState<string>('royal-arch');

  const themes: TemplateThemeItem[] = [
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
    {
      id: 'super-mario',
      name: '8-Bit Retro Platformer (Super Mario Bros)',
      category: 'Interactive 8-Bit Game World',
      tag: 'Game 8-Bit Mario',
      accentColor: '#5C94FC',
      bgColor: '#5C94FC',
      desc: 'Gamifikasi interaktif HTML5 Canvas ala Super Mario: pengantin mempelai melompat di atas brick block, rintangan Goomba, koin berputar, dan awan informasi undangan!',
      liveUrl: '/april-siti?template=super-mario',
      previewBtnText: 'Demo 8-Bit Mario',
    },
    {
      id: 'fleur-botanica',
      name: 'Fleur Botanica & Conservatory Glasshouse',
      category: 'Botanical Conservatory Edition',
      tag: 'Botanical & Segel Lilin',
      accentColor: '#BDA06C',
      bgColor: '#1E2A20',
      desc: 'Desain botani editorial mewah ala conservatory eropa: ornamen daun eucalyptus perunggu, sampul vintage beramplop dengan segel lilin wax seal interaktif, dan palet forest sage.',
      liveUrl: '/april-siti?template=fleur-botanica',
      previewBtnText: 'Demo Fleur Botanica',
    },
    {
      id: 'seri-malaysia',
      name: '2D RPG Taman (Wedding Garden Quest)',
      category: 'Interactive 2D RPG Exploration',
      tag: '2D RPG Taman',
      accentColor: '#D7BB83',
      bgColor: '#4C030A',
      desc: 'Konsep inovatif 2D petualangan taman pernikahan: tamu dapat memilih busana karakter (Batik, Kebaya, Jas Formal, Hijab), lalu menjelajahi peta taman dengan stan pelaminan, acara, galeri, buku tamu, dan tanda kasih!',
      liveUrl: '/april-siti?template=2d-rpg-taman',
      previewBtnText: 'Demo 2D RPG Taman',
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
            7 Pilihan Tema Eksklusif Undangan
          </h2>
          <p className="mt-4 text-base sm:text-lg text-[#768692] font-sans">
            Setiap tema dirancang khusus dengan fitur interaktif lengkap. Jelajahi slide tampilan hasil undangan di bawah ini (Sampul, Profil Mempelai, Jadwal Acara, dan Galeri/Game), lalu klik <strong>Live Demo</strong> untuk mencoba langsung pengalaman para tamu!
          </p>
        </motion.div>

        {/* Templates Grid - 3 Columns on LG/XL */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {themes.map((theme, idx) => {
            const isSelected = selectedTheme === theme.id;
            const isP5 = theme.id === 'persona-5';
            const isJawa = theme.id === 'javanese-royal';
            const isCute = theme.id === 'cute-pink-floral';
            const isMario = theme.id === 'super-mario';
            const isBotanica = theme.id === 'fleur-botanica';
            const isSeri = theme.id === 'seri-malaysia';

            return (
              <motion.div
                key={theme.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setSelectedTheme(theme.id)}
                className={`cursor-pointer rounded-3xl p-5 border-2 transition-all flex flex-col justify-between group ${
                  isSelected
                    ? isMario
                      ? 'bg-[#182B42] border-[#5C94FC] shadow-2xl scale-[1.02] text-white'
                      : isP5
                      ? 'bg-[#141418] border-[#E60012] shadow-2xl scale-[1.02] text-white'
                      : isJawa
                      ? 'bg-[#24160E] border-[#D4AF37] shadow-2xl scale-[1.02] text-[#FAF6EE]'
                      : isCute
                      ? 'bg-[#FFF0F5] border-[#FF5C8D] shadow-2xl scale-[1.02] text-[#4A2E35]'
                      : isBotanica
                      ? 'bg-[#1E2A20] border-[#BDA06C] shadow-2xl scale-[1.02] text-[#FAF8F5]'
                      : isSeri
                      ? 'bg-[#3A0207] border-[#D7BB83] shadow-2xl scale-[1.02] text-[#FFFCF3]'
                      : 'bg-[#F7F2EA] border-[#C2A56B] shadow-2xl scale-[1.02]'
                    : isMario
                    ? 'bg-[#132030] border-[#5C94FC]/40 hover:border-[#5C94FC] shadow-sm text-[#E0EFFF]'
                    : isJawa
                    ? 'bg-[#1A1009] border-[#D4AF37]/30 hover:border-[#D4AF37]/60 shadow-sm text-[#FAF6EE]'
                    : isCute
                    ? 'bg-[#FFF5F8] border-[#FFA3B8]/40 hover:border-[#FF5C8D]/60 shadow-sm text-[#4A2E35]'
                    : isBotanica
                    ? 'bg-[#243326] border-[#BDA06C]/30 hover:border-[#BDA06C]/70 shadow-sm text-[#FAF8F5]'
                    : isSeri
                    ? 'bg-[#4C030A] border-[#D7BB83]/40 hover:border-[#D7BB83] shadow-sm text-[#FFFCF3]'
                    : 'bg-[#FFFCF7] border-[#C2A56B]/20 hover:border-[#C2A56B]/60 shadow-sm'
                }`}
              >
                {/* Interactive Multi-Slide Preview Showcase */}
                <TemplateSlideViewer theme={theme} isSelected={isSelected} />

                {/* Card Text Description */}
                <div className="mt-4 text-left">
                  <span
                    className="text-[10px] font-bold uppercase tracking-wider"
                    style={{ color: isMario ? '#5C94FC' : theme.accentColor }}
                  >
                    {theme.category}
                  </span>
                  <h3
                    className={`font-heading text-base sm:text-lg font-bold mt-1 leading-snug ${
                      isSelected && (isP5 || isMario || isBotanica || isSeri) ? 'text-white' : 'text-[#283D52]'
                    }`}
                  >
                    {theme.name}
                  </h3>
                  <p
                    className={`text-xs mt-1.5 line-clamp-2 leading-relaxed ${
                      isSelected && (isP5 || isMario || isBotanica) ? 'text-white/70' : 'text-[#768692]'
                    }`}
                  >
                    {theme.desc}
                  </p>
                </div>

                {/* Card Footer Link - Direct live demo without login */}
                <div
                  className={`mt-4 pt-3 border-t flex items-center justify-between ${
                    isSelected && (isP5 || isMario || isBotanica) ? 'border-white/20' : 'border-[#C2A56B]/20'
                  }`}
                >
                  <Link
                    to={theme.liveUrl}
                    className={`text-xs font-bold flex items-center gap-1.5 transition-all group-hover:translate-x-1 ${
                      isSelected && isMario
                        ? 'text-[#FFE082] hover:text-white font-mono'
                        : isSelected && isP5
                        ? 'text-[#FFF000] hover:text-white'
                        : isSelected && isBotanica
                        ? 'text-[#BDA06C] hover:text-[#E0D0B5]'
                        : 'text-[#283D52] hover:text-[#C2A56B]'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" style={{ color: isMario ? '#FFE082' : theme.accentColor }} />
                    <span>Live Demo</span>
                    <ArrowRight className="w-3 h-3" style={{ color: isMario ? '#FFE082' : theme.accentColor }} />
                  </Link>

                  {isSelected && (
                    <span
                      className={`w-5 h-5 rounded-full flex items-center justify-center text-white ${
                        isBotanica ? 'bg-[#BDA06C] text-[#1E2A20]' : isMario ? 'bg-[#5C94FC]' : isP5 ? 'bg-[#E60012]' : 'bg-[#283D52]'
                      }`}
                    >
                      <Check className="w-3 h-3 text-white" />
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

