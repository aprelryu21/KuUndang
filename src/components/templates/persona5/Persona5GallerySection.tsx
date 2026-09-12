import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { GalleryItem } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5GallerySectionProps {
  gallery: GalleryItem[];
}

export const Persona5GallerySection: React.FC<Persona5GallerySectionProps> = ({ gallery }) => {
  const { t } = useLanguage();
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const playPhotoSfx = () => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(130, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.22);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Audio context may fail if unsupported
    }
  };

  const openLightbox = (idx: number) => {
    playPhotoSfx();
    setSelectedIdx(idx);
  };
  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = () => {
    if (selectedIdx === null) return;
    playPhotoSfx();
    setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
  };

  const nextImage = () => {
    if (selectedIdx === null) return;
    playPhotoSfx();
    setSelectedIdx((selectedIdx + 1) % gallery.length);
  };

  const p5Translations = t.p5;

  return (
    <section id="p5-gallery" className="py-20 sm:py-28 bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#FFFFFF]">
      {/* Background Graphic Accents */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60012] text-white text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
            <Zap className="w-3.5 h-3.5 text-[#FFF000] skew-x-12" />
            <span className="skew-x-12">
              {p5Translations?.galleryHeader || 'ALL-OUT ATTACK FINISHING TOUCH'}
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
            {p5Translations?.theShowsOver ? (
              p5Translations.theShowsOver
            ) : (
              <>THE SHOW&apos;S <span className="text-[#E60012] not-italic">OVER!</span></>
            )}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2">
            {p5Translations?.gallerySubtitle || 'Galeri Dokumentasi Kenangan & Potret Romantis Mempelai'}
          </p>
        </div>

        {/* Gallery Masonry / Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? -1 : 1 }}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer bg-[#000000] border-2 border-[#FFFFFF]/60 hover:border-[#E60012] p-1.5 -skew-x-2 shadow-[5px_5px_0px_0px_#E60012] transition-all relative overflow-hidden"
            >
              <div className="aspect-[4/5] overflow-hidden bg-[#1A1A1E] relative">
                <img
                  src={item.image_url}
                  alt={item.caption || 'Wedding Photograph'}
                  className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-[#E60012]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2 rounded-none bg-black border border-white text-white">
                    <Eye className="w-5 h-5 text-[#FFF000]" />
                  </div>
                </div>
              </div>

              {item.caption && (
                <div className="p-2 text-left">
                  <p className="text-[10px] font-mono text-[#FFFFFF]/70 truncate uppercase font-bold">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Finisher Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000]/95 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Comic Speedline Background Effect */}
            <div
              className="absolute inset-0 pointer-events-none opacity-20"
              style={{
                backgroundImage: 'repeating-conic-gradient(#E60012 0% 1%, transparent 1% 4%)',
              }}
            />

            {/* Top Comic Finisher Header */}
            <motion.div
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 select-none"
            >
              <div className="px-4 py-1.5 bg-[#E60012] border-2 border-white -skew-x-12 shadow-[4px_4px_0px_0px_#FFF000]">
                <span className="text-white text-xs sm:text-sm font-black uppercase tracking-widest skew-x-12">
                  ★ THE SHOW&apos;S OVER ★
                </span>
              </div>
              <div className="hidden sm:block px-3 py-1 bg-[#FFF000] border-2 border-black -skew-x-12">
                <span className="text-black text-xs font-mono font-black uppercase tracking-wider skew-x-12">
                  CRITICAL HIT!
                </span>
              </div>
            </motion.div>

            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 p-2.5 bg-[#E60012] text-white border-2 border-white -skew-x-6 hover:bg-[#FF0019] shadow-[3px_3px_0px_0px_#FFFFFF] transition-transform hover:scale-110 cursor-pointer"
            >
              <X className="w-5 h-5 skew-x-6" />
            </button>

            {/* Previous Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-3 sm:left-8 z-20 p-3 bg-black/80 hover:bg-[#E60012] border-2 border-white text-white -skew-x-6 transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6 skew-x-6" />
            </button>

            {/* Main Lightbox Frame */}
            <motion.div
              key={selectedIdx}
              initial={{ scale: 0.85, rotate: -2 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.85, rotate: 2 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative max-w-4xl max-h-[80vh] bg-black border-4 border-white p-2 sm:p-3 -skew-x-2 shadow-[12px_12px_0px_0px_#E60012]"
            >
              <img
                src={gallery[selectedIdx].image_url}
                alt={gallery[selectedIdx].caption || 'Finisher Snapshot'}
                className="max-h-[70vh] w-auto max-w-full object-contain mx-auto"
              />
              {gallery[selectedIdx].caption && (
                <p className="mt-3 text-center text-xs sm:text-sm font-mono font-bold uppercase text-[#FFF000] tracking-wider">
                  {gallery[selectedIdx].caption}
                </p>
              )}
            </motion.div>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-3 sm:right-8 z-20 p-3 bg-black/80 hover:bg-[#E60012] border-2 border-white text-white -skew-x-6 transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6 skew-x-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
