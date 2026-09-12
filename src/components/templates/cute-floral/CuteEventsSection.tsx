import React from 'react';
import { motion } from 'motion/react';
import { WeddingEvent, Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  CuteDaisyFlower,
  CuteSakuraFlower,
  CuteTulipFlower,
  CuteFloralDivider,
  WashiTape,
} from './cuteFloralAssets';
import { CuteFloralParticles } from './CuteFloralParticles';
import { Calendar, Clock, MapPin, ExternalLink, BookmarkCheck } from 'lucide-react';

interface CuteEventsSectionProps {
  events: WeddingEvent[];
  invitation: Invitation;
}

export const CuteEventsSection: React.FC<CuteEventsSectionProps> = ({ events, invitation }) => {
  const { language } = useLanguage();

  const handleAddToCalendar = (event: WeddingEvent) => {
    const coupleText = invitation ? `${invitation.groom_nickname} & ${invitation.bride_nickname}` : 'April & Siti';
    const title = encodeURIComponent(`${event.title} - ${coupleText}`);
    const details = encodeURIComponent(
      `Pernikahan Bahagia ${coupleText}. Lokasi: ${event.venue_name || event.venue}. ${event.description || ''}`
    );
    const location = encodeURIComponent(`${event.venue_name || event.venue}, ${event.address}`);
    const dateStr = event.date.replace(/-/g, '');
    const startTime = (event.start_time || '08:00').replace(':', '') + '00';
    const endTime = (event.end_time || '12:00').replace(':', '') + '00';

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  return (
    <section
      id="cute-events"
      className="py-20 sm:py-28 px-4 bg-gradient-to-b from-[#FFF5F8] via-[#FFEBF1] to-[#FFF0F5] text-[#4A2E35] relative overflow-hidden border-t border-[#FFCCD7]"
    >
      <CuteFloralParticles count={16} showFlowers={true} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <div className="flex items-center justify-center gap-2">
            <CuteDaisyFlower className="w-6 h-6" />
            <p className="text-xs font-sans font-bold uppercase tracking-[0.25em] text-[#FF5C8D]">
              {language === 'JW' ? 'RERONCENING TATA ADICARA' : 'RANGKAIAN ACARA BAHAGIA'}
            </p>
            <CuteDaisyFlower className="w-6 h-6" />
          </div>

          <h2 className="font-heading text-3xl sm:text-5xl font-bold text-[#E03164] tracking-wide">
            {language === 'JW' ? 'Rantaman Adicara' : 'Jadwal & Tempat Acara'}
          </h2>

          <p className="max-w-xl mx-auto text-xs sm:text-sm font-sans text-[#6B3E48] leading-relaxed">
            Dengan penuh rasa syukur, kami mengundang Bapak/Ibu/Saudara/i untuk hadir dan memberikan doa restu pada rangkaian prosesi pernikahan kami:
          </p>
          <CuteFloralDivider />
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FF85A2]/60 shadow-[0_10px_35px_rgba(255,133,162,0.18)] relative flex flex-col justify-between group hover:border-[#FF5C8D] transition-all"
            >
              {/* Washi Tape Accent */}
              <div className="absolute -top-3 left-8 rotate-[-1deg]">
                <WashiTape className="w-20 h-5" color={idx % 2 === 0 ? 'pink' : 'yellow'} />
              </div>

              <div>
                {/* Event Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0F5] border border-[#FFA3B8] text-[11px] font-sans font-bold text-[#FF5C8D] mb-3 mt-1">
                  <CuteSakuraFlower className="w-3.5 h-3.5" />
                  <span>Acara Ke-{idx + 1}</span>
                </div>

                <h3 className="font-heading text-2xl font-bold text-[#4A2E35] mb-3">
                  {event.title}
                </h3>

                <div className="space-y-2.5 text-xs sm:text-sm font-sans text-[#6B3E48]">
                  {/* Date */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7]/60">
                    <Calendar className="w-4 h-4 text-[#FF5C8D] shrink-0" />
                    <span className="font-semibold text-[#4A2E35]">
                      {new Date(event.date).toLocaleDateString('id-ID', {
                        weekday: 'long',
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7]/60">
                    <Clock className="w-4 h-4 text-[#FF5C8D] shrink-0" />
                    <span>
                      Pukul {event.start_time || '08:00'} - {event.end_time || 'Selesai'} WIB
                    </span>
                  </div>

                  {/* Venue & Address */}
                  <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#FFF9FB] border border-[#FFCCD7]/60">
                    <MapPin className="w-4 h-4 text-[#FF5C8D] shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-[#4A2E35] text-xs sm:text-sm">
                        {event.venue_name || event.venue}
                      </strong>
                      <p className="text-[11px] sm:text-xs text-[#8A505F] mt-0.5 leading-snug">
                        {event.address}
                      </p>
                    </div>
                  </div>

                  {event.description && (
                    <p className="text-xs text-[#8A505F] italic pt-1">
                      {event.description}
                    </p>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-4 border-t border-[#FFCCD7]/60 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => handleAddToCalendar(event)}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#FFF0F5] hover:bg-[#FFE4EC] text-[#FF5C8D] border border-[#FFA3B8] font-sans text-xs font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <BookmarkCheck className="w-3.5 h-3.5" />
                  <span>Simpan ke Google Kalender</span>
                </button>

                {event.maps_url && (
                  <a
                    href={event.maps_url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#FF5C8D] to-[#FF477E] hover:from-[#E03164] hover:to-[#E03164] text-white font-sans text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs hover:scale-[1.02]"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Petunjuk Arah (Maps)</span>
                    <ExternalLink className="w-3 h-3 ml-auto opacity-70" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
