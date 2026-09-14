import React, { useState, useEffect } from 'react';
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  ExternalLink,
  X,
  Loader2,
  RefreshCw,
  Code2,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import {
  getSupabaseConfig,
  setSupabaseConfig,
  testSupabaseConnection,
  normalizeSupabaseUrl,
  normalizeSupabaseKey,
  SUPABASE_SQL_SCHEMA,
} from '../../lib/supabase';
import { useToast } from '../../context/ToastContext';

interface SupabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const SupabaseConfigModal: React.FC<SupabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'config' | 'sql' | 'guide'>('config');
  const [url, setUrl] = useState('');
  const [anonKey, setAnonKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const current = getSupabaseConfig();
      setUrl(current.url);
      setAnonKey(current.anonKey);
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    if (!url.trim() || !anonKey.trim()) {
      setTestResult({
        success: false,
        message: 'Harap masukkan Project URL dan Anon Public Key terlebih dahulu.',
      });
      return;
    }

    const cleanUrl = normalizeSupabaseUrl(url);
    const cleanKey = normalizeSupabaseKey(anonKey);
    setUrl(cleanUrl);
    setAnonKey(cleanKey);

    setIsTesting(true);
    setTestResult(null);

    // Temporarily apply to test
    setSupabaseConfig(cleanUrl, cleanKey);
    const res = await testSupabaseConnection();
    setTestResult(res);
    setIsTesting(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || !anonKey.trim()) {
      showToast('Harap isi URL dan Anon Key', 'error');
      return;
    }

    const cleanUrl = normalizeSupabaseUrl(url);
    const cleanKey = normalizeSupabaseKey(anonKey);
    setUrl(cleanUrl);
    setAnonKey(cleanKey);

    setSupabaseConfig(cleanUrl, cleanKey);
    showToast('Kredensial Supabase berhasil disimpan!', 'success');
    if (onSuccess) onSuccess();
    onClose();
  };

  const handleResetToLocal = () => {
    setSupabaseConfig('', '');
    setUrl('');
    setAnonKey('');
    setTestResult(null);
    showToast('Koneksi Supabase direset ke penyimpanan lokal.', 'info');
    if (onSuccess) onSuccess();
  };

  const copySqlToClipboard = () => {
    navigator.clipboard.writeText(SUPABASE_SQL_SCHEMA);
    setIsCopied(true);
    showToast('SQL Schema berhasil disalin ke clipboard!', 'success');
    setTimeout(() => setIsCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#283D52]/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-2xl bg-[#FFFCF7] rounded-3xl border border-[#283D52]/20 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#283D52]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-[#283D52]">
                Pengaturan Database &amp; Storage Supabase
              </h3>
              <p className="text-xs text-[#768692]">
                Penyimpanan cloud realtime untuk undangan, foto, RSVP, dan doa restu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#F7F2EA] hover:bg-[#EFE8DE] flex items-center justify-center text-[#283D52] cursor-pointer transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#283D52]/10 bg-[#F7F2EA]/60 px-6 pt-3 gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setActiveTab('config')}
            className={`pb-2.5 px-3 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'config'
                ? 'bg-white text-[#283D52] border-t border-x border-[#283D52]/10 shadow-xs'
                : 'text-[#768692] hover:text-[#283D52]'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Kredensial API</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`pb-2.5 px-3 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-white text-[#283D52] border-t border-x border-[#283D52]/10 shadow-xs'
                : 'text-[#768692] hover:text-[#283D52]'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Panduan Langkah (Tuntunan)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('sql')}
            className={`pb-2.5 px-3 text-xs font-semibold rounded-t-xl transition-all flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'sql'
                ? 'bg-white text-[#283D52] border-t border-x border-[#283D52]/10 shadow-xs'
                : 'text-[#768692] hover:text-[#283D52]'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>SQL Schema Database</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* TAB 1: KREDENSIAL API */}
          {activeTab === 'config' && (
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                  Supabase Project URL:
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://xyzabcdefghijklmnop.supabase.co"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#283D52]/20 rounded-xl text-xs font-mono text-[#283D52] focus:outline-hidden focus:border-[#C2A56B]"
                />
                <p className="text-[11px] text-[#768692] mt-1">
                  Didapat dari Dashboard Supabase &gt; <strong>Project Settings &gt; API</strong> &gt; Project URL. Format: <code className="bg-[#283D52]/5 px-1 py-0.5 rounded font-mono text-[10px]">https://[id-project].supabase.co</code> (jangan sertakan <code className="text-rose-600 font-mono text-[10px]">/rest/v1</code>).
                </p>
                {url.trim() && normalizeSupabaseUrl(url) !== url.trim() && (
                  <div className="mt-2 p-2.5 rounded-xl bg-amber-50/90 border border-amber-200 text-[11px] text-amber-900 flex items-start gap-2">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-amber-950">URL Otomatis Disesuaikan:</p>
                      <p className="text-amber-800">
                        Path seperti <code>/rest/v1</code> atau link dashboard dirapikan otomatis untuk mencegah error <strong>PGRST125</strong>. URL yang disimpan:
                      </p>
                      <p className="font-mono text-xs font-bold text-emerald-800 mt-0.5 break-all">
                        {normalizeSupabaseUrl(url)}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1.5">
                  Supabase Anon Public API Key:
                </label>
                <input
                  type="text"
                  required
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={anonKey}
                  onChange={(e) => setAnonKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border border-[#283D52]/20 rounded-xl text-xs font-mono text-[#283D52] focus:outline-hidden focus:border-[#C2A56B]"
                />
                <p className="text-[11px] text-[#768692] mt-1">
                  Didapat dari Dashboard Supabase &gt; <strong>Project Settings &gt; API</strong> &gt; Project API keys &gt; <strong>anon (public)</strong>.
                </p>
              </div>

              {/* Status or Test Result */}
              {testResult && (
                <div
                  className={`p-3.5 rounded-2xl text-xs flex items-start gap-2.5 ${
                    testResult.success
                      ? 'bg-emerald-50 border border-emerald-200 text-emerald-900'
                      : 'bg-rose-50 border border-rose-200 text-rose-900'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className="font-semibold">{testResult.success ? 'Koneksi Berhasil!' : 'Koneksi Bermasalah'}</p>
                    <p className="text-[11px] mt-0.5 leading-relaxed">{testResult.message}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTestConnection}
                    disabled={isTesting}
                    className="px-4 py-2.5 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-xs font-semibold flex items-center gap-1.5 cursor-pointer disabled:opacity-50 transition-colors"
                  >
                    {isTesting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <RefreshCw className="w-3.5 h-3.5" />
                    )}
                    <span>{isTesting ? 'Menguji...' : 'Uji Koneksi'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleResetToLocal}
                    className="px-3 py-2 text-xs text-[#768692] hover:text-rose-600 hover:underline cursor-pointer"
                  >
                    Reset ke Lokal
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#283D52] text-xs font-semibold cursor-pointer"
                  >
                    Tutup
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-[#FFFCF7] text-xs font-semibold uppercase tracking-wider cursor-pointer shadow-sm transition-all"
                  >
                    Simpan &amp; Aktifkan
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: PANDUAN LANGKAH (TUNTUNAN) */}
          {activeTab === 'guide' && (
            <div className="space-y-4 text-xs text-[#283D52]">
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Kenapa Supabase Jauh Lebih Cepat?</p>
                  <p className="text-[11px] text-emerald-900 mt-1 leading-relaxed">
                    Supabase menggunakan database PostgreSQL performa tinggi dan Cloud Storage CDN global.
                    Tidak ada lagi delay/loading lambat seperti saat menggunakan Google Apps Script!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Langkah 1 */}
                <div className="p-4 rounded-2xl bg-white border border-[#283D52]/10 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-[#283D52] flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-[#283D52] text-white flex items-center justify-center text-[10px]">
                        1
                      </span>
                      Buat Akun &amp; Project di Supabase (Gratis)
                    </span>
                    <a
                      href="https://supabase.com/dashboard"
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#C2A56B] hover:underline flex items-center gap-1 font-semibold text-[11px]"
                    >
                      Buka Supabase <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-[11px] text-[#768692] pl-7">
                    Buka situs Supabase, masuk dengan akun GitHub / Email, lalu klik tombol <strong>New Project</strong>. Beri nama (misal: <em>kuundang-db</em>), buat Database Password, dan pilih region terdekat (misal: <em>Singapore</em>).
                  </p>
                </div>

                {/* Langkah 2 */}
                <div className="p-4 rounded-2xl bg-white border border-[#283D52]/10 space-y-1.5 shadow-2xs">
                  <span className="font-bold text-sm text-[#283D52] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#283D52] text-white flex items-center justify-center text-[10px]">
                      2
                    </span>
                    Jalankan SQL Schema di SQL Editor Supabase
                  </span>
                  <p className="text-[11px] text-[#768692] pl-7">
                    Di dashboard Supabase, buka menu <strong>SQL Editor</strong> di sidebar kiri. Klik <strong>New query</strong>, lalu buka tab <strong>"SQL Schema Database"</strong> di modal ini, klik <strong>Salin Skrip SQL</strong>, tempel (paste) ke SQL Editor Supabase, lalu klik tombol hijau <strong>Run</strong>.
                  </p>
                </div>

                {/* Langkah 3 */}
                <div className="p-4 rounded-2xl bg-white border border-[#283D52]/10 space-y-1.5 shadow-2xs">
                  <span className="font-bold text-sm text-[#283D52] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#283D52] text-white flex items-center justify-center text-[10px]">
                      3
                    </span>
                    Salin URL &amp; Anon Key ke Aplikasi
                  </span>
                  <p className="text-[11px] text-[#768692] pl-7">
                    Di Supabase, buka <strong>Project Settings &gt; API</strong>. Salin <strong>Project URL</strong> dan <strong>anon (public) Key</strong>, lalu tempel di tab <strong>"Kredensial API"</strong> pada modal ini, kemudian klik <strong>Simpan &amp; Aktifkan</strong>.
                  </p>
                </div>

                {/* Langkah 4 */}
                <div className="p-4 rounded-2xl bg-white border border-[#283D52]/10 space-y-1.5 shadow-2xs">
                  <span className="font-bold text-sm text-[#283D52] flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#283D52] text-white flex items-center justify-center text-[10px]">
                      4
                    </span>
                    Selesai! Storage &amp; Sinkronisasi Siap Digunakan
                  </span>
                  <p className="text-[11px] text-[#768692] pl-7">
                    Bucket storage <code>wedding-media</code> sudah otomatis dibuatkan policy publik oleh script SQL. Foto yang Anda unggah akan otomatis tersimpan di Supabase Storage dengan URL permanen super cepat!
                  </p>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveTab('sql')}
                  className="px-4 py-2 rounded-xl bg-[#283D52] text-[#FFFCF7] font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Lihat &amp; Salin SQL Schema</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: SQL SCHEMA */}
          {activeTab === 'sql' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-[#283D52]">
                    Skrip SQL Otomatis (Tabel, RLS &amp; Storage Bucket)
                  </p>
                  <p className="text-[11px] text-[#768692]">
                    Membuat tabel invitations, couples, events, gallery, wishes, serta bucket storage wedding-media
                  </p>
                </div>

                <button
                  type="button"
                  onClick={copySqlToClipboard}
                  className="px-3.5 py-2 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs transition-all"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{isCopied ? 'Tersalin!' : 'Salin Skrip SQL'}</span>
                </button>
              </div>

              <div className="relative">
                <pre className="p-4 bg-[#1E2E3E] text-[#E0E7ED] rounded-2xl text-[11px] font-mono overflow-x-auto max-h-72 leading-relaxed border border-[#283D52]/30">
                  {SUPABASE_SQL_SCHEMA}
                </pre>
              </div>

              <p className="text-[11px] text-[#768692] leading-relaxed">
                💡 <strong>Tips:</strong> Di dashboard Supabase Anda, buka <strong>SQL Editor &gt; New Query</strong>, tempel skrip di atas, lalu tekan <strong>Run</strong> (atau tombol shortcut <code>Cmd + Enter</code> / <code>Ctrl + Enter</code>).
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
