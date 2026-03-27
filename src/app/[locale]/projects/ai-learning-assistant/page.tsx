import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import PageIntro from "@/components/layout/PageIntro";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import { getProjectBySlug } from "@/data/projects";
import { loadMdx } from "@/lib/mdx/loadMdx";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const project = getProjectBySlug("ai-learning-assistant");

  if (!project) {
    return {};
  }

  return buildPageMetadata({
    locale,
    pathname: project.href,
    title: project.title[locale],
    description: project.hero[locale]
  });
}

export default async function AILearningAssistantPage({ params }: PageProps) {
  const { locale } = await params;
  const project = getProjectBySlug("ai-learning-assistant");

  if (!project) {
    throw new Error("Missing project data for ai-learning-assistant.");
  }

  const { Component } = await loadMdx({
    locale,
    section: "projects",
    slug: "ai-learning-assistant"
  });

  return (
    <SiteShell>
      <main>
        <PageIntro
          eyebrow={project.eyebrow[locale]}
          title={project.title[locale]}
          description={project.hero[locale]}
        />

        <Section>
          <ContentBody>
            <MdxContent component={Component} />
          </ContentBody>
        </Section>
      </main>
    </SiteShell>
  );
}
