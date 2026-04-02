import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import AboutBioSection from "@/components/about/AboutBioSection";
import AboutFocusAreas from "@/components/about/AboutFocusAreas";
import AboutNextSurfaceCards from "@/components/about/AboutNextSurfaceCards";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import SectionHeading from "@/components/ui/SectionHeading";
import MetricStrip from "@/components/ui/MetricStrip";
import CalloutCard from "@/components/ui/CalloutCard";
import LinkCard from "@/components/ui/LinkCard";
import { buildPageMetadata } from "@/lib/seo";

type AboutPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.about" });

  return buildPageMetadata({
    locale,
    pathname: "/about",
    title: t("title"),
    description: t("description")
  });
}

export default async function AboutPage({ params }: AboutPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.about" });

  return (
    <SiteShell>
      <main>
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <Section>
          <div className="site-container">
            <MetricStrip
              items={[
                {
                  label: t("metricsOneLabel"),
                  value: t("metricsOneValue"),
                  detail: t("metricsOneDetail")
                },
                {
                  label: t("metricsTwoLabel"),
                  value: t("metricsTwoValue"),
                  detail: t("metricsTwoDetail")
                },
                {
                  label: t("metricsThreeLabel"),
                  value: t("metricsThreeValue"),
                  detail: t("metricsThreeDetail")
                }
              ]}
            />
          </div>
        </Section>

        <Section>
          <div className="site-container">
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
              <CalloutCard eyebrow={t("calloutEyebrow")} title={t("calloutTitle")} className="xl:min-h-full">
                <p className="body-lg reading-measure">{t("calloutBody")}</p>
              </CalloutCard>

              <div className="grid gap-6">
                <SectionHeading
                  eyebrow={t("focusEyebrow")}
                  title={t("focusTitle")}
                  text={t("focusText")}
                />
                <AboutFocusAreas
                  items={[
                    {
                      title: t("focusOneTitle"),
                      text: t("focusOneText")
                    },
                    {
                      title: t("focusTwoTitle"),
                      text: t("focusTwoText")
                    },
                    {
                      title: t("focusThreeTitle"),
                      text: t("focusThreeText")
                    }
                  ]}
                />
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <ContentBody>
            <AboutBioSection locale={locale} />
          </ContentBody>
        </Section>

        <Section>
          <div className="site-container">
            <SectionHeading eyebrow={t("linksEyebrow")} title={t("linksTitle")} />
            <AboutNextSurfaceCards
              items={[
                {
                  href: "/projects",
                  title: t("linkProjectsTitle"),
                  description: t("linkProjectsDescription")
                },
                {
                  href: "/research",
                  title: t("linkResearchTitle"),
                  description: t("linkResearchDescription")
                }
              ]}
            />
          </div>
        </Section>
      </main>
    </SiteShell>
  );
}
