/**
 * Thin info strip above the main nav — black → charcoal gradient (reference layout).
 */
export default function SiteTopBar() {
  return (
    <div className="bg-gradient-to-r from-black to-[#444444] text-white text-center font-sans text-[11px] sm:text-xs md:text-sm leading-snug py-2 px-4 border-b border-white/10">
      <p className="max-w-page mx-auto mb-0">
        <span className="opacity-95">
          2960 E St. Luke&apos;s St, Suite 400, Meridian, ID 83642
        </span>
        <span className="hidden sm:inline" aria-hidden>
          {' '}
          ·{' '}
        </span>
        <span className="block sm:inline mt-1 sm:mt-0">
          <a
            href="tel:+12084880066"
            className="font-medium text-white hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/80"
          >
            (208) 488-0066
          </a>
        </span>
      </p>
    </div>
  );
}
