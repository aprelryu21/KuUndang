import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowUp, Smile } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface PastelPopClosingSectionProps {
  invitation: Invitation;
  onBackToCover: () => void;
}

export const PastelPopClosingSection: React.FC<PastelPopClosingSectionProps> = ({
  invitation,
  onBackToCover,
}) => {
  return (
    <footer className="py-20 sm:py-28 bg-gradient-to-b from-[#FFF9E6]/60 via-[#FFE5EC]/50 to-[#EDF5FF] relative overflow-hidden text-center">
      {/* Decorative floating stickers */}
      <div className="absolute top-10 left-10 text-4xl select-none animate-bounce" style={{ animationDuration: '3.6s' }}>
        🌸
      </div>
      <div className="absolute bottom-10 right-10 text-4xl select-none animate-bounce" style={{ animationDuration: '4.2s' }}>
        💖
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-4xl border-4 border-[#2B2D42] shadow-[10px_10px_0px_0px_#FFD166] p-8 sm:p-12 space-y-6"
        >
          {/* Top Heart Badge */}
          <div className="w-16 h-16 mx-auto rounded-full bg-[#FFE5EC] border-3 border-[#FF6B8B] flex items-center justify-center shadow-md">
            <Heart className="w-8 h-8 text-[#FF6B8B] fill-[#FF6B8B]" />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#2B2D42]">
            Terima Kasih Atas Doa &amp; Kehadirannya ♡
          </h2>

          <p className="text-xs sm:text-sm text-[#2B2D42]/80 leading-relaxed max-w-md mx-auto">
            {invitation.closing_message ||
              'Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu.'}
          </p>

          <div className="pt-4 border-t-2 border-[#2B2D42]/10">
            <p className="text-xs font-bold uppercase tracking-widest text-[#FF6B8B]">
              KAMI YANG BERBAHAGIA
            </p>
            <h3 className="text-2xl sm:text-3xl font-black text-[#2B2D42] mt-1">
              {invitation.bride_nickname || 'Mempelai Wanita'} &amp; {invitation.groom_nickname || 'Mempelai Pria'}
            </h3>
            <p className="text-xs text-[#2B2D42]/60 mt-1">
              Beserta Seluruh Keluarga Besar
            </p>
          </div>

          {/* Return to Cover Button */}
          <div className="pt-4">
            <button
              type="button"
              onClick={onBackToCover}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#FF6B8B] hover:bg-[#FF5277] text-white border-2 border-[#2B2D42] shadow-[4px_4px_0px_0px_#2B2D42] text-xs font-black transition-all cursor-pointer hover:scale-105"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Buka Kembali Sampul Awal</span>
              <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
            </button>
          </div>
        </motion.div>

        {/* Small Made with Love tag */}
        <p className="text-[11px] font-bold text-[#2B2D42]/50 mt-8 flex items-center justify-center gap-1">
          <span>Dibuat dengan penuh cinta &amp; sukacita</span>
          <Smile className="w-3.5 h-3.5 text-[#FF6B8B]" />
        </p>
      </div>
    </footer>
  );
};
