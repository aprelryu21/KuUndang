import React from 'react';
import { X, Heart, Sparkles } from 'lucide-react';
import { WeddingInvitation } from '../../../../types/wedding';

interface SeriMalaysiaStoryModalProps {
  wedding: WeddingInvitation;
  onClose: () => void;
}

export const SeriMalaysiaStoryModal: React.FC<SeriMalaysiaStoryModalProps> = ({
  wedding,
  onClose,
}) => {
  const stories = wedding.stories || [];

  const defaultStories = [
    {
      title: 'Awal Pertemuan Manis',
      story_date: '2021',
      description:
        'Pertama kali mata kami saling bertatap di sebuah kedai kopi hangat. Sebuah obrolan sederhana yang berawal dari ketidaksengajaan kini menjadi awal dari takdir seumur hidup.',
      image_url: '/templates/seri-malaysia/cover-garden.jpg',
    },
    {
      title: 'Menjalin Janji Kasih',
      story_date: '2023',
      description:
        'Setelah melewati banyak cerita tawa, saling memahami, dan saling menguatkan, kami memutuskan untuk melangkah bersama dengan niat tulus menyempurnakan separuh agama.',
      image_url: '/templates/seri-malaysia/world-garden.jpg',
    },
    {
      title: 'Menuju Gerbang Sakral',
      story_date: '2026',
      description:
        'Dengan restu kedua orang tua dan doa tulus seluruh sanak saudara, kami siap berlayar mengarungi bahtera rumah tangga yang sakinah, mawaddah, wa rahmah.',
      image_url: '/templates/seri-malaysia/cover-garden.jpg',
    },
  ];

  const displayStories = stories.length > 0 ? stories : defaultStories;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button & ESC hint */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] text-[#7A634F] bg-[#4C030A]/5 px-2 py-1 rounded border border-[#D7BB83]/40">
            Tekan ESC untuk tutup
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>♥ Taman Kenangan Abadi</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Kisah Kasih & Cinta
          </h2>
          <p className="text-sm text-[#7A634F] mt-1 italic">
            Setiap lembaran perjalanan yang mengantarkan dua hati bermuara dalam ikatan suci
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* Timeline Stories */}
        <div className="relative border-l-2 border-[#D7BB83]/60 ml-4 sm:ml-6 space-y-6 sm:space-y-8 my-6">
          {displayStories.map((item, idx) => (
            <div key={idx} className="relative pl-6 sm:pl-8 group">
              {/* Timeline Pin */}
              <div className="absolute -left-[17px] top-1.5 w-8 h-8 rounded-full bg-[#4C030A] border-2 border-[#D7BB83] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Heart className="w-4 h-4 text-[#D7BB83] fill-[#D7BB83]" />
              </div>

              {/* Story Content Card */}
              <div className="p-5 rounded-2xl bg-white/90 border border-[#D7BB83]/40 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-bold text-[#8A1B26] px-2.5 py-0.5 rounded-full bg-[#8A1B26]/10">
                    {item.story_date || (item as any).year || `Momen ${idx + 1}`}
                  </span>
                  <Sparkles className="w-4 h-4 text-[#D7BB83]" />
                </div>

                <h3 
                  className="text-lg sm:text-xl font-bold text-[#4C030A] mb-2"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A3F30] leading-relaxed mb-3">
                  {item.description}
                </p>

                {item.image_url && (
                  <div className="rounded-xl overflow-hidden border border-[#D7BB83]/30 max-h-48 sm:max-h-56 mt-3 bg-[#F4ECD8]">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export const RpgTamanStoryModal = SeriMalaysiaStoryModal;
export default SeriMalaysiaStoryModal;
