import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen, Quote } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface PastelPopGreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const PastelPopGreetingBanner: React.FC<PastelPopGreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-white via-[#FFF9E6]/60 to-[#FFE5EC]/40 relative overflow-hidden">
      {/* Playful background doodles */}
      <div className="absolute top-4 left-6 text-3xl opacity-40 select-none animate-pulse">
        🌸
      </div>
      <div className="absolute bottom-6 right-8 text-3xl opacity-40 select-none animate-pulse">
        💖
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Cute greeting pill */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFE5EC] border-2 border-[#FF6B8B] text-[#FF6B8B] text-xs font-black uppercase tracking-wider mb-4 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#FFD166] fill-[#FFD166]" />
          <span>SALAM HANGAT &amp; KASIH</span>
          <Heart className="w-3.5 h-3.5 text-[#FF6B8B] fill-[#FF6B8B]" />
        </motion.div>

        {/* Personalized Heading */}
        <h2 className="text-2xl sm:text-4xl font-black text-[#2B2D42] tracking-tight">
          Halo, <span className="text-[#FF6B8B]">{guestName || 'Sahabat & Kerabat Tercinta'}</span>! ♡
        </h2>

        <p className="text-xs sm:text-sm text-[#2B2D42]/80 mt-3 max-w-xl mx-auto leading-relaxed">
          {invitation.greeting_text ||
            'Dengan penuh rasa syukur dan sukacita yang mendalam, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada hari bahagia pernikahan kami.'}
        </p>

        {/* Holy Verse Cloud Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 p-6 sm:p-8 rounded-4xl bg-white border-3 border-[#FFD166] shadow-[8px_8px_0px_0px_#4D96FF] relative text-center"
        >
          <div className="w-10 h-10 mx-auto rounded-full bg-[#FFF9E6] border-2 border-[#FFD166] flex items-center justify-center -mt-11 mb-3 shadow-xs">
            <Quote className="w-4 h-4 text-[#FF6B8B]" />
          </div>

          <p className="font-serif italic text-sm sm:text-base text-[#2B2D42] leading-relaxed max-w-xl mx-auto">
            &ldquo;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&rdquo;
          </p>

          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-[#EDF5FF] border border-[#4D96FF]/40 text-[#4D96FF] text-xs font-bold">
            — Q.S. Ar-Rum: 21
          </div>
        </motion.div>
      </div>
    </section>
  );
};
