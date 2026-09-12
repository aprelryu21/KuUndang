import React from 'react';
import { motion } from 'motion/react';
import { WeddingEvent, Invitation } from '../../../types/wedding';
import { useLanguage } from '../../../context/LanguageContext';
import {
  JavaneseDivider,
  JavaneseCornerFlourish,
  BatikKawungPattern,
  JavaneseGebyokArch,
} from './javaneseAssets';
import { JavaneseGoldenParticles } from './JavaneseGoldenParticles';
import { Calendar, Clock, MapPin, ExternalLink, BookmarkCheck } from 'lucide-react';

interface JavaneseEventsSectionProps {
  events: WeddingEvent[];
  invitation: Invitation;
}

export const JavaneseEventsSection: React.FC<JavaneseEventsSectionProps> = ({ events, invitation }) => {
  const { t, language } = useLanguage();

  const handleAddToCalendar = (event: WeddingEvent) => {
    const coupleText = invitation ? `${invitation.groom_nickname} & ${invitation.bride_nickname}` : 'April & Siti';
    const title = encodeURIComponent(`${event.title} - ${coupleText}`);
    const details = encodeURIComponent(
      `Pahargyan Dhauping Penganten Adat Jawa. Lokasi: ${event.venue_name || event.venue}. ${event.description || ''}`
    );
    const location = encodeURIComponent(`${event.venue_name || event.venue}, ${event.address}`);
    const dateStr = event.date.replace(/-/g, '');
    const startTime = (event.start_time || '08:00').replace(':', '') + '00';
    const endTime = (event.end_time || '12:00').replace(':', '') + '00';

    const gcalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startTime}/${dateStr}T${endTime}&details=${details}&location=${location}`;
    window.open(gcalUrl, '_blank');
  };

  // Cultural Javanese explanations for each ritual
  const getRitualNote = (eventName?: string) => {
    const lower = (eventName || '').toLowerCase();
    if (lower.includes('akad') || lower.includes('ijab')) {
      return language === 'JW'
        ? '❖ Janji suci lan ijab kabul ing ngarsanipun wali, saksi, saha Gusti Ingkang Maha Kuwaos.'
        : '❖ Ikrar janji suci di hadapan penghulu, wali nikah, dan para saksi secara khidmat.';
    }
    if (lower.includes('resepsi') || lower.includes('pahargyan')) {
      return language === 'JW'
        ? '❖ Upacara Panggih Penganten (Balangan Gantal, Wijidadi, Sinduran, Kacar-Kucur) kalajengaken ramah tamah.'
        : '❖ Prosesi temu manten adat Jawa (Balangan Suruh, Injak Telur, Kacar-Kucur) dilanjutkan jamuan kebahagiaan.';
    }
    if (lower.includes('unduh')) {
      return language === 'JW'
        ? '❖ Boyong penganten dhumateng kulawarga ageng temanten kakung minangka tanda panampi besan.'
        : '❖ Penyambutan pengantin di kediaman keluarga pria sebagai ungkapan syukur keluarga besar.';
    }
    return language === 'JW'
      ? '❖ Rantaman adicara binerkahan kanthi donga pangestu sedaya kulawarga.'
      : '❖ Prosesi khidmat dengan penuh rasa syukur dan doa restu keluarga tercinta.';
  };

  return (
    <section
      id="javanese-events"
      className="py-20 sm:py-28 px-4 bg-[#1E110A] text-[#FAF6EE] relative overflow-hidden border-t border-[#D4AF37]/30"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at center, #2C1810 0%, #1E110A 70%, #120A05 100%)',
      }}
    >
      <BatikKawungPattern className="absolute inset-0 pointer-events-none opacity-8" />
      <JavaneseGoldenParticles count={15} showJasminePetals={true} />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-3">
          <JavaneseGebyokArch className="w-56 mx-auto mb-2 text-[#D4AF37]/80" />
          <p className="text-xs font-serif tracking-[0.25em] text-[#D4AF37] uppercase">
            {language === 'JW' ? 'RERONCENING ADICARA PALAKRAMA' : 'RANGKAIAN TATA CARA PERNIKAHAN'}
          </p>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-wide text-[#FAF6EE]">
            {language === 'JW' ? 'Rantaman Adicara' : 'Jadwal & Agenda Acara'}
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm font-serif text-[#FAF6EE]/75 leading-relaxed">
            {language === 'JW'
              ? 'Mugi Gusti paring kalancaran dhumateng sedaya lampahing tata upacara adat Jawa sakral ingkang sampun karantam.'
              : 'Dengan memohon rahmat dan ridho Allah SWT, berikut merupakan susunan waktu dan tempat pelaksanaan akad nikah serta resepsi pernikahan kami.'}
          </p>
          <JavaneseDivider className="my-4" />
        </div>

        {/* Events Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {events.map((event, idx) => {
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-[#24160E]/90 border-2 border-[#D4AF37]/70 rounded-2xl p-6 relative flex flex-col justify-between shadow-[0_8px_25px_rgba(0,0,0,0.7)]"
              >
                {/* Corner flourishes */}
                <div className="absolute top-2 left-2">
                  <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div className="absolute top-2 right-2 rotate-90">
                  <JavaneseCornerFlourish className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <div>
                  {/* Event Badge */}
                  <div className="inline-block px-3 py-1 rounded-full bg-[#1A1009] border border-[#D4AF37]/50 text-[10px] font-serif font-bold uppercase tracking-wider text-[#E5C158] mb-3">
                    {language === 'JW' ? `Adicara Ka-${idx + 1}` : `Bagian Ke-${idx + 1}`}
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#E5C158] mb-2">
                    {event.title}
                  </h3>

                  {/* Cultural Note */}
                  <p className="text-[11px] font-serif text-[#FAF6EE]/75 italic mb-4 leading-relaxed">
                    {getRitualNote(event.title)}
                  </p>

                  <div className="h-[1px] bg-[#D4AF37]/30 my-3" />

                  {/* Date, Time, Venue */}
                  <div className="space-y-2.5 text-xs font-serif text-[#FAF6EE]/90">
                    <div className="flex items-start gap-2.5">
                      <Calendar className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>
                        {event.start_time} - {event.end_time || 'Selesai'} WIB
                      </span>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-[#FAF6EE]">
                          {event.venue_name || event.venue}
                        </p>
                        <p className="text-[11px] text-[#FAF6EE]/70 mt-0.5 leading-snug">
                          {event.address}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-[#D4AF37]/30 space-y-2">
                  <button
                    type="button"
                    onClick={() => handleAddToCalendar(event)}
                    className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#9C7A1D] to-[#D4AF37] hover:from-[#B58E23] hover:to-[#E5C158] text-[#1A1009] font-serif font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-md cursor-pointer"
                  >
                    <BookmarkCheck className="w-4 h-4 text-[#1A1009]" />
                    <span>{t.saveToCalendar || 'SIMPAN KE KALENDER'}</span>
                  </button>

                  {event.maps_url && (
                    <a
                      href={event.maps_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2 px-4 rounded-xl bg-[#1A1009] hover:bg-[#2C1810] border border-[#D4AF37]/60 text-[#D4AF37] font-serif text-[11px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>{t.openGoogleMaps || 'BUKA GOOGLE MAPS'}</span>
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
