import { gql } from '@apollo/client';
import { getNextServerSideProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { WiaHomeFieldsFragment } from '../fragments/WiaHomeFields';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import { parseProviderList, WIA_HOME_FALLBACK } from '../constants/wiaHomeFallback';

export default function MeetTheTeamPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  const w = data?.homeNode?.wiaHomeFields ?? {};
  const F = WIA_HOME_FALLBACK;
  const teamHeading = w.teamSectionHeading || F.teamSectionHeading;
  const providers = parseProviderList(w.teamProvidersList || F.teamProvidersList);

  return (
    <>
      <SEO title={`Meet the Team - ${siteTitle}`} description={siteDescription} />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-[100px] pt-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-3xl md:text-4xl font-display text-gray-900 tracking-tight uppercase mb-4">
                Meet the Team
              </h1>
              <p className="text-gray-700 font-sans text-lg mb-10">
                {teamHeading}:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {providers.map((name, i) => (
                  <motion.li
                    key={name}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="bg-white border border-gray-200 rounded-[10px] px-4 py-3 font-sans text-gray-900 shadow-sm"
                  >
                    {name}
                  </motion.li>
                ))}
              </ul>
              <p className="mt-10 text-gray-600 font-sans text-sm leading-relaxed">
                Individual bios and photos can be added here or managed via WordPress when ready.
              </p>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

MeetTheTeamPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${WiaHomeFieldsFragment}
  query GetMeetTheTeamPage(
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

MeetTheTeamPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page: MeetTheTeamPage,
  });
}
