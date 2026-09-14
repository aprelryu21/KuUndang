import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Heart } from 'lucide-react';
import { Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  GununganWayangSvg,
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
} from './javaneseAssets';

interface JavaneseGreetingBannerProps {
  guestName: string;
  invitation: Invitation;
}

export const JavaneseGreetingBanner: React.FC<JavaneseGreetingBannerProps> = ({
  guestName,
  invitation,
}) => {
  const { language } = useLanguage();
  const displayName = guestName.trim() || 'Tamu Terhormat';

  // Javanese and Indonesian honorifics
  const honorificText =
    language === 'JW'
      ? 'Dhumateng Panjenenganipun Bp/Ibu/Sedherek:'
      : 'Kepada Yang Terhormat Bapak/Ibu/Saudara/i:';

  const subtitleText =
    language === 'JW'
      ? 'Kanthi memuji asmaning Gusti Ingkang Maha Welas Asih, keparenga kula sakulawarga ngaturaken sugeng rawuh.'
      : 'Dengan memanjatkan puji dan syukur ke hadirat Tuhan Yang Maha Esa, kami sekeluarga menyampaikan selamat datang.';

  const blessingText =
    invitation.greeting_text && invitation.greeting_text !== "We're so happy you're here ♡"
      ? invitation.greeting_text
      : language === 'JW'
      ? 'Mugi Gusti paring berkah saha kanikmatan dhumateng sedaya rawuh panjenengan. Rawuh panjenengan minangka pakurmatan saha bingahing manah kagem kula sakulawarga.'
      : 'Merupakan suatu kehormatan dan kebahagiaan yang mendalam bagi kami sekeluarga apabila Bapak/Ibu/Saudara/i berkenan hadir serta melimpahkan doa restu bagi kedua mempelai.';

  return (
    <section
      id="javanese-greeting"
      className="relative py-10 sm:py-14 px-4 bg-[#140B05] text-[#FAF6EE] text-center border-b border-[#D4AF37]/40 overflow-hidden"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #26140B 0%, #140B05 70%, #0A0502 100%)',
      }}
    >
      {/* Background Batik Kawung Texture */}
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-10" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Ceremonial Gold Box Container */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative bg-[#1E110A]/90 border-2 border-[#D4AF37] rounded-2xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.8)] backdrop-blur-xs"
        >
          {/* Corner Flourishes */}
          <div className="absolute top-2.5 left-2.5">
            <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="absolute top-2.5 right-2.5 rotate-90">
            <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="absolute bottom-2.5 left-2.5 -rotate-90">
            <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
          </div>
          <div className="absolute bottom-2.5 right-2.5 rotate-180">
            <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
          </div>

          {/* Gunungan Icon Badge */}
          <div className="flex justify-center mb-3">
            <GununganWayangSvg className="w-10 h-16 sm:w-12 sm:h-20 text-[#D4AF37]" />
          </div>

          {/* Script Tag */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#E5C158] text-[11px] sm:text-xs font-serif tracking-widest uppercase mb-2">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
            <span>PAHARGYAN RAWUH // ꦱꦸꦒꦼꦁꦫꦮꦸꦃ</span>
            <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          </div>

          {/* Honorific */}
          <p className="font-serif text-xs sm:text-sm text-[#D4AF37] tracking-wider uppercase mt-1">
            {honorificText}
          </p>

          {/* Recipient's Name in Sacred Keraton Gold */}
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-bold tracking-wide text-[#FAF6EE] mt-2 mb-1 drop-shadow-sm">
            {displayName}
          </h2>

          <p className="text-[11px] sm:text-xs text-[#FAF6EE]/75 italic font-serif max-w-lg mx-auto mt-2">
            {subtitleText}
          </p>

          {/* Traditional Javanese Divider */}
          <div className="my-4">
            <JavaneseDivider className="w-44 sm:w-60 mx-auto text-[#D4AF37]/80" />
          </div>

          {/* Blessing Message */}
          <p className="text-xs sm:text-sm font-serif text-[#FAF6EE]/90 leading-relaxed max-w-lg mx-auto">
            &ldquo;{blessingText}&rdquo;
          </p>

          <div className="mt-4 flex items-center justify-center gap-2 text-[#D4AF37]/70 text-[11px] font-serif">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]/40 text-[#D4AF37]" />
            <span>Nyuwun Pangestu &amp; Berkah Rawuh</span>
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]/40 text-[#D4AF37]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
