/** @type {import('tailwindcss').Config} */
/**
 * WIA theme — palette aligned to approved homepage PDF (navy headline, clinical blue accents,
 * cool gray surfaces). Tweak hex values here if design exports exact tokens.
 */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './wp-templates/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      maxWidth: {
        page: '1200px',
        content: '42rem',
      },
      colors: {
        wia: {
          /** Primary wordmark / headings */
          navy: '#1a365d',
          'navy-dark': '#152a45',
          /** Links, secondary UI */
          blue: '#2b6cb0',
          'blue-dark': '#245a8f',
          /** Primary CTAs — red accent */
          red: '#c53030',
          'red-dark': '#9b2c2c',
          /** Subtle fills (hero bands, cards) */
          'accent-light': '#e8f0f7',
          /** Page background — cool blue-gray (replaces warm cream) */
          surface: '#f0f4f8',
          /** Alias for legacy class names */
          cream: '#f0f4f8',
          'cream-hover': '#e2eaf2',
          border: '#cbd5e1',
          muted: '#64748b',
          body: '#334155',
          /** Focus rings / form highlight */
          mustard: '#dbeafe',
          'newsletter-input': '#f1f5f9',
          /** Nav active pill — neutral slate (PDF-style, not green) */
          'nav-pill': '#e2e8f0',
        },
      },
      fontFamily: {
        /** Single geometric stack: webfont + Futura + fallbacks */
        sans: [
          'var(--font-futura)',
          'Futura',
          'Futura PT',
          'Century Gothic',
          'Trebuchet MS',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: [
          'var(--font-futura)',
          'Futura',
          'Futura PT',
          'Century Gothic',
          'Trebuchet MS',
          'Helvetica Neue',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
    },
  },
  plugins: [],
};
