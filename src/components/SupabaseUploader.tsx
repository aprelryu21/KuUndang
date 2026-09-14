import React, { useState, useRef } from 'react';
import {
  Upload,
  Link2,
  Check,
  AlertCircle,
  Loader2,
  Image as ImageIcon,
  Music,
  Video,
  X,
  Database,
  ExternalLink,
} from 'lucide-react';
import { uploadToSupabaseStorage, getSupabaseConfig } from '../lib/supabase';

interface SupabaseUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  accept?: string;
  fileType?: 'image' | 'audio' | 'video';
  placeholder?: string;
  helperText?: string;
  coupleName?: string;
}

export const SupabaseUploader: React.FC<SupabaseUploaderProps> = ({
  value,
  onChange,
  label,
  accept = 'image/*',
  fileType = 'image',
  placeholder = 'Pilih file dari perangkat...',
  helperText,
  coupleName,
}) => {
  const [mode, setMode] = useState<'upload' | 'url'>('upload');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const supabaseConfig = getSupabaseConfig();
  const safeCouple = coupleName ? coupleName.toLowerCase().replace(/[^a-z0-9]/g, '-') : 'general';

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setIsUploading(true);
    setUploadProgress(`Mengunggah "${file.name}"...`);

    try {
      const result = await uploadToSupabaseStorage(file, 'wedding-media', safeCouple);
      onChange(result.url);
      setUploadProgress(null);

      if (result.error) {
        setErrorMessage(result.error);
      }
    } catch (err: any) {
      console.error('File upload error:', err);
      setErrorMessage(err.message || 'Gagal mengunggah file.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    processFile(files[0]);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  return (
    <div className="space-y-2">
      {/* Label and Dual-Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5">
        {label && (
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#283D52]">
            {label}
          </label>
        )}

        {/* Dual Mode: Upload File vs Input URL */}
        <div className="flex items-center gap-1 bg-[#283D52]/10 p-0.5 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode('upload')}
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'upload'
                ? 'bg-white text-[#283D52] shadow-xs'
                : 'text-[#768692] hover:text-[#283D52]'
            }`}
          >
            <Upload className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode('url')}
            className={`px-2.5 py-1 text-[10px] font-semibold rounded-md transition-all flex items-center gap-1.5 cursor-pointer ${
              mode === 'url'
                ? 'bg-white text-[#283D52] shadow-xs'
                : 'text-[#768692] hover:text-[#283D52]'
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Input URL</span>
          </button>
        </div>
      </div>

      {/* MODE 1: UPLOAD FILE KE SUPABASE STORAGE */}
      {mode === 'upload' && (
        <div className="space-y-2">
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            onChange={handleFileSelect}
            className="hidden"
          />

          {/* Drag and Drop Box */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !isUploading && fileInputRef.current?.click()}
            className={`p-4 border-2 border-dashed rounded-2xl text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-[#283D52] bg-[#283D52]/10 scale-[1.01]'
                : 'border-[#283D52]/20 hover:border-[#283D52]/40 bg-[#F7F2EA]/60 hover:bg-[#F7F2EA]'
            }`}
          >
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="w-10 h-10 rounded-full bg-white shadow-xs flex items-center justify-center text-[#283D52]">
                {isUploading ? (
                  <Loader2 className="w-5 h-5 animate-spin text-[#C2A56B]" />
                ) : fileType === 'audio' ? (
                  <Music className="w-5 h-5 text-[#C2A56B]" />
                ) : fileType === 'video' ? (
                  <Video className="w-5 h-5 text-[#C2A56B]" />
                ) : (
                  <ImageIcon className="w-5 h-5 text-[#C2A56B]" />
                )}
              </div>

              <div>
                <p className="text-xs font-semibold text-[#283D52]">
                  {isUploading ? uploadProgress : 'Klik atau seret file ke sini untuk mengunggah'}
                </p>
                <p className="text-[10px] text-[#768692] mt-0.5">
                  {supabaseConfig.isConfigured
                    ? 'Tersimpan otomatis di bucket Supabase Storage (wedding-media)'
                    : 'Disimpan secara lokal (Aktifkan Supabase di Dashboard untuk Cloud Storage)'}
                </p>
              </div>

              {/* Status Badge */}
              <div className="flex items-center gap-2 mt-1">
                {supabaseConfig.isConfigured ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-100 text-emerald-800">
                    <Database className="w-2.5 h-2.5" />
                    <span>Supabase Storage Aktif</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-100 text-amber-800">
                    <Database className="w-2.5 h-2.5" />
                    <span>Upload Cepat (Lokal)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: INPUT URL LANGSUNG */}
      {mode === 'url' && (
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#768692]">
            <Link2 className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={
              fileType === 'audio'
                ? 'https://example.com/lagu-pernikahan.mp3'
                : 'https://images.unsplash.com/...'
            }
            className="w-full pl-9 pr-3 py-2.5 bg-[#F7F2EA] border border-[#283D52]/15 rounded-xl text-xs text-[#24313A] focus:outline-hidden focus:border-[#283D52]"
          />
        </div>
      )}

      {/* Error Message */}
      {errorMessage && (
        <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[11px] leading-relaxed">{errorMessage}</p>
          </div>
          <button
            type="button"
            onClick={() => setErrorMessage(null)}
            className="text-amber-700 hover:text-amber-900"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* CURRENT VALUE PREVIEW & QUICK CLEAR */}
      {value && (
        <div className="p-2 bg-white rounded-xl border border-[#283D52]/10 flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5 min-w-0">
            {fileType === 'image' && (
              <img
                src={value}
                alt="Pratinjau"
                className="w-10 h-10 object-cover rounded-lg border border-[#283D52]/15 shrink-0"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            )}
            {fileType === 'audio' && (
              <div className="w-10 h-10 rounded-lg bg-[#283D52]/10 flex items-center justify-center text-[#283D52] shrink-0">
                <Music className="w-4 h-4 text-[#C2A56B]" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-[11px] font-medium text-[#283D52] truncate max-w-[200px] sm:max-w-xs">
                {value.startsWith('data:') ? 'File Terunggah (Data URL)' : value}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-[#768692]">
                <span className="text-emerald-700 font-semibold flex items-center gap-0.5">
                  <Check className="w-3 h-3" /> Siap Digunakan
                </span>
                {!value.startsWith('data:') && (
                  <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline flex items-center gap-0.5 text-[#283D52]"
                  >
                    Buka File <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onChange('')}
            title="Hapus file"
            className="p-1.5 rounded-lg text-[#768692] hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {helperText && <p className="text-[10px] text-[#768692]">{helperText}</p>}
    </div>
  );
};
