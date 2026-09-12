/**
 * Google Drive & Apps Script Service for Kuundang Wedding App
 * Connects directly to Google Apps Script Web App to upload files to Google Drive (folder 'KUUNDANG')
 * and synchronize database records with Google Sheets.
 */

const APPS_SCRIPT_STORAGE_KEY = 'kuundang_apps_script_url';

export const googleDriveService = {
  /**
   * Get configured Google Apps Script URL (from localStorage or environment variable)
   */
  getAppsScriptUrl(): string {
    const stored = localStorage.getItem(APPS_SCRIPT_STORAGE_KEY);
    if (stored && stored.trim().startsWith('http')) {
      return stored.trim();
    }
    const envUrl = (import.meta as any).env?.VITE_APPS_SCRIPT_URL;
    if (envUrl && typeof envUrl === 'string' && envUrl.trim().startsWith('http')) {
      return envUrl.trim();
    }
    return '';
  },

  /**
   * Save or update Google Apps Script URL in localStorage
   */
  setAppsScriptUrl(url: string) {
    if (!url || !url.trim()) {
      localStorage.removeItem(APPS_SCRIPT_STORAGE_KEY);
    } else {
      localStorage.setItem(APPS_SCRIPT_STORAGE_KEY, url.trim());
    }
  },

  /**
   * Check if Google Apps Script is configured
   */
  isConfigured(): boolean {
    return !!this.getAppsScriptUrl();
  },

  /**
   * Upload a File (Image, Audio MP3, Video) to Google Drive folder 'KUUNDANG'
   */
  async uploadFile(file: File, folderName = 'KUUNDANG'): Promise<{ url: string; fileId: string; fileName: string }> {
    const scriptUrl = this.getAppsScriptUrl();
    if (!scriptUrl) {
      throw new Error('Google Apps Script URL belum dikonfigurasi. Silakan masukkan URL Web App Apps Script Anda di Pengaturan.');
    }

    // Convert file to Base64
    const base64Data = await this.fileToBase64(file);

    const payload = {
      action: 'uploadFile',
      fileName: file.name,
      mimeType: file.type,
      base64Data: base64Data,
      folderName: folderName,
    };

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8', // Google Apps Script avoids CORS preflight when content-type is text/plain
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Gagal mengunggah ke Google Drive (Status: ${response.status})`);
    }

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || result.message || 'Gagal menyimpan file ke Google Drive');
    }

    return {
      url: result.url,
      fileId: result.fileId,
      fileName: result.fileName || file.name,
    };
  },

  /**
   * Save an entire invitation record to Google Sheets via Apps Script
   */
  async saveInvitationToSheets(invitationData: any): Promise<boolean> {
    const scriptUrl = this.getAppsScriptUrl();
    if (!scriptUrl) return false;

    try {
      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          action: 'saveInvitation',
          invitation: invitationData,
        }),
      });
      const result = await response.json();
      return !!result.success;
    } catch (err) {
      console.warn('Gagal sinkron ke Google Sheets:', err);
      return false;
    }
  },

  /**
   * Sync invitation data alias
   */
  async syncInvitationData(invitationData: any): Promise<boolean> {
    return this.saveInvitationToSheets(invitationData);
  },

  /**
   * Helper: Convert File to base64 string
   */
  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  },
};
