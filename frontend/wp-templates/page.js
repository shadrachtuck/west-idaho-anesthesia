import { gql } from '@apollo/client';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import {
  NavigationMenuItemFragment,
  FeaturedImageFragment,
} from '../fragments/MenuAndImage';
import { ContentWrapper, SEO } from '../components';
import SiteLayout from '../components/site/SiteLayout';

export default function Component(props) {
  if (props.loading) {
    return <div className="min-h-screen bg-wia-cream flex items-center justify-center">Loading...</div>;
  }

  const { title: siteTitle, description: siteDescription } =
    props?.data?.generalSettings ?? {};
  const { title, content, featuredImage } = props?.data?.page ?? { title: '' };

  return (
    <>
      <SEO
        title={siteTitle}
        description={siteDescription}
        imageUrl={featuredImage?.node?.sourceUrl}
      />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {featuredImage?.node?.sourceUrl && (
              <div className="mb-8 rounded-2xl overflow-hidden">
                <img
                  src={featuredImage.node.sourceUrl}
                  alt={featuredImage.node.altText || title}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <h1 className="text-4xl font-serif mb-8 text-gray-900">{title}</h1>
            <div className="prose prose-gray max-w-none">
              <ContentWrapper content={content} />
            </div>
          </article>
        </div>
      </SiteLayout>
    </>
  );
}

Component.variables = ({ databaseId }, ctx) => {
  return {
    databaseId,
    headerLocation: MENUS.PRIMARY_LOCATION,
    footerLocation: MENUS.FOOTER_LOCATION,
    asPreview: ctx?.asPreview,
  };
};

Component.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  ${FeaturedImageFragment}
  query GetPageData(
    $databaseId: ID!
    $headerLocation: MenuLocationEnum
    $footerLocation: MenuLocationEnum
    $asPreview: Boolean = false
  ) {
    page(id: $databaseId, idType: DATABASE_ID, asPreview: $asPreview) {
      title
      content
      ...FeaturedImageFragment
    }
    generalSettings {
      ...BlogInfoFragment
    }
    footerMenuItems: menuItems(where: { location: $footerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
    headerMenuItems: menuItems(where: { location: $headerLocation }) {
      nodes {
        ...NavigationMenuItemFragment
      }
    }
  }
`;
