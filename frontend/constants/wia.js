import { parseProviderList, WIA_HOME_FALLBACK } from './wiaHomeFallback';

/** Fallback provider names when ACF / GraphQL is unavailable (matches WP default list). */
export const WIA_PROVIDERS = parseProviderList(WIA_HOME_FALLBACK.teamProvidersList);
