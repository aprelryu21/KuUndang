import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, MessageSquare } from 'lucide-react';
import { StoryItem } from '../../../types/wedding';

interface Persona3SocialLinkStoryProps {
  stories: StoryItem[];
}

export const Persona3SocialLinkStory: React.FC<Persona3SocialLinkStoryProps> = ({ stories }) => {
  const sortedStories = [...stories].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section id="cerita" className="py-20 sm:py-28 bg-[#050B18] text-[#F0F8FF] relative overflow-hidden border-t-2 border-[#00D2FF]/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Heart className="w-3.5 h-3.5 text-[#FFE600] fill-[#FFE600]" />
            <span>COMMUNITY // SOCIAL LINK CHRONICLES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Kisah Cinta & Perjalanan
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // SOCIAL LINK PROGRESSION: RANK 1 TO RANK 10 [MAX]
          </p>
        </div>

        {/* Timeline Stories with Persona 3 Dialogue Framing */}
        <div className="space-y-8 relative">
          {/* Vertical Connecting Neon Line */}
          <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#00D2FF] via-[#FFE600] to-[#00D2FF] -translate-x-1/2 opacity-40" />

          {sortedStories.map((item, idx) => {
            const isEven = idx % 2 === 0;
            const rankNum = (idx + 1) * 3; // e.g. Rank 3, Rank 6, Rank 10
            const rankLabel = idx === sortedStories.length - 1 ? 'RANK 10 [MAX]' : `RANK 0${rankNum}`;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Card */}
                <div className="w-full md:w-1/2">
                  <div className="rounded-2xl bg-[#081226] border-2 border-[#00D2FF] hover:border-[#FFE600] p-6 shadow-[0_0_20px_rgba(0,210,255,0.15)] transition-all transform hover:-translate-y-1 relative group">
                    <div className="flex items-center justify-between border-b border-[#00D2FF]/30 pb-3 mb-3">
                      <span className="px-2 py-0.5 rounded-xs bg-[#FFE600] text-[#050B18] text-[9px] font-mono font-black tracking-widest uppercase">
                        {rankLabel}
                      </span>
                      <span className="text-[10px] font-mono text-[#00D2FF] font-bold">
                        {item.date || item.year}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-black text-white font-sans uppercase group-hover:text-[#FFE600] transition-colors">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-xs sm:text-sm text-[#D0E2F5] leading-relaxed font-sans">
                      {item.description}
                    </p>

                    <div className="mt-4 flex items-center gap-2 text-[10px] font-mono text-[#00D2FF]">
                      <MessageSquare className="w-3 h-3 text-[#FFE600]" />
                      <span>SOCIAL LINK EPISODE RECORDED</span>
                    </div>
                  </div>
                </div>

                {/* Center Node / Badge */}
                <div className="hidden md:flex shrink-0 w-12 h-12 rounded-full bg-[#0E1E42] border-2 border-[#FFE600] items-center justify-center text-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.5)] z-10">
                  <Sparkles className="w-5 h-5" />
                </div>

                {/* Spacer for alternate layout */}
                <div className="hidden md:block w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
