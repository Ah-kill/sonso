// SoNSo lead capture. Deploy as: Web app, execute as Me, access: Anyone.
// Paste the deployment URL into lead_form_endpoint in _config.yml.
// Sheet needs a "Leads" tab with columns:
// Timestamp | Name | Email | Company | Phone | Needs help with | Message | Page | UTM source | UTM campaign | Status | Owner

const SHEET_ID = 'YOUR_SHEET_ID';
const ALERT_TO = 'hello@sonso.co.in';

function doPost(e) {
  const p = e.parameter;
  if (p.website_url) return json({ ok: true }); // honeypot: bots fill it

  const email = String(p.email || '').trim();
  if (!p.name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !p.message) {
    return json({ ok: false, error: 'missing_fields' });
  }

  const stages = (e.parameters.stage || []).join(', ');
  const clip = (v, n) => String(v || '').slice(0, n);

  SpreadsheetApp.openById(SHEET_ID).getSheetByName('Leads').appendRow([
    new Date(), clip(p.name, 200), clip(email, 200), clip(p.company, 200), clip(p.phone, 50), stages,
    clip(p.message, 5000), clip(p.page, 200), clip(p.utm_source, 100), clip(p.utm_campaign, 100), 'New', ''
  ]);

  MailApp.sendEmail(ALERT_TO, 'New lead: ' + clip(p.name, 100), JSON.stringify(p, null, 2));
  return json({ ok: true });
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
