import { gql } from '@apollo/client';
import { getNextServerSideProps } from '@faustwp/core';
import * as MENUS from '../constants/menus';
import { BlogInfoFragment } from '../fragments/GeneralSettings';
import { NavigationMenuItemFragment } from '../fragments/MenuAndImage';
import { SEO } from '../components/SEO';
import SiteLayout from '../components/site/SiteLayout';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { Mail, Send } from 'lucide-react';

export default function ContactPage(props) {
  const data = props?.data;
  const { title: siteTitle, description: siteDescription } =
    data?.generalSettings ?? {};

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const existing = JSON.parse(
      localStorage.getItem('contactSubmissions') || '[]'
    );
    localStorage.setItem(
      'contactSubmissions',
      JSON.stringify([
        ...existing,
        { ...formData, timestamp: Date.now() },
      ])
    );
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <SEO title={`Contact - ${siteTitle}`} description={siteDescription} />
      <SiteLayout>
        <div className="min-h-screen bg-wia-cream">
          <div className="max-w-4xl mx-auto px-4 py-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-5xl font-display mb-4 text-gray-900">
                Contact
              </h1>
              <p className="text-xl text-gray-700 max-w-2xl mx-auto">
                We&apos;d love to hear from you. Reach out with questions about anesthesia care, billing, or student
                programs.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <Card className="p-8 bg-white border-gray-200 shadow-lg">
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Name *
                        </label>
                        <Input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name"
                          className="border-gray-300"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700 mb-2"
                        >
                          Email *
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="your@email.com"
                          className="border-gray-300"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Subject *
                      </label>
                      <Input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        placeholder="What is this regarding?"
                        className="border-gray-300"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us more about your inquiry..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md bg-wia-cream focus:bg-wia-mustard focus:outline-none focus:ring-2 focus:ring-wia-red focus:border-transparent resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full px-8 py-6 text-lg rounded-full"
                    >
                      <Send className="w-5 h-5 mr-2 inline" />
                      Send Message
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Send className="w-10 h-10 text-green-600" />
                    </div>
                    <h3 className="text-3xl font-display mb-4 text-gray-900">
                      Message Sent!
                    </h3>
                    <p className="text-gray-700 mb-2">
                      Thank you for reaching out to us.
                    </p>
                    <p className="text-gray-600 mb-8">
                      We&apos;ll get back to you at{' '}
                      <span className="font-semibold">{formData.email}</span> as
                      soon as possible.
                    </p>
                    <Button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          subject: '',
                          message: '',
                        });
                      }}
                      variant="outline"
                      className="border-gray-300 text-gray-900 hover:bg-gray-50 rounded-full"
                    >
                      Send Another Message
                    </Button>
                  </motion.div>
                )}
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-12 text-center space-y-4"
            >
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Mail className="w-5 h-5" />
                <a
                  href="mailto:WestIdahoAnesthesia@gmail.com"
                  className="hover:text-wia-red transition-colors break-all"
                >
                  WestIdahoAnesthesia@gmail.com
                </a>
              </div>
              <p className="text-gray-600 font-sans text-sm">
                2960 E St. Luke&apos;s St, Suite 400, Meridian, ID 83642 ·{' '}
                <a href="tel:+12084880066" className="hover:text-wia-red transition-colors">
                  (208) 488-0066
                </a>
              </p>
            </motion.div>
          </div>
        </div>
      </SiteLayout>
    </>
  );
}

ContactPage.query = gql`
  ${BlogInfoFragment}
  ${NavigationMenuItemFragment}
  query GetContactPage(
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

ContactPage.variables = (context, extra) => ({
  headerLocation: MENUS.PRIMARY_LOCATION,
  footerLocation: MENUS.FOOTER_LOCATION,
});

export async function getServerSideProps(context) {
  return getNextServerSideProps(context, {
    Page: ContactPage,
  });
}
