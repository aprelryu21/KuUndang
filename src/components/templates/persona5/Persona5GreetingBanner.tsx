import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Star } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona5GreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const Persona5GreetingBanner: React.FC<Persona5GreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  const { t, language } = useLanguage();
  const displayName = guestName.trim() || t.honoredGuest || 'Tamu Terhormat';

  // Holy verse translations
  const holyVerseByLang: Record<string, { ref: string; text: string }> = {
    ID: {
      ref: 'QS. AR-RUM : 21 // SACRED COGNITION',
      text: 'Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.',
    },
    JW: {
      ref: 'QS. AR-RUM : 21 // SACRED COGNITION',
      text: 'Lan ing antarane pratandha panguwasa-Ne, yaiku Panjenengane nyiptakake jodho kanggo sira saka jinisira dhewe, supaya sira rumangsa ayem tentrem, lan ndadekake rasa tresna lan welas asih ing antarane sira.',
    },
    EN: {
      ref: 'SURAH AR-RUM : 21 // SACRED COGNITION',
      text: 'And among His signs is that He created for you mates from among yourselves that you may find tranquility in them; and He placed between you affection and mercy.',
    },
    JP: {
      ref: '聖クルアーン ルーム章 21節 // SACRED COGNITION',
      text: 'またかれの御印の一つは、あなたがた自身からあなたがたのために配偶者を創られ、あなたがたがそれによって安らぎを得られるようにし、またあなたがたの間に愛と慈悲を置かれたことである。',
    },
    CN: {
      ref: '古兰经 罗马章 第21节 // SACRED COGNITION',
      text: '他的一种迹象是：他从你们的同类中为你们创造配偶，以便你们依恋她们，并且使你们互相爱悦，互相怜恤。',
    },
  };

  const currentVerse = holyVerseByLang[language] || holyVerseByLang.ID;

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
                {t.p5?.recipientTag || 'HONORED RECIPIENT'}
              </span>
            </div>
            <span className="text-[10px] font-mono text-white/50">CODE: P5-INV-01</span>
          </div>

          <p className="text-xs font-mono text-white/70 uppercase">
            {t.dearGuest || 'KEPADA YANG TERHORMAT:'}
          </p>
          <h2 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-wide mt-1 text-[#FFF000]">
            {displayName}
          </h2>

          <p className="text-xs sm:text-sm font-mono text-white/90 mt-3 leading-relaxed border-l-2 border-[#E60012] pl-3 italic">
            &quot;{t.invitationGreeting || invitation.greeting_text || "We're so happy you're here ♡"}&quot;
          </p>

          {/* Ar-Rum 21 Holy Verse in Persona Comic Box */}
          <div className="mt-5 p-4 bg-[#0D0D0D] border border-white/30 text-xs leading-relaxed font-mono text-white/80">
            <div className="flex items-center gap-1.5 text-[#FFF000] font-bold text-[10px] uppercase tracking-wider mb-1.5">
              <Sparkles className="w-3 h-3" />
              <span>{currentVerse.ref}</span>
            </div>
            <p className="italic text-white/90 text-[11px] sm:text-xs">
              &quot;{currentVerse.text}&quot;
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
