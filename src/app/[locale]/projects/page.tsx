import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import { projects } from "@/data/projects";
import { buildPageMetadata } from "@/lib/seo";

type ProjectsPageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: ProjectsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.projects" });

  return buildPageMetadata({
    locale,
    pathname: "/projects",
    title: t("title"),
    description: t("description")
  });
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pages.projects" });
  const shared = await getTranslations({ locale, namespace: "Pages.shared" });

  return (
    <SiteShell>
      <main>
        <PageIntro
          eyebrow={t("eyebrow")}
          title={t("title")}
          description={t("description")}
        />

        <Section>
          <Container>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project) => (
                <LocaleLink
                  key={project.slug}
                  href={project.href}
                  className="metal-card block p-6"
                >
                  <p className="section-label">{shared("projectLabel")}</p>
                  <h2 className="headline-lg mt-5 text-[1.8rem]">{project.title[locale]}</h2>
                  <p className="body-md mt-4">{project.summary[locale]}</p>
                </LocaleLink>
              ))}
            </div>
          </Container>
        </Section>
      </main>
    </SiteShell>
  );
}
