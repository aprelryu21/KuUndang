import React from 'react';
import { motion } from 'motion/react';
import { Invitation, Couple } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  GununganWayangSvg,
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
} from './javaneseAssets';
import { ArrowUp, Heart } from 'lucide-react';

interface JavaneseClosingSectionProps {
  invitation: Invitation;
  bride: Couple;
  groom: Couple;
  onBackToCover: () => void;
}

export const JavaneseClosingSection: React.FC<JavaneseClosingSectionProps> = ({
  invitation,
  bride,
  groom,
  onBackToCover,
}) => {
  const { t, language } = useLanguage();

  return (
    <section
      id="javanese-closing"
      className="py-20 sm:py-28 px-4 bg-[#140C06] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/40 text-center"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at bottom, #2C1810 0%, #140C06 70%, #0D0704 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />

      <div className="max-w-4xl mx-auto relative z-10 space-y-8">
        {/* Gunungan Silhouette */}
        <div className="flex justify-center">
          <GununganWayangSvg className="w-20 h-28 sm:w-24 sm:h-32 filter drop-shadow-[0_4px_16px_rgba(212,175,55,0.4)]" />
        </div>

        {/* Aksara Jawa & Pambagyaharja Title */}
        <div>
          <p className="font-serif text-sm text-[#E5C158] tracking-widest opacity-90">
            ꦩꦠꦸꦂꦤꦸꦮꦸꦤ꧀ꦱꦔꦼꦠ꧀
          </p>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold tracking-wide text-[#FAF6EE] mt-1">
            {language === 'JW' ? 'Atur Panuwun & Pambagyaharja' : 'Ungkapan Terima Kasih'}
          </h2>
        </div>

        <JavaneseDivider />

        {/* Meaningful Closing Message */}
        <div className="max-w-2xl mx-auto space-y-4 px-4 font-serif text-xs sm:text-sm text-[#FAF6EE]/85 leading-relaxed">
          <p>
            {language === 'JW'
              ? 'Mawantu-wantu agenging panyuwun kula sakeluwarga, bilih para rawuh kepareng rawuh saha maringi berkah pangestu dhumateng pinanganten kekalih. Mugi Gusti Ingkang Maha Agung tansah ngluberaken karaharjan, kasarasan, saha kabingahan kagem panjenengan sedaya.'
              : 'Merupakan suatu kehormatan dan kebahagiaan yang tak terhingga bagi kami sekeluarga, apabila Bapak/Ibu/Saudara/i berkenan hadir serta melimpahkan doa restu bagi kedua mempelai. Semoga Allah SWT membalas segala kebaikan dengan rahmat dan keberkahan yang berlipat ganda.'}
          </p>
          <p className="italic text-[#E5C158]">
            “Wassalāmu‘alaikum Warahmatullāhi Wabarakātuh”
          </p>
        </div>

        {/* Big Families Honor Lineage */}
        <div className="pt-6 max-w-xl mx-auto p-6 rounded-2xl bg-[#1E110A]/90 border border-[#D4AF37]/50 shadow-md space-y-4">
          <p className="text-[11px] font-serif uppercase tracking-widest text-[#D4AF37]">
            {language === 'JW' ? 'Ingkang Hamengku Gati (Kulawarga Ageng):' : 'Keluarga Besar yang Berbahagia:'}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-serif text-[#FAF6EE]">
            <div>
              <p className="text-[11px] text-[#D4AF37]/80">Kulawarga Mempelai Putri:</p>
              <p className="font-bold text-sm text-[#E5C158] mt-0.5">
                Bpk. {bride.father_name} & Ibu {bride.mother_name}
              </p>
              <p className="text-[10px] text-[#FAF6EE]/60">Krembung, Sidoarjo</p>
            </div>
            <div>
              <p className="text-[11px] text-[#D4AF37]/80">Kulawarga Mempelai Pria:</p>
              <p className="font-bold text-sm text-[#E5C158] mt-0.5">
                Bpk. {groom.father_name} & Ibu {groom.mother_name}
              </p>
              <p className="text-[10px] text-[#FAF6EE]/60">Papar, Kediri</p>
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-serif text-[#FAF6EE]/75">Beserta Mempelai:</p>
            <p className="font-serif text-lg font-bold text-[#E5C158]">
              {invitation.groom_nickname} & {invitation.bride_nickname}
            </p>
          </div>
        </div>

        {/* Back to Cover Button */}
        <div className="pt-6">
          <button
            type="button"
            onClick={onBackToCover}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#1E110A] hover:bg-[#2C1810] border border-[#D4AF37]/70 text-[#E5C158] font-serif text-xs uppercase tracking-widest transition-all hover:scale-105 cursor-pointer shadow-md"
          >
            <ArrowUp className="w-4 h-4 text-[#D4AF37]" />
            <span>{language === 'JW' ? 'Wangsul Dhumateng Gapura Ulem' : 'Kembali ke Sampul Depan'}</span>
          </button>
        </div>

        {/* Subtle Watermark */}
        <div className="pt-10 text-[10px] font-serif text-[#FAF6EE]/40 tracking-wider">
          ❖ KU UNDANG — KREASI TRADISIONAL ADAT JAWA SAKRAL ❖
        </div>
      </div>
    </section>
  );
};
