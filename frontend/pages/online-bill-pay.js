import { gql } from '@apollo/client';
import { getNextServerSideProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { WiaHomeFieldsFragment } from '../fragments/WiaHomeFields';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function OnlineBillPayPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};
  const payUrl = data?.homeNode?.wiaHomeFields?.onlineBillPayUrl?.trim() || '';

  return (
    <>
      <SEO title={`Online Bill Pay - ${siteTitle}`} description={siteDescription} />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-[100px] pt-12 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white border border-gray-200 rounded-[12px] p-8 md:p-10 shadow-sm"
            >
              <h1 className="text-3xl md:text-4xl font-display text-gray-900 tracking-tight uppercase mb-6">
                Online Bill Pay
              </h1>
              <p className="text-gray-700 font-sans leading-relaxed mb-6">
                Pay your bill online through your billing vendor when you receive a statement. If you have questions
                about a charge or need a payment plan, call our office—we&apos;re here to help.
              </p>
              <p className="text-gray-700 font-sans leading-relaxed mb-8">
                <strong className="text-gray-900">Office:</strong>{' '}
                <a href="tel:+12084880066" className="text-wia-red hover:underline">
                  (208) 488-0066
                </a>
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
                {payUrl ? (
                  <Button asChild className="rounded-[10px] px-6">
                    <a href={payUrl} target="_blank" rel="noopener noreferrer">
                      Pay online
                    </a>
                  </Button>
                ) : null}
                <Button variant="outline" asChild className="rounded-[10px] px-6">
                  <Link href="/contact">Billing questions? Contact us</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

OnlineBillPayPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${WiaHomeFieldsFragment}
  query GetOnlineBillPayPage(
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

OnlineBillPayPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page: OnlineBillPayPage,
  });
}
