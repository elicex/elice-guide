const { sendJson } = require('../_lib/http');
const { findPaidOrderByAccessToken, logEvent } = require('../_lib/supabase');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  }

  try {
    const token = String(req.query.access || req.query.token || '').trim();

    if (!token || token.length < 24) {
      return sendJson(res, 401, { ok: false, error: 'Access token is required' });
    }

    const order = await findPaidOrderByAccessToken(token);
    if (!order) {
      await logEvent(null, 'guide_access_denied', { reason: 'invalid_token' });
      return sendJson(res, 403, { ok: false, error: 'Access denied' });
    }

    await logEvent(order.id, 'guide_access_granted', { email: order.email });
    return sendJson(res, 200, {
      ok: true,
      name: order.name,
      email: order.email,
    });
  } catch (error) {
    console.error(error);
    return sendJson(res, 500, { ok: false, error: 'Access check failed' });
  }
};
