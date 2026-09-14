import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2, Sparkles } from 'lucide-react';
import { GalleryItem, SectionSetting } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { FloatingPetalsOverlay } from './FloatingPetalsOverlay';

interface GallerySectionProps {
  gallery: GalleryItem[];
  section?: SectionSetting;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ gallery, section }) => {
  const { t } = useLanguage();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const handleOpenLightbox = (index: number) => {
    setActivePhotoIndex(index);
  };

  const handleCloseLightbox = () => {
    setActivePhotoIndex(null);
  };

  const handleNext = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % gallery.length);
  }, [activePhotoIndex, gallery.length]);

  const handlePrev = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + gallery.length) % gallery.length);
  }, [activePhotoIndex, gallery.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activePhotoIndex === null) return;
      if (e.key === 'Escape') handleCloseLightbox();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex, handleNext, handlePrev]);

  // Mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) handleNext();
    if (diff < -50) handlePrev();
    setTouchStart(null);
  };

  return (
    <section id="gallery" className="py-20 px-6 bg-[#EFE8DE] text-[#24313A] relative overflow-hidden">
      {/* Background Falling Petals & Hearts - Strictly Behind Gallery Content */}
      <FloatingPetalsOverlay className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center">
        <div className="mb-14">
          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#C2A56B] capitalize tracking-wide font-normal leading-tight">
            {section?.title || t.photoGallery}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {section?.subtitle || t.photoGallerySubtitle}
          </p>
        </div>

        {/* Editorial Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-5">
          {gallery.map((photo, index) => {
            const isFeatured = photo.featured || index === 0;

            return (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                onClick={() => handleOpenLightbox(index)}
                className={`relative group cursor-pointer overflow-hidden rounded-2xl border-2 border-[#FFFCF7] shadow-sm bg-[#FFFCF7] ${
                  isFeatured ? 'col-span-2 row-span-2 h-72 sm:h-96' : 'h-44 sm:h-60'
                }`}
              >
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Wedding Photo'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Subtle Hover Overlay with caption */}
                <div className="absolute inset-0 bg-[#24313A]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 text-left text-[#FFFCF7]">
                  <div className="flex items-center justify-between">
                    <p className="text-xs sm:text-sm font-medium truncate drop-shadow">
                      {photo.caption || 'The Wedding of Shofwan & Allya'}
                    </p>
                    <Maximize2 className="w-4 h-4 text-[#DFBFC1] shrink-0" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-[#1A2228]/95 backdrop-blur-md flex items-center justify-center p-4"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleCloseLightbox}
              className="absolute top-5 right-5 p-2 rounded-full bg-[#FFFCF7]/15 hover:bg-[#FFFCF7]/30 text-[#FFFCF7] transition-colors z-50 cursor-pointer"
              aria-label="Tutup foto"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Counter */}
            <div className="absolute top-6 left-6 text-[#DFBFC1] text-xs font-semibold tracking-widest uppercase">
              {activePhotoIndex + 1} / {gallery.length}
            </div>

            {/* Prev Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/25 text-[#FFFCF7] transition-colors z-40 cursor-pointer"
              aria-label="Foto sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Active Image */}
            <div className="max-w-4xl max-h-[80vh] flex flex-col items-center">
              <motion.img
                key={activePhotoIndex}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={gallery[activePhotoIndex].image_url}
                alt={gallery[activePhotoIndex].caption || 'Wedding Photo'}
                className="max-w-full max-h-[75vh] object-contain rounded-xl shadow-2xl border border-white/10"
              />

              {gallery[activePhotoIndex].caption && (
                <p className="mt-3 text-xs sm:text-sm text-[#DFBFC1] text-center font-serif italic">
                  "{gallery[activePhotoIndex].caption}"
                </p>
              )}
            </div>

            {/* Next Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#FFFCF7]/10 hover:bg-[#FFFCF7]/25 text-[#FFFCF7] transition-colors z-40 cursor-pointer"
              aria-label="Foto berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
