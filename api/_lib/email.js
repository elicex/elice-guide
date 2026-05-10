const { requireEnv, optionalEnv } = require('./env');

async function sendGuideEmail({ order, guideLink }) {
  const apiKey = requireEnv('RESEND_API_KEY');
  const from = requireEnv('EMAIL_FROM');
  const replyTo = optionalEnv('EMAIL_REPLY_TO', from);

  const html = `
    <div dir="rtl" style="font-family:Arial,sans-serif;line-height:1.7;color:#1f2522">
      <h2>היי ${escapeHtml(order.name)}, המדריך שלך מחכה לך</h2>
      <p>איזה כיף, הרכישה שלך הושלמה.</p>
      <p>אפשר לפתוח את המדריך כאן:</p>
      <p><a href="${guideLink}" style="display:inline-block;background:#E85D75;color:#fff;padding:12px 18px;border-radius:999px;text-decoration:none;font-weight:700">פתיחת המדריך</a></p>
      <p>ממליצה לשמור את המייל הזה, כדי שתוכלי לחזור למדריך בכל זמן.</p>
      <p>אליס</p>
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
