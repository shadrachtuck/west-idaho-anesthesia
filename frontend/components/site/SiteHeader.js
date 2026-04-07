import Link from 'next/link';
import SiteTopBar from './SiteTopBar';
import SiteNavigation from './SiteNavigation';
import SiteLogo from './SiteLogo';

/**
 * Fixed site chrome: gradient info bar, then main navigation (full-width stack).
 * md+: logo is absolute on this header so it spans the top bar + nav (not clipped by <nav>).
 */
export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <SiteTopBar />
      <SiteNavigation />
      <Link
        href="/"
        className="pointer-events-auto absolute left-3 top-2 bottom-2 z-[60] hidden max-w-[min(220px,46vw)] sm:left-4 md:block"
      >
        <SiteLogo
          intrinsicWidth={220}
          className="block h-full w-auto max-w-[min(200px,44vw)] object-contain object-left sm:max-w-[min(210px,40vw)]"
        />
      </Link>
    </header>
  );
}
