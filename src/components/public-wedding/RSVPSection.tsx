import React, { useState } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Check, Heart, Send, Users, Sparkles, MessageCircle } from 'lucide-react';
import { SectionSetting } from '../../types/wedding';
import { weddingService } from '../../services/weddingService';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { FloralCornerOrnament, VintageDivider } from './WeddingDecorations';

interface RSVPSectionProps {
  invitationId: string;
  defaultGuestName?: string;
  guestId?: string | null;
  section?: SectionSetting;
  onRSVPSubmitted?: () => void;
}

export const RSVPSection: React.FC<RSVPSectionProps> = ({
  invitationId,
  defaultGuestName = '',
  guestId = null,
  section,
  onRSVPSubmitted,
}) => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [name, setName] = useState(defaultGuestName);
  const [attendance, setAttendance] = useState<'attending' | 'not_attending'>('attending');
  const [guestCount, setGuestCount] = useState<number>(1);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedFeedback, setSubmittedFeedback] = useState<string | null>(null);

  // Sync if defaultGuestName updates
  React.useEffect(() => {
    if (defaultGuestName && !name) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName, name]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast(t.guestNamePlaceholder, 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      await weddingService.submitRSVP({
        invitation_id: invitationId,
        guest_id: guestId,
        guest_name: name.trim(),
        attendance,
        guest_count: attendance === 'attending' ? Number(guestCount) : 0,
        message: message.trim(),
      });

      if (attendance === 'attending') {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 },
          colors: ['#C2A56B', '#DFBFC1', '#283D52', '#FFFCF7'],
        });
        setSubmittedFeedback(t.rsvpFeedbackAttending(name.trim()));
        showToast(t.rsvpSuccessToastAttending, 'success');
      } else {
        setSubmittedFeedback(t.rsvpFeedbackDecline(name.trim()));
        showToast(t.rsvpSuccessToastDecline, 'info');
      }

      onRSVPSubmitted?.();
    } catch (err) {
      console.error('RSVP Error:', err);
      showToast('Gagal mengirim RSVP, silakan coba lagi', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="py-20 px-6 bg-[#F7F2EA] text-[#24313A] relative">
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-10">
          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#C2A56B] capitalize tracking-wide font-normal leading-tight">
            {section?.title || t.rsvpTitle}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[#768692] leading-relaxed">
            {section?.subtitle || t.rsvpSubtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#C2A56B]/35 shadow-sm text-left relative overflow-hidden"
        >
          {/* Decorative Floral Corner Ornaments */}
          <div className="absolute top-2 left-2 pointer-events-none opacity-60">
            <FloralCornerOrnament className="w-12 h-12" />
          </div>
          <div className="absolute top-2 right-2 pointer-events-none opacity-60">
            <FloralCornerOrnament className="w-12 h-12" flip />
          </div>
          {submittedFeedback ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="py-8 text-center"
            >
              <div className="w-14 h-14 rounded-full bg-[#DFBFC1]/30 border border-[#DFBFC1] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-7 h-7 text-[#DFBFC1] fill-[#DFBFC1]" />
              </div>
              <h3 className="font-heading text-2xl text-[#283D52] font-semibold">
                {submittedFeedback}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-[#768692]">
                {t.rsvpRecordedNotice}
              </p>
              <button
                type="button"
                onClick={() => setSubmittedFeedback(null)}
                className="mt-6 text-xs text-[#C2A56B] hover:text-[#283D52] font-semibold tracking-wider uppercase underline underline-offset-4 cursor-pointer"
              >
                {t.changeRsvp}
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div>
                <label
                  htmlFor="rsvp-name"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5"
                >
                  {t.guestNameLabel}
                </label>
                <input
                  id="rsvp-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.guestNamePlaceholder}
                  className="w-full px-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-sm text-[#24313A] placeholder:text-[#768692]/60 focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40 transition-all"
                />
              </div>

              {/* Attendance Toggle */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                  {t.attendanceLabel}
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAttendance('attending')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      attendance === 'attending'
                        ? 'bg-[#283D52] text-[#FFFCF7] border-[#283D52] shadow-sm'
                        : 'bg-[#F7F2EA] text-[#24313A] border-[#283D52]/15 hover:bg-[#EFE8DE]'
                    }`}
                  >
                    <Check className="w-4 h-4" />
                    <span>{t.attending}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAttendance('not_attending')}
                    className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                      attendance === 'not_attending'
                        ? 'bg-[#283D52] text-[#FFFCF7] border-[#283D52] shadow-sm'
                        : 'bg-[#F7F2EA] text-[#24313A] border-[#283D52]/15 hover:bg-[#EFE8DE]'
                    }`}
                  >
                    <span>{t.notAttending}</span>
                  </button>
                </div>
              </div>

              {/* Guest Count (Only if Attending) */}
              {attendance === 'attending' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <label
                    htmlFor="rsvp-count"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5"
                  >
                    {t.guestCountLabel}
                  </label>
                  <div className="relative">
                    <select
                      id="rsvp-count"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-sm text-[#24313A] focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40 transition-all appearance-none cursor-pointer"
                    >
                      {[1, 2, 3, 4, 5].map((num) => (
                        <option key={num} value={num}>
                          {num} {t.guestCountUnit}
                        </option>
                      ))}
                    </select>
                    <Users className="w-4 h-4 text-[#768692] absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </motion.div>
              )}

              {/* Message / Wishes */}
              <div>
                <label
                  htmlFor="rsvp-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5"
                >
                  {t.wishesLabel}
                </label>
                <textarea
                  id="rsvp-message"
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t.wishesPlaceholder}
                  className="w-full px-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-sm text-[#24313A] placeholder:text-[#768692]/60 focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                id="submit-rsvp-btn"
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] disabled:opacity-70 text-[#FFFCF7] text-xs sm:text-sm font-semibold tracking-wider uppercase transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>{t.sendingRsvp}</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-[#DFBFC1]" />
                    <span>{t.sendRsvp}</span>
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>

        {/* Vintage Divider */}
        <div className="mt-12">
          <VintageDivider className="w-48 sm:w-60 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
};
