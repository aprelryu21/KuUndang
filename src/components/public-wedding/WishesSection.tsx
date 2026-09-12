import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquareHeart,
  Clock,
  ChevronDown,
  Send,
  Heart,
  Sparkles,
  User,
} from 'lucide-react';
import { Wish } from '../../types/wedding';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';
import { weddingService } from '../../services/weddingService';

interface WishesSectionProps {
  wishes: Wish[];
  invitationId?: string;
  defaultGuestName?: string;
  onWishAdded?: () => void;
}

export const WishesSection: React.FC<WishesSectionProps> = ({
  wishes: initialWishes,
  invitationId = 'inv-april-siti-01',
  defaultGuestName = '',
  onWishAdded,
}) => {
  const { t, language } = useLanguage();
  const { showToast } = useToast();

  const [wishesList, setWishesList] = useState<Wish[]>(initialWishes);
  const [name, setName] = useState(defaultGuestName);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [visibleCount, setVisibleCount] = useState(4);
  const [likedIds, setLikedIds] = useState<Record<string, boolean>>({});

  // Sync if prop changes
  React.useEffect(() => {
    setWishesList(initialWishes);
  }, [initialWishes]);

  React.useEffect(() => {
    if (defaultGuestName && !name) {
      setName(defaultGuestName);
    }
  }, [defaultGuestName]);

  // Helper for relative time
  const formatTime = (timeStr: string) => {
    try {
      const date = new Date(timeStr);
      const locale =
        language === 'ID'
          ? 'id-ID'
          : language === 'JP'
          ? 'ja-JP'
          : language === 'CN'
          ? 'zh-CN'
          : 'en-US';
      return date.toLocaleDateString(locale, {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return '';
    }
  };

  const handleSubmitWish = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = (name || '').trim();
    const cleanMessage = (message || '').trim();

    if (!cleanName || !cleanMessage) {
      showToast('Silakan isi nama dan ucapan Anda ♡', 'error');
      return;
    }

    setIsSubmitting(true);

    const newWishItem: Wish = {
      id: `wish-${Date.now()}`,
      invitation_id: invitationId,
      guest_name: cleanName,
      message: cleanMessage,
      status: 'approved',
      created_at: new Date().toISOString(),
    };

    try {
      await weddingService.submitWish({
        invitation_id: invitationId,
        guest_name: cleanName,
        message: cleanMessage,
      });

      // Optimistic update
      setWishesList((prev) => [newWishItem, ...prev]);
      setMessage('');
      showToast(t.wishSuccessToast, 'success');
      onWishAdded?.();
    } catch (err) {
      // Still add locally for seamless experience
      setWishesList((prev) => [newWishItem, ...prev]);
      setMessage('');
      showToast(t.wishSuccessToast, 'success');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleLike = (id: string) => {
    setLikedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const displayedWishes = wishesList.slice(0, visibleCount);

  return (
    <section id="wishes" className="py-20 px-4 sm:px-6 bg-[#EFE8DE] text-[#24313A] relative">
      <div className="max-w-3xl mx-auto text-center">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#C2A56B] capitalize tracking-wide font-normal leading-tight">
            {t.wishesTitle}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {t.wishesSubtitle}
          </p>
        </motion.div>

        {/* Input Form Card for Wishing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#C2A56B]/40 shadow-sm mb-12 text-left"
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#EFE8DE]">
            <div className="w-8 h-8 rounded-xl bg-[#283D52] flex items-center justify-center text-[#FFFCF7] shadow-xs">
              <Sparkles className="w-4 h-4 text-[#DFBFC1]" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#283D52]">
                {t.sendWishPrompt}
              </h3>
              <p className="text-[11px] text-[#768692]">
                Tinggalkan jejak kenangan doa tulus Anda untuk Shofwan & Allya
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmitWish} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                {t.yourName}
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t.guestNamePlaceholder}
                  maxLength={60}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs sm:text-sm text-[#24313A] placeholder:text-[#768692]/60 focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40"
                />
                <User className="w-4 h-4 text-[#768692] absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                {t.wishesLabel}
              </label>
              <textarea
                required
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.yourWish}
                maxLength={400}
                className="w-full px-4 py-3 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs sm:text-sm text-[#24313A] placeholder:text-[#768692]/60 focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40 resize-none leading-relaxed"
              />
              <div className="flex justify-between items-center text-[10px] text-[#768692] mt-1">
                <span>Pesan akan langsung tampil di buku tamu pernikahan</span>
                <span>{message.length}/400</span>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] disabled:opacity-60 text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
            >
              {isSubmitting ? (
                <span>{t.submittingWish}</span>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5 text-[#DFBFC1]" />
                  <span>{t.submitWish}</span>
                </>
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Wishes List as Handwritten Keepsake Cards */}
        <div className="space-y-4 text-left">
          {displayedWishes.length === 0 ? (
            <div className="py-12 px-6 rounded-3xl bg-[#FFFCF7] border border-[#C2A56B]/30 text-center">
              <p className="text-xs sm:text-sm text-[#768692] italic">
                {t.emptyWishes}
              </p>
            </div>
          ) : (
            <AnimatePresence>
              {displayedWishes.map((wish, index) => {
                const isLiked = !!likedIds[wish.id];
                return (
                  <motion.div
                    key={wish.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="p-5 sm:p-6 rounded-2xl bg-[#FFFCF7] border border-[#C2A56B]/30 shadow-xs relative hover:border-[#C2A56B]/60 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#DFBFC1]/30 flex items-center justify-center text-xs font-semibold text-[#283D52] shadow-xs">
                          {wish.guest_name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-heading text-lg sm:text-xl font-semibold text-[#283D52] block leading-tight">
                            {wish.guest_name}
                          </span>
                          <span className="text-[10px] text-[#768692] flex items-center gap-1 font-medium">
                            <Clock className="w-2.5 h-2.5 text-[#C2A56B]" />
                            {formatTime(wish.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Like heart reaction */}
                      <button
                        type="button"
                        onClick={() => toggleLike(wish.id)}
                        className={`p-1.5 rounded-full transition-transform hover:scale-115 cursor-pointer ${
                          isLiked
                            ? 'text-rose-500 bg-rose-50'
                            : 'text-[#768692]/60 hover:text-rose-400'
                        }`}
                        title="Suka ucapan ini"
                      >
                        <Heart
                          className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                        />
                      </button>
                    </div>

                    <p className="text-xs sm:text-sm text-[#24313A]/90 font-serif italic leading-relaxed pl-10 border-l-2 border-[#DFBFC1]/50">
                      "{wish.message}"
                    </p>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          )}
        </div>

        {/* Load More Button */}
        {visibleCount < wishesList.length && (
          <div className="mt-8">
            <button
              type="button"
              onClick={() => setVisibleCount((prev) => prev + 4)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FFFCF7] border border-[#283D52]/20 hover:border-[#C2A56B] text-xs font-semibold uppercase tracking-wider text-[#283D52] hover:text-[#C2A56B] transition-all shadow-xs cursor-pointer"
            >
              <span>
                {t.viewMoreWishes} ({wishesList.length - visibleCount})
              </span>
              <ChevronDown className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
