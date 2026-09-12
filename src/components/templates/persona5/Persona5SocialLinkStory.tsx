import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, Star, Flame, Trophy } from 'lucide-react';
import { StoryItem } from '../../../types/wedding';

interface Persona5SocialLinkStoryProps {
  stories: StoryItem[];
}

const DEFAULT_STORY_IMAGES = [
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=800&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop',
];

export const Persona5SocialLinkStory: React.FC<Persona5SocialLinkStoryProps> = ({ stories }) => {
  return (
    <section id="p5-story" className="py-20 sm:py-28 bg-[#000000] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#E60012]">
      {/* Halftone Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#E60012 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFF000] text-black text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
            <Trophy className="w-3.5 h-3.5 text-black skew-x-12" />
            <span className="skew-x-12">CONFIDANT MEMORIES // RANK MAX</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
            CONFIDANT: <span className="text-[#E60012] not-italic">THE LOVERS</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2">
            Kronik Perjalanan Kisah Kasih April & Siti Menuju Mahligai Pernikahan
          </p>
        </div>

        {/* Confidant Max Banner */}
        <div className="bg-[#16161A] border-4 border-[#E60012] p-4 text-center -skew-x-3 mb-12 shadow-[6px_6px_0px_0px_#FFFFFF]">
          <p className="text-xs font-mono text-[#FFF000] uppercase font-bold tracking-widest">
            ★ THOU ART I, AND I AM THOU... ★
          </p>
          <p className="text-sm sm:text-base font-black text-white uppercase italic mt-1">
            &quot;Thou hast established a new bond... The Lovers Confidant has deepened to RANK 10!&quot;
          </p>
        </div>

        {/* Timeline Stories List */}
        <div className="space-y-12 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:-translate-x-1/2 before:w-1 before:bg-[#E60012]/40">
          {stories.map((item, idx) => {
            const rankLabel = idx === 0 ? 'RANK 1' : idx === stories.length - 1 ? 'RANK 10 [MAX]' : `RANK ${idx * 4 + 1}`;
            const isLeft = idx % 2 === 0;
            const photoUrl = item.photo_url || DEFAULT_STORY_IMAGES[idx % DEFAULT_STORY_IMAGES.length];

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`relative flex flex-col md:flex-row items-center gap-6 sm:gap-8 ${
                  isLeft ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Center Tarot Rank Marker */}
                <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-20 w-10 h-10 bg-[#000000] border-2 border-[#FFF000] items-center justify-center -skew-x-6 shadow-[3px_3px_0px_0px_#E60012]">
                  <Star className="w-5 h-5 text-[#FFF000] fill-[#FFF000] skew-x-6" />
                </div>

                {/* Content Box */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="bg-[#141418] border-2 border-[#FFFFFF]/60 hover:border-[#E60012] p-5 sm:p-6 -skew-x-2 shadow-[6px_6px_0px_0px_#E60012] transition-all text-left">
                    <div className="flex items-center justify-between mb-2 border-b border-white/15 pb-2">
                      <span className="bg-[#E60012] text-white text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 -skew-x-6">
                        {rankLabel}
                      </span>
                      <span className="text-xs font-mono font-bold text-[#FFF000]">
                        {item.date}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black uppercase text-white tracking-wide mt-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/85 mt-2.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Photo Illustration Column */}
                <div className="w-full md:w-1/2 pl-8 md:pl-0">
                  <div className="bg-[#0D0D0D] border-3 border-white p-2 -skew-x-3 shadow-[8px_8px_0px_0px_#E60012] hover:skew-x-0 transition-transform duration-300 relative group overflow-hidden">
                    <div className="aspect-[16/10] sm:aspect-[16/9] overflow-hidden relative bg-[#1A1A1E]">
                      <img
                        src={photoUrl}
                        alt={item.title}
                        className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                      />
                      {/* Comic Halftone & Badge */}
                      <div className="absolute top-2 left-2 px-2 py-0.5 bg-[#E60012] text-white text-[9px] font-black font-mono tracking-widest -skew-x-6">
                        CONFIDANT SNAPSHOT
                      </div>
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 border border-[#FFF000] text-[#FFF000] text-[9px] font-mono font-bold">
                        ★ {rankLabel}
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
