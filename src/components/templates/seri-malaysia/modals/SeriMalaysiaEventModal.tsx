import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, MapPin, ExternalLink, CalendarPlus } from 'lucide-react';
import { WeddingInvitation } from '../../../../types/wedding';

interface SeriMalaysiaEventModalProps {
  wedding: WeddingInvitation;
  onClose: () => void;
}

export const SeriMalaysiaEventModal: React.FC<SeriMalaysiaEventModalProps> = ({
  wedding,
  onClose,
}) => {
  const events = wedding.events || [];
  const primaryEvent = events[0];

  // Countdown timer logic
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDateStr = primaryEvent?.event_date || wedding.wedding_date || '2026-12-31';
    const targetTime = new Date(`${targetDateStr}T${primaryEvent?.start_time || '09:00:00'}`).getTime();

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [primaryEvent, wedding.wedding_date]);

  // Google Calendar Link generator
  const createGoogleCalendarUrl = (event: (typeof events)[0]) => {
    const title = encodeURIComponent(`Pernikahan ${wedding.title || 'Bahagia'}`);
    const details = encodeURIComponent(
      `Pernikahan bahagia kami di ${event.location || event.place_name || ''}. Kehadiran Anda merupakan kehormatan bagi kami.`
    );
    const location = encodeURIComponent(event.address || event.location || '');
    const dateStr = (event.event_date || wedding.wedding_date || '').replace(/-/g, '');
    const startHour = (event.start_time || '09:00').replace(/:/g, '').padEnd(6, '0');
    const endHour = (event.end_time || '14:00').replace(/:/g, '').padEnd(6, '0');

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateStr}T${startHour}/${dateStr}T${endHour}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
          aria-label="Tutup Modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>📜 Meja Tamu & Rangkaian Acara</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Agenda & Lokasi Acara
          </h2>
          <p className="text-sm text-[#7A634F] mt-1">
            Dengan penuh rasa syukur, kami mengundang Anda untuk hadir pada momen suci kami
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* Countdown Timer Display */}
        <div className="bg-[#4C030A] text-[#FFFCF3] rounded-2xl p-4 sm:p-5 mb-6 border border-[#D7BB83] shadow-md text-center">
          <div className="text-xs uppercase tracking-widest text-[#D7BB83] mb-3 font-semibold">
            Hitung Mundur Hari Bahagia
          </div>
          <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-sm mx-auto">
            <div className="bg-[#8A1B26] p-2 sm:p-3 rounded-xl border border-[#D7BB83]/30">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#FFFCF3]">
                {timeLeft.days}
              </div>
              <div className="text-[10px] text-[#D7BB83] uppercase">Hari</div>
            </div>
            <div className="bg-[#8A1B26] p-2 sm:p-3 rounded-xl border border-[#D7BB83]/30">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#FFFCF3]">
                {timeLeft.hours}
              </div>
              <div className="text-[10px] text-[#D7BB83] uppercase">Jam</div>
            </div>
            <div className="bg-[#8A1B26] p-2 sm:p-3 rounded-xl border border-[#D7BB83]/30">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#FFFCF3]">
                {timeLeft.minutes}
              </div>
              <div className="text-[10px] text-[#D7BB83] uppercase">Menit</div>
            </div>
            <div className="bg-[#8A1B26] p-2 sm:p-3 rounded-xl border border-[#D7BB83]/30">
              <div className="text-xl sm:text-2xl font-bold font-serif text-[#FFFCF3]">
                {timeLeft.seconds}
              </div>
              <div className="text-[10px] text-[#D7BB83] uppercase">Detik</div>
            </div>
          </div>
        </div>

        {/* Event Cards List */}
        <div className="space-y-4 sm:space-y-6">
          {events.length > 0 ? (
            events.map((evt, idx) => (
              <div
                key={evt.id || idx}
                className="p-5 sm:p-6 rounded-2xl bg-white/90 border border-[#D7BB83]/40 shadow-sm hover:border-[#D7BB83] transition-colors"
              >
                <div className="flex items-center justify-between gap-2 border-b border-[#D7BB83]/30 pb-3 mb-4">
                  <h3 
                    className="text-xl sm:text-2xl font-bold text-[#4C030A]"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    {evt.title || (idx === 0 ? 'Akad Nikah / Ijab Kabul' : 'Resepsi Pernikahan')}
                  </h3>
                  <span className="px-3 py-1 rounded-full bg-[#D7BB83]/20 text-[#4C030A] text-xs font-semibold">
                    {idx === 0 ? 'Sakral' : 'Walimah'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm mb-4">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[#8A1B26] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs text-[#7A634F] block">Hari & Tanggal:</span>
                      <strong className="text-[#4C030A]">
                        {evt.event_date
                          ? new Date(evt.event_date).toLocaleDateString('id-ID', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })
                          : 'Sabtu, 20 Oktober 2026'}
                      </strong>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#8A1B26] shrink-0 mt-1" />
                    <div>
                      <span className="text-xs text-[#7A634F] block">Waktu Acara:</span>
                      <strong className="text-[#4C030A]">
                        {evt.start_time || '09:00'} - {evt.end_time || 'Selesai'} {evt.timezone || 'WIB'}
                      </strong>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2.5 text-sm p-3 bg-[#FFFCF3] rounded-xl border border-[#D7BB83]/30 mb-4">
                  <MapPin className="w-4 h-4 text-[#8A1B26] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#4C030A] block">
                      {evt.place_name || evt.location || 'Gedung Pertemuan Utama'}
                    </strong>
                    <p className="text-xs text-[#7A634F] mt-0.5">
                      {evt.address || evt.location || 'Jl. Raya Utama No. 12, Kompleks Taman Indah'}
                    </p>
                  </div>
                </div>

                {/* Action Buttons: Add to Calendar & Google Maps */}
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={createGoogleCalendarUrl(evt)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#4C030A] text-[#FFFCF3] text-xs font-medium hover:bg-[#8A1B26] transition-colors shadow-sm"
                  >
                    <CalendarPlus className="w-4 h-4 text-[#D7BB83]" />
                    <span>Simpan Kalender</span>
                  </a>

                  {(evt.map_url || evt.google_maps_url || evt.address) && (
                    <a
                      href={
                        evt.google_maps_url ||
                        evt.map_url ||
                        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${evt.place_name || ''} ${evt.address || evt.location || ''}`
                        )}`
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#4C030A] text-[#4C030A] text-xs font-medium hover:bg-[#4C030A]/10 transition-colors shadow-sm"
                    >
                      <ExternalLink className="w-4 h-4 text-[#8A1B26]" />
                      <span>Petunjuk Arah Maps</span>
                    </a>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center p-8 bg-white/60 rounded-2xl border border-dashed border-[#D7BB83]">
              <Calendar className="w-10 h-10 text-[#D7BB83] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#4C030A]">Jadwal Acara Segera Diumumkan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
