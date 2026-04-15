import { gql } from "@apollo/client";
import { useFaustQuery } from "@faustwp/core";
import * as MENUS from "../constants/menus";
import { BlogInfoFragment } from "../fragments/GeneralSettings";
import { NavigationMenuItemFragment } from "../fragments/MenuAndImage";
import { WiaHomeFieldsFragment } from "../fragments/WiaHomeFields";
import { SEO } from "../components/SEO";
import SiteLayout from "../components/site/SiteLayout";
import HeroCarousel from "../components/site/HeroCarousel";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "../components/ui/Button";
import {
  WIA_HOME_FALLBACK,
  parseProviderList,
  telHrefFromPhone,
} from "../constants/wiaHomeFallback";
import AcfImage from "../components/site/AcfImage";

function buildHeroSlides(w, fallbackHeading) {
  const rows = w.heroCarousel;
  if (!Array.isArray(rows) || rows.length === 0) {
    return [];
  }
  return rows
    .map((row) => {
      const node = row?.slideImage?.node;
      const src = node?.sourceUrl;
      if (!src) {
        return null;
      }
      const overlayRaw = row?.overlayText;
      const overlay =
        (overlayRaw && String(overlayRaw).trim()) || fallbackHeading;
      return {
        src,
        alt: node?.altText || "",
        overlay,
      };
    })
    .filter(Boolean);
}

function StoryCtaParagraph({ text, className }) {
  if (!text) {
    return null;
  }
  const match = text.match(/[\w.+-]+@[\w.-]+\.[A-Za-z]{2,}/);
  if (!match) {
    return <p className={className}>{text}</p>;
  }
  const email = match[0];
  const i = text.indexOf(email);
  return (
    <p className={className}>
      {text.slice(0, i)}
      <a
        href={`mailto:${email}`}
        className="text-wia-blue hover:text-wia-blue-dark underline font-medium"
      >
        {email}
      </a>
      {text.slice(i + email.length)}
    </p>
  );
}

const GET_PAGE_DATA = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${WiaHomeFieldsFragment}
  query GetFrontPageData(
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
  ) {
    generalSettings {
      ...BlogInfoFragment
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    homeNode: nodeByUri(uri: "/") {
      __typename
      ... on Page {
        ...WiaHomeFields
      }
    }
  }
`;

export default function Component(props) {
  if (props.loading) {
    return (
      <div className="min-h-screen bg-wia-surface flex items-center justify-center text-wia-muted">
        Loading...
      </div>
    );
  }

  const data = useFaustQuery(GET_PAGE_DATA) ?? {};
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  const w = data?.homeNode?.wiaHomeFields ?? {};
  const F = WIA_HOME_FALLBACK;

  const heroOrg = w.heroOrganizationName || F.heroOrganizationName;
  const heroHeading = w.heroHeading || F.heroHeading;
  const heroArea = w.heroServiceArea || F.heroServiceArea;
  const heroSlides = buildHeroSlides(w, heroHeading);
  const storyParagraph1 = w.storyParagraph1 || F.storyParagraph1;
  const storyQuote1 = w.storyQuote1 || F.storyQuote1;
  const storyParagraph2 = w.storyParagraph2 || F.storyParagraph2;
  const storyQuote2 = w.storyQuote2 || F.storyQuote2;
  const storyCtaParagraph = w.storyCtaParagraph || F.storyCtaParagraph;
  const onlineBillPayHeading = w.onlineBillPayHeading || F.onlineBillPayHeading;
  const onlineBillPayDescription =
    w.onlineBillPayDescription || F.onlineBillPayDescription;
  const missionHeading = w.missionHeading || F.missionHeading;
  const missionBody = w.missionBody || F.missionBody;
  const missionTagline = w.missionTagline || F.missionTagline;
  const givesBackHeading = w.givesBackHeading || F.givesBackHeading;
  const givesBackText = w.givesBackText || F.givesBackText;
  const simulationHeading = w.simulationHeading || F.simulationHeading;
  const simulationText = w.simulationText || F.simulationText;
  const providers = parseProviderList(
    w.teamProvidersList || F.teamProvidersList,
  );
  const teamHeading = w.teamSectionHeading || F.teamSectionHeading;
  const featuredGroupImage = w.featuredProviders?.node;
  const givesBackImage = w.givesBackImage?.node;
  const footerOrg = w.footerOrganizationName || F.footerOrganizationName;
  const addr1 = w.contactAddressLine1 || F.contactAddressLine1;
  const addr2 = w.contactAddressLine2 || F.contactAddressLine2;
  const phone = w.contactPhone || F.contactPhone;
  const email = w.contactEmail || F.contactEmail;
  const telHref = telHrefFromPhone(phone) || "+12084880066";
  const billPayHref = w.onlineBillPayUrl?.trim() || "";

  return (
    <>
      <SEO title={siteTitle} description={siteDescription} />
      <SiteLayout>
        {/* Hero — image carousel when slides exist; otherwise white band + headline */}
        {heroSlides.length > 0 ? (
          <div className="relative z-10">
            <HeroCarousel slides={heroSlides} />
            <div className="bg-white">
              <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-12 py-8 md:py-10 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <p className="font-display text-xl sm:text-2xl md:text-[1.75rem] text-wia-navy font-semibold tracking-tight mb-2">
                    {heroOrg}
                  </p>
                  <p className="text-sm sm:text-base text-wia-muted font-sans mb-8 max-w-2xl mx-auto whitespace-pre-line">
                    {heroArea}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                    <Button
                      size="lg"
                      asChild
                      className="rounded-[10px] px-8 w-full sm:w-auto font-semibold"
                    >
                      <Link href="/contact">Contact Us</Link>
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                      className="rounded-[10px] px-8 w-full sm:w-auto"
                    >
                      {billPayHref ? (
                        <a
                          href={billPayHref}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Online Bill Pay
                        </a>
                      ) : (
                        <Link href="/online-bill-pay">Online Bill Pay</Link>
                      )}
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative z-10 bg-white">
            <div className="max-w-page mx-auto px-4 sm:px-6 lg:px-12 pt-10 pb-12 md:pt-14 md:pb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <p className="font-display text-2xl sm:text-3xl md:text-[2rem] text-wia-navy font-semibold tracking-tight mb-4">
                  {heroOrg}
                </p>
                <h1 className="text-lg sm:text-xl md:text-2xl font-sans font-semibold text-wia-navy leading-snug max-w-3xl mx-auto mb-4">
                  {heroHeading}
                </h1>
                <p className="text-sm sm:text-base text-wia-muted font-sans mb-10 max-w-2xl mx-auto whitespace-pre-line">
                  {heroArea}
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
                  <Button
                    size="lg"
                    asChild
                    className="rounded-[10px] px-8 w-full sm:w-auto font-semibold"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="rounded-[10px] px-8 w-full sm:w-auto"
                  >
                    {billPayHref ? (
                      <a
                        href={billPayHref}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Online Bill Pay
                      </a>
                    ) : (
                      <Link href="/online-bill-pay">Online Bill Pay</Link>
                    )}
                  </Button>
                </div>
              </motion.div>
            </div>
          </div>
        )}

        {/* Mission */}
        <div className="bg-wia-surface py-12 md:py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl md:text-2xl font-display font-semibold text-wia-navy tracking-wide mb-6 uppercase">
                {missionHeading}
              </h2>
              <p className="text-wia-body text-lg md:text-xl font-sans leading-relaxed mb-4 whitespace-pre-line">
                {missionBody}
              </p>
              <p className="text-wia-blue font-display text-xl md:text-2xl font-semibold">
                {missionTagline}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Providers */}
        <div className="bg-white py-12 md:py-16">
          <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-12">
            <h2 className="text-xl md:text-2xl font-display font-semibold text-wia-navy mb-8 text-center md:text-left uppercase tracking-wide">
              {teamHeading}
            </h2>
            <p className="text-center md:text-left text-wia-body font-sans text-sm md:text-base leading-relaxed">
              {providers.join(", ")}
            </p>
            {featuredGroupImage ? (
              <div className="mb-10 max-w-4xl mx-auto md:mx-0">
                <AcfImage node={featuredGroupImage} />
              </div>
            ) : null}
          </div>
        </div>

        {/* Featured story — simulation program (from approved homepage copy) */}
        <article className="bg-wia-surface py-12 md:py-16">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <motion.section
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-6 md:space-y-8"
            >
              <header className="space-y-3">
                <h2 className="text-xl md:text-2xl font-display font-semibold text-wia-navy">
                  {givesBackHeading}
                </h2>
                <h3 className="text-lg md:text-xl font-display text-wia-blue font-semibold">
                  {simulationHeading}
                </h3>
                <p className="text-wia-body font-sans leading-relaxed whitespace-pre-line">
                  {simulationText}
                </p>
              </header>
              <div
                className={
                  givesBackImage
                    ? "grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 md:items-start"
                    : "space-y-4"
                }
              >
                {givesBackImage ? (
                  <div className="w-full min-w-0 [&_img]:w-full [&_img]:h-auto [&_img]:rounded-sm">
                    <AcfImage node={givesBackImage} />
                  </div>
                ) : null}
                <div className="space-y-4 min-w-0">
                  <p className="text-wia-body font-sans text-lg leading-relaxed whitespace-pre-line">
                    {givesBackText}
                  </p>
                  <p className="text-wia-body font-sans text-base md:text-lg leading-relaxed whitespace-pre-line">
                    {storyParagraph1}
                  </p>
                  <blockquote className="border-l-4 border-wia-blue pl-4 text-wia-body font-sans italic bg-white/60 py-2 pr-2 rounded-r-md whitespace-pre-line">
                    {storyQuote1}
                  </blockquote>
                  
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className={`prose prose-gray max-w-none ${
                    givesBackImage ? "md:col-span-2" : ""
                  }`}
                >
                <p className="text-wia-body font-sans text-base md:text-lg leading-relaxed mb-4 whitespace-pre-line">
                    {storyParagraph2}
                  </p>
                  <blockquote className="border-l-4 border-wia-navy/35 pl-4 my-6 text-wia-body font-sans italic bg-white/60 py-2 pr-2 rounded-r-md whitespace-pre-line">
                    {storyQuote2}
                  </blockquote>
                  <StoryCtaParagraph
                    text={storyCtaParagraph}
                    className="text-wia-body font-sans text-base md:text-lg leading-relaxed"
                  />
                </motion.div>
              </div>
            </motion.section>
          </div>
        </article>
      </SiteLayout>
    </>
  );
}

Component.queries = [
  {
    query: GET_PAGE_DATA,
    variables: (seedNode, ctx) => ({
      headerLocation: MENUS.PRIMARY_LOCATION,
      footerLocation: MENUS.FOOTER_LOCATION,
    }),
  },
];
