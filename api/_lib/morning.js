const { optionalEnv, requireEnv } = require('./env');

let cachedToken = null;
let tokenExpires = 0;

function morningConfig() {
  return {
    baseUrl: optionalEnv('MORNING_BASE_URL', 'https://api.greeninvoice.co.il/api/v1').replace(/\/$/, ''),
    apiKey: requireEnv('MORNING_API_KEY'),
    apiSecret: requireEnv('MORNING_API_SECRET'),
    enabled: optionalEnv('ENABLE_MORNING_INVOICES', 'true') === 'true',
  };
}

async function getMorningToken() {
  const { baseUrl, apiKey, apiSecret } = morningConfig();
  const now = Math.floor(Date.now() / 1000);
  const refreshBufferSeconds = 300;

  if (cachedToken && now < tokenExpires - refreshBufferSeconds) {
    return cachedToken;
  }

  const response = await fetch(`${baseUrl}/account/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: apiKey, secret: apiSecret }),
  });

  const data = await readMorningResponse(response);
  if (!response.ok) {
    const error = new Error('Morning token request failed');
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  if (!data || !data.token || !data.expires) {
    throw new Error('Invalid token response from Morning API');
  }

  cachedToken = data.token;
  tokenExpires = data.expires;
  return cachedToken;
}

async function readMorningResponse(response) {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch (error) {
    return text;
  }
}

async function morningFetch(path, options = {}) {
  const { baseUrl } = morningConfig();
  let token = await getMorningToken();

  async function request(currentToken) {
    return fetch(`${baseUrl}${path}`, {
      ...options,
      headers: {
        Authorization: `Bearer ${currentToken}`,
        'Content-Type': 'application/json',
        ...(options.headers || {}),
      },
    });
  }

  let response = await request(token);
  if (response.status === 401) {
    cachedToken = null;
    token = await getMorningToken();
    response = await request(token);
  }

  return response;
}

async function ensureMorningClient({ name, email, phone }) {
  const searchResponse = await morningFetch('/clients/search', {
    method: 'POST',
    body: JSON.stringify({ emails: [email] }),
  });

  const searchData = await readMorningResponse(searchResponse);
  if (!searchResponse.ok) {
    const error = new Error('Morning client search failed');
    error.statusCode = searchResponse.status;
    error.details = searchData;
    throw error;
  }

  const existingClient = searchData && searchData.items && searchData.items[0];
  if (existingClient && existingClient.id) {
    const updateResponse = await morningFetch(`/clients/${existingClient.id}`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        emails: [email],
        phone: phone || undefined,
        active: true,
      }),
    });

    if (!updateResponse.ok) {
      // A stale client update should not prevent document creation with the known id.
      await readMorningResponse(updateResponse);
    }

    return existingClient.id;
  }

  const createResponse = await morningFetch('/clients', {
    method: 'POST',
    body: JSON.stringify({
      name,
      emails: [email],
      phone: phone || undefined,
      active: true,
    }),
  });

  const clientData = await readMorningResponse(createResponse);
  if (!createResponse.ok) {
    const error = new Error('Morning client creation failed');
    error.statusCode = createResponse.status;
    error.details = clientData;
    throw error;
  }

  return clientData.id;
}

function todayIsoDate() {
  return new Date().toISOString().slice(0, 10);
}

function normalizePrice(value) {
  return Math.round(Number(value || 0) * 100) / 100;
}

async function createMorningTaxInvoiceReceipt({ order, transactionId }) {
  const config = morningConfig();
  if (!config.enabled) {
    return { skipped: true };
  }

  const amount = normalizePrice(order.amount);
  const customerId = await ensureMorningClient({
    name: order.name,
    email: order.email,
    phone: order.phone,
  });

  const payload = {
    type: 320,
    client: {
      id: customerId,
      name: order.name,
      email: order.email,
      emails: [order.email],
    },
    currency: order.currency || 'ILS',
    sendEmail: true,
    income: [
      {
        description: order.product_name || 'בניית הגוף מבפנים ומבחוץ',
        quantity: 1,
        price: amount,
        currency: order.currency || 'ILS',
        vatType: 1,
      },
    ],
    payment: [
      {
        type: 3,
        price: amount,
        date: todayIsoDate(),
      },
    ],
    remarks: `Cardcom transaction: ${transactionId || order.cardcom_transaction_id || order.id}`,
    signed: true,
    rounding: true,
    lang: 'he',
  };

  const response = await morningFetch('/documents', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  const data = await readMorningResponse(response);
  if (!response.ok) {
    const error = new Error('Morning invoice creation failed');
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  const emailResult = await sendMorningDocumentEmail({
    documentId: data.id,
    email: order.email,
  });

  return {
    documentId: data.id,
    documentNumber: data.number,
    customerId,
    emailSent: emailResult.sent,
    emailResponse: emailResult.data,
    raw: data,
  };
}

async function sendMorningDocumentEmail({ documentId, email }) {
  if (!documentId || !email) {
    return { sent: false, data: { skipped: true } };
  }

  const response = await morningFetch(`/documents/${encodeURIComponent(documentId)}/send`, {
    method: 'POST',
    body: JSON.stringify({ emails: [email] }),
  });

  const data = await readMorningResponse(response);
  return {
    sent: response.ok,
    statusCode: response.status,
    data,
  };
}

module.exports = { createMorningTaxInvoiceReceipt, sendMorningDocumentEmail };
