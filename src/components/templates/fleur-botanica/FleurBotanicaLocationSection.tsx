import React from 'react';
import { WeddingEvent, SectionSetting } from '../../../types/wedding';
import { HeirloomDivider, EucalyptusStem } from './fleurBotanicaAssets';
import { MapPin, Navigation, ExternalLink } from 'lucide-react';

interface FleurBotanicaLocationSectionProps {
  events: WeddingEvent[];
  section?: SectionSetting;
}

export const FleurBotanicaLocationSection: React.FC<FleurBotanicaLocationSectionProps> = ({
  events,
  section,
}) => {
  const mainEvent = events[0] || {
    venue: 'Edelweiss Wedding Hall',
    address: 'Sport Club Goldland Karawaci, Tangerang',
    maps_url: 'https://maps.google.com',
  };

  return (
    <section id="fleur-location" className="relative py-20 sm:py-24 px-4 bg-[#F5F2EB] text-[#293522] overflow-hidden scroll-mt-14 text-center">
      <div className="max-w-3xl mx-auto relative z-10 space-y-6">
        <div className="space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            {section?.subtitle || 'LOKASI PERNIKAHAN'}
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
            {section?.title || 'Peta & Lokasi Acara'}
          </h2>
          <HeirloomDivider className="my-3" />
        </div>

        {/* Venue Card */}
        <div className="bg-white border-2 border-[#BDA06C]/70 rounded-3xl p-6 sm:p-10 shadow-[0_15px_35px_rgba(41,53,34,0.08)] max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-[#FAF8F5] border border-[#BDA06C] flex items-center justify-center mx-auto text-[#BDA06C]">
            <MapPin className="w-6 h-6" />
          </div>

          <div>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#293522]">
              {mainEvent.venue}
            </h3>
            <p className="text-xs sm:text-sm font-serif text-[#66705A] mt-1 leading-relaxed max-w-md mx-auto">
              {mainEvent.address}
            </p>
          </div>

          {mainEvent.maps_url && (
            <div className="pt-2">
              <a
                href={mainEvent.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#293522] hover:bg-[#1F2E22] text-[#FAF8F5] text-xs font-serif uppercase tracking-wider transition-all shadow-md cursor-pointer"
              >
                <Navigation className="w-4 h-4 text-[#BDA06C]" />
                <span>Buka Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
