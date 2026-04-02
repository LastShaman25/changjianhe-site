import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import ProjectCards from "@/components/projects/ProjectCards";
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
            <ProjectCards
              items={projects.map((project) => ({
                key: project.slug,
                href: project.href,
                eyebrow: shared("projectLabel"),
                title: project.title[locale],
                summary: project.summary[locale]
              }))}
              titleClassName="headline-lg mt-5 text-[1.8rem]"
            />
          </Container>
        </Section>
      </main>
    </SiteShell>
  );
}
