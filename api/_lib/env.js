function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    const error = new Error(`Missing required environment variable: ${name}`);
    error.statusCode = 500;
    throw error;
  }
  return value;
}

function optionalEnv(name, fallback = '') {
  return process.env[name] || fallback;
}

module.exports = { requireEnv, optionalEnv };
