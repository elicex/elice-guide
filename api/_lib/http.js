async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') return parseBody(req.body, req.headers['content-type'] || '');

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  return parseBody(raw, req.headers['content-type'] || '');
}

function parseBody(raw, contentType) {
  if (!raw) return {};
  if (contentType.includes('application/json')) {
    try {
      return JSON.parse(raw);
    } catch (error) {
      return {};
    }
  }

  const params = new URLSearchParams(raw);
  return Object.fromEntries(params.entries());
}

function sendJson(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(payload));
}

function getRequestBaseUrl(req) {
  const proto = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  return `${proto}://${host}`;
}

module.exports = { readBody, sendJson, getRequestBaseUrl };
