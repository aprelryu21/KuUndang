import React from 'react';
import { motion } from 'motion/react';
import { Swords, Calendar, Clock, MapPin, ExternalLink, ShieldCheck, Compass } from 'lucide-react';
import { WeddingEvent } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';

interface Persona3EventsSectionProps {
  events: WeddingEvent[];
}

export const Persona3EventsSection: React.FC<Persona3EventsSectionProps> = ({ events }) => {
  const { t } = useLanguage();

  const sortedEvents = [...events].sort((a, b) => a.sort_order - b.sort_order);

  const getGoogleCalendarUrl = (event: WeddingEvent) => {
    const title = encodeURIComponent(event.title);
    const details = encodeURIComponent(
      `${event.description || 'Pernikahan Mempelai'}\nLokasi: ${event.venue}, ${event.address}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);
    const dateFormatted = event.date.replace(/-/g, '');
    const startTime = (event.start_time || '08:00').replace(':', '') + '00';
    const endTime = (event.end_time || '14:00').replace(':', '') + '00';

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateFormatted}T${startTime}/${dateFormatted}T${endTime}&details=${details}&location=${location}`;
  };

  return (
    <section id="acara" className="py-20 sm:py-28 bg-[#070E22] text-[#F0F8FF] relative overflow-hidden border-t-2 border-[#00D2FF]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-sm bg-[#0B1A3D] border border-[#00D2FF] text-xs font-mono font-bold tracking-[0.25em] text-[#00D2FF] mb-3 transform -skew-x-12 shadow-[0_0_15px_rgba(0,210,255,0.25)]">
            <Swords className="w-3.5 h-3.5 text-[#FFE600]" />
            <span>OPERATION PROTOCOL // WEDDING MISSIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black tracking-tight text-white uppercase font-sans">
            Jadwal Rangkaian Acara
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#A0C4E2] font-mono">
            // TACTICAL BRIEFING: AKAD NIKAH & RESEPSI SIDOARJO - KEDIRI
          </p>
        </div>

        {/* Missions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {sortedEvents.map((evt, idx) => {
            const operationNum = String(idx + 1).padStart(2, '0');
            const isAkad = evt.event_type === 'akad' || (evt.title || '').toLowerCase().includes('akad');

            return (
              <motion.div
                key={evt.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative rounded-3xl bg-[#081226] border-2 border-[#00D2FF]/60 hover:border-[#FFE600] p-6 sm:p-7 shadow-[0_0_20px_rgba(0,210,255,0.15)] hover:shadow-[0_0_25px_rgba(255,230,0,0.25)] transition-all flex flex-col justify-between group transform hover:-translate-y-1"
              >
                {/* Slanted Operation Badge */}
                <div>
                  <div className="flex items-center justify-between border-b border-[#00D2FF]/30 pb-3 mb-5">
                    <span className="px-2.5 py-1 rounded-xs bg-[#FFE600] text-[#050B18] text-[10px] font-mono font-black tracking-widest uppercase shadow-xs">
                      OPERATION {operationNum}
                    </span>
                    <span className="text-[10px] font-mono text-[#00D2FF] font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#00D2FF]" />
                      <span>{isAkad ? 'SAKRAL & PRIMARY' : 'CELEBRATION'}</span>
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-white font-sans uppercase group-hover:text-[#FFE600] transition-colors">
                    {evt.title}
                  </h3>

                  {evt.description && (
                    <p className="mt-2 text-xs text-[#A0C4E2] font-sans">
                      {evt.description}
                    </p>
                  )}

                  {/* Time & Venue Details */}
                  <div className="mt-6 space-y-3 font-mono text-xs">
                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1E42] border border-[#00D2FF]/30">
                      <Calendar className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-[#A0C4E2] block uppercase tracking-wider">TANGGAL PELAKSANAAN</span>
                        <span className="font-bold text-white text-xs">{evt.date}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1E42] border border-[#00D2FF]/30">
                      <Clock className="w-4 h-4 text-[#00D2FF] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-[#A0C4E2] block uppercase tracking-wider">WAKTU OPERASIONAL</span>
                        <span className="font-bold text-white text-xs">
                          {evt.start_time} {evt.end_time ? `- ${evt.end_time}` : 'WIB - Selesai'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-2.5 rounded-xl bg-[#0E1E42] border border-[#00D2FF]/30">
                      <MapPin className="w-4 h-4 text-[#FFE600] shrink-0 mt-0.5" />
                      <div>
                        <span className="text-[9px] text-[#A0C4E2] block uppercase tracking-wider">TARGET LOKASI VENUE</span>
                        <span className="font-bold text-white text-xs block font-sans">{evt.venue}</span>
                        <span className="text-[11px] text-[#A0C4E2] block font-sans mt-0.5">{evt.address}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tactical Buttons */}
                <div className="mt-6 pt-4 border-t border-[#00D2FF]/30 flex flex-col gap-2">
                  {evt.maps_url && (
                    <a
                      href={evt.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#00D2FF] hover:bg-[#FFE600] text-[#050B18] font-mono text-xs font-black uppercase tracking-wider shadow-md active:scale-98 transition-all cursor-pointer"
                    >
                      <Compass className="w-4 h-4" />
                      <span>RUTE GOOGLE MAPS</span>
                    </a>
                  )}

                  <a
                    href={getGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#0E1E42] hover:bg-[#162A5A] text-[#A0C4E2] hover:text-white border border-[#00D2FF]/40 font-mono text-[11px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#FFE600]" />
                    <span>SIMPAN DI GOOGLE CALENDAR</span>
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
