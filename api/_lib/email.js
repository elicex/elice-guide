const { requireEnv, optionalEnv } = require('./env');

async function sendGuideEmail({ order, guideLink }) {
  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('EMAIL_FROM');
  const replyTo = optionalEnv('EMAIL_REPLY_TO', from);
  const baseUrl = optionalEnv('PUBLIC_BASE_URL', '').replace(/\/$/, '');
  const logoUrl = `${baseUrl}/assets/elice-logo-purple-email.png`;

  const html = `
    <div dir="rtl" style="margin:0;padding:0;background:#F7F4F0;font-family:Arial,sans-serif;color:#1f2522">
      <div style="max-width:560px;margin:0 auto;padding:34px 20px">
        <div style="text-align:center;margin-bottom:24px">
          <img src="${logoUrl}" alt="Elice Fit" width="132" style="display:inline-block;width:132px;max-width:60%;height:auto;border:0" />
        </div>
        <div style="background:#ffffff;border:1px solid #E8E0D8;border-radius:22px;padding:30px 26px;line-height:1.7">
          <h2 style="margin:0 0 14px;font-size:24px;line-height:1.35;color:#1f2522">היי ${escapeHtml(order.name)}, המדריך שלך מחכה לך</h2>
          <p style="margin:0 0 12px">איזה כיף, הרכישה שלך הושלמה.</p>
          <p style="margin:0 0 18px">אפשר לפתוח את המדריך כאן:</p>
          <p style="margin:0 0 22px"><a href="${guideLink}" style="display:inline-block;background:#E85D75;color:#fff;padding:12px 20px;border-radius:999px;text-decoration:none;font-weight:700">פתיחת המדריך</a></p>
          <p style="margin:0 0 12px">ממליצה לשמור את המייל הזה, כדי שתוכלי לחזור למדריך בכל זמן.</p>
          <p style="margin:0">אליס</p>
        </div>
      </div>
    </div>
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
