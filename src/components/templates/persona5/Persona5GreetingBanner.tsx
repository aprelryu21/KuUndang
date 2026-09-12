import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Flame, Quote } from 'lucide-react';
import { Invitation } from '../../../types/wedding';

interface Persona5GreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const Persona5GreetingBanner: React.FC<Persona5GreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  const displayName = guestName.trim() || 'Tamu Terhormat';

  return (
    <section
      id="p5-greeting"
      className="py-12 sm:py-16 px-4 sm:px-6 bg-[#000000] text-[#FFFFFF] relative overflow-hidden border-b-4 border-[#E60012]"
    >
      {/* Halftone / Comic dots overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#FFF000 1.5px, transparent 1.5px)`,
            backgroundSize: '20px 20px',
          }}
        />
      </div>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        {/* Calling Card Recipient Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-block bg-[#16161A] border-2 border-[#FFFFFF] p-6 sm:p-8 -skew-x-3 shadow-[8px_8px_0px_0px_#E60012] text-left max-w-xl w-full mx-auto"
        >
          <div className="flex items-center justify-between mb-3 border-b border-white/20 pb-2">
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#FFF000] fill-[#FFF000]" />
              <span className="text-[10px] font-mono font-bold tracking-[0.25em] text-[#FFF000] uppercase">
                HONORED RECIPIENT
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/50">CODE: P5-INV-01</span>
          </div>

          <p className="text-xs font-mono text-white/70 uppercase">KEPADA YANG TERHORMAT:</p>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mt-1 text-[#FFF000]">
            {displayName}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-white/90 mt-3 leading-relaxed border-l-2 border-[#E60012] pl-3 italic">
            &quot;{invitation.greeting_text || "We're so happy you're here ♡"}&quot;
          </p>

          {/* Ar-Rum 21 Holy Verse in Persona Comic Box */}
          <div className="mt-5 p-4 bg-[#0D0D0D] border border-white/30 text-xs leading-relaxed font-mono text-white/80">
            <div className="flex items-center gap-1.5 text-[#FFF000] font-bold text-[10px] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>QS. AR-RUM : 21 // SACRED COGNITION</span>
            </div>
            <p className="italic text-white/90 text-[11px] sm:text-xs">
              &quot;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
