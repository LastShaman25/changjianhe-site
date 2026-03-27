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

type AccomplishmentsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({
  params
}: AccomplishmentsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.accomplishments" });

  return buildPageMetadata({
    locale,
    pathname: "/accomplishments",
    title: t("title"),
    description: t("description")
  });
}

export default async function AccomplishmentsPage({ params }: AccomplishmentsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.accomplishments" });
  const { Component } = await loadMdx({ locale, section: "accomplishments", slug: "overview" });

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
            <CalloutCard eyebrow={t("calloutEyebrow")} title={t("calloutTitle")}>
              <p className="body-lg reading-measure-wide">{t("calloutBody")}</p>
            </CalloutCard>
          </div>
        </Section>

        <Section>
          <div className="site-container">
            <SectionHeading eyebrow={t("cardsEyebrow")} title={t("cardsTitle")} />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <CalloutCard title={t("cardOneTitle")}>
                <p className="body-md">{t("cardOneText")}</p>
              </CalloutCard>
              <CalloutCard title={t("cardTwoTitle")}>
                <p className="body-md">{t("cardTwoText")}</p>
              </CalloutCard>
              <CalloutCard title={t("cardThreeTitle")}>
                <p className="body-md">{t("cardThreeText")}</p>
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
                href="/projects"
                title={t("linkProjectsTitle")}
                description={t("linkProjectsDescription")}
              />
              <LinkCard
                href="/contact"
                title={t("linkContactTitle")}
                description={t("linkContactDescription")}
              />
            </div>
          </div>
        </Section>
      </main>
    </SiteShell>
  );
}
