export const siteName = 'Changjian "CJ" He';
export const siteTitle = "AI Researcher, Applied Mathematician & Founder";
export const siteDescription =
  "Bilingual personal site for Changjian He featuring AI research, machine learning security, deployable infrastructure, and flagship technical storytelling.";

export const defaultSiteUrl = "https://changjianhe.com";

export function getSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL?.trim() || defaultSiteUrl;

  return candidate.endsWith("/") ? candidate.slice(0, -1) : candidate;
}

export function absoluteUrl(pathname = "/") {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  return `${getSiteUrl()}${normalized}`;
}

export const localeAlternates = {
  en: absoluteUrl("/en"),
  zh: absoluteUrl("/zh"),
  "x-default": absoluteUrl("/en")
} as const;

