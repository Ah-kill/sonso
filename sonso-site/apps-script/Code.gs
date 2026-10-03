// SoNSo lead capture: website contact form -> Google Sheet + alert email.
//
// Setup (once):
// 1. Open the lead sheet > Extensions > Apps Script, paste this file in, save.
// 2. Deploy > New deployment > type "Web app". Execute as: Me. Who has access: Anyone. Deploy, and authorise.
// 3. Copy the web app URL (ends in /exec) into lead_form_endpoint in _config.yml, then rebuild and deploy the site.
// After editing this code later: Deploy > Manage deployments > Edit > Version: New version (keeps the same URL).

const SHEET_ID = '1G4dov8Oe2kdX38nizA-c9HyDdsU6YTORVKTgEN5Yeik';
const ALERT_TO = 'hello@sonso.co.in';
const HEADERS = ['Timestamp', 'Name', 'Email', 'Company', 'Phone', 'Needs help with', 'Budget', 'Message',
  'Page', 'UTM source', 'UTM campaign', 'Status', 'Owner'];

function doPost(e) {
  const p = e.parameter;
  if (p.website_url) return json({ ok: true }); // honeypot: bots fill it

  const email = String(p.email || '').trim();
  if (!p.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !p.message) {
    return json({ ok: false, error: 'missing_fields' });
  }

  // Trim to a max length, and stop Sheets reading visitor text as a formula: values starting with
  // = + - @ (e.g. a phone number "+91 ...") would otherwise show #ERROR! or run as a formula.
  // A leading apostrophe makes Sheets store the value as plain text and isn't displayed.
  const clip = (v, n) => {
    const s = String(v || '').slice(0, n);
    return /^[=+\-@\t\r]/.test(s) ? "'" + s : s;
  };
  const stages = (e.parameters.stage || []).join(', ');

  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // two submissions at once must not overwrite each other
  try {
    const sheet = leadsSheet();
    sheet.appendRow([
      new Date(), clip(p.name, 200), clip(email, 200), clip(p.company, 200), clip(p.phone, 50), stages,
      clip(p.budget, 50), clip(p.message, 5000), clip(p.page, 200), clip(p.utm_source, 100), clip(p.utm_campaign, 100),
      'New', ''
    ]);
  } finally {
    lock.releaseLock();
  }

  MailApp.sendEmail({
    to: ALERT_TO,
    replyTo: email,
    subject: 'New website lead: ' + clip(p.name, 100) + (stages ? ' (' + stages + ')' : ''),
    body: [
      'Name: ' + p.name, 'Email: ' + email, 'Company: ' + (p.company || '-'), 'Phone: ' + (p.phone || '-'),
      'Needs help with: ' + (stages || '-'), 'Budget: ' + (p.budget || '-'), 'Page: ' + (p.page || '-'),
      '', p.message, '', 'All leads: https://docs.google.com/spreadsheets/d/' + SHEET_ID
    ].join('\n')
  });
  return json({ ok: true });
}

// Uses a tab named "Leads" if there is one, otherwise the first tab. Adds headings to an empty sheet.
function leadsSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const sheet = ss.getSheetByName('Leads') || ss.getSheets()[0];
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold');
  }
  return sheet;
}

// Run this once from the Apps Script editor to check the sheet and email work before going live.
function testLead() {
  const fake = { name: 'Test lead', email: 'test@example.com', company: 'Test Co', phone: '', budget: '',
    message: 'Test from Apps Script editor', page: '/contact', utm_source: '', utm_campaign: '' };
  Logger.log(doPost({ parameter: fake, parameters: { stage: ['build'] } }).getContent());
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
