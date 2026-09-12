import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, BookOpen, Star } from 'lucide-react';
import { LoveStory } from '../../../types/wedding';

interface PastelPopStorySectionProps {
  stories: LoveStory[];
}

export const PastelPopStorySection: React.FC<PastelPopStorySectionProps> = ({ stories }) => {
  const sortedStories = [...stories].sort((a, b) => a.sort_order - b.sort_order);

  return (
    <section id="cute-story" className="py-20 sm:py-28 bg-gradient-to-b from-[#FFF9E6]/60 via-white to-[#EDF5FF]/50 relative overflow-hidden">
      {/* Playful Doodles */}
      <div className="absolute top-10 right-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4.8s' }}>
        📖
      </div>
      <div className="absolute bottom-10 left-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '3.9s' }}>
        💕
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4EEFF] border-2 border-[#9D80CB] text-[#9D80CB] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <BookOpen className="w-3.5 h-3.5" />
          <span>KISAH CINTA MANIS KAMI</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
          Love Storybook Timeline ♡
        </h2>
        <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-md mx-auto">
          Setiap babak perjalanan cinta yang mempertemukan hingga mengantarkan kami ke pelaminan.
        </p>

        {/* Timeline Storybook Cards */}
        <div className="mt-14 space-y-12 sm:space-y-16 relative">
          {/* Vertical Colorful Connecting Line */}
          <div className="hidden sm:block absolute top-8 bottom-8 left-1/2 -translate-x-1/2 w-1 border-r-4 border-dashed border-[#FFD166] pointer-events-none" />

          {sortedStories.map((item, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`relative flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${
                  isEven ? 'sm:flex-row-reverse text-left' : 'text-left'
                }`}
              >
                {/* Center Badge Icon on Desktop */}
                <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#FF6B8B] border-3 border-white shadow-md items-center justify-center text-white z-20">
                  <Heart className="w-5 h-5 fill-white" />
                </div>

                {/* Photo Polaroid with Washi Tape */}
                <div className="w-full sm:w-1/2 flex justify-center">
                  <div className="relative p-3 bg-white rounded-3xl border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#FFD166] max-w-xs transform hover:rotate-2 transition-transform">
                    {/* Washi Tape */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-[#FF6B8B] border border-white/60 rounded-sm -rotate-2 z-10 shadow-xs flex items-center justify-center">
                      <span className="text-[9px] font-black text-white uppercase tracking-wider">CHAPTER {idx + 1}</span>
                    </div>

                    <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-rose-50 border border-slate-100">
                      <img
                        src={item.image_url || 'https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=600&q=80'}
                        alt={item.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Content Card */}
                <div className="w-full sm:w-1/2">
                  <div className="bg-white p-6 rounded-3xl border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#4D96FF]">
                    {/* Year / Date Tag */}
                    <div className="inline-block px-3 py-1 rounded-full bg-[#FFE5EC] border border-[#FF6B8B] text-[#FF6B8B] text-xs font-black mb-2 shadow-xs">
                      {item.year}
                    </div>

                    <h3 className="text-xl font-black text-[#2B2D42]">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#2B2D42]/80 mt-2 leading-relaxed whitespace-pre-line">
                      {item.story}
                    </p>
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
