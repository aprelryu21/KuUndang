import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, Copy, Check, ExternalLink, Sparkles } from 'lucide-react';
import { WeddingEvent, SectionSetting } from '../../../types/wedding';
import { useToast } from '../../../context/ToastContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteBowSvg,
  CuteFloralDivider,
  WashiTape,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';

interface CuteLocationSectionProps {
  events: WeddingEvent[];
  section?: SectionSetting;
}

export const CuteLocationSection: React.FC<CuteLocationSectionProps> = ({ events, section }) => {
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const displayEvents = events.length > 0 ? events : [
    {
      id: 'default-loc-01',
      invitation_id: 'default',
      title: 'Akad Nikah',
      event_type: 'akad' as const,
      date: '2026-09-28',
      start_time: '07.00 WIB',
      venue: "Masjid Jami' Al-Hikmah Kandangan",
      address: 'Jl. Raya Kandangan No. 45, Kandangan, Kediri, Jawa Timur',
      maps_url: 'https://maps.google.com/?q=Kandangan,+Kediri',
      sort_order: 1,
    },
    {
      id: 'default-loc-02',
      invitation_id: 'default',
      title: 'Resepsi Pernikahan',
      event_type: 'reception' as const,
      date: '2026-09-28',
      start_time: '09.00 WIB',
      venue: 'Kediaman Mempelai Pria',
      address: 'Dusun Medowo, Desa Medowo, Kec. Kandangan, Kabupaten Kediri, Jawa Timur',
      maps_url: 'https://maps.google.com/?q=Medowo,+Kandangan,+Kediri',
      sort_order: 2,
    },
  ];

  const handleCopyAddress = (event: WeddingEvent) => {
    const textToCopy = `${event.venue}\n${event.address}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(event.id);
    showToast('Alamat berhasil disalin ke clipboard! ♡', 'success');
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section
      id="cute-location"
      className="py-20 sm:py-28 px-4 bg-[#FFF0F5] text-[#4A2E35] relative overflow-hidden border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={12} showFlowers={true} />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteDaisyFlower className="w-8 h-8" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              PETUNJUK LOKASI
            </p>
            <CuteDaisyFlower className="w-8 h-8" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {section?.title || 'Lokasi & Petunjuk Arah'}
          </h2>

          <p className="max-w-lg mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            {section?.subtitle ||
              'Dengan penuh sukacita, kami menanti kehadiran serta doa restu Bapak/Ibu/Saudara/i sekalian di hari bahagia kami.'}
          </p>
          <CuteFloralDivider />
        </div>

        {/* Location Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {displayEvents.map((event, idx) => {
            const isCopied = copiedId === event.id;
            const mapsUrl =
              event.maps_url ||
              `https://maps.google.com/?q=${encodeURIComponent(`${event.venue}, ${event.address}`)}`;

            return (
              <motion.div
                key={event.id || idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#FFF9FB] rounded-3xl p-6 sm:p-7 border-2 border-[#FFA3B8] shadow-md relative"
              >
                {/* Washi Tape Header */}
                <div className="flex justify-center -mt-9 mb-4">
                  <WashiTape color={idx % 2 === 0 ? 'pink' : 'yellow'} label={event.title} />
                </div>

                <div className="flex items-center gap-2.5 mb-3 text-[#FF5C8D]">
                  <div className="w-8 h-8 rounded-full bg-[#FFE4EC] flex items-center justify-center border border-[#FFA3B8] shadow-xs">
                    <MapPin className="w-4 h-4 text-[#E03164]" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-[#4A2E35]">
                    {event.venue}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#6B3E48] leading-relaxed mb-6 font-sans">
                  {event.address}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FF5C8D] hover:bg-[#E03164] text-white font-sans text-xs font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-95"
                  >
                    <Navigation className="w-4 h-4" />
                    <span>Buka Google Maps</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => handleCopyAddress(event)}
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#FFE4EC] hover:bg-[#FFCCD7] text-[#4A2E35] border border-[#FFA3B8] font-sans text-xs font-bold transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#FF5C8D]" />
                        <span>Salin Alamat</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
