import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import { siteEnvironment, wordPressUrl } from '../../lib/siteConfig';

export default function SiteLayout({ children }) {
  return (
    <div
      className="min-h-screen flex flex-col bg-wia-surface"
      data-site-env={siteEnvironment}
      data-wordpress-url={wordPressUrl}
    >
      <SiteHeader />
      {/* Top bar + nav (mobile ~88px / md 72px) — keep content below fixed chrome */}
      <main className="flex-1 pt-[8rem] md:pt-[7.25rem]">{children}</main>
      <SiteFooter />
    </div>
  );
}
