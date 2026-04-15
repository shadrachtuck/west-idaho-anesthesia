import { gql } from '@apollo/client';
import { getNextServerSideProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../components/ui/Button';

export default function PatientPortalPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  return (
    <>
      <SEO title={`Patient Portal - ${siteTitle}`} description={siteDescription} />
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
                Patient Portal
              </h1>
              <p className="text-gray-700 font-sans leading-relaxed mb-6">
                When your facility or provider enables portal access, you&apos;ll receive instructions to register or log
                in. Use the portal to view messages, forms, and updates related to your care.
              </p>
              <p className="text-gray-700 font-sans leading-relaxed mb-8">
                If you need help accessing the portal, contact our office—we&apos;re happy to assist.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="rounded-[10px] px-6 w-full sm:w-auto">
                  <Link href="/contact">Contact the office</Link>
                </Button>
                <Button variant="outline" asChild className="rounded-[10px] px-6 w-full sm:w-auto">
                  <Link href="/online-bill-pay">Online Bill Pay</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

PatientPortalPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  query GetPatientPortalPage(
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

PatientPortalPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page: PatientPortalPage,
  });
}
