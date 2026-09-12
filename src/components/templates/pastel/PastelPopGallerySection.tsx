import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, X, ChevronLeft, ChevronRight, Eye, Camera } from 'lucide-react';
import { GalleryItem } from '../../../types/wedding';

interface PastelPopGallerySectionProps {
  gallery: GalleryItem[];
}

export const PastelPopGallerySection: React.FC<PastelPopGallerySectionProps> = ({ gallery }) => {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [loveCount, setLoveCount] = useState<Record<number, number>>({});

  const playPopSfx = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.14);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.16);
    } catch {
      // fallback
    }
  };

  const openLightbox = (idx: number) => {
    playPopSfx();
    setSelectedIdx(idx);
  };

  const closeLightbox = () => setSelectedIdx(null);

  const prevImage = () => {
    if (selectedIdx === null) return;
    playPopSfx();
    setSelectedIdx((selectedIdx - 1 + gallery.length) % gallery.length);
  };

  const nextImage = () => {
    if (selectedIdx === null) return;
    playPopSfx();
    setSelectedIdx((selectedIdx + 1) % gallery.length);
  };

  const addLove = (idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    playPopSfx();
    setLoveCount((prev) => ({ ...prev, [idx]: (prev[idx] || 0) + 1 }));
  };

  return (
    <section id="cute-gallery" className="py-20 sm:py-28 bg-gradient-to-b from-[#EDF5FF]/50 via-white to-[#FFE5EC]/40 relative overflow-hidden">
      {/* Playful Doodles */}
      <div className="absolute top-10 left-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4.2s' }}>
        📸
      </div>
      <div className="absolute bottom-10 right-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '3.7s' }}>
        ✨
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] border-2 border-[#FF6B8B] text-[#FF6B8B] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <Camera className="w-3.5 h-3.5" />
          <span>GALERI KENANGAN MANIS</span>
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
          Sweet Memories &amp; Moments ♡
        </h2>
        <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-md mx-auto">
          Potret penuh tawa, cinta, dan kehangatan dalam lembaran perjalanan menuju hari pernikahan.
        </p>

        {/* Gallery Polaroid Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 mt-12">
          {gallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              whileHover={{ scale: 1.03, rotate: idx % 2 === 0 ? -1.5 : 1.5 }}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer bg-white rounded-3xl border-3 border-[#2B2D42] p-3 shadow-[5px_5px_0px_0px_#FFD166] hover:shadow-[7px_7px_0px_0px_#FF6B8B] transition-all relative overflow-hidden"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-rose-50 relative">
                <img
                  src={item.image_url}
                  alt={item.caption || 'Wedding Moment'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                />

                {/* Hover overlay with eye icon */}
                <div className="absolute inset-0 bg-[#FF6B8B]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white text-[#FF6B8B] flex items-center justify-center shadow-md">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Love Reaction Floating Button */}
                <button
                  type="button"
                  onClick={(e) => addLove(idx, e)}
                  className="absolute bottom-2 right-2 px-2 py-1 rounded-full bg-white/95 border border-[#FF6B8B]/40 text-[#FF6B8B] text-[10px] font-black flex items-center gap-1 shadow-xs hover:scale-110 transition-transform"
                >
                  <Heart className="w-3 h-3 fill-[#FF6B8B]" />
                  <span>{loveCount[idx] || 12 + idx}</span>
                </button>
              </div>

              {item.caption && (
                <div className="p-2 text-left">
                  <p className="text-xs font-bold text-[#2B2D42] truncate">
                    {item.caption}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cute Lightbox Modal */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#2B2D42]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 z-20 p-2.5 rounded-full bg-white text-[#2B2D42] border-2 border-[#2B2D42] shadow-[3px_3px_0px_0px_#FF6B8B] hover:scale-110 transition-transform cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-20 p-3 rounded-full bg-white text-[#2B2D42] border-2 border-[#2B2D42] shadow-[3px_3px_0px_0px_#FFD166] hover:scale-110 transition-transform cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-20 p-3 rounded-full bg-white text-[#2B2D42] border-2 border-[#2B2D42] shadow-[3px_3px_0px_0px_#FFD166] hover:scale-110 transition-transform cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Image in Polaroid Frame */}
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="relative max-w-3xl max-h-[82vh] p-3 sm:p-4 bg-white rounded-4xl border-4 border-[#2B2D42] shadow-[12px_12px_0px_0px_#FF6B8B]"
            >
              <img
                src={gallery[selectedIdx].image_url}
                alt={gallery[selectedIdx].caption || 'Wedding Photo'}
                className="max-h-[68vh] w-auto mx-auto object-contain rounded-2xl"
              />

              {gallery[selectedIdx].caption && (
                <div className="p-3 text-center bg-[#FFF9E6] rounded-2xl border-2 border-[#FFD166] mt-3 flex items-center justify-between gap-4">
                  <span className="text-xs font-black text-[#FF6B8B]">
                    FOTO {selectedIdx + 1} DARI {gallery.length}
                  </span>
                  <p className="text-xs sm:text-sm font-bold text-[#2B2D42] truncate">
                    {gallery[selectedIdx].caption}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
