import React from 'react';
import { StoryItem, SectionSetting } from '../../../types/wedding';
import { HeirloomDivider, EucalyptusStem } from './fleurBotanicaAssets';
import { Heart } from 'lucide-react';

interface FleurBotanicaStorySectionProps {
  stories: StoryItem[];
  section?: SectionSetting;
}

export const FleurBotanicaStorySection: React.FC<FleurBotanicaStorySectionProps> = ({
  stories,
  section,
}) => {
  if (!stories || stories.length === 0) return null;

  return (
    <section id="fleur-story" className="relative py-20 sm:py-28 px-4 bg-[#FAF8F5] text-[#293522] overflow-hidden scroll-mt-14">
      <div className="max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            {section?.subtitle || 'PERJALANAN CINTA KAMI'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
            {section?.title || 'Kisah Kasih'}
          </h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
            Setiap cerita cinta itu indah, namun cerita kita adalah yang paling berharga.
          </p>
          <HeirloomDivider className="my-4" />
        </div>

        {/* Timeline Path */}
        <div className="relative border-l-2 border-[#BDA06C]/40 ml-4 sm:ml-32 space-y-12">
          {stories.map((story, idx) => {
            const photo = story.photo_url || story.image_url;
            return (
              <div key={story.id || idx} className="relative pl-6 sm:pl-8 group">
                {/* Botanical Leaf Node Indicator */}
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-[#FAF8F5] border-2 border-[#BDA06C] flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#293522]" />
                </div>

                {/* Story Year / Date */}
                <div className="sm:absolute sm:-left-32 sm:top-0 sm:text-right sm:w-24 mb-1 sm:mb-0">
                  <span className="inline-block px-2.5 py-0.5 rounded-md bg-[#293522] text-[#FAF8F5] text-[10px] font-serif font-bold tracking-widest uppercase">
                    {story.year || story.date || `Bab ${idx + 1}`}
                  </span>
                </div>

                {/* Story Content Card */}
                <div className="bg-white border border-[#BDA06C]/50 rounded-2xl p-5 shadow-xs space-y-3">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#293522]">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
                    {story.description}
                  </p>

                  {photo && (
                    <div className="pt-2">
                      <div className="p-2 bg-[#FAF8F5] border border-[#BDA06C]/40 rounded-xl inline-block max-w-[240px]">
                        <img
                          src={photo}
                          alt={story.title}
                          className="w-full h-36 object-cover rounded-lg"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
