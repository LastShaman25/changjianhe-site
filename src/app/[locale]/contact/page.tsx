import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import Section from "@/components/layout/Section";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactMethodCard from "@/components/ui/ContactMethodCard";
import CalloutCard from "@/components/ui/CalloutCard";
import LinkCard from "@/components/ui/LinkCard";
import ContactForm from "@/components/contact/ContactForm";
import type { Locale } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";

type ContactPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.contact" });

  return buildPageMetadata({
    locale,
    pathname: "/contact",
    title: t("title"),
    description: t("description")
  });
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.contact" });

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
            <div className="grid gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <ContactForm />

              <div className="grid gap-4">
                <SectionHeading
                  eyebrow={t("methodsEyebrow")}
                  title={t("methodsTitle")}
                  text={t("methodsText")}
                />

                <ContactMethodCard
                  label={t("linkedin")}
                  value={t("linkedinValue")}
                  description={t("linkedinDescription")}
                  href="https://www.linkedin.com/in/lastshaman"
                />
                <ContactMethodCard
                  label={t("projectsLabel")}
                  value={t("projectsValue")}
                  description={t("projectsDescription")}
                />
                <CalloutCard eyebrow={t("calloutEyebrow")} title={t("calloutTitle")}>
                  <p className="body-lg reading-measure">{t("calloutBody")}</p>
                </CalloutCard>
              </div>
            </div>

            <div className="mt-12">
              <SectionHeading eyebrow={t("linksEyebrow")} title={t("linksTitle")} />
              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <LinkCard
                  href="/projects"
                  title={t("linkProjectsTitle")}
                  description={t("linkProjectsDescription")}
                />
                <LinkCard
                  href="/research"
                  title={t("linkResearchTitle")}
                  description={t("linkResearchDescription")}
                />
              </div>
            </div>
          </div>
        </Section>
      </main>
    </SiteShell>
  );
}
