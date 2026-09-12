import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Heart } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CountdownSectionProps {
  weddingDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isToday: boolean;
  isPast: boolean;
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ weddingDate }) => {
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isToday: false,
    isPast: false,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Parse wedding date target
      const targetTime = new Date(`${weddingDate}T07:00:00`).getTime();
      const now = new Date().getTime();
      const difference = targetTime - now;

      // Check if same calendar day
      const todayStr = new Date().toISOString().split('T')[0];
      const isToday = todayStr === weddingDate;

      if (difference <= 0) {
        if (isToday) {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: true, isPast: false });
        } else {
          setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isToday: false, isPast: true });
        }
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds, isToday: false, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [weddingDate]);

  return (
    <section id="countdown" className="py-16 px-6 bg-[#EFE8DE] text-center relative overflow-hidden">
      <div className="max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFCF7] border border-[#C2A56B]/30 text-xs tracking-[0.2em] uppercase font-semibold text-[#283D52] mb-4">
          <Calendar className="w-3.5 h-3.5 text-[#C2A56B]" />
          <span>COUNTING DOWN TO OUR FOREVER</span>
        </div>

        {timeLeft.isToday ? (
          <div className="py-8">
            <h3 className="font-heading text-3xl sm:text-5xl text-[#283D52] font-semibold tracking-wide">
              TODAY IS THE DAY ♡
            </h3>
            <p className="mt-2 text-sm text-[#768692]">
              Hari bahagia telah tiba, mari rayakan bersama kami!
            </p>
          </div>
        ) : timeLeft.isPast ? (
          <div className="py-8">
            <h3 className="font-heading text-3xl sm:text-5xl text-[#283D52] font-semibold tracking-wide">
              THANK YOU FOR CELEBRATING WITH US ♡
            </h3>
            <p className="mt-2 text-sm text-[#768692]">
              Terima kasih atas segala cinta, doa, dan kehadiran Anda.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-lg mx-auto mt-6">
            {[
              { label: t.days, value: timeLeft.days },
              { label: t.hours, value: timeLeft.hours },
              { label: t.minutes, value: timeLeft.minutes },
              { label: t.seconds, value: timeLeft.seconds },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-center justify-center p-3 sm:p-5 bg-[#FFFCF7] rounded-t-3xl rounded-b-xl border border-[#C2A56B]/35 shadow-sm"
              >
                <span className="font-heading text-2xl sm:text-4xl md:text-5xl font-semibold text-[#283D52] tracking-tight">
                  {String(item.value).padStart(2, '0')}
                </span>
                <span className="mt-1 text-[9px] sm:text-[11px] tracking-[0.2em] font-semibold text-[#768692] uppercase">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#768692]">
          <Heart className="w-3.5 h-3.5 text-[#DFBFC1] fill-[#DFBFC1]" />
          <span className="font-accent text-xl text-[#C2A56B]">every second closer to forever</span>
        </div>
      </div>
    </section>
  );
};
