import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';
import { StoryItem, SectionSetting } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { LoveLetterIllustration } from './WeddingDecorations';

interface StorySectionProps {
  stories: StoryItem[];
  section?: SectionSetting;
}

export const StorySection: React.FC<StorySectionProps> = ({ stories, section }) => {
  const { t } = useLanguage();

  return (
    <section id="story" className="py-20 px-6 bg-[#F7F2EA] text-[#24313A] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <LoveLetterIllustration className="w-18 h-18 sm:w-20 sm:h-20" />
          </motion.div>

          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#C2A56B] capitalize tracking-wide font-normal leading-tight">
            {section?.title || t.loveStory}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {section?.subtitle || t.loveStorySubtitle}
          </p>
        </div>

        {/* Alternating Editorial Timeline */}
        <div className="relative">
          {/* Vertical Center Line for md+ screens */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#C2A56B]/35 -translate-x-1/2" />

          <div className="space-y-12 md:space-y-16">
            {stories.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Column */}
                  <div className={`w-full md:w-1/2 text-left ${isEven ? 'md:pl-10' : 'md:pr-10 md:text-right'}`}>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#DFBFC1]/30 text-xs font-semibold text-[#283D52] mb-3">
                      <Sparkles className="w-3 h-3 text-[#C2A56B]" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
                      {t.content?.stories?.[index]?.title || item.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed font-serif italic">
                      "{t.content?.stories?.[index]?.desc || item.description}"
                    </p>
                  </div>

                  {/* Center Marker on timeline */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#FFFCF7] border-2 border-[#C2A56B] items-center justify-center shadow-md z-10">
                    <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
                  </div>

                  {/* Photo Column */}
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-10' : 'md:pl-10'}`}>
                    {item.photo_url ? (
                      <div className="overflow-hidden rounded-2xl border-2 border-[#FFFCF7] shadow-md max-h-64 sm:max-h-72 w-full group">
                        <img
                          src={item.photo_url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                    ) : (
                      <div className="h-40 rounded-2xl bg-[#EFE8DE] border border-dashed border-[#C2A56B]/40 flex items-center justify-center text-xs text-[#768692]">
                        <span>A sweet memory captured in heart</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
