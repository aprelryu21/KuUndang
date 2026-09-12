import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  WashiTape,
  CuteFloralDivider,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { X, ChevronLeft, ChevronRight, Eye, Sparkles, Heart } from 'lucide-react';

interface CuteGallerySectionProps {
  gallery: GalleryItem[];
}

export const CuteGallerySection: React.FC<CuteGallerySectionProps> = ({ gallery }) => {
  const { language } = useLanguage();
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const sortedGallery = [...gallery].sort((a, b) => a.sort_order - b.sort_order);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIdx(index);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIdx(null);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev! > 0 ? prev! - 1 : sortedGallery.length - 1));
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIdx !== null) {
      setActivePhotoIdx((prev) => (prev! < sortedGallery.length - 1 ? prev! + 1 : 0));
    }
  };

  return (
    <section
      id="cute-gallery"
      className="py-20 sm:py-28 px-4 bg-[#FFF5F8] text-[#4A2E35] relative overflow-hidden border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={16} showFlowers={true} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteDaisyFlower className="w-6 h-6" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              {language === 'JW' ? 'POTRET MEMORI MANIS' : 'GALERI FOTO BAHAGIA'}
            </p>
            <CuteDaisyFlower className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {language === 'JW' ? 'Potret Katresnan Manis' : 'Momen Manis Kami'}
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            Kumpulan potret penuh tawa, kehangatan, dan cinta yang merekam indahnya kebersamaan kami berdua:
          </p>
          <CuteFloralDivider />
        </div>

        {/* Polaroid Photo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {sortedGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => handleOpenLightbox(idx)}
              className="bg-white p-2.5 sm:p-3.5 pb-5 sm:pb-6 rounded-2xl border-2 border-[#FFA3B8] shadow-[0_6px_25px_rgba(255,133,162,0.15)] relative cursor-pointer group hover:-translate-y-1.5 hover:rotate-1 hover:border-[#FF5C8D] transition-all"
            >
              {/* Mini Washi Tape on top */}
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 rotate-[-2deg]">
                <WashiTape className="w-16 h-4" color={idx % 2 === 0 ? 'pink' : 'yellow'} />
              </div>

              {/* Photo Frame */}
              <div className="aspect-square rounded-xl overflow-hidden bg-[#FFF0F5] relative mb-2.5">
                <img
                  src={item.image_url}
                  alt={item.caption || `Foto Galeri ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#FF5C8D]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-8 h-8 rounded-full bg-white text-[#FF5C8D] flex items-center justify-center shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Caption or Mini Stamp */}
              <div className="flex items-center justify-between px-1">
                <span className="text-[11px] font-sans font-semibold text-[#6B3E48] truncate">
                  {item.caption || `Momen Manis #${idx + 1}`}
                </span>
                <CuteSakuraFlower className="w-4 h-4 shrink-0 text-[#FF85A2]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseLightbox}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-4 sm:p-6 border-3 border-[#FF85A2] shadow-2xl text-center"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={handleCloseLightbox}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFF0F5] border border-[#FFA3B8] text-[#FF5C8D] hover:bg-[#FFE4EC] flex items-center justify-center transition-colors cursor-pointer z-10"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Top Mascot */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <CuteDaisyFlower className="w-6 h-6" />
                <span className="text-xs font-sans font-bold text-[#FF5C8D] uppercase tracking-wider">
                  Foto {activePhotoIdx + 1} dari {sortedGallery.length}
                </span>
                <CuteDaisyFlower className="w-6 h-6" />
              </div>

              {/* Image Container */}
              <div className="max-h-[65vh] rounded-2xl overflow-hidden bg-[#FFF0F5] flex items-center justify-center relative">
                <img
                  src={sortedGallery[activePhotoIdx].image_url}
                  alt={sortedGallery[activePhotoIdx].caption || 'Foto Galeri'}
                  className="max-h-[65vh] w-auto object-contain rounded-2xl"
                />

                {/* Left / Right Nav Arrows */}
                <button
                  type="button"
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#FF5C8D] border border-[#FFA3B8] flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#FF5C8D] border border-[#FFA3B8] flex items-center justify-center shadow-md transition-all hover:scale-110 cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Caption */}
              <p className="mt-3 font-sans text-xs sm:text-sm font-semibold text-[#4A2E35]">
                {sortedGallery[activePhotoIdx].caption || 'Kenangan Indah Penuh Kasih ♡'}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
