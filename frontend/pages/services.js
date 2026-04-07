import { gql } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';

export default function ServicesPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  return (
    <>
      <SEO title={`Services - ${siteTitle}`} description={siteDescription} />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-[100px] pt-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-display text-gray-900 tracking-tight uppercase mb-8">
                Services
              </h1>
              <div className="space-y-6 text-[#505050] font-sans text-base md:text-lg leading-relaxed">
                <p>
                  We discovered a need in the health care industry for a service-oriented group with a central focus on
                  customer service—customers being the patients, surgeons, and staff members we work with. Our goal is
                  to foster the &quot;team&quot; aspect of the surgical team. You can come to one of our facilities and
                  expect a level of anesthesia care comparable to anywhere in the world.
                </p>
                <p className="text-wia-blue font-display text-xl md:text-2xl">
                  Our Mission is Excellence in Customer Service!
                </p>
                <p>
                  West Idaho Anesthesia provides comprehensive anesthesia services across our partner facilities,
                  including general anesthesia, regional anesthesia, and perioperative consultation. Content for this
                  page can be expanded in WordPress or here as your service lines are finalized.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

ServicesPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  query GetServicesPage(
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
  }
`;

ServicesPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: ServicesPage,
    revalidate: 60,
  });
}
