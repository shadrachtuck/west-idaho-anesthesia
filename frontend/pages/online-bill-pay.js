import { gql } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function OnlineBillPayPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

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
              <div className="rounded-[10px] border border-dashed border-wia-blue/40 bg-wia-cream/50 p-6 mb-6">
                <p className="text-sm text-gray-600 font-sans text-center">
                  Add your secure bill-pay link in this project (or in WordPress) when your practice management or
                  billing partner provides the URL.
                </p>
              </div>
              <Button variant="outline" asChild className="rounded-[10px] px-6">
                <Link href="/contact">Billing questions? Contact us</Link>
              </Button>
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
  }
`;

OnlineBillPayPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: OnlineBillPayPage,
    revalidate: 60,
  });
}
