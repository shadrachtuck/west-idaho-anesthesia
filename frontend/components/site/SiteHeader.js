import Link from 'next/link';
import SiteTopBar from './SiteTopBar';
import SiteNavigation from './SiteNavigation';
import SiteLogo from './SiteLogo';

/**
 * Fixed site chrome: gradient info bar, then main navigation.
 * md+: logo is absolutely positioned on the header so it spans the top bar + nav (same as before);
 * horizontally it sits in the outer sixth (1:4:1 with nav), matching SiteNavigation’s grid.
 */
export default function SiteHeader() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <SiteTopBar />
      <SiteNavigation />
      <div className="pointer-events-none absolute inset-x-0 top-2 bottom-2 z-[60] hidden md:block">
        <div className="mx-auto flex h-full max-w-page px-4 sm:px-6 lg:px-8">
          <div className="flex w-1/6 items-center justify-center pointer-events-auto">
            <Link
              href="/"
              className="inline-flex h-full max-h-full max-w-[min(220px,46vw)] items-center justify-center"
            >
              <SiteLogo
                intrinsicWidth={220}
                className="block h-full w-auto max-w-full object-contain sm:max-w-[min(210px,40vw)]"
              />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
