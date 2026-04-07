const { withFaust, getWpHostname } = require('@faustwp/core');
const { createSecureHeaders } = require('next-secure-headers');

// #region agent log
if (process.env.NODE_ENV === 'production') {
  const u = process.env.NEXT_PUBLIC_WORDPRESS_URL || '';
  let host = '';
  let protocol = '';
  try {
    const parsed = new URL(u);
    host = parsed.hostname;
    protocol = parsed.protocol;
  } catch (_) {}
  const payload = JSON.stringify({
    sessionId: '49882a',
    hypothesisId: 'H1',
    location: 'next.config.js:load',
    message: 'production build NEXT_PUBLIC_WORDPRESS_URL snapshot',
    data: { protocol, host, hasUrl: Boolean(u) },
    timestamp: Date.now(),
  });
  fetch('http://127.0.0.1:7811/ingest/0fb876ea-3574-4006-a8f1-2ad750fa2520', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'X-Debug-Session-Id': '49882a' },
    body: payload,
  }).catch(() => {
    try {
      const fs = require('fs');
      const path = require('path');
      const logPath = path.join(__dirname, '..', '.cursor', 'debug-49882a.log');
      fs.appendFileSync(logPath, payload + '\n');
    } catch (_) {}
  });
}
// #endregion

/**
 * @type {import('next').NextConfig}
 **/
module.exports = withFaust({
  reactStrictMode: true,
  sassOptions: {
    includePaths: ['node_modules'],
  },
  images: {
    domains: [getWpHostname()],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  async headers() {
    return [{ source: '/:path*', headers: createSecureHeaders({
      xssProtection: false
    }) }];
  },
  async redirects() {
    return [
      { source: '/shop', destination: '/online-bill-pay', permanent: false },
      { source: '/about', destination: '/services', permanent: false },
    ];
  },
});
