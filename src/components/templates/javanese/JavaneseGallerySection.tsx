import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GalleryItem } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
  JavaneseGebyokArch,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { Eye, X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';

interface JavaneseGallerySectionProps {
  gallery: GalleryItem[];
}

export const JavaneseGallerySection: React.FC<JavaneseGallerySectionProps> = ({ gallery }) => {
  const { t, language } = useLanguage();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Fallback demo photos if gallery is empty
  const displayPhotos =
    gallery && gallery.length > 0
      ? gallery
      : [
          {
            id: 'g-1',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1200&auto=format&fit=crop',
            caption: 'Busana Paes Ageng & Beskap Kasultanan Jawa',
            sort_order: 1,
          },
          {
            id: 'g-2',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1200&auto=format&fit=crop',
            caption: 'Prasetyaning Ati Menuju Pelaminan Suci',
            sort_order: 2,
          },
          {
            id: 'g-3',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1200&auto=format&fit=crop',
            caption: 'Gegandhengan Asta Ing Pelataran Keraton',
            sort_order: 3,
          },
          {
            id: 'g-4',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop',
            caption: 'Tulus Asih Sesarengan Mengarungi Samudra Waktu',
            sort_order: 4,
          },
          {
            id: 'g-5',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?q=80&w=1200&auto=format&fit=crop',
            caption: 'Kaendahan Kebaya Beludru Berprada Emas',
            sort_order: 5,
          },
          {
            id: 'g-6',
            invitation_id: 'inv-1',
            image_url:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop',
            caption: 'Wibawa Busana Jawi Jangkep',
            sort_order: 6,
          },
        ];

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % displayPhotos.length);
    }
  };
  const prevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(
        (lightboxIndex - 1 + displayPhotos.length) % displayPhotos.length
      );
    }
  };

  return (
    <section
      id="javanese-gallery"
      className="py-20 sm:py-28 px-4 bg-[#180E07] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at top, #2C1810 0%, #180E07 65%, #0F0804 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />
      <JavaneseGoldenParticles count={18} showJasminePetals={true} />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <JavaneseGebyokArch className="w-56 mx-auto mb-2 text-[#D4AF37]/80" />
          <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'PASINAON POTRET ENDAH' : 'GALERI KENANGAN BAHAGIA'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
            {language === 'JW' ? 'Galeri Kenangan' : 'Potret Kenangan Indah'}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
            {language === 'JW'
              ? 'Reroncen foto kenangan endah ingkang kasimpen ing bingkai katresnan temanten kakung lan putri.'
              : 'Momen-momen bahagia yang diabadikan dalam balutan busana adat Jawa bernuansa sakral nan anggun.'}
          </p>
          <JavaneseDivider className="my-4" />
        </div>

        {/* Gallery Grid with Ornate Javanese Carved Teak & Gold Frames */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-6">
          {displayPhotos.map((item, idx) => (
            <motion.div
              key={item.id || idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              onClick={() => openLightbox(idx)}
              className="group cursor-pointer p-3 sm:p-3.5 bg-gradient-to-b from-[#381D0F] via-[#24130A] to-[#160904] border-2 border-[#D4AF37] ring-1 ring-[#8A6715]/60 rounded-2xl shadow-[0_12px_35px_rgba(0,0,0,0.85)] hover:border-[#F3DE9A] hover:ring-[#E5C158] transition-all relative flex flex-col justify-between"
            >
              {/* Four Ornate Javanese Gold Corner Flourishes on the Carved Frame */}
              <div className="absolute top-1.5 left-1.5 z-20 pointer-events-none">
                <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F3DE9A] transition-colors" />
              </div>
              <div className="absolute top-1.5 right-1.5 rotate-90 z-20 pointer-events-none">
                <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F3DE9A] transition-colors" />
              </div>
              <div className="absolute bottom-1.5 left-1.5 -rotate-90 z-20 pointer-events-none">
                <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F3DE9A] transition-colors" />
              </div>
              <div className="absolute bottom-1.5 right-1.5 rotate-180 z-20 pointer-events-none">
                <JavaneseCornerFlourish className="w-6 h-6 text-[#D4AF37] group-hover:text-[#F3DE9A] transition-colors" />
              </div>

              {/* Top Carved Wood Ukir Ornament Accent */}
              <div className="text-center py-1 flex items-center justify-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] text-[#D4AF37]">❖</span>
                <span className="text-[9px] font-serif uppercase tracking-[0.25em] text-[#E5C158] font-bold">
                  BINGKAI UKIR KERATON
                </span>
                <span className="text-[10px] text-[#D4AF37]">❖</span>
              </div>

              {/* Inner Photo Container with Gold Trim */}
              <div className="relative aspect-4/5 overflow-hidden rounded-xl border border-[#D4AF37]/50 bg-[#120803] shadow-inner">
                <img
                  src={item.image_url}
                  alt={item.caption || 'Foto Kenangan'}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                />

                {/* Subtle Javanese Vignette */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#160A04]/90 via-transparent to-[#160A04]/20 opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Mirsani Foto Pill */}
                <div className="absolute bottom-3 inset-x-3 text-center">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1A1009]/95 border border-[#D4AF37] text-[11px] font-serif text-[#E5C158] backdrop-blur-sm shadow-md group-hover:scale-105 transition-transform">
                    <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>{language === 'JW' ? 'Mirsani Foto' : 'Perbesar Foto'}</span>
                  </span>
                </div>
              </div>

              {/* Royal Plaque Caption */}
              <div className="mt-2.5 p-2 rounded-lg bg-[#180C06] border border-[#D4AF37]/40 text-center">
                <p className="text-xs font-serif text-[#FAF6EE]/95 line-clamp-1 italic">
                  {item.caption || 'Potret Kagungan Kasultanan'}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full bg-[#24160E] border border-[#D4AF37] text-[#D4AF37] hover:text-[#FAF6EE] cursor-pointer z-10"
              aria-label="Tutup"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prevPhoto();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#24160E]/80 border border-[#D4AF37] text-[#D4AF37] hover:text-[#FAF6EE] cursor-pointer z-10"
              aria-label="Sebelumnya"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                nextPhoto();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-[#24160E]/80 border border-[#D4AF37] text-[#D4AF37] hover:text-[#FAF6EE] cursor-pointer z-10"
              aria-label="Berikutnya"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Main Lightbox Card */}
            <div
              className="relative max-w-3xl max-h-[85vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                <img
                  src={displayPhotos[lightboxIndex].image_url}
                  alt={displayPhotos[lightboxIndex].caption || 'Foto Galeri'}
                  className="max-h-[75vh] w-auto object-contain rounded-lg"
                />
              </div>

              {displayPhotos[lightboxIndex].caption && (
                <div className="mt-3 text-center px-4 py-1.5 rounded-full bg-[#24160E] border border-[#D4AF37]/50 text-xs font-serif text-[#E5C158]">
                  {displayPhotos[lightboxIndex].caption}
                </div>
              )}

              <div className="text-[11px] font-serif text-[#FAF6EE]/60 mt-2">
                {lightboxIndex + 1} / {displayPhotos.length}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
