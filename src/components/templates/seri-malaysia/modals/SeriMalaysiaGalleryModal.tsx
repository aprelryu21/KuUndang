import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { WeddingInvitation } from '../../../../types/wedding';

interface SeriMalaysiaGalleryModalProps {
  wedding: WeddingInvitation;
  onClose: () => void;
}

export const SeriMalaysiaGalleryModal: React.FC<SeriMalaysiaGalleryModalProps> = ({
  wedding,
  onClose,
}) => {
  const galleries = wedding.galleries || [];
  const defaultGalleries = [
    { image_url: '/templates/seri-malaysia/cover-garden.jpg', caption: 'Kisah Kasih di Pelaminan' },
    { image_url: 'https://lh3.googleusercontent.com/d/1qr9VPrFkya17qAU_kLtpYBLSktn3mBzG', caption: 'Mempelai Pria' },
    { image_url: 'https://lh3.googleusercontent.com/d/17Mkq-ytzCKMJSM5jYUwfosOabtLLdUJz', caption: 'Mempelai Wanita' },
    { image_url: '/templates/seri-malaysia/world-garden.jpg', caption: 'Taman Asri & Berkat' },
  ];

  const photos = galleries.length > 0 ? galleries : defaultGalleries;
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const handlePrev = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! > 0 ? prev! - 1 : photos.length - 1));
  };

  const handleNext = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev! < photos.length - 1 ? prev! + 1 : 0));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>📷 Gazebo Album & Potret</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Galeri Kenangan Indah
          </h2>
          <p className="text-sm text-[#7A634F] mt-1">
            Momen-momen manis yang terekam dalam bingkai penuh kebahagiaan
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 my-6">
          {photos.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedIdx(idx)}
              className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer border-2 border-[#D7BB83]/40 bg-[#F4ECD8] shadow-sm hover:shadow-md transition-all hover:scale-[1.02]"
            >
              <img
                src={item.image_url}
                alt={item.caption || `Foto Galeri ${idx + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <ImageIcon className="w-6 h-6 text-[#D7BB83]" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedIdx !== null && (
          <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedIdx(null)}
              className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-white/10"
              aria-label="Tutup Lightbox"
            >
              <X className="w-8 h-8 text-[#D7BB83]" />
            </button>

            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/80"
              aria-label="Foto Sebelumnya"
            >
              <ChevronLeft className="w-8 h-8 text-[#D7BB83]" />
            </button>

            <div className="max-w-3xl max-h-[80vh] flex flex-col items-center">
              <img
                src={photos[selectedIdx].image_url}
                alt="Detail Foto"
                className="max-h-[70vh] w-auto max-w-full rounded-2xl border-2 border-[#D7BB83] object-contain shadow-2xl"
              />
              {photos[selectedIdx].caption && (
                <p className="text-[#FFFCF3] text-sm mt-3 text-center italic">
                  {photos[selectedIdx].caption}
                </p>
              )}
            </div>

            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white p-2 rounded-full bg-black/50 hover:bg-black/80"
              aria-label="Foto Berikutnya"
            >
              <ChevronRight className="w-8 h-8 text-[#D7BB83]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
