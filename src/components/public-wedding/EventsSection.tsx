import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Clock, Calendar, ExternalLink, CalendarPlus } from 'lucide-react';
import { WeddingEvent, Invitation, SectionSetting } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { FloralCornerOrnament, VintageDivider } from './WeddingDecorations';

interface EventsSectionProps {
  events: WeddingEvent[];
  invitation?: Invitation;
  section?: SectionSetting;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, invitation, section }) => {
  const { t, language } = useLanguage();

  // Helper to format date
  const formatEventDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const locale = language === 'ID' ? 'id-ID' : language === 'JP' ? 'ja-JP' : language === 'CN' ? 'zh-CN' : 'en-US';
      return date.toLocaleDateString(locale, {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
    } catch {
      return dateStr;
    }
  };

  // Helper to generate Google Calendar link
  const createGoogleCalendarLink = (event: WeddingEvent) => {
    const title = encodeURIComponent(`${event.title} — Ahmad Shofwan & Allya Malida`);
    const details = encodeURIComponent(
      `${event.description || 'Pernikahan Ahmad Shofwan & Allya Malida'}\nLokasi: ${event.venue}, ${event.address}`
    );
    const location = encodeURIComponent(`${event.venue}, ${event.address}`);

    // Parse simple start date (e.g. 2026-09-28)
    const cleanDate = event.date.replace(/-/g, '');
    const startTimeStr = event.start_time.includes('07') ? '070000' : '090000';
    const endTimeStr = event.start_time.includes('07') ? '090000' : '150000';
    const dates = `${cleanDate}T${startTimeStr}/${cleanDate}T${endTimeStr}`;

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  };

  // Download .ics file
  const downloadIcs = (event: WeddingEvent) => {
    const cleanDate = event.date.replace(/-/g, '');
    const startTimeStr = event.start_time.includes('07') ? '070000' : '090000';
    const endTimeStr = event.start_time.includes('07') ? '090000' : '150000';

    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//KU UNDANG//ID',
      'BEGIN:VEVENT',
      `SUMMARY:${event.title} - Ahmad Shofwan & Allya Malida`,
      `DESCRIPTION:${event.description || 'Pernikahan Shofwan & Allya'}`,
      `LOCATION:${event.venue}, ${event.address}`,
      `DTSTART:${cleanDate}T${startTimeStr}`,
      `DTEND:${cleanDate}T${endTimeStr}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `${event.title.replace(/\s+/g, '_')}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="events" className="relative py-20 px-6 bg-[#24313A] text-[#FFFCF7] overflow-hidden">
      {/* Background Image with Romantic Atmosphere Wash */}
      <div className="absolute inset-0 z-0">
        <img
          src={invitation?.events_image || invitation?.hero_image || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1600&auto=format&fit=crop'}
          alt="Wedding Events Background"
          className="w-full h-full object-cover object-center filter brightness-[0.38] contrast-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#24313A]/90 via-[#24313A]/75 to-[#24313A]/90" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="mb-14">
          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#E8C682] capitalize tracking-wide font-normal drop-shadow-md">
            {section?.title || t.weddingEvents}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#DFBFC1] leading-relaxed font-sans">
            {section?.subtitle || t.weAreGettingMarried}
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.15 }}
              className="flex flex-col justify-between p-8 bg-[#FFFCF7] rounded-3xl border border-[#C2A56B]/35 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden text-left group"
            >
              {/* Corner Floral Decoration */}
              <div className="absolute top-2 right-2 pointer-events-none opacity-50 group-hover:opacity-80 transition-opacity">
                <FloralCornerOrnament className="w-12 h-12" flip />
              </div>

              {/* Event Header Pill */}
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#DFBFC1]/25 text-[#283D52] text-[11px] font-semibold uppercase tracking-wider mb-4 border border-[#DFBFC1]/40">
                  <span>{event.event_type}</span>
                </div>

                <h3 className="font-heading text-2xl sm:text-3xl text-[#283D52] font-semibold tracking-wide">
                  {t.content?.events?.[event.event_type as 'akad' | 'reception']?.title || event.title}
                </h3>

                {(t.content?.events?.[event.event_type as 'akad' | 'reception']?.description || event.description) && (
                  <p className="mt-2 text-xs text-[#768692] italic leading-relaxed">
                    {t.content?.events?.[event.event_type as 'akad' | 'reception']?.description || event.description}
                  </p>
                )}

                <div className="w-12 h-[1px] bg-[#C2A56B]/40 my-5" />

                {/* Details list */}
                <div className="space-y-3 text-xs sm:text-sm text-[#24313A]">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#C2A56B] shrink-0" />
                    <span className="font-medium">{formatEventDate(event.date)}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-[#C2A56B] shrink-0" />
                    <span>
                      {event.start_time} {event.end_time ? `– ${event.end_time}` : ''}
                    </span>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-[#C2A56B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-[#283D52]">{event.venue}</p>
                      <p className="text-[#768692] text-xs leading-relaxed mt-0.5">
                        {event.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons: Save to Calendar */}
              <div className="mt-8 pt-4 border-t border-[#EFE8DE] flex flex-wrap items-center gap-2.5">
                <a
                  href={createGoogleCalendarLink(event)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold tracking-wider uppercase transition-colors shadow-xs cursor-pointer"
                  title="Simpan ke Google Calendar"
                >
                  <CalendarPlus className="w-3.5 h-3.5 text-[#DFBFC1]" />
                  <span>{t.saveToCalendar}</span>
                </a>

                <button
                  type="button"
                  onClick={() => downloadIcs(event)}
                  className="flex items-center justify-center py-2.5 px-3.5 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] border border-[#283D52]/15 text-[#283D52] text-xs font-medium transition-colors cursor-pointer"
                  title="Download .ics file (Apple & Outlook Calendar)"
                >
                  <span>.ICS</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vintage Divider */}
        <div className="mt-14">
          <VintageDivider className="w-52 sm:w-68 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
};
