import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GalleryItem } from '../../../types/wedding';

interface Persona3GallerySectionProps {
  gallery: GalleryItem[];
}

export const Persona3GallerySection: React.FC<Persona3GallerySectionProps> = ({ gallery }) => {
  const [activePhotoIdx, setActivePhotoIdx] = useState<number | null>(null);

  const sortedGallery = [...gallery].sort((a, b) => a.sort_order - b.sort_order);

  const openModal = (idx: number) => setActivePhotoIdx(idx);
  const closeModal = () => setActivePhotoIdx(null);

  const nextPhoto = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx + 1) % sortedGallery.length);
  };

  const prevPhoto = () => {
    if (activePhotoIdx === null) return;
    setActivePhotoIdx((activePhotoIdx - 1 + sortedGallery.length) % sortedGallery.length);
  };

  return (
    <section id="galeri" className="py-20 sm:py-28 bg-[#070E22] text-[#F0F8FF] relative overflow-hidden border-t-2 border-[#00D2FF]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Camera className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>ALL-OUT ATTACK // MEMORY ARCHIVES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Galeri Momen Bahagia
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // VISUAL COGNITION SNAPSHOTS & PORTRAITS
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {sortedGallery.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => openModal(idx)}
              className="group relative rounded-2xl overflow-hidden border-2 border-[#00D2FF]/50 hover:border-[#FFE600] shadow-[0_0_15px_rgba(0,210,255,0.2)] hover:shadow-[0_0_20px_rgba(255,230,0,0.3)] cursor-pointer bg-[#050B18] transform hover:-translate-y-1 transition-all"
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={item.image_url}
                  alt={item.caption || `Momen ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-[#070E22]/40 group-hover:bg-transparent transition-colors" />

                {/* Persona Cut-in Frame corner badge */}
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-xs bg-[#050B18]/80 border border-[#00D2FF] text-[8px] font-mono text-[#00D2FF] uppercase font-bold">
                  REC #{String(idx + 1).padStart(2, '0')}
                </div>

                <div className="absolute bottom-2 right-2 p-1.5 rounded-lg bg-[#FFE600] text-[#050B18] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Eye className="w-3.5 h-3.5" />
                </div>
              </div>

              {item.caption && (
                <div className="p-2.5 bg-[#081226] border-t border-[#00D2FF]/30 text-center">
                  <p className="text-[11px] font-sans font-medium text-[#D0E2F5] truncate">
                    {item.caption}
                  </p>
                </div>
              )}
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
            className="fixed inset-0 z-50 bg-[#050B18]/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <div
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeModal}
                className="absolute -top-12 right-0 p-2 text-white hover:text-[#FFE600] cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="relative rounded-2xl overflow-hidden border-2 border-[#00D2FF] shadow-[0_0_30px_rgba(0,210,255,0.4)] bg-[#050B18]">
                <img
                  src={sortedGallery[activePhotoIdx].image_url}
                  alt={sortedGallery[activePhotoIdx].caption || 'Momen'}
                  referrerPolicy="no-referrer"
                  className="max-h-[75vh] w-auto object-contain mx-auto"
                />
              </div>

              {sortedGallery[activePhotoIdx].caption && (
                <p className="mt-4 text-center font-mono text-sm text-[#FFE600] font-bold">
                  {sortedGallery[activePhotoIdx].caption}
                </p>
              )}

              {/* Prev / Next controls */}
              <button
                type="button"
                onClick={prevPhoto}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0E1E42] border border-[#00D2FF] text-[#00D2FF] hover:text-[#FFE600] cursor-pointer"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={nextPhoto}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[#0E1E42] border border-[#00D2FF] text-[#00D2FF] hover:text-[#FFE600] cursor-pointer"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
