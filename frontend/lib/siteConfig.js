/**
 * Environment-aware site config. WordPress base URL is set per environment via:
 * - `.env.development` → dev CMS
 * - `.env.production` → production CMS
 * `FAUST_SECRET_KEY` stays in `.env.local` (gitignored).
 */

export const isProduction = process.env.NODE_ENV === 'production';
export const isDevelopment = !isProduction;

/** WordPress origin for this build (from NEXT_PUBLIC_WORDPRESS_URL). */
export const wordPressUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL ?? '';

/** Label for debugging / conditional UI. */
export const siteEnvironment = isProduction ? 'production' : 'development';
