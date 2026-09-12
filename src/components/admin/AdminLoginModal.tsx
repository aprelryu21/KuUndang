import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Mail, ArrowRight, Sparkles, X, Heart, ShieldAlert } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg('');

    const res = await signIn(username, password);
    setIsLoading(false);

    if (res.error) {
      setErrorMsg(res.error);
      showToast(res.error, 'error');
    } else {
      showToast('Berhasil masuk ke KU UNDANG Admin! ♡', 'success');
      onClose();
      navigate('/admin');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#24313A]/70 backdrop-blur-sm">
          {/* Backdrop Click */}
          <div className="absolute inset-0" onClick={onClose} />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.25 }}
            className="relative z-10 max-w-md w-full bg-[#FFFCF7] rounded-3xl p-6 sm:p-8 border border-[#C2A56B]/40 shadow-2xl text-[#24313A]"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-xl text-[#768692] hover:text-[#24313A] hover:bg-[#F7F2EA] transition-colors cursor-pointer"
              aria-label="Tutup"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#283D52] flex items-center justify-center mx-auto mb-3 text-[#FFFCF7] shadow-md">
                <Lock className="w-5 h-5 text-[#DFBFC1]" />
              </div>
              <h2 className="font-heading text-2xl font-bold tracking-wide text-[#283D52]">
                Admin Studio Access
              </h2>
              <p className="text-xs text-[#768692] mt-1">
                Panel rahasia pengelola undangan dan sistem CMS
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Masukkan username"
                    autoComplete="username"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40"
                  />
                  <Mail className="w-4 h-4 text-[#768692] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                  Kata Sandi
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] focus:outline-none focus:ring-2 focus:ring-[#C2A56B]/40"
                  />
                  <Lock className="w-4 h-4 text-[#768692] absolute left-3 top-1/2 -translate-y-1/2" />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] disabled:opacity-60 text-[#FFFCF7] text-xs font-semibold tracking-wider uppercase transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-3"
              >
                {isLoading ? (
                  <span>Memeriksa...</span>
                ) : (
                  <>
                    <span>MASUK KE ADMIN</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-5 text-center">
              <p className="text-[10px] text-[#768692]">
                Shortcut keyboard: <kbd className="px-1.5 py-0.5 rounded bg-[#EFE8DE] font-mono text-[10px] text-[#283D52]">Ctrl + Shift + A</kbd>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
