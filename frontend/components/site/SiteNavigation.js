import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X } from 'lucide-react';
import { Button } from '../ui/Button';
import { SITE_NAV_LINKS } from '../../constants/siteNavLinks';
import SiteLogo from './SiteLogo';

export default function SiteNavigation() {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navItems = SITE_NAV_LINKS;

  const isActive = (path) => {
    const pathname = router.pathname || '/';
    if (path === '/') return pathname === '/';
    return pathname.startsWith(path);
  };

  return (
    <nav className="bg-white border-b border-wia-border shadow-sm">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8">
        {/* Small screens: Bill Pay left, logo center, menu right */}
        <div className="relative flex h-[5.5rem] items-center md:hidden">
          <div className="flex min-w-0 flex-1 justify-start z-10">
            <Button
              asChild
              size="sm"
              className="h-8 rounded-[10px] px-3 font-sans text-[11px] font-semibold uppercase tracking-wide shadow-sm sm:px-4"
            >
              <Link href="/online-bill-pay">Online Bill Pay</Link>
            </Button>
          </div>

          <div className="pointer-events-none absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="pointer-events-auto inline-flex h-[70px] max-w-[min(240px,58vw)] items-center justify-center"
            >
              <SiteLogo height={70} className="h-[70px] w-auto max-w-full object-contain" />
            </Link>
          </div>

          <div className="flex min-w-0 flex-1 justify-end z-10">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-wia-body hover:text-wia-navy transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-[28px] h-[28px]" /> : <Menu className="w-[28px] h-[28px]" />}
            </button>
          </div>
        </div>

        {/* md+: spacer left (logo is absolute on SiteHeader); nav center; bill pay right */}
        <div className="relative hidden md:flex h-[72px] items-center">
          <div className="flex min-w-0 flex-1 items-center justify-start z-10" />

          <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
            <div className="flex items-center gap-0.5 xl:gap-1">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`text-[11px] xl:text-xs font-sans font-medium uppercase tracking-wide transition-colors inline-flex items-center px-2.5 py-2 rounded-[10px] ${
                      isActive(item.path)
                        ? 'bg-wia-nav-pill text-wia-navy'
                        : 'text-wia-body hover:text-wia-red'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-1 justify-end items-center gap-3 z-10">
            <Button
              asChild
              className="rounded-[10px] px-4 xl:px-5 font-sans text-xs xl:text-sm font-semibold uppercase tracking-wide"
            >
              <Link href="/online-bill-pay">Online Bill Pay</Link>
            </Button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-wia-border bg-white">
          <div className="max-w-page mx-auto px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setMobileMenuOpen(false)}
              >
                <div
                  className={`block px-4 py-3 font-sans text-sm font-medium uppercase tracking-wide transition-colors ${
                    isActive(item.path)
                      ? 'bg-wia-accent-light text-wia-navy'
                      : 'text-wia-body hover:bg-wia-surface'
                  }`}
                >
                  {item.name}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
