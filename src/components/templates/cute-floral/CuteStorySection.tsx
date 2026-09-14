import React from 'react';
import { motion } from 'motion/react';
import { StoryItem, SectionSetting } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  WashiTape,
  CuteFloralDivider,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Heart, Calendar, Sparkles } from 'lucide-react';

interface CuteStorySectionProps {
  stories: StoryItem[];
  section?: SectionSetting;
}

const DEFAULT_STORY_IMAGES = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=1000&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1000&auto=format&fit=crop',
];

export const CuteStorySection: React.FC<CuteStorySectionProps> = ({ stories, section }) => {
  const { language } = useLanguage();

  const sortedStories = [...stories].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section
      id="cute-story"
      className="py-20 sm:py-28 px-4 bg-[#FFF9FB] text-[#4A2E35] relative overflow-hidden border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={14} showFlowers={true} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteTulipFlower className="w-6 h-6" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              {language === 'JW' ? 'LELAMPAHAN TRESNA' : 'KISAH CINTA KAMI'}
            </p>
            <CuteTulipFlower className="w-6 h-6 -scale-x-100" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {section?.title || (language === 'JW' ? 'Lelampahan Tresna Manis' : 'Perjalanan Kisah Manis Kami')}
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            {section?.subtitle ||
              'Setiap detik yang terlewati adalah anugerah terindah. Inilah lembaran kisah kasih yang menuntun kami hingga bersatu dalam ikatan suci:'}
          </p>
          <CuteFloralDivider />
        </div>

        {/* Scrapbook Timeline Nodes */}
        <div className="space-y-12 sm:space-y-16 relative">
          {/* Vertical Connecting Floral Stem Line */}
          <div className="hidden sm:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-[#FFA3B8] via-[#FF85A2] to-[#FFA3B8] rounded-full" />

          {sortedStories.map((story, idx) => {
            const isEven = idx % 2 === 0;
            const photoUrl = story.photo_url || DEFAULT_STORY_IMAGES[idx % DEFAULT_STORY_IMAGES.length];

            return (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-12 relative ${
                  isEven ? 'sm:flex-row-reverse' : ''
                }`}
              >
                {/* Center Floral Marker on Timeline */}
                <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white border-2 border-[#FF5C8D] items-center justify-center shadow-md">
                  <CuteDaisyFlower className="w-7 h-7" />
                </div>

                {/* 1. Polaroid Photo Box */}
                <div className="w-full sm:w-1/2 max-w-sm">
                  <div className="bg-white p-3.5 pb-6 rounded-2xl border-2 border-[#FFA3B8] shadow-[0_8px_30px_rgba(255,133,162,0.16)] relative group hover:rotate-1 transition-transform">
                    {/* Washi Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <WashiTape className="w-20 h-5" color={isEven ? 'pink' : 'yellow'} />
                    </div>

                    <div className="aspect-[4/3] rounded-xl overflow-hidden bg-[#FFF0F5] mb-3">
                      <img
                        src={photoUrl}
                        alt={story.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex items-center justify-between px-1">
                      <span className="font-heading text-base font-bold text-[#E03164]">
                        {story.title}
                      </span>
                      <CuteSakuraFlower className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* 2. Story Narrative Box */}
                <div className="w-full sm:w-1/2 max-w-sm">
                  <div className="bg-white/90 p-6 rounded-3xl border-2 border-[#FFCCD7] shadow-sm relative">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFE4EC] text-[#FF5C8D] text-xs font-sans font-bold mb-3">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{story.date}</span>
                    </div>

                    <h3 className="font-heading text-xl font-bold text-[#4A2E35] mb-2">
                      {story.title}
                    </h3>

                    <p className="font-sans text-xs sm:text-sm text-[#6B3E48] leading-relaxed">
                      {story.description}
                    </p>

                    <div className="mt-4 flex items-center justify-end gap-1 text-[#FF85A2] text-xs font-sans font-semibold">
                      <span>Babak Indah</span>
                      <Heart className="w-3.5 h-3.5 fill-[#FF85A2]" />
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
