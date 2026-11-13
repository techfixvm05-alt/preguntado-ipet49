const RANKING_SHEET = 'Ranking';
const HEADERS = ['Fecha', 'ID', 'Nombre o apodo', 'Puntaje', 'Aciertos', 'Preguntas', 'Ruleta'];

function doGet(event) {
  try {
    const sheet = getRankingSheet_();
    const lastRow = sheet.getLastRow();
    const ranking = lastRow < 2 ? [] : sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues()
      .filter((row) => row[1] && row[2])
      .map((row) => ({
        date: row[0] instanceof Date ? row[0].toISOString() : String(row[0] || ''),
        id: String(row[1]),
        name: String(row[2]),
        score: Number(row[3]) || 0,
        correct: Number(row[4]) || 0,
        total: Number(row[5]) || 0,
        roulette: String(row[6] || '')
      }))
      .sort((a, b) => b.score - a.score || String(a.date).localeCompare(String(b.date)))
      .slice(0, 50);
    return output_({ ranking: ranking }, event && event.parameter && event.parameter.callback);
  } catch (error) {
    return output_({ error: String(error.message || error), ranking: [] }, event && event.parameter && event.parameter.callback);
  }
}

function doPost(event) {
  try {
    const payload = JSON.parse(event.postData.contents || '{}');
    if (payload.action !== 'score') throw new Error('Acción no reconocida.');

    const id = String(payload.id || '').slice(0, 80);
    const name = cleanText_(payload.name, 28);
    const score = Number(payload.score);
    const correct = Number(payload.correct);
    const total = Number(payload.total);
    const roulette = cleanText_(payload.roulette, 48);
    if (!id || !name || !Number.isFinite(score) || !Number.isFinite(total) || total < 1 || total > 100) {
      throw new Error('El resultado no tiene los datos requeridos.');
    }

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const sheet = getRankingSheet_();
      const lastRow = sheet.getLastRow();
      if (lastRow > 1) {
        const existing = sheet.getRange(2, 2, lastRow - 1, 1).createTextFinder(id).matchEntireCell(true).findNext();
        if (existing) return output_({ ok: true, duplicate: true });
      }
      sheet.appendRow([new Date(), id, name, Math.max(-999, Math.min(999, Math.round(score))), Math.max(0, Math.min(total, Math.round(correct || 0))), Math.round(total), roulette]);
    } finally {
      lock.releaseLock();
    }
    return output_({ ok: true });
  } catch (error) {
    return output_({ ok: false, error: String(error.message || error) });
  }
}

function getRankingSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) throw new Error('Vinculá este proyecto de Apps Script a una hoja de cálculo.');
  let sheet = spreadsheet.getSheetByName(RANKING_SHEET);
  if (!sheet) sheet = spreadsheet.insertSheet(RANKING_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

function cleanText_(value, maxLength) {
  return String(value || '').replace(/[\u0000-\u001F\u007F]/g, '').trim().slice(0, maxLength);
}

function output_(data, callback) {
  const json = JSON.stringify(data);
  const safeCallback = String(callback || '');
  if (/^[A-Za-z_$][A-Za-z0-9_$]{0,79}$/.test(safeCallback)) {
    return ContentService.createTextOutput(`${safeCallback}(${json});`).setMimeType(ContentService.MimeType.JAVASCRIPT);
  }
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
