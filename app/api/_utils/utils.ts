export function logErrorResponse(errorObj: unknown): void {
  const green = '\x1b[32m';
  const yellow = '\x1b[33m';
  const reset = '\x1b[0m';

  console.log(`${green}> ${yellow}Error Response Data:${reset}`);
  console.dir(errorObj, { depth: null, colors: true });
}

export function normalizeSessionId(value: string): string {
  let normalized = value;

  // Some backends send JSON cookies like j:%22<id>%22, which can arrive URL-encoded once or twice.
  for (let i = 0; i < 2; i += 1) {
    try {
      const decoded = decodeURIComponent(normalized);
      if (decoded === normalized) {
        break;
      }
      normalized = decoded;
    } catch {
      break;
    }
  }

  const jsonCookieMatch = normalized.match(/^j:"([^"]+)"$/);
  if (jsonCookieMatch?.[1]) {
    return jsonCookieMatch[1];
  }

  return normalized;
}

export function buildBackendCookieHeader(cookieStore: {
  getAll: () => Array<{ name: string; value: string }>;
}): string {
  return cookieStore
    .getAll()
    .filter(({ name }) => name !== '__next_hmr_refresh_hash__')
    .map(({ name, value }) => {
      if (name === 'sessionId') {
        return `${name}=${normalizeSessionId(value)}`;
      }

      return `${name}=${value}`;
    })
    .join('; ');
}
