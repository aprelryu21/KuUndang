import React, { useState, useEffect } from 'react';
import {
  Database,
  RefreshCw,
  ExternalLink,
  X,
  Table as TableIcon,
  Search,
  CheckCircle2,
  AlertCircle,
  Eye,
  Layers,
  Users,
  MessageSquareHeart,
  Heart,
  Calendar,
  Gift,
  Image as ImageIcon,
  Sparkles,
  UploadCloud,
  Settings,
} from 'lucide-react';
import { getSupabaseConfig, getSupabaseClient } from '../../lib/supabase';
import { weddingService } from '../../services/weddingService';
import { useToast } from '../../context/ToastContext';

interface SupabaseDataExplorerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenConfig?: () => void;
}

const TABLES = [
  { id: 'invitations', label: 'Undangan (invitations)', icon: Heart, desc: 'Daftar semua undangan, judul, slug URL, tanggal, dan template' },
  { id: 'couples', label: 'Mempelai (couples)', icon: Users, desc: 'Profil kedua pengantin, nama orang tua, dan foto profil' },
  { id: 'events', label: 'Acara (events)', icon: Calendar, desc: 'Jadwal akad nikah, resepsi, lokasi peta, dan waktu' },
  { id: 'guests', label: 'Daftar Tamu (guests)', icon: Users, desc: 'Tamu undangan, kode personal undangan, dan status buka' },
  { id: 'rsvps', label: 'RSVP Kehadiran (rsvps)', icon: CheckCircle2, desc: 'Konfirmasi hadir/tidak hadir dan jumlah pax' },
  { id: 'wishes', label: 'Doa & Ucapan (wishes)', icon: MessageSquareHeart, desc: 'Pesan doa restu dari para tamu undangan' },
  { id: 'stories', label: 'Kisah Cinta (stories)', icon: Sparkles, desc: 'Linimasa cerita perjalanan cinta' },
  { id: 'gallery', label: 'Galeri Foto (gallery)', icon: ImageIcon, desc: 'Koleksi album foto kenangan' },
  { id: 'gifts', label: 'Amplop Digital (gifts)', icon: Gift, desc: 'Rekening bank dan e-wallet untuk kado' },
  { id: 'sections', label: 'Pengaturan Seksi (sections)', icon: Layers, desc: 'Urutan dan switch on/off bagian undangan' },
];

export const SupabaseDataExplorerModal: React.FC<SupabaseDataExplorerModalProps> = ({
  isOpen,
  onClose,
  onOpenConfig,
}) => {
  const { showToast } = useToast();
  const [selectedTable, setSelectedTable] = useState('invitations');
  const [tableCounts, setTableCounts] = useState<Record<string, number>>({});
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRow, setSelectedRow] = useState<any | null>(null);

  const config = getSupabaseConfig();
  const projectRef = config.url ? config.url.replace('https://', '').split('.')[0] : '';
  const supabaseDashboardUrl = projectRef
    ? `https://supabase.com/dashboard/project/${projectRef}/editor`
    : 'https://supabase.com/dashboard';

  const loadSummaryAndRows = async (table: string) => {
    setLoading(true);
    setErrorMsg(null);
    setSelectedRow(null);

    // Fetch summary
    try {
      const summary = await weddingService.getSupabaseTableSummary();
      if (summary) setTableCounts(summary);
    } catch {
      // ignore
    }

    // Fetch table rows
    try {
      const res = await weddingService.getSupabaseTableData(table, 50);
      if (res.error) {
        setErrorMsg(res.error);
        setRows([]);
      } else {
        setRows(res.rows);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Gagal memuat data dari Supabase');
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSyncNow = async () => {
    if (!config.isConfigured) {
      showToast('Harap hubungkan Supabase terlebih dahulu melalui tombol Pengaturan.', 'error');
      if (onOpenConfig) {
        onClose();
        onOpenConfig();
      }
      return;
    }

    setIsSyncing(true);
    try {
      const res = await weddingService.syncAllLocalDataToSupabase();
      if (res.success) {
        showToast(res.message, 'success');
        await loadSummaryAndRows(selectedTable);
      } else {
        showToast(res.message, 'error');
        setErrorMsg(res.message);
      }
    } catch (err: any) {
      showToast(err.message || 'Gagal menyinkronkan data ke Supabase', 'error');
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      loadSummaryAndRows(selectedTable);
    }
  }, [isOpen, selectedTable]);

  if (!isOpen) return null;

  const filteredRows = rows.filter((r) => {
    if (!searchTerm.trim()) return true;
    const term = searchTerm.toLowerCase();
    return JSON.stringify(r).toLowerCase().includes(term);
  });

  const columns = rows.length > 0 ? Object.keys(rows[0]) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#283D52]/60 backdrop-blur-xs animate-fade-in">
      <div className="w-full max-w-5xl bg-[#FFFCF7] rounded-3xl border border-[#283D52]/20 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-[#283D52]/10 flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading text-lg font-bold text-[#283D52]">
                  Supabase Data Explorer
                </h3>
                {config.isConfigured ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Cloud Terkoneksi
                  </span>
                ) : (
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                    Mode Lokal (Belum Terkoneksi Supabase)
                  </span>
                )}
              </div>
              <p className="text-xs text-[#768692]">
                Pantau isi tabel langsung di database PostgreSQL Supabase Anda secara realtime
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {config.isConfigured && (
              <a
                href={supabaseDashboardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors"
                title="Buka Supabase Web Dashboard"
              >
                <span>Buka Dashboard Supabase</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-[#F7F2EA] hover:bg-[#EFE8DE] flex items-center justify-center text-[#283D52] cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* How to view in Supabase Banner */}
        <div className="bg-[#F7F2EA] border-b border-[#283D52]/10 px-5 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 shrink-0 text-xs text-[#283D52]">
          <div className="flex items-center gap-2">
            <TableIcon className="w-4 h-4 text-[#C2A56B] shrink-0" />
            <span>
              <strong>Cara melihat data di dashboard Supabase web:</strong> Login ke <strong>supabase.com</strong> &gt; Pilih Project &gt; Klik menu <strong>Table Editor</strong> di sidebar kiri &gt; Pilih tabel yang ingin dilihat atau diekspor ke CSV.
            </span>
          </div>
          {config.isConfigured && (
            <a
              href={supabaseDashboardUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline flex items-center gap-1 shrink-0"
            >
              <span>Langsung Buka Table Editor</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>

        {/* Table Selector Pills */}
        <div className="p-4 border-b border-[#283D52]/10 bg-white/70 overflow-x-auto flex gap-2 shrink-0 scrollbar-thin">
          {TABLES.map((t) => {
            const Icon = t.icon;
            const isSelected = selectedTable === t.id;
            const count = tableCounts[t.id];

            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSelectedTable(t.id)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-[#283D52] text-[#FFFCF7] shadow-xs'
                    : 'bg-[#F7F2EA] text-[#283D52] hover:bg-[#EFE8DE]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-[#DFBFC1]' : 'text-[#768692]'}`} />
                <span>{t.id}</span>
                {typeof count === 'number' && (
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-[#283D52]/10 text-[#283D52]'
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search and Refresh and Sync */}
        <div className="p-4 border-b border-[#283D52]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#768692]" />
            <input
              type="text"
              placeholder={`Cari di tabel ${selectedTable}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] placeholder:text-[#768692] focus:outline-none focus:border-[#283D52]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end flex-wrap">
            <span className="text-xs text-[#768692]">
              Menampilkan {filteredRows.length} dari {rows.length} baris
            </span>
            <button
              type="button"
              onClick={() => loadSummaryAndRows(selectedTable)}
              disabled={loading || isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] text-xs font-semibold cursor-pointer transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Muat Ulang</span>
            </button>
            <button
              type="button"
              onClick={handleSyncNow}
              disabled={loading || isSyncing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
              title="Unggah dan sinkronkan data lokal ke database Supabase Cloud sekarang"
            >
              <UploadCloud className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce' : ''}`} />
              <span>{isSyncing ? 'Sinkronisasi...' : 'Sinkronkan Data Lokal ke Cloud'}</span>
            </button>
          </div>
        </div>

        {/* Content Table Area */}
        <div className="flex-1 overflow-auto p-4 bg-[#F7F2EA]/30">
          {!config.isConfigured ? (
            <div className="text-center py-12 px-4 max-w-md mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-base font-bold text-[#283D52] mb-1">
                Supabase Belum Dihubungkan
              </h4>
              <p className="text-xs text-[#768692] leading-relaxed mb-4">
                Hubungkan URL &amp; Anon Key Supabase terlebih dahulu melalui tombol Pengaturan Supabase agar Anda dapat melihat data yang tersimpan di cloud realtime.
              </p>
              {onOpenConfig && (
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenConfig();
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#283D52] text-white text-xs font-semibold hover:bg-[#1E2E3E] transition-colors cursor-pointer"
                >
                  <Settings className="w-3.5 h-3.5" />
                  <span>Buka Pengaturan Supabase Sekarang</span>
                </button>
              )}
            </div>
          ) : errorMsg ? (
            <div className="text-center py-12 px-4 max-w-lg mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-800 flex items-center justify-center mx-auto mb-3">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h4 className="font-heading text-base font-bold text-[#283D52] mb-1">
                Tabel Belum Dibuat di Supabase
              </h4>
              <p className="text-xs text-rose-700 leading-relaxed mb-3 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
                {errorMsg}
              </p>
              <p className="text-xs text-[#768692] mb-4">
                Jalankan skrip SQL di <strong>SQL Editor</strong> dashboard Supabase Anda untuk membuat 10 tabel otomatis.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {onOpenConfig && (
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenConfig();
                    }}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#283D52] text-white text-xs font-semibold hover:bg-[#1E2E3E] transition-colors cursor-pointer"
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Salin SQL Schema di Pengaturan</span>
                  </button>
                )}
                <a
                  href={supabaseDashboardUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-semibold transition-colors"
                >
                  <span>Buka SQL Editor Supabase</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : loading ? (
            <div className="text-center py-16">
              <RefreshCw className="w-6 h-6 animate-spin text-[#283D52] mx-auto mb-2" />
              <p className="text-xs text-[#768692]">Mengambil data dari Supabase PostgreSQL...</p>
            </div>
          ) : filteredRows.length === 0 ? (
            <div className="text-center py-16 max-w-md mx-auto">
              <Database className="w-10 h-10 text-[#768692]/50 mx-auto mb-3" />
              <p className="text-sm font-semibold text-[#283D52]">Tabel "{selectedTable}" Masih Kosong</p>
              <p className="text-xs text-[#768692] mt-1 mb-5 leading-relaxed">
                Data lokal di browser Anda belum dikirim ke tabel Supabase ini. Klik tombol di bawah untuk menyinkronkan seluruh data lokal (undangan, pengantin, acara, doa) ke Supabase Cloud sekarang.
              </p>
              <button
                type="button"
                onClick={handleSyncNow}
                disabled={isSyncing}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold uppercase tracking-wider transition-all shadow-md cursor-pointer disabled:opacity-50"
              >
                <UploadCloud className={`w-4 h-4 ${isSyncing ? 'animate-bounce' : ''}`} />
                <span>{isSyncing ? 'Menyinkronkan...' : 'Sinkronkan Data Lokal ke Supabase Sekarang'}</span>
              </button>
            </div>
          ) : (
            <div className="border border-[#283D52]/15 rounded-2xl bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-[#F7F2EA] border-b border-[#283D52]/10 text-[11px] font-bold text-[#283D52] uppercase tracking-wider">
                      <th className="p-3 w-12 text-center">#</th>
                      {columns.map((col) => (
                        <th key={col} className="p-3 font-bold whitespace-nowrap">
                          {col}
                        </th>
                      ))}
                      <th className="p-3 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#283D52]/10">
                    {filteredRows.map((row, idx) => (
                      <tr
                        key={row.id || idx}
                        className="hover:bg-[#FFFCF7] transition-colors"
                      >
                        <td className="p-3 text-center text-[#768692] font-mono text-[10px]">
                          {idx + 1}
                        </td>
                        {columns.map((col) => {
                          const val = row[col];
                          const displayVal =
                            typeof val === 'object' && val !== null
                              ? JSON.stringify(val)
                              : String(val ?? '-');

                          return (
                            <td
                              key={col}
                              className="p-3 max-w-xs truncate text-[#24313A] font-mono text-[11px]"
                              title={displayVal}
                            >
                              {displayVal}
                            </td>
                          );
                        })}
                        <td className="p-3 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() => setSelectedRow(row)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F7F2EA] hover:bg-[#EFE8DE] text-[#283D52] font-semibold text-[11px] transition-colors cursor-pointer"
                          >
                            <Eye className="w-3 h-3" />
                            <span>Detail</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Selected Row Detail Modal */}
        {selectedRow && (
          <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-[#FFFCF7] max-w-lg w-full rounded-3xl p-6 border border-[#283D52]/20 shadow-2xl max-h-[85vh] flex flex-col">
              <div className="flex items-center justify-between pb-3 border-b border-[#283D52]/10 mb-4">
                <h4 className="font-heading text-lg font-bold text-[#283D52]">
                  Detail Baris Data ({selectedTable})
                </h4>
                <button
                  type="button"
                  onClick={() => setSelectedRow(null)}
                  className="p-1 rounded-lg text-[#768692] hover:text-[#283D52]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 pr-1">
                {Object.entries(selectedRow).map(([key, value]) => (
                  <div key={key} className="bg-white p-3 rounded-xl border border-[#283D52]/10">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#768692] block mb-0.5">
                      {key}
                    </span>
                    <pre className="text-xs text-[#283D52] whitespace-pre-wrap break-all font-mono">
                      {typeof value === 'object' && value !== null
                        ? JSON.stringify(value, null, 2)
                        : String(value ?? '-')}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="pt-4 mt-2 border-t border-[#283D52]/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRow(null)}
                  className="px-4 py-2 rounded-xl bg-[#283D52] text-white text-xs font-semibold cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-[#283D52]/10 bg-white flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <p className="text-xs text-[#768692]">
            Data diperbarui langsung dari basis data Supabase PostgreSQL tanpa perantara.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#283D52] hover:bg-[#1E2E3E] text-white text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Tutup Explorer
          </button>
        </div>
      </div>
    </div>
  );
};
