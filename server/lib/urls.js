function normalizeOrigin(url) {
  if (!url || typeof url !== 'string') return '';
  let normalized = url.trim().replace(/\/+$/, '');
  if (!normalized) return '';
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  return normalized;
}

export function getAllowedOrigins() {
  const origins = new Set([
    'https://nutriologacherety.com',
    'https://www.nutriologacherety.com',
    'https://brenda-cherety-production.up.railway.app',
  ]);

  const envClientUrl = normalizeOrigin(process.env.CLIENT_URL);
  if (envClientUrl) {
    origins.add(envClientUrl);
  }

  if (process.env.NODE_ENV !== 'production') {
    origins.add('http://localhost:5173');
  }

  return Array.from(origins);
}

export function getSafeClientUrl(reqOrigin) {
  const allowed = getAllowedOrigins();
  const normalizedReqOrigin = normalizeOrigin(reqOrigin);
  if (normalizedReqOrigin && allowed.includes(normalizedReqOrigin)) {
    return normalizedReqOrigin;
  }

  const envClientUrl = normalizeOrigin(process.env.CLIENT_URL);
  if (envClientUrl && envClientUrl.startsWith('https://nutriologacherety.com')) {
    return envClientUrl;
  }

  return process.env.NODE_ENV === 'production'
    ? 'https://nutriologacherety.com'
    : 'http://localhost:5173';
}
