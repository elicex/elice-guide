const crypto = require('crypto');
const { createLowProfilePayment } = require('../_lib/cardcom');
const { createOrder, updateOrder, logEvent } = require('../_lib/supabase');
const { readBody, sendJson, getRequestBaseUrl } = require('../_lib/http');
const { optionalEnv } = require('../_lib/env');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { ok: false, error: 'Method not allowed' });
  }

  try {
    const body = await readBody(req);
    const name = String(body.name || '').trim();
    const email = String(body.email || '').trim().toLowerCase();
    const phone = String(body.phone || '').trim();

    if (!name || !email || !email.includes('@')) {
      return sendJson(res, 400, { ok: false, error: 'שם ומייל תקין הם חובה.' });
    }

    const baseUrl = optionalEnv('PUBLIC_BASE_URL') || getRequestBaseUrl(req);
    const order = {
      id: `guide_${crypto.randomUUID()}`,
      name,
      email,
      phone,
      consent: Boolean(body.consent),
      status: 'pending',
      amount: Number(optionalEnv('GUIDE_PRICE', '149')),
      currency: 'ILS',
      product_name: optionalEnv('GUIDE_PRODUCT_NAME', 'בניית הגוף מבפנים ומבחוץ'),
      guide_access_token: crypto.randomBytes(24).toString('hex'),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    await createOrder(order);
    await logEvent(order.id, 'order_created', { page: body.page || null });

    const checkout = await createLowProfilePayment({
      order,
      successUrl: `${baseUrl}/payment-success.html?order=${encodeURIComponent(order.id)}`,
      errorUrl: `${baseUrl}/payment-failed.html?order=${encodeURIComponent(order.id)}`,
      indicatorUrl: `${baseUrl}/api/cardcom/indicator`,
    });

    await updateOrder(order.id, {
      cardcom_low_profile_code: checkout.lowProfileCode,
      cardcom_return_value: order.id,
    });
    await logEvent(order.id, 'cardcom_checkout_created', checkout.raw);

    return sendJson(res, 200, {
      ok: true,
      orderId: order.id,
      checkoutUrl: checkout.checkoutUrl,
    });
  } catch (error) {
    console.error(error);
    return sendJson(res, error.statusCode || 500, {
      ok: false,
      error: 'לא הצלחנו לפתוח סליקה כרגע. נסי שוב בעוד רגע.',
      details: process.env.NODE_ENV === 'development' ? error.details || error.message : undefined,
    });
  }
};
