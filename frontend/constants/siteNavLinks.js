/** Primary routes — header center nav + footer sub-nav (minus Online Bill Pay in header center). */
export const SITE_NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Meet the Team', path: '/meet-the-team' },
  { name: 'Patient Portal', path: '/patient-portal' },
  { name: 'Contact', path: '/contact' },
];

export const SITE_NAV_LINKS_WITH_BILL_PAY = [
  ...SITE_NAV_LINKS,
  { name: 'Online Bill Pay', path: '/online-bill-pay' },
];
