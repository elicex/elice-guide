const { requireEnv, optionalEnv } = require('./env');

async function sendGuideEmail({ order, guideLink }) {
  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('EMAIL_FROM');
  const replyTo = optionalEnv('EMAIL_REPLY_TO', from);
  const baseUrl = optionalEnv('PUBLIC_BASE_URL', '').replace(/\/$/, '');
  const logoUrl = `${baseUrl}/assets/elice-logo-purple-email.png`;
  const buyerName = escapeHtml(order.name);
  const safeGuideLink = escapeHtml(guideLink);

  const html = `
    <!doctype html>
    <html lang="he" dir="rtl">
      <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,sans-serif;color:#1f2522">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" dir="rtl" style="background:#ffffff">
          <tr>
            <td align="center" style="padding:28px 18px">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px">
                <tr>
                  <td align="center" style="padding:0 0 22px">
                    <img src="${logoUrl}" alt="Elice Fit" width="132" style="display:block;width:132px;height:auto;border:0;outline:none;text-decoration:none" />
                  </td>
                </tr>
                <tr>
                  <td dir="rtl" align="right" style="font-family:Arial,sans-serif;color:#1f2522;font-size:16px;line-height:1.75;text-align:right">
                    <h1 style="margin:0 0 14px;font-size:25px;line-height:1.35;color:#1f2522;font-weight:700">היי ${buyerName}, המדריך שלך מחכה לך</h1>
                    <p style="margin:0 0 12px">איזה כיף, הרכישה שלך הושלמה.</p>
                    <p style="margin:0 0 18px">אפשר לפתוח את המדריך כאן:</p>
                    <p style="margin:0 0 22px">
                      <a href="${safeGuideLink}" style="display:inline-block;background:#E85D75;color:#ffffff;padding:13px 22px;border-radius:999px;text-decoration:none;font-weight:700">פתיחת המדריך</a>
                    </p>
                    <p style="margin:0 0 12px">אם הכפתור לא נפתח, אפשר להעתיק את הקישור הזה לדפדפן:</p>
                    <p dir="ltr" style="margin:0 0 22px;word-break:break-all;color:#7B6BCF;font-size:13px;text-align:left">${safeGuideLink}</p>
                    <p style="margin:0 0 12px">ממליצה לשמור את המייל הזה, כדי שתוכלי לחזור למדריך בכל זמן.</p>
                    <p style="margin:0">אליס</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

  const text = `
היי ${order.name || ''}, המדריך שלך מחכה לך

איזה כיף, הרכישה שלך הושלמה.

אפשר לפתוח את המדריך כאן:
${guideLink}

ממליצה לשמור את המייל הזה, כדי שתוכלי לחזור למדריך בכל זמן.

אליס
  `;

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: order.email,
      reply_to: replyTo,
      subject: 'המדריך שלך מחכה לך כאן',
      html,
      text,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const error = new Error('Guide email failed');
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

function escapeHtml(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

module.exports = { sendGuideEmail };
