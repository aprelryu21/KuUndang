import React from 'react';
import { motion } from 'motion/react';
import { StoryItem, SectionSetting } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
  JavaneseGebyokArch,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { Sparkles, Heart, Camera } from 'lucide-react';

interface JavaneseStorySectionProps {
  stories: StoryItem[];
  section?: SectionSetting;
}

const DEFAULT_STORY_IMAGES = [
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=800&q=80',
];

export const JavaneseStorySection: React.FC<JavaneseStorySectionProps> = ({ stories, section }) => {
  const { t, language } = useLanguage();

  // Fallback cultural stories if none provided
  const displayStories =
    stories && stories.length > 0
      ? stories
      : [
          {
            id: 'st-1',
            invitation_id: 'inv-1',
            year: '2017',
            title: 'Wiwitan Pepanggihan (Pertemuan Awal)',
            description:
              'Ing satunggaling dinten ing bangku pasinaon kampus, Gusti nglestantunaken patemon sepisanan ingkang nuwuhaken wiji-wiji katresnan.',
            image_url: DEFAULT_STORY_IMAGES[0],
            sort_order: 1,
          },
          {
            id: 'st-2',
            invitation_id: 'inv-1',
            year: '2019',
            title: 'Nyawiji Ing Katresnan (Menjalin Hubungan)',
            description:
              'Sesarengan ngadhepi suka lan duka kanthi kasabaran lan pangerten. Nyuwun pitedah Gusti supados dipun tebihaken saking pepalang.',
            image_url: DEFAULT_STORY_IMAGES[1],
            sort_order: 2,
          },
          {
            id: 'st-3',
            invitation_id: 'inv-1',
            year: '2021',
            title: 'Pepunthoning Tekad / Lamaran',
            description:
              'Kulawarga ageng pepanggihan kanthi raos kurmat, ngaturaken sedya sae kagem ngiket tali silaturahmi lumantar pinangan suci.',
            image_url: DEFAULT_STORY_IMAGES[2],
            sort_order: 3,
          },
          {
            id: 'st-4',
            invitation_id: 'inv-1',
            year: '2021',
            title: 'Prasetyaning Ati (Menuju Pelaminan)',
            description:
              'Nyawijekaken tekat lan donga kagem nglampahi gesang bebrayan ing saklebeting ikrar suci akad nikah lan pahargyan temanten.',
            image_url: DEFAULT_STORY_IMAGES[3],
            sort_order: 4,
          },
        ];

  return (
    <section
      id="javanese-story"
      className="py-20 sm:py-28 px-4 bg-[#1E110A] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #2C1810 0%, #1E110A 70%, #120A05 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />
      <JavaneseGoldenParticles count={16} showJasminePetals={false} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 space-y-3">
          <JavaneseGebyokArch className="w-48 mx-auto mb-2 text-[#D4AF37]/70" />
          <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'LELAMPAHAN TRESNA SAKALASAN' : 'PERJALANAN KISAH CINTA'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
            {section?.title || (language === 'JW' ? 'Reroncen Kisah Tresna' : 'Kisah Kasih Dua Hati')}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
            {section?.subtitle ||
              (language === 'JW'
                ? 'Titi mangsa lampahing katresnan saking wiwitan pepanggihan tumeka ing dinten palakrama ingkang kebak berkah.'
                : 'Untaian waktu dan perjalanan bermakna yang menuntun langkah kami menuju pelaminan suci berlandaskan cinta dan doa restu keluarga.')}
          </p>
          <JavaneseDivider className="my-4" />
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-[#D4AF37]/40 ml-4 sm:ml-32 space-y-12">
          {displayStories.map((story, idx) => {
            const photoUrl = story.photo_url || (story as any).image_url || DEFAULT_STORY_IMAGES[idx % DEFAULT_STORY_IMAGES.length];

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative pl-6 sm:pl-8 group"
              >
                {/* Timeline Golden Lotus Dot */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#24160E] border-2 border-[#D4AF37] group-hover:scale-125 transition-transform flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#E5C158]" />
                </div>

                {/* Year Badge (Desktop positioned to the left) */}
                <div className="sm:absolute sm:-left-32 sm:top-0 sm:text-right sm:w-24">
                  <span className="inline-block px-3 py-1 rounded-full bg-[#1A1009] border border-[#D4AF37]/60 text-xs font-serif font-bold text-[#E5C158] shadow-md">
                    {story.year || story.date}
                  </span>
                </div>

                {/* Story Content Card with Javanese Teak & Gold Border */}
                <div className="bg-[#24160E]/95 border-2 border-[#D4AF37]/60 rounded-2xl p-5 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.7)] relative overflow-hidden">
                  <div className="absolute top-1 right-1 opacity-25 pointer-events-none">
                    <JavaneseCornerFlourish className="w-8 h-8 text-[#D4AF37]" />
                  </div>

                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E5C158] mb-2 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                    <span>{story.title}</span>
                  </h3>

                  <p className="font-serif text-xs sm:text-sm text-[#FAF6EE]/85 leading-relaxed">
                    {story.description}
                  </p>

                  {/* Photo Display in Ornate Javanese Teak & Prada Frame */}
                  <div className="mt-4 pt-3 border-t border-[#D4AF37]/25">
                    <div className="relative rounded-xl overflow-hidden border-2 border-[#D4AF37] bg-[#1A1009] shadow-lg group-hover:border-[#E5C158] transition-colors">
                      {/* Corner Accents on Photo */}
                      <div className="absolute top-1 left-1 z-10 pointer-events-none">
                        <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
                      </div>
                      <div className="absolute top-1 right-1 rotate-90 z-10 pointer-events-none">
                        <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
                      </div>

                      <div className="aspect-16/9 sm:aspect-2/1 w-full overflow-hidden">
                        <img
                          src={photoUrl}
                          alt={story.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                        />
                      </div>

                      {/* Photo Badge */}
                      <div className="absolute bottom-2 right-2 px-2.5 py-1 rounded-full bg-[#1A1009]/90 border border-[#D4AF37]/60 backdrop-blur-xs flex items-center gap-1.5 text-[10px] text-[#E5C158] font-serif">
                        <Camera className="w-3 h-3 text-[#D4AF37]" />
                        <span>Kenangan {story.year || story.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
