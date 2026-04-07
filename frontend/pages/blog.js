import { gql } from '@apollo/client';
import { getNextStaticProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

const PLACEHOLDER_POSTS = [
  {
    id: 1,
    title: 'Anesthesia Simulation for Local Students',
    excerpt:
      'How West Idaho Anesthesia invites high school and college students into realistic perioperative scenarios.',
    author: 'West Idaho Anesthesia',
    date: 'March 2026',
    category: 'Community',
  },
  {
    id: 2,
    title: 'Excellence in Customer Service',
    excerpt:
      'Our team approach to patients, surgeons, and staff—and what it means for your surgery day.',
    author: 'West Idaho Anesthesia',
    date: 'March 2026',
    category: 'Mission',
  },
  {
    id: 3,
    title: 'Serving the Treasure Valley',
    excerpt:
      'We care for patients across Boise, Meridian, Nampa, Caldwell, Emmett, Eagle, and surrounding communities.',
    author: 'West Idaho Anesthesia',
    date: 'March 2026',
    category: 'News',
  },
];

export default function BlogPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  const posts = data?.posts?.nodes?.length
    ? data.posts.nodes.map((p) => ({
        id: p.databaseId,
        title: p.title,
        excerpt: p.excerpt?.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
        author: p.author?.node?.name || 'West Idaho Anesthesia',
        date: p.date,
        category: p.categories?.nodes?.[0]?.name || 'News',
        slug: p.slug,
      }))
    : PLACEHOLDER_POSTS;

  return (
    <>
      <SEO title={`News - ${siteTitle}`} description={siteDescription} />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display mb-4 text-gray-900">
                News
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                Updates from West Idaho Anesthesia
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="overflow-hidden bg-white border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
                    <div className="relative h-48 bg-gradient-to-br from-sky-100 to-emerald-50 flex items-center justify-center">
                      <span className="font-display text-2xl text-wia-blue/80" aria-hidden>
                        WIA
                      </span>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3 text-xs text-gray-600">
                        <span className="px-2 py-1 bg-blue-100 text-wia-blue rounded-full font-medium">
                          {post.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>{post.date}</span>
                        </div>
                      </div>

                      <h3 className="text-xl font-display mb-3 text-gray-900 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-600">
                          <User className="w-3 h-3" />
                          <span>{post.author}</span>
                        </div>

                        {post.slug ? (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="text-wia-red hover:text-wia-red-dark hover:bg-red-50"
                          >
                            <Link href={`/${post.slug}`}>
                              Read More
                              <ArrowRight className="w-3 h-3 ml-1 inline" />
                            </Link>
                          </Button>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-wia-red hover:text-wia-red-dark hover:bg-red-50"
                          >
                            Read More
                            <ArrowRight className="w-3 h-3 ml-1 inline" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-16 text-center"
            >
              <Card className="p-8 bg-white border-gray-200">
                <h3 className="text-xl font-display text-gray-900 mb-2">
                  More articles coming soon
                </h3>
                <p className="text-gray-600">
                  WordPress posts will appear here when published. For urgent questions,{' '}
                  <Link href="/contact" className="text-wia-red hover:underline">
                    contact us
                  </Link>
                  .
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

BlogPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  query GetBlogPage(
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
    posts(first: 10, where: { status: PUBLISH }) {
      nodes {
        databaseId
        title
        excerpt
        slug
        date
        author {
          node {
            name
          }
        }
        categories {
          nodes {
            name
          }
        }
      }
    }
  }
`;

BlogPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getStaticProps(context) {
  return getNextStaticProps(context, {
    Page: BlogPage,
    revalidate: 60,
  });
}
