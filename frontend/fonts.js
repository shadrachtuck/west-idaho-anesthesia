import { Jost } from 'next/font/google';

/**
 * Jost is a variable font derived from Futura — closest Google Fonts match.
 * CSS var --font-futura is applied app-wide; stack still prefers system Futura when installed.
 */
export const futura = Jost({
  subsets: ['latin'],
  variable: '--font-futura',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});
