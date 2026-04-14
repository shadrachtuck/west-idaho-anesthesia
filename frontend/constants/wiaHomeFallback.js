/**
 * Used when WP has no front page, ACF is empty, or GraphQL fields are null.
 */
export const WIA_HOME_FALLBACK = {
  heroOrganizationName: 'West Idaho Anesthesia',
  heroHeading:
    'Every Patient Deserves a Team of Conscientious Providers Watching Out for Them Throughout Their Surgery.',
  heroServiceArea:
    'Serving patients from Boise · Meridian · Nampa · Caldwell · Emmett · Eagle',
  storyParagraph1:
    'West Idaho Anesthesia offers unique educational experience for local students. Shad Westover, West Idaho Anesthesia Simulation Team Program Director, has organized an anesthesia simulation and invited high school and college students from the area to participate in real life scenarios, demonstrating all types of anesthesia, including general and regional.',
  storyQuote1:
    '"We are thrilled to give local students this hands-on opportunity with realistic scenarios in order to help them utilize important patient safety and crisis management principles they would face in a realistic experience," said Shad Westover, CRNA (nurse anesthesiologist).',
  storyParagraph2:
    'The program is designed to surpass the job shadow experience. Each session is limited to five to seven students who will follow a nurse anesthesiologist and a simulated patient throughout the perioperative process. It also includes a debriefing period when the students can ask questions regarding anesthesiology as a profession and receive information for future assistance along their career path.',
  storyQuote2:
    '"It is more important than ever right now to make sure we are keeping students interested in the healthcare field. This was a great opportunity for local students to see firsthand what it is like to work as a nurse anesthetist. So far we\'ve held one simulation and every student expressed an increased desire to go into healthcare after the experience," said Westover.',
  storyCtaParagraph:
    'High school or college students interested in health care as a profession: Please email westidahoanesthesia@gmail.com and we will get you booked for our next simulation experience.',
  onlineBillPayHeading: 'Online Bill Pay',
  onlineBillPayDescription:
    'Pay your bill securely online when your statement is ready. You can also reach our office with billing questions.',
  missionHeading: 'Our Mission',
  missionBody:
    'We discovered a need in the health care industry for a service-oriented group with a central focus on customer service—customers being the patients, surgeons, and staff members we work with. Our goal is to foster the "team" aspect of the surgical team. You can come to one of our facilities and expect a level of anesthesia care comparable to anywhere in the world.',
  missionTagline: 'Our Mission is Excellence in Customer Service!',
  givesBackHeading: 'WIA Gives Back',
  givesBackText:
    'We invest in our community through education and outreach—including hands-on learning opportunities for students exploring careers in healthcare.',
  simulationHeading: 'Anesthesia Simulation — Job Shadow Experience for Students',
  simulationText:
    'Our simulation program gives local students realistic perioperative scenarios alongside nurse anesthesiologists—building interest in the profession and reinforcing patient safety principles.',
  teamSectionHeading: 'Our skilled team of providers',
  teamProvidersList: `Ryan Lindemann
Shad Westover
Kevin Hamby
Jeff Borders
Dave Navarro
Gus Powell
Skylar Thornton
Blaine Fisk
Cody Gardner
Nate Steenblik`,
  contactAddressLine1: "2960 E St. Luke's St, Suite 400",
  contactAddressLine2: 'Meridian, ID 83642',
  contactPhone: '(208) 488-0066',
  contactEmail: 'WestIdahoAnesthesia@gmail.com',
  footerOrganizationName: 'West Idaho Anesthesia',
};

/** Parse newline-separated provider list into an array. */
export function parseProviderList(text) {
  if (!text || typeof text !== 'string') {
    return [];
  }
  return text
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

/**
 * Team rows for homepage / Meet the Team: repeater from ACF when present, else plain list (no images).
 * @param {object} w - wiaHomeFields from GraphQL
 * @param {string} fallbackListText - newline-separated names (e.g. WIA_HOME_FALLBACK.teamProvidersList)
 * @returns {{ name: string; image: object | null }[]}
 */
export function getTeamProviderRows(w, fallbackListText) {
  const rows = w?.teamProviders;
  if (Array.isArray(rows) && rows.length > 0) {
    return rows
      .map((row) => {
        const name = row?.providerName != null ? String(row.providerName).trim() : '';
        const image = row?.providerPhoto?.node ?? null;
        if (!name) {
          return null;
        }
        return { name, image };
      })
      .filter(Boolean);
  }
  return parseProviderList(w?.teamProvidersList || fallbackListText).map((name) => ({
    name,
    image: null,
  }));
}

/** Build tel: href from a display phone string (US-friendly). */
export function telHrefFromPhone(phone) {
  if (!phone || typeof phone !== 'string') {
    return '';
  }
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 10) {
    return `+1${digits}`;
  }
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }
  return digits ? `+${digits}` : '';
}
