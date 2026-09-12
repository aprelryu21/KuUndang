import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check, Gift, CreditCard, Smartphone, Home } from 'lucide-react';
import { GiftAccount } from '../../types/wedding';
import { useToast } from '../../context/ToastContext';
import { useLanguage } from '../../context/LanguageContext';
import { GiftBoxIllustration, VintageDivider } from './WeddingDecorations';

interface GiftSectionProps {
  gifts: GiftAccount[];
}

export const GiftSection: React.FC<GiftSectionProps> = ({ gifts }) => {
  const { t } = useLanguage();
  const { showToast } = useToast();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast(t.copiedToast, 'success');
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  const getIcon = (type: GiftAccount['type']) => {
    switch (type) {
      case 'bank':
        return <CreditCard className="w-5 h-5 text-[#C2A56B]" />;
      case 'ewallet':
        return <Smartphone className="w-5 h-5 text-[#C2A56B]" />;
      case 'address':
        return <Home className="w-5 h-5 text-[#C2A56B]" />;
      default:
        return <Gift className="w-5 h-5 text-[#C2A56B]" />;
    }
  };

  return (
    <section id="gifts" className="py-20 px-6 bg-[#F7F2EA] text-[#24313A] relative">
      <div className="max-w-3xl mx-auto text-center">
        <div className="mb-14 flex flex-col items-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <GiftBoxIllustration className="w-20 h-20 sm:w-24 sm:h-24" />
          </motion.div>

          <h2 className="font-accent text-4xl sm:text-5xl md:text-6xl text-[#C2A56B] capitalize tracking-wide font-normal leading-tight">
            {t.weddingGiftTitle}
          </h2>
          <p className="mt-3 max-w-md mx-auto text-xs sm:text-sm text-[#768692] leading-relaxed">
            {t.giftQuote}
          </p>
          <p className="mt-1 max-w-md mx-auto text-xs text-[#768692] leading-relaxed">
            {t.giftSubtitle}
          </p>
        </div>

        {/* Gift Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
          {gifts.map((item, index) => {
            const isCopied = copiedId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-3xl bg-[#FFFCF7] border border-[#C2A56B]/35 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-[#EFE8DE] flex items-center justify-center">
                        {getIcon(item.type)}
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#283D52]">
                        {item.provider}
                      </span>
                    </div>

                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#DFBFC1]/30 text-[#283D52] font-medium capitalize">
                      {item.type === 'bank'
                        ? t.bankTransfer
                        : item.type === 'ewallet'
                        ? t.eWallet
                        : t.physicalGift}
                    </span>
                  </div>

                  <p className="font-heading text-xl sm:text-2xl font-bold tracking-wider text-[#283D52] break-all select-all font-mono">
                    {item.account_number}
                  </p>

                  <p className="mt-1 text-xs text-[#768692]">
                    a.n. <span className="font-semibold text-[#24313A]">{item.account_name}</span>
                  </p>

                  {item.description && (
                    <p className="mt-2 text-[11px] text-[#768692] leading-relaxed italic">
                      {item.description}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-4 border-t border-[#EFE8DE]">
                  <button
                    type="button"
                    onClick={() => handleCopy(item.id, item.account_number)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold tracking-wider uppercase transition-all shadow-xs cursor-pointer"
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-4 h-4 text-[#DFBFC1]" />
                        <span>{t.copiedSuccess}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 text-[#DFBFC1]" />
                        <span>{t.copyNumber}</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Vintage Divider */}
        <div className="mt-12">
          <VintageDivider className="w-48 sm:w-64 h-6 opacity-70" />
        </div>
      </div>
    </section>
  );
};
