/**
 * =====================================================================
 * KUUNDANG - GOOGLE APPS SCRIPT BACKEND (SHEETS + DRIVE)
 * =====================================================================
 * 
 * CARA MEMASANG:
 * 1. Buka https://script.google.com lalu klik "New Project".
 * 2. Hapus semua kode bawaan, lalu paste seluruh isi file ini.
 * 3. Klik "Deploy" -> "New deployment".
 * 4. Pilih tipe "Web app".
 * 5. Set "Execute as": "Me (email Anda)".
 * 6. Set "Who has access": "Anyone" (PENTING agar web Vercel bisa akses).
 * 7. Klik "Deploy" dan izinkan hak akses (Authorize access).
 * 8. Salin "Web App URL" (akhiran /exec) dan simpan di Vercel / .env sebagai VITE_APPS_SCRIPT_URL.
 */

const FOLDER_NAME = "KUUNDANG";
const SPREADSHEET_NAME = "KUUNDANG_DATABASE";

/**
 * Mendapatkan atau membuat folder 'KUUNDANG' di Google Drive
 */
function getOrCreateFolder() {
  const folders = DriveApp.getFoldersByName(FOLDER_NAME);
  if (folders.hasNext()) {
    const folder = folders.next();
    folder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    return folder;
  }
  const newFolder = DriveApp.createFolder(FOLDER_NAME);
  newFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return newFolder;
}

/**
 * Mendapatkan atau membuat Spreadsheet Database di dalam folder 'KUUNDANG'
 */
function getOrCreateSpreadsheet() {
  const folder = getOrCreateFolder();
  const files = folder.getFilesByName(SPREADSHEET_NAME);
  if (files.hasNext()) {
    const file = files.next();
    return SpreadsheetApp.openById(file.getId());
  }
  
  // Buat Spreadsheet baru di dalam folder KUUNDANG
  const ss = SpreadsheetApp.create(SPREADSHEET_NAME);
  const file = DriveApp.getFileById(ss.getId());
  folder.addFile(file);
  DriveApp.getRootFolder().removeFile(file);

  // Inisialisasi Sheet bawaan
  initSheets(ss);
  return ss;
}

function initSheets(ss) {
  const sheets = [
    { name: "Invitations", headers: ["id", "title", "slug", "template_id", "wedding_date", "status", "opening_title", "bride_nickname", "groom_nickname", "greeting_text", "music_url", "music_title", "data_json", "updated_at"] },
    { name: "RSVPs", headers: ["id", "invitation_id", "guest_name", "attendance", "guest_count", "message", "created_at"] },
    { name: "Wishes", headers: ["id", "invitation_id", "guest_name", "message", "status", "created_at"] },
    { name: "Guests", headers: ["id", "invitation_id", "name", "guest_code", "category", "max_guests", "created_at"] }
  ];

  sheets.forEach(s => {
    let sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.appendRow(s.headers);
      sheet.setFrozenRows(1);
    }
  });

  // Hapus Sheet1 bawaan jika ada
  const defaultSheet = ss.getSheetByName("Sheet1");
  if (defaultSheet && ss.getSheets().length > 1) {
    ss.deleteSheet(defaultSheet);
  }
}

/**
 * ROUTE: GET (Mengambil data undangan, ucapan, rsvp)
 */
function doGet(e) {
  try {
    const action = e.parameter.action || "getInvitation";
    const ss = getOrCreateSpreadsheet();

    if (action === "getInvitation") {
      const slug = e.parameter.slug;
      const id = e.parameter.id;
      const sheet = ss.getSheetByName("Invitations");
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const rows = data.slice(1);

      let foundRow = null;
      for (let i = 0; i < rows.length; i++) {
        const rowObj = {};
        headers.forEach((h, idx) => rowObj[h] = rows[i][idx]);
        if ((slug && rowObj.slug === slug) || (id && rowObj.id === id)) {
          foundRow = rowObj;
          break;
        }
      }

      if (foundRow) {
        let fullData = {};
        if (foundRow.data_json) {
          try { fullData = JSON.parse(foundRow.data_json); } catch (err) {}
        }
        return jsonResponse({ success: true, data: { ...foundRow, ...fullData } });
      }

      return jsonResponse({ success: false, message: "Invitation not found" }, 404);
    }

    if (action === "getWishes") {
      const invitationId = e.parameter.invitation_id;
      const sheet = ss.getSheetByName("Wishes");
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const rows = data.slice(1);

      const wishes = rows
        .map(r => {
          const obj = {};
          headers.forEach((h, idx) => obj[h] = r[idx]);
          return obj;
        })
        .filter(w => !invitationId || w.invitation_id === invitationId)
        .reverse();

      return jsonResponse({ success: true, data: wishes });
    }

    if (action === "getRSVPs") {
      const invitationId = e.parameter.invitation_id;
      const sheet = ss.getSheetByName("RSVPs");
      const data = sheet.getDataRange().getValues();
      const headers = data[0];
      const rows = data.slice(1);

      const rsvps = rows
        .map(r => {
          const obj = {};
          headers.forEach((h, idx) => obj[h] = r[idx]);
          return obj;
        })
        .filter(r => !invitationId || r.invitation_id === invitationId)
        .reverse();

      return jsonResponse({ success: true, data: rsvps });
    }

    return jsonResponse({ success: true, message: "Kuundang Apps Script API is running" });
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() }, 500);
  }
}

/**
 * ROUTE: POST (Upload File ke Drive, Simpan Undangan, Kirim RSVP / Ucapan)
 */
function doPost(e) {
  try {
    let payload = {};
    if (e.postData && e.postData.contents) {
      payload = JSON.parse(e.postData.contents);
    }

    const action = payload.action || e.parameter.action;
    const ss = getOrCreateSpreadsheet();

    // 1. UPLOAD FILE KE GOOGLE DRIVE (Folder KUUNDANG)
    if (action === "uploadFile") {
      const folder = getOrCreateFolder();
      const base64Data = payload.base64Data; // data:*/*;base64,.....
      const fileName = payload.fileName || "upload_" + new Date().getTime();
      const mimeType = payload.mimeType || "image/jpeg";

      // Bersihkan header base64 jika ada
      let pureBase64 = base64Data;
      if (base64Data.indexOf(",") > -1) {
        pureBase64 = base64Data.split(",")[1];
      }

      const decodedBytes = Utilities.base64Decode(pureBase64);
      const blob = Utilities.newBlob(decodedBytes, mimeType, fileName);
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

      // Buat URL langsung gambar/media yang bisa di-load di web tanpa batas
      const fileId = file.getId();
      // Gunakan lh3.googleusercontent atau uc?export=view untuk link langsung
      const directUrl = "https://lh3.googleusercontent.com/d/" + fileId;
      const downloadUrl = file.getDownloadUrl();
      const viewUrl = file.getUrl();

      return jsonResponse({
        success: true,
        fileId: fileId,
        url: directUrl,
        downloadUrl: downloadUrl,
        viewUrl: viewUrl,
        fileName: fileName
      });
    }

    // 2. SIMPAN / UPDATE UNDANGAN
    if (action === "saveInvitation") {
      const invData = payload.invitation;
      const sheet = ss.getSheetByName("Invitations");
      const data = sheet.getDataRange().getValues();
      const rows = data.slice(1);

      let existingRowIndex = -1;
      for (let i = 0; i < rows.length; i++) {
        if (rows[i][0] === invData.id || rows[i][2] === invData.slug) {
          existingRowIndex = i + 2; // offset 1-based index + header
          break;
        }
      }

      const rowValues = [
        invData.id,
        invData.title || "",
        invData.slug,
        invData.template_id || "royal-arch",
        invData.wedding_date || "",
        invData.status || "published",
        invData.opening_title || "THE WEDDING OF",
        invData.bride_nickname || "",
        invData.groom_nickname || "",
        invData.greeting_text || "",
        invData.music_url || "",
        invData.music_title || "",
        JSON.stringify(invData),
        new Date().toISOString()
      ];

      if (existingRowIndex > 0) {
        sheet.getRange(existingRowIndex, 1, 1, rowValues.length).setValues([rowValues]);
      } else {
        sheet.appendRow(rowValues);
      }

      return jsonResponse({ success: true, message: "Invitation saved successfully" });
    }

    // 3. KIRIM UCAPAN
    if (action === "submitWish") {
      const wish = payload.wish;
      const sheet = ss.getSheetByName("Wishes");
      sheet.appendRow([
        wish.id || ("wsh-" + new Date().getTime()),
        wish.invitation_id,
        wish.guest_name,
        wish.message,
        wish.status || "approved",
        wish.created_at || new Date().toISOString()
      ]);
      return jsonResponse({ success: true, message: "Wish submitted" });
    }

    // 4. KIRIM RSVP
    if (action === "submitRSVP") {
      const rsvp = payload.rsvp;
      const sheet = ss.getSheetByName("RSVPs");
      sheet.appendRow([
        rsvp.id || ("rsvp-" + new Date().getTime()),
        rsvp.invitation_id,
        rsvp.guest_name,
        rsvp.attendance,
        rsvp.guest_count || 1,
        rsvp.message || "",
        rsvp.created_at || new Date().toISOString()
      ]);
      return jsonResponse({ success: true, message: "RSVP submitted" });
    }

    return jsonResponse({ success: false, message: "Invalid action" }, 400);
  } catch (error) {
    return jsonResponse({ success: false, error: error.toString() }, 500);
  }
}

function jsonResponse(data, statusCode) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
