const { requireEnv } = require('./env');

function supabaseConfig() {
  return {
    url: requireEnv('SUPABASE_URL').replace(/\/$/, ''),
    key: requireEnv('SUPABASE_SERVICE_ROLE_KEY'),
  };
}

async function supabaseRequest(path, options = {}) {
  const { url, key } = supabaseConfig();
  const response = await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  const text = await response.text();
  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      data = text;
    }
  }

  if (!response.ok) {
    const error = new Error('Supabase request failed');
    error.statusCode = response.status;
    error.details = data;
    throw error;
  }

  return data;
}

async function createOrder(order) {
  const rows = await supabaseRequest('orders', {
    method: 'POST',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify(order),
  });
  return rows && rows[0];
}

async function updateOrder(id, patch) {
  const rows = await supabaseRequest(`orders?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: { Prefer: 'return=representation' },
    body: JSON.stringify({ ...patch, updated_at: new Date().toISOString() }),
  });
  return rows && rows[0];
}

async function findOrder(id) {
  const rows = await supabaseRequest(`orders?id=eq.${encodeURIComponent(id)}&select=*`, {
    method: 'GET',
  });
  return rows && rows[0];
}

async function logEvent(orderId, type, payload) {
  await supabaseRequest('events', {
    method: 'POST',
    body: JSON.stringify({
      order_id: orderId || null,
      type,
      payload,
    }),
  });
}

module.exports = { createOrder, updateOrder, findOrder, logEvent };
