import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import Container from "@/components/layout/Container";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import StoryPageShell from "@/components/story/StoryPageShell";
import AILearningAssistantPinnedStory from "@/components/story/ai-learning-assistant/AILearningAssistantPinnedStory";
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
  const t = await getTranslations({ locale, namespace: "Stories.aiLearningAssistant" });
  const messages = (await getMessages()) as {
    Stories: {
      aiLearningAssistant: {
        signal: {
          tokens: string[];
        };
        engine: {
          dimensions: string[];
        };
        adaptation: {
          outputs: string[];
          subLabels: string[];
        };
        loop: {
          nodes: string[];
        };
        institutionalFit: {
          blocks: string[];
          oversightLabel: string;
        };
      };
    };
  };

  if (!project) {
    throw new Error("Missing project data for ai-learning-assistant.");
  }

  const { Component } = await loadMdx({
    locale,
    section: "projects",
    slug: "ai-learning-assistant"
  });
  const storyData = messages.Stories.aiLearningAssistant;

  return (
    <SiteShell>
      <main>
        <StoryPageShell>
          <Section className="page-surface flex min-h-[calc(100vh-5.5rem)] items-center pt-28 pb-24 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32">
            <Container>
              <div className="max-w-5xl">
                <p className="glass-badge">{project.eyebrow[locale]}</p>
                <h1 className="headline-xl mt-6">{project.title[locale]}</h1>
                <p className="body-lg mt-6 reading-measure-wide">{project.hero[locale]}</p>
              </div>
            </Container>
          </Section>

          <AILearningAssistantPinnedStory
            id="ai-learning-assistant-story"
            locale={locale}
            signal={{
              eyebrow: t("signal.eyebrow"),
              title: t("signal.title"),
              body: t("signal.body")
            }}
            engine={{
              eyebrow: t("engine.eyebrow"),
              title: t("engine.title"),
              body: t("engine.body")
            }}
            adaptation={{
              eyebrow: t("adaptation.eyebrow"),
              title: t("adaptation.title"),
              body: t("adaptation.body")
            }}
            loop={{
              eyebrow: t("loop.eyebrow"),
              title: t("loop.title"),
              body: t("loop.body")
            }}
            institutionalFit={{
              eyebrow: t("institutionalFit.eyebrow"),
              title: t("institutionalFit.title"),
              body: t("institutionalFit.body")
            }}
            signalTokens={storyData.signal.tokens}
            engineDimensions={storyData.engine.dimensions}
            adaptationOutputs={storyData.adaptation.outputs}
            adaptationSubLabels={storyData.adaptation.subLabels}
            loopNodes={storyData.loop.nodes}
            institutionalBlocks={storyData.institutionalFit.blocks}
            oversightLabel={storyData.institutionalFit.oversightLabel}
          />
        </StoryPageShell>

        <Section id="ai-learning-assistant-notes">
          <ContentBody className="story-notes-shell">
            <div className="max-w-3xl">
              <p className="section-label">{t("notes.eyebrow")}</p>
              <h2 className="headline-lg mt-6">{t("notes.title")}</h2>
              <p className="body-md mt-6">{t("notes.description")}</p>
            </div>
            <div className="mt-10">
              <MdxContent component={Component} />
            </div>
          </ContentBody>
        </Section>
      </main>
    </SiteShell>
  );
}
