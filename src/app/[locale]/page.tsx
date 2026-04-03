import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import { HERO_MODE } from "@/config/heroMode";
import HeroSection from "@/components/home/HeroSection";
import HeroSectionClassic from "@/components/home/HeroSectionClassic";
import IdentityStrip from "@/components/home/IdentityStrip";
import FeaturedProjects from "@/components/home/FeaturedProjects";
import PhilosophySection from "@/components/home/PhilosophySection";
import ResearchTicker from "@/components/home/ResearchTicker";
import AccomplishmentsPreview from "@/components/home/AccomplishmentsPreview";
import ContactCta from "@/components/home/ContactCta";
import { featuredProjects } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";

type HomePageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: HomePageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });

  return buildPageMetadata({
    locale,
    pathname: "/",
    title: t("title"),
    description: t("intro")
  });
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "HomePage" });
  const heroProps = {
    eyebrow: t("heroEyebrow"),
    name: t("name"),
    title: t("title"),
    intro: t("intro"),
    ctaPrimary: t("ctaPrimary"),
    ctaSecondary: t("ctaSecondary")
  };

  return (
    <SiteShell>
      <main>
        {HERO_MODE === "cinematic" ? (
          <HeroSection {...heroProps} />
        ) : (
          <HeroSectionClassic {...heroProps} />
        )}

        <IdentityStrip
          eyebrow={t("identityEyebrow")}
          title={t("identityTitle")}
          text={t("identityText")}
        />

        <FeaturedProjects
          eyebrow={t("featuredEyebrow")}
          title={t("featuredTitle")}
          text={t("featuredText")}
          locale={locale}
          projects={featuredProjects}
        />

        <PhilosophySection
          eyebrow={t("philosophyEyebrow")}
          title={t("philosophyTitle")}
          text={t("philosophyText")}
        />

        <ResearchTicker locale={locale} />

        <AccomplishmentsPreview
          eyebrow={t("accomplishmentsEyebrow")}
          title={t("accomplishmentsTitle")}
          text={t("accomplishmentsText")}
          items={[
            t("accomplishmentsItems.one"),
            t("accomplishmentsItems.two"),
            t("accomplishmentsItems.three")
          ]}
          cta={t("accomplishmentsCta")}
        />

        <ContactCta
          eyebrow={t("contactEyebrow")}
          title={t("contactTitle")}
          text={t("contactText")}
          primary={t("contactPrimary")}
          secondary={t("contactSecondary")}
        />
      </main>
    </SiteShell>
  );
}
