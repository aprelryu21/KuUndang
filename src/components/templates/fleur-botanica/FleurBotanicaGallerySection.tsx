import React, { useState } from 'react';
import { GalleryItem } from '../../../types/wedding';
import { HeirloomDivider } from './fleurBotanicaAssets';
import { Eye, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface FleurBotanicaGallerySectionProps {
  gallery: GalleryItem[];
}

export const FleurBotanicaGallerySection: React.FC<FleurBotanicaGallerySectionProps> = ({ gallery }) => {
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  // High quality sample photos if gallery is empty
  const displayPhotos = gallery && gallery.length > 0
    ? gallery
    : [
        {
          id: 'g1',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKD6DWD0JK1SMRJNC26S3.png',
          caption: 'Prewedding Moments I',
        },
        {
          id: 'g2',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKFE2Y00WJYYFE5JXY3AY.png',
          caption: 'Prewedding Moments II',
        },
        {
          id: 'g3',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKGBVQJNDBTXCGWB7YFD6.png',
          caption: 'Prewedding Moments III',
        },
        {
          id: 'g4',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKHB0E5ZMVCH2FCCX5TMN.png',
          caption: 'Prewedding Moments IV',
        },
        {
          id: 'g5',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKD8RKTPGHNXE1ZBSG2D2.png',
          caption: 'Prewedding Moments V',
        },
        {
          id: 'g6',
          image_url:
            'https://assets-staging.inveet.id/user-assets/3/01M0QTKCZ3QXNDBM11SR2665K5.png',
          caption: 'Prewedding Moments VI',
        },
      ];

  return (
    <section id="fleur-gallery" className="relative py-20 sm:py-28 px-4 bg-[#F5F2EB] text-[#293522] overflow-hidden scroll-mt-14">
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            GALERI KENANGAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
            Momen Berbahagia
          </h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
            Potret bahagia perjalanan cinta kami dalam mengukir kisah indah menuju gerbang pelaminan.
          </p>
          <HeirloomDivider className="my-4" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-6">
          {displayPhotos.map((photo, idx) => (
            <div
              key={photo.id || idx}
              onClick={() => setActivePhoto(photo.image_url)}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden bg-white p-2 border border-[#BDA06C]/50 shadow-[0_8px_25px_rgba(41,53,34,0.06)] cursor-pointer hover:border-[#BDA06C] transition-all hover:scale-102"
            >
              <div className="w-full h-full rounded-xl overflow-hidden bg-stone-100">
                <img
                  src={photo.image_url}
                  alt={photo.caption || 'Foto Galeri'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>

              {/* Hover overlay with eye icon */}
              <div className="absolute inset-0 bg-[#1E2A20]/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-2xl">
                <div className="w-10 h-10 rounded-full bg-white text-[#293522] flex items-center justify-center shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                  <Eye className="w-5 h-5 text-[#BDA06C]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <div
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-xs select-none"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-2xl w-full p-3 bg-white border-2 border-[#BDA06C] rounded-3xl shadow-2xl"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-[#293522] text-[#FAF8F5] flex items-center justify-center border-2 border-white shadow-md hover:bg-[#1E2A20] transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[75vh] overflow-hidden rounded-2xl bg-black flex items-center justify-center">
                <img
                  src={activePhoto}
                  alt="Foto Galeri Penuh"
                  className="max-h-[75vh] w-full object-contain rounded-2xl"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
