import React from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles, ExternalLink, Heart } from 'lucide-react';
import { WeddingEvent, Invitation } from '../../../types/wedding';

interface PastelPopEventsSectionProps {
  events: WeddingEvent[];
  invitation: Invitation;
}

export const PastelPopEventsSection: React.FC<PastelPopEventsSectionProps> = ({ events, invitation }) => {
  const getGoogleCalendarUrl = (ev: WeddingEvent) => {
    const title = encodeURIComponent(`${ev.title} - ${invitation.title}`);
    const venueName = ev.venue_name || ev.venue;
    const details = encodeURIComponent(
      `Pernikahan ${invitation.bride_nickname} & ${invitation.groom_nickname}\nLokasi: ${venueName}, ${ev.address}\nInfo: ${ev.description || ''}`
    );
    const location = encodeURIComponent(`${venueName}, ${ev.address}`);

    const eventDate = ev.date ? new Date(ev.date) : new Date(invitation.wedding_date);
    const year = eventDate.getFullYear();
    const month = String(eventDate.getMonth() + 1).padStart(2, '0');
    const day = String(eventDate.getDate()).padStart(2, '0');

    const startHour = ev.start_time ? ev.start_time.replace(':', '').slice(0, 4) : '0800';
    const endHour = ev.end_time ? ev.end_time.replace(':', '').slice(0, 4) : '1200';

    const dates = `${year}${month}${day}T${startHour}00/${year}${month}${day}T${endHour}00`;
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${location}`;
  };

  const getEventBadge = (type: string) => {
    switch (type) {
      case 'akad':
        return { label: 'AKAD NIKAH SAKRAL', bg: 'bg-[#FF6B8B]', border: 'border-[#FF6B8B]', text: 'text-white' };
      case 'reception':
        return { label: 'RESEPSI PERNIKAHAN', bg: 'bg-[#FFD166]', border: 'border-[#FFD166]', text: 'text-[#2B2D42]' };
      default:
        return { label: 'NGUNDUH MANTU & SYUKURAN', bg: 'bg-[#06D6A0]', border: 'border-[#06D6A0]', text: 'text-white' };
    }
  };

  return (
    <section id="cute-events" className="py-20 sm:py-28 bg-gradient-to-b from-[#EDF5FF]/50 via-white to-[#FFE5EC]/40 relative overflow-hidden">
      {/* Playful Doodles */}
      <div className="absolute top-10 right-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '4.5s' }}>
        💌
      </div>
      <div className="absolute bottom-10 left-8 text-3xl opacity-30 select-none animate-bounce" style={{ animationDuration: '3.5s' }}>
        🎉
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
        {/* Section Header */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E8FBF5] border-2 border-[#06D6A0] text-[#06D6A0] text-xs font-black uppercase tracking-wider mb-3 shadow-xs">
          <Calendar className="w-3.5 h-3.5" />
          <span>WAKTU &amp; RANGKAIAN ACARA</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>

        <h2 className="text-3xl sm:text-5xl font-black text-[#2B2D42] tracking-tight">
          Agenda Hari Bahagia ♡
        </h2>
        <p className="text-xs sm:text-sm text-[#2B2D42]/70 mt-2 max-w-md mx-auto">
          Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.
        </p>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-12 text-left">
          {events.map((ev, idx) => {
            const badge = getEventBadge(ev.event_type);
            const eventDateFormatted = new Date(ev.date || invitation.wedding_date).toLocaleDateString('id-ID', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            });

            return (
              <motion.div
                key={ev.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-3xl border-3 border-[#2B2D42] shadow-[6px_6px_0px_0px_#FFD166] p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform"
              >
                <div>
                  {/* Badge */}
                  <div className="inline-block px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-xs mb-4" style={{ backgroundColor: idx === 0 ? '#FF6B8B' : idx === 1 ? '#FFD166' : '#06D6A0', color: idx === 1 ? '#2B2D42' : '#FFFFFF' }}>
                    {badge.label}
                  </div>

                  <h3 className="text-xl font-black text-[#2B2D42] leading-tight">
                    {ev.title}
                  </h3>

                  {ev.description && (
                    <p className="text-xs text-[#2B2D42]/70 mt-1">
                      {ev.description}
                    </p>
                  )}

                  <div className="mt-5 space-y-3">
                    {/* Date */}
                    <div className="flex items-start gap-2.5 text-xs font-bold text-[#2B2D42]">
                      <div className="w-7 h-7 rounded-xl bg-[#FFE5EC] border border-[#FF6B8B] flex items-center justify-center shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-[#FF6B8B]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#2B2D42]/60 uppercase font-semibold">Tanggal</p>
                        <p className="font-bold">{eventDateFormatted}</p>
                      </div>
                    </div>

                    {/* Time */}
                    <div className="flex items-start gap-2.5 text-xs font-bold text-[#2B2D42]">
                      <div className="w-7 h-7 rounded-xl bg-[#FFF9E6] border border-[#FFD166] flex items-center justify-center shrink-0">
                        <Clock className="w-3.5 h-3.5 text-[#FFD166]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#2B2D42]/60 uppercase font-semibold">Waktu Pelaksanaan</p>
                        <p className="font-bold">
                          {ev.start_time} - {ev.end_time || 'Selesai'} {ev.timezone || 'WIB'}
                        </p>
                      </div>
                    </div>

                    {/* Venue */}
                    <div className="flex items-start gap-2.5 text-xs font-bold text-[#2B2D42]">
                      <div className="w-7 h-7 rounded-xl bg-[#EDF5FF] border border-[#4D96FF] flex items-center justify-center shrink-0">
                        <MapPin className="w-3.5 h-3.5 text-[#4D96FF]" />
                      </div>
                      <div>
                        <p className="text-[10px] text-[#2B2D42]/60 uppercase font-semibold">Tempat / Lokasi</p>
                        <p className="font-black text-[#2B2D42]">{ev.venue_name}</p>
                        <p className="text-[11px] font-normal text-[#2B2D42]/70 leading-relaxed mt-0.5">
                          {ev.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Calendar Action */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={getGoogleCalendarUrl(ev)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-[#FFF9E6] hover:bg-[#FFD166] text-[#2B2D42] border-2 border-[#2B2D42] text-xs font-black flex items-center justify-center gap-1.5 transition-all shadow-[2px_2px_0px_0px_#2B2D42]"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#FF6B8B]" />
                    <span>Simpan ke Google Kalender</span>
                    <ExternalLink className="w-3 h-3" />
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
