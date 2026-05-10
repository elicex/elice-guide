const { readBody } = require('../_lib/http');
const { getLowProfileIndicator, isSuccessfulCharge } = require('../_lib/cardcom');
const { findOrder, updateOrder, logEvent } = require('../_lib/supabase');
const { sendGuideEmail } = require('../_lib/email');
const { optionalEnv } = require('../_lib/env');

module.exports = async function handler(req, res) {
  try {
    const body = req.method === 'GET' ? req.query : await readBody(req);
    const lowProfileCode = body.LowProfileId || body.LowProfileCode || body.lowprofileid || body.lowprofilecode || body.lowProfileCode;
    const orderId = body.ReturnValue || body.returnvalue || body.returnValue;

    await logEvent(orderId || null, 'cardcom_indicator_received', body);

    if (!lowProfileCode || !orderId) {
      res.statusCode = 200;
      return res.end('OK');
    }

    const order = await findOrder(orderId);
    if (!order) {
      await logEvent(orderId, 'cardcom_order_not_found', { lowProfileCode });
      res.statusCode = 200;
      return res.end('OK');
    }

    if (order.status === 'paid' && order.email_sent_at) {
      res.statusCode = 200;
      return res.end('OK');
    }

    const indicator = await getLowProfileIndicator(lowProfileCode);
    await logEvent(order.id, 'cardcom_indicator_verified', indicator);

    const paid = isSuccessfulCharge(indicator);
    await updateOrder(order.id, {
      status: paid ? 'paid' : 'failed',
      cardcom_low_profile_code: lowProfileCode,
      cardcom_transaction_id: indicator.TranzactionId || (indicator.TranzactionInfo && indicator.TranzactionInfo.TranzactionId) || null,
      cardcom_deal_response: indicator.TranzactionInfo ? String(indicator.TranzactionInfo.ResponseCode) : String(indicator.ResponseCode),
      cardcom_operation_response: String(indicator.ResponseCode),
    });

    if (paid && !order.email_sent_at) {
      const baseUrl = optionalEnv('PUBLIC_BASE_URL');
      const guideLink = `${baseUrl}/guide.html?access=${encodeURIComponent(order.guide_access_token)}`;
      await sendGuideEmail({ order, guideLink });
      await updateOrder(order.id, { email_sent_at: new Date().toISOString() });
      await logEvent(order.id, 'guide_email_sent', { to: order.email });
    }

    res.statusCode = 200;
    return res.end('OK');
  } catch (error) {
    console.error(error);
    // Cardcom retries failed indicators. We keep a 200 response after logging
    // so the buyer is not charged repeatedly because of a transient email issue.
    res.statusCode = 200;
    return res.end('OK');
  }
};
