import Link from 'next/link';
import Image from 'next/image';
import { gql, useQuery } from '@apollo/client';
import { telHrefFromPhone } from '../../constants/wiaHomeFallback';
import { SITE_NAV_LINKS_WITH_BILL_PAY } from '../../constants/siteNavLinks';
import SiteLogo from './SiteLogo';

const FOOTER_QUERY = gql`
  query FooterSiteData {
    nodeByUri(uri: "/") {
      ... on Page {
        wiaHomeFields {
          footerOrganizationName
          contactAddressLine1
          contactAddressLine2
          contactPhone
          contactEmail
          socialLinks {
            linkedinLink
            instaLink
            facebookLink
          }
        }
      }
    }
  }
`;

export default function SiteFooter() {
  const { data } = useQuery(FOOTER_QUERY, { fetchPolicy: 'cache-first' });
  const f = data?.nodeByUri?.wiaHomeFields;

  const orgName = f?.footerOrganizationName?.trim() || 'West Idaho Anesthesia';
  const line1 = f?.contactAddressLine1?.trim() || "2960 E St. Luke's St, Suite 400";
  const line2 = f?.contactAddressLine2?.trim() || 'Meridian, ID 83642';
  const phone = f?.contactPhone?.trim() || '(208) 488-0066';
  const email = f?.contactEmail?.trim() || 'WestIdahoAnesthesia@gmail.com';
  const telHref = telHrefFromPhone(phone);

  /* ACF `social_links`: Group → object; Repeater → array of rows. Both shapes supported. */
  const socialRaw = f?.socialLinks;
  const socialRow = Array.isArray(socialRaw) ? socialRaw[0] : socialRaw;
  const socials = [
    { href: socialRow?.linkedinLink, src: '/icons/wia-linkedin.svg', label: 'LinkedIn' },
    { href: socialRow?.instaLink, src: '/icons/wia-insta.svg', label: 'Instagram' },
    { href: socialRow?.facebookLink, src: '/icons/wia-fb.svg', label: 'Facebook' },
  ].filter((s) => s.href && String(s.href).trim());

  return (
    <footer className="bg-gradient-to-r from-black to-[#444444] text-white">
      <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-12">
        {/* Same three-column row at all breakpoints: logo | contact | social */}
        <div className="flex flex-row items-center gap-4 sm:gap-6 md:gap-8">
          <div className="flex shrink-0 justify-start">
            <Link href="/" className="inline-flex items-center">
              <SiteLogo
                height={88}
                className="h-[72px] w-auto max-w-[min(200px,28vw)] object-contain object-left sm:h-[80px] sm:max-w-[min(240px,32vw)] md:h-[88px] md:max-w-[min(268px,70vw)]"
              />
            </Link>
          </div>

          <div className="min-w-0 flex-1 space-y-1.5 px-1 text-center font-sans sm:space-y-2 sm:px-2">
            <p className="text-base font-semibold text-white sm:text-lg md:text-xl">{orgName}</p>
            <p className="text-[11px] leading-snug text-white/95 sm:text-sm md:text-[15px] md:leading-relaxed">
              {line1}, {line2}
              {telHref ? (
                <>
                  {' '}
                  <span className="text-white/80">·</span>{' '}
                  <a
                    href={`tel:${telHref}`}
                    className="text-white underline-offset-2 hover:underline hover:text-white/90"
                  >
                    {phone}
                  </a>
                </>
              ) : (
                ` · ${phone}`
              )}
            </p>
            <p className="text-[11px] sm:text-sm md:text-[15px]">
              <a
                href={`mailto:${encodeURIComponent(email)}`}
                className="break-all text-white underline-offset-2 hover:underline hover:text-white/90"
              >
                {email}
              </a>
            </p>
          </div>

          {socials.length > 0 && (
            <div className="flex shrink-0 justify-end gap-2 sm:gap-3">
              {socials.map(({ href, src, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20 sm:h-10 sm:w-10"
                  aria-label={label}
                >
                  <Image src={src} alt="" width={28} height={28} className="h-6 w-6 sm:h-7 sm:w-7" />
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="mt-10">
          <hr className="hidden border-0 border-t border-white/15 md:block" />
          <nav
            className="mb-6 hidden flex-wrap justify-center gap-x-4 gap-y-2 pt-6 font-sans text-[11px] font-medium uppercase tracking-wide md:flex"
            aria-label="Footer navigation"
          >
            {SITE_NAV_LINKS_WITH_BILL_PAY.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="text-white/85 transition-colors hover:text-white"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <p className="border-t border-white/15 font-sans mb-0 md:border-t-0 text-center text-white/55 text-xs" style={{ marginBottom: 0 }}>
            © {new Date().getFullYear()} West Idaho Anesthesia; Designed by SDesign, built and maintained by Mishap Creative
            Works
          </p>
        </div>
      </div>
    </footer>
  );
}
