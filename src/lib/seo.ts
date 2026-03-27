import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import { absoluteUrl, localeAlternates, siteDescription, siteName } from "@/lib/site";

type BuildPageMetadataProps = {
  locale: Locale;
  pathname: string;
  title: string;
  description: string;
};

export function buildPageMetadata({
  locale,
  pathname,
  title,
  description
}: BuildPageMetadataProps): Metadata {
  const localizedPath = `/${locale}${pathname === "/" ? "" : pathname}`;
  const url = absoluteUrl(localizedPath);

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: localeAlternates
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_US",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteName} social sharing image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl("/twitter-image")]
    }
  };
}

export function buildRootMetadata(): Metadata {
  return {
    metadataBase: new URL(absoluteUrl("/")),
    applicationName: siteName,
    title: {
      default: siteName,
      template: `%s | ${siteName}`
    },
    description: siteDescription,
    alternates: {
      canonical: absoluteUrl("/"),
      languages: localeAlternates
    },
    keywords: [
      "Changjian He",
      "CJ He",
      "AI Researcher",
      "Applied Mathematics",
      "Machine Learning Security",
      "AI Infrastructure",
      "Elementization",
      "ALOA",
      "Bilingual Portfolio"
    ],
    authors: [{ name: siteName, url: absoluteUrl("/en/about") }],
    creator: siteName,
    publisher: siteName,
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false
    },
    openGraph: {
      title: siteName,
      description: siteDescription,
      url: absoluteUrl("/"),
      siteName,
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${siteName} social sharing image`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
      images: [absoluteUrl("/twitter-image")]
    }
  };
}
