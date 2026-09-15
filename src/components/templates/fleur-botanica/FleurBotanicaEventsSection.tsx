import React from 'react';
import { WeddingEvent, Invitation } from '../../../types/wedding';
import { EucalyptusStem, HeirloomDivider } from './fleurBotanicaAssets';
import { Calendar, Clock, MapPin, ExternalLink } from 'lucide-react';

interface FleurBotanicaEventsSectionProps {
  events: WeddingEvent[];
  invitation: Invitation;
}

export const FleurBotanicaEventsSection: React.FC<FleurBotanicaEventsSectionProps> = ({
  events,
  invitation,
}) => {
  const formatCalendarUrl = (ev: WeddingEvent) => {
    const title = encodeURIComponent(`${ev.title} - ${invitation.bride_nickname} & ${invitation.groom_nickname}`);
    const details = encodeURIComponent(`Acara pernikahan ${ev.title} di ${ev.venue} (${ev.address})`);
    const location = encodeURIComponent(`${ev.venue}, ${ev.address}`);
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <section id="fleur-events" className="relative py-20 sm:py-28 px-4 bg-[#FAF8F5] text-[#293522] overflow-hidden scroll-mt-14">
      {/* Side Botanical Sprigs */}
      <div className="absolute top-10 right-0 pointer-events-none opacity-25 translate-x-4">
        <EucalyptusStem className="w-32 h-44 -rotate-12" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-2">
          <span className="text-[11px] font-serif uppercase tracking-[0.25em] text-[#80683E] block">
            AGENDA &amp; JADWAL PERNIKAHAN
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#293522]">
            Rangkaian Acara
          </h2>
          <p className="max-w-md mx-auto text-xs sm:text-sm font-serif text-[#66705A] leading-relaxed">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
          </p>
          <HeirloomDivider className="my-4" />
        </div>

        {/* Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {events.map((ev, idx) => (
            <div
              key={ev.id || idx}
              className="relative bg-white border-2 border-[#BDA06C]/60 rounded-3xl p-6 sm:p-8 shadow-[0_15px_35px_rgba(41,53,34,0.08)] flex flex-col justify-between space-y-6 hover:border-[#BDA06C] transition-colors"
            >
              {/* Event Badge & Title */}
              <div className="space-y-3">
                <div className="inline-block px-3 py-1 rounded-full bg-[#F5F2EB] border border-[#BDA06C]/40 text-[10px] font-serif uppercase tracking-[0.2em] text-[#80683E] font-bold">
                  {ev.event_type?.toUpperCase() || 'ACARA PERNIKAHAN'}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#293522]">
                  {ev.title}
                </h3>

                <div className="h-[1px] w-12 bg-[#BDA06C]/50" />

                {/* Date & Time */}
                <div className="space-y-2 text-xs sm:text-sm font-serif text-[#66705A]">
                  <div className="flex items-center gap-2.5">
                    <Calendar className="w-4 h-4 text-[#BDA06C] shrink-0" />
                    <span className="font-semibold text-[#293522]">{ev.date || '30 September 2026'}</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#BDA06C] shrink-0" />
                    <span>
                      {ev.start_time} - {ev.end_time || 'Selesai'} WIB
                    </span>
                  </div>

                  <div className="flex items-start gap-2.5 pt-1">
                    <MapPin className="w-4 h-4 text-[#BDA06C] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#293522]">{ev.venue}</strong>
                      <span className="text-[11px] text-[#66705A] leading-relaxed block mt-0.5">
                        {ev.address}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Maps & Calendar */}
              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                {ev.maps_url && (
                  <a
                    href={ev.maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#293522] hover:bg-[#1F2E22] text-[#FAF8F5] text-xs font-serif uppercase tracking-wider transition-colors shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#BDA06C]" />
                    <span>Petunjuk Arah</span>
                    <ExternalLink className="w-3 h-3 opacity-70" />
                  </a>
                )}

                <a
                  href={formatCalendarUrl(ev)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-white hover:bg-[#FAF8F5] border border-[#BDA06C]/60 text-[#293522] text-xs font-serif uppercase tracking-wider transition-colors shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5 text-[#BDA06C]" />
                  <span>Simpan Tanggal</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
