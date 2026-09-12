import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Navigation, ExternalLink, Flame, BookmarkCheck } from 'lucide-react';
import { WeddingEvent, Invitation } from '../../../types/wedding';

interface Persona5EventsSectionProps {
  events: WeddingEvent[];
  invitation: Invitation;
}

export const Persona5EventsSection: React.FC<Persona5EventsSectionProps> = ({ events }) => {
  // Helper to construct Google Calendar URL
  const getGoogleCalendarUrl = (ev: WeddingEvent) => {
    const title = encodeURIComponent(`${ev.title} — April & Siti Wedding`);
    const details = encodeURIComponent(
      `${ev.description || 'Pernikahan Suci April Pratama & Siti Nurjannah.'}\nLokasi: ${ev.venue}, ${ev.address}`
    );
    const location = encodeURIComponent(`${ev.venue}, ${ev.address}`);
    const dateFormatted = ev.date.replace(/-/g, '');
    const startTime = ev.start_time ? ev.start_time.replace(':', '') + '00' : '080000';
    const endTime = ev.end_time ? ev.end_time.replace(':', '') + '00' : '140000';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T${startTime}/${dateFormatted}T${endTime}&details=${details}&location=${location}`;
  };

  return (
    <section id="p5-events" className="py-20 sm:py-28 bg-[#0D0D0D] text-[#FFFFFF] relative overflow-hidden border-t-4 border-[#FFFFFF]">
      {/* Halftone & Diagonal Red Slits */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(#FFF000 1.5px, transparent 1.5px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E60012] text-white text-xs font-black uppercase tracking-[0.2em] -skew-x-12 mb-3">
            <Flame className="w-3.5 h-3.5 text-[#FFF000] skew-x-12" />
            <span className="skew-x-12">COGNITIVE PALACE INFILTRATION ITINERARY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black uppercase italic tracking-tight text-[#FFFFFF]">
            TARGET <span className="text-[#E60012] not-italic">OPERATIONS</span>
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#FFFFFF]/70 mt-2">
            Jadwal Rangkaian Acara Sakral Akad Nikah, Resepsi, dan Unduh Mantu
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {events.map((ev, idx) => {
            const operationCode = `OP-0${idx + 1}`;
            const isSpecial = idx === 0;

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`bg-[#141418] border-4 p-6 flex flex-col justify-between -skew-x-2 relative transition-transform hover:-translate-y-1.5 duration-300 ${
                  isSpecial
                    ? 'border-[#E60012] shadow-[8px_8px_0px_0px_#FFFFFF]'
                    : 'border-[#FFFFFF] shadow-[8px_8px_0px_0px_#E60012]'
                }`}
              >
                {/* Top Code Badge */}
                <div className="flex items-center justify-between mb-4 border-b border-white/20 pb-3">
                  <span className="bg-[#E60012] text-white text-[11px] font-black uppercase tracking-widest px-2.5 py-0.5 -skew-x-6">
                    {operationCode}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#FFF000] uppercase">
                    {ev.event_type.toUpperCase()}
                  </span>
                </div>

                {/* Event Name & Time */}
                <div className="text-left space-y-3 mb-6">
                  <h3 className="text-xl sm:text-2xl font-black uppercase italic text-white leading-tight">
                    {ev.title}
                  </h3>

                  <div className="space-y-1.5 text-xs font-mono text-[#FFFFFF]/80">
                    <div className="flex items-center gap-2 text-[#FFF000] font-bold">
                      <Calendar className="w-4 h-4 text-[#E60012]" />
                      <span>{ev.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Clock className="w-4 h-4 text-[#E60012]" />
                      <span>
                        {ev.start_time} {ev.end_time ? `- ${ev.end_time}` : 'WIB - Selesai'}
                      </span>
                    </div>
                  </div>

                  {/* Venue & Location Details */}
                  <div className="pt-2 border-t border-white/10 text-xs font-mono space-y-1">
                    <p className="font-bold text-white uppercase flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#E60012] shrink-0 mt-0.5" />
                      <span>{ev.venue}</span>
                    </p>
                    <p className="text-[#FFFFFF]/70 text-[11px] leading-relaxed pl-5">
                      {ev.address}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Google Maps & Calendar */}
                <div className="space-y-2 pt-4 border-t border-white/20">
                  {ev.maps_url && (
                    <a
                      href={ev.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 bg-[#E60012] hover:bg-[#FF0019] text-white text-xs font-black uppercase tracking-wider transition-colors flex items-center justify-center gap-2 -skew-x-6 border border-white"
                    >
                      <Navigation className="w-3.5 h-3.5 skew-x-6" />
                      <span className="skew-x-6">PETUNJUK RUTE (MAPS)</span>
                    </a>
                  )}

                  <a
                    href={getGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#000000] hover:bg-[#1C1C22] text-[#FFF000] text-xs font-mono font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 -skew-x-6 border border-[#FFF000]/60"
                  >
                    <BookmarkCheck className="w-3.5 h-3.5 skew-x-6" />
                    <span className="skew-x-6">SIMPAN KE GOOGLE CALENDAR</span>
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
