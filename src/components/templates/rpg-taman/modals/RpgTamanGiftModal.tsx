import React, { useState } from 'react';
import { X, Gift, Copy, Check, CreditCard, Package } from 'lucide-react';
import { WeddingInvitation } from '../../../../types/wedding';

interface SeriMalaysiaGiftModalProps {
  wedding: WeddingInvitation;
  onClose: () => void;
}

export const SeriMalaysiaGiftModal: React.FC<SeriMalaysiaGiftModalProps> = ({
  wedding,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const giftInfo = wedding.gift_info;
  const bankAccounts = giftInfo?.bank_accounts || [
    { bank_name: 'BCA', account_number: '1234567890', account_name: 'April Rian' },
    { bank_name: 'Mandiri', account_number: '0987654321', account_name: 'Siti Fatimah' },
  ];

  const physicalAddress =
    giftInfo?.address ||
    wedding.events?.[0]?.address ||
    'Jl. Cendrawasih No. 88, Menteng, Jakarta Pusat';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#FFFCF3] border-4 border-[#D7BB83] shadow-2xl p-6 sm:p-8 text-[#2A1713]"
        style={{ fontFamily: "'Poppins', sans-serif" }}
      >
        {/* Close Button & ESC hint */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <span className="hidden sm:inline-block text-[10px] text-[#7A634F] bg-[#4C030A]/5 px-2 py-1 rounded border border-[#D7BB83]/40">
            Tekan ESC untuk tutup
          </span>
          <button
            onClick={onClose}
            className="p-2 text-[#4C030A] hover:bg-[#4C030A]/10 rounded-full transition-colors"
            aria-label="Tutup Modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#4C030A]/10 text-[#4C030A] text-xs font-semibold uppercase tracking-wider mb-2">
            <span>🎁 Paviliun Hadiah & Tanda Kasih</span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl text-[#4C030A] font-serif font-bold"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Tanda Kasih & Hadiah
          </h2>
          <p className="text-xs sm:text-sm text-[#7A634F] mt-1 max-w-md mx-auto">
            Doa restu Anda merupakan karunia terindah bagi kami. Namun jika Anda bermaksud memberi tanda kasih, kami menyediakan sarana berikut:
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#D7BB83] to-transparent mx-auto mt-3" />
        </div>

        {/* Digital Envelope (Bank Accounts) */}
        <div className="space-y-4 mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4C030A] uppercase tracking-wider">
            <CreditCard className="w-4 h-4 text-[#8A1B26]" />
            <span>Rekening Bank / Amplop Digital</span>
          </div>

          {bankAccounts.map((acc, idx) => (
            <div
              key={idx}
              className="p-4 sm:p-5 rounded-2xl bg-white border-2 border-[#D7BB83]/40 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#4C030A] text-[#D7BB83] text-[11px] font-bold tracking-wider uppercase">
                  {acc.bank_name}
                </span>
                <div className="text-lg font-bold text-[#4C030A] font-mono mt-1">
                  {acc.account_number}
                </div>
                <div className="text-xs text-[#7A634F]">a.n. {acc.account_name}</div>
              </div>

              <button
                onClick={() => handleCopy(acc.account_number, `bank-${idx}`)}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-sm ${
                  copiedKey === `bank-${idx}`
                    ? 'bg-emerald-700 text-white'
                    : 'bg-[#4C030A] text-[#FFFCF3] hover:bg-[#8A1B26]'
                }`}
              >
                {copiedKey === `bank-${idx}` ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Tersalin!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-[#D7BB83]" />
                    <span>Salin Rekening</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Physical Gift Delivery Address */}
        <div className="p-4 sm:p-5 rounded-2xl bg-[#F4ECD8] border border-[#D7BB83] text-left">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4C030A] uppercase tracking-wider mb-2">
            <Package className="w-4 h-4 text-[#8A1B26]" />
            <span>Kirim Kado Fisik</span>
          </div>
          <p className="text-xs sm:text-sm text-[#5A3F30] leading-relaxed mb-3">
            {physicalAddress}
          </p>
          <button
            onClick={() => handleCopy(physicalAddress, 'address')}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              copiedKey === 'address'
                ? 'bg-emerald-700 text-white'
                : 'bg-white text-[#4C030A] border border-[#4C030A] hover:bg-[#4C030A]/10'
            }`}
          >
            {copiedKey === 'address' ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Alamat Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Alamat</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export const RpgTamanGiftModal = SeriMalaysiaGiftModal;
export default SeriMalaysiaGiftModal;
