import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import SectionHeading from "@/components/ui/SectionHeading";
import MetricStrip from "@/components/ui/MetricStrip";
import CalloutCard from "@/components/ui/CalloutCard";
import LinkCard from "@/components/ui/LinkCard";
import { loadMdx } from "@/lib/mdx/loadMdx";
import { buildPageMetadata } from "@/lib/seo";

type ResearchPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ResearchPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.research" });

  return buildPageMetadata({
    locale,
    pathname: "/research",
    title: t("title"),
    description: t("description")
  });
}

export default async function ResearchPage({ params }: ResearchPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.research" });
  const { Component } = await loadMdx({ locale, section: "research", slug: "overview" });

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
            <div className="grid gap-6 lg:grid-cols-2">
              <CalloutCard eyebrow={t("calloutEyebrow")} title={t("calloutTitle")}>
                <p className="body-lg reading-measure">{t("calloutBody")}</p>
              </CalloutCard>
              <CalloutCard eyebrow={t("methodsEyebrow")} title={t("methodsTitle")}>
                <p className="body-lg reading-measure">{t("methodsBody")}</p>
              </CalloutCard>
            </div>
          </div>
        </Section>

        <Section>
          <ContentBody>
            <MdxContent component={Component} />
          </ContentBody>
        </Section>

        <Section>
          <div className="site-container">
            <SectionHeading eyebrow={t("linksEyebrow")} title={t("linksTitle")} />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <LinkCard
                href="/projects/aloa"
                title={t("linkAloaTitle")}
                description={t("linkAloaDescription")}
              />
              <LinkCard
                href="/projects/elementization"
                title={t("linkElementizationTitle")}
                description={t("linkElementizationDescription")}
              />
            </div>
          </div>
        </Section>
      </main>
    </SiteShell>
  );
}
