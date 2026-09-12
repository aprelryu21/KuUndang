import React, { useState, useRef } from 'react';
import { Upload, Check, AlertCircle, Loader2, Link2, Folder, Music, Image as ImageIcon, Video, RefreshCw } from 'lucide-react';
import { googleDriveService } from '../services/googleDriveService';

interface DriveUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  fileType?: 'image' | 'audio' | 'video';
  placeholder?: string;
  helperText?: string;
}

export const DriveUploader: React.FC<DriveUploaderProps> = ({
  value,
  onChange,
  label,
  accept = 'image/*',
  fileType = 'image',
  placeholder = 'Pilih file dari perangkat...',
  helperText,
}) => {
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const [showConfigModal, setShowConfigModal] = useState(false);
  const [scriptUrlInput, setScriptUrlInput] = useState(googleDriveService.getAppsScriptUrl());
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setErrorMessage(null);

    // Check if Apps Script is configured
    if (!googleDriveService.isConfigured()) {
      setShowConfigModal(true);
      return;
    }

    setIsUploading(true);
    try {
      const result = await googleDriveService.uploadFile(file, 'KUUNDANG');
      onChange(result.url);
    } catch (err: any) {
      console.error('Upload error:', err);
      setErrorMessage(err.message || 'Gagal mengunggah file ke Google Drive');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveConfig = () => {
    googleDriveService.setAppsScriptUrl(scriptUrlInput);
    setShowConfigModal(false);
  };

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52]">
            {label}
          </label>
          <button
            type="button"
            onClick={() => setShowManualUrl(!showManualUrl)}
            className="text-[11px] text-[#C2A56B] hover:text-[#A88B52] font-medium flex items-center gap-1 cursor-pointer"
          >
            <Link2 className="w-3 h-3" />
            <span>{showManualUrl ? 'Gunakan Tombol Upload' : 'Input URL Manual'}</span>
          </button>
        </div>
      )}

      {/* Manual URL Input Option */}
      {showManualUrl ? (
        <div className="space-y-1">
          <input
            type="text"
            value={value || ''}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://..."
            className="w-full px-3.5 py-2 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A]"
          />
          <p className="text-[11px] text-[#768692]">
            Mode URL manual aktif. Anda juga bisa beralih kembali ke tombol upload otomatis Google Drive.
          </p>
        </div>
      ) : (
        /* Automatic Google Drive Uploader */
        <div className="p-3.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-2xl space-y-3">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
            id={`file-upload-${label?.replace(/\s+/g, '-').toLowerCase() || Math.random().toString(36)}`}
          />

          {/* Current Value Preview */}
          {value ? (
            <div className="flex items-center gap-3 bg-white p-2.5 rounded-xl border border-[#283D52]/10">
              {fileType === 'image' && (
                <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                  <img src={value} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {fileType === 'audio' && (
                <div className="w-12 h-12 rounded-lg bg-[#283D52]/10 flex items-center justify-center flex-shrink-0 text-[#283D52]">
                  <Music className="w-6 h-6" />
                </div>
              )}
              {fileType === 'video' && (
                <div className="w-12 h-12 rounded-lg bg-[#283D52]/10 flex items-center justify-center flex-shrink-0 text-[#283D52]">
                  <Video className="w-6 h-6" />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="w-3.5 h-3.5" />
                  <span>File Terunggah ke Drive (KUUNDANG)</span>
                </div>
                <p className="text-[11px] text-gray-500 truncate mt-0.5" title={value}>
                  {value}
                </p>
              </div>

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="px-3 py-1.5 bg-[#283D52] hover:bg-[#1E2E3E] text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer flex-shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isUploading ? 'animate-spin' : ''}`} />
                <span>Ganti File</span>
              </button>
            </div>
          ) : (
            /* Upload Action Box */
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-[#283D52]/20 hover:border-[#C2A56B] rounded-xl p-4 text-center cursor-pointer transition-colors bg-white/60 hover:bg-white flex flex-col items-center justify-center gap-2 group"
            >
              <div className="w-10 h-10 rounded-full bg-[#283D52]/5 group-hover:bg-[#C2A56B]/10 flex items-center justify-center text-[#283D52] group-hover:text-[#C2A56B] transition-colors">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#C2A56B]" />
                ) : (
                  <Upload className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className="text-xs font-semibold text-[#283D52]">
                  {isUploading ? 'Sedang Mengunggah ke Google Drive...' : placeholder}
                </p>
                <p className="text-[11px] text-[#768692] mt-0.5 flex items-center justify-center gap-1">
                  <Folder className="w-3 h-3 text-[#C2A56B]" />
                  <span>Otomatis tersimpan di Google Drive folder <b>KUUNDANG</b></span>
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {errorMessage && (
            <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p>{errorMessage}</p>
                {!googleDriveService.isConfigured() && (
                  <button
                    type="button"
                    onClick={() => setShowConfigModal(true)}
                    className="underline font-semibold mt-1 block"
                  >
                    Atur URL Google Apps Script Sekarang
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Helper Text & Google Apps Script Link */}
          <div className="flex items-center justify-between text-[11px] text-[#768692] pt-1">
            <span>{helperText || `Format: ${accept}`}</span>
            <button
              type="button"
              onClick={() => setShowConfigModal(true)}
              className="text-[#283D52] hover:underline cursor-pointer"
            >
              {googleDriveService.isConfigured() ? '⚙️ Ubah URL Apps Script' : '⚠️ Sambungkan Apps Script'}
            </button>
          </div>
        </div>
      )}

      {/* Modal / Popup Pengaturan Apps Script */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#FFFCF7] max-w-lg w-full rounded-2xl p-6 shadow-2xl border border-[#283D52]/10 space-y-4">
            <div className="flex items-center justify-between border-b border-[#283D52]/10 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                  <Folder className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#283D52]">Koneksi Google Drive (Apps Script)</h3>
                  <p className="text-[11px] text-[#768692]">Folder 'KUUNDANG' & Spreadsheet</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="text-gray-400 hover:text-gray-600 text-sm font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="text-xs text-[#526370] space-y-2 leading-relaxed">
              <p>
                Agar foto, musik, dan data tersimpan otomatis di Google Drive dan Google Sheets Anda, masukkan <b>Web App URL</b> dari Google Apps Script:
              </p>
              <div className="bg-[#F7F2EA] p-3 rounded-xl space-y-1 text-[11px] border border-[#283D52]/10">
                <p className="font-semibold text-[#283D52]">Langkah Cepat (1 Menit):</p>
                <ol className="list-decimal list-inside space-y-0.5 text-[#526370]">
                  <li>Buka <b>script.google.com</b> & buat New Project.</li>
                  <li>Paste isi file <b>google_apps_script.js</b> yang ada di proyek ini.</li>
                  <li>Klik <b>Deploy &gt; New deployment &gt; Web app</b>.</li>
                  <li>Pilih <i>Who has access: Anyone</i>, lalu Deploy.</li>
                  <li>Salin Web App URL (akhiran <code>/exec</code>) dan tempel di bawah ini.</li>
                </ol>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52] mb-1">
                Google Apps Script Web App URL
              </label>
              <input
                type="url"
                value={scriptUrlInput}
                onChange={(e) => setScriptUrlInput(e.target.value)}
                placeholder="https://script.google.com/macros/s/AKfycb.../exec"
                className="w-full px-3.5 py-2.5 bg-white border border-[#283D52]/20 rounded-xl text-xs text-[#24313A]"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowConfigModal(false)}
                className="px-4 py-2 text-xs font-medium text-gray-600 hover:text-gray-800 cursor-pointer"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleSaveConfig}
                className="px-5 py-2 bg-[#283D52] hover:bg-[#1E2E3E] text-white rounded-xl text-xs font-semibold cursor-pointer transition-colors"
              >
                Simpan Koneksi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
