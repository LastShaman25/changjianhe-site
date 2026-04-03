import { getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import StoryPageShell from "@/components/story/StoryPageShell";
import ElementizationHero from "@/components/story/elementization/ElementizationHero";
import ElementizationPinnedStory from "@/components/story/elementization/ElementizationPinnedStory";
import { loadMdx } from "@/lib/mdx/loadMdx";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories.elementization" });

  return buildPageMetadata({
    locale,
    pathname: "/projects/elementization",
    title: t("hero.title"),
    description: t("hero.intro")
  });
}

export default async function ElementizationPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories.elementization" });
  const messages = (await getMessages()) as {
    Stories: {
      elementization: {
        shared: {
          glyphs: string[];
        };
        trustBoundary: {
          label: string;
        };
        deployableAi: {
          badges: string[];
        };
      };
    };
  };
  const { Component } = await loadMdx({ locale, section: "projects", slug: "elementization" });
  const storyData = messages.Stories.elementization;

  return (
    <SiteShell>
      <main>
        <StoryPageShell>
          <ElementizationHero
            id="elementization-hero"
            eyebrow={t("hero.eyebrow")}
            title={t("hero.title")}
            intro={t("hero.intro")}
            statements={[
              t("hero.statementOne"),
              t("hero.statementTwo"),
              t("hero.statementThree")
            ]}
            ctaPrimary={t("hero.ctaPrimary")}
            ctaSecondary={t("hero.ctaSecondary")}
          />

          <ElementizationPinnedStory
            id="elementization-story"
            locale={locale}
            dataWorld={{
              eyebrow: t("dataWorld.eyebrow"),
              title: t("dataWorld.title"),
              body: t("dataWorld.body")
            }}
            transformationGate={{
              eyebrow: t("transformationGate.eyebrow"),
              title: t("transformationGate.title"),
              body: t("transformationGate.body")
            }}
            transposedLayer={{
              eyebrow: t("transposedLayer.eyebrow"),
              title: t("transposedLayer.title"),
              body: t("transposedLayer.body")
            }}
            trustBoundary={{
              eyebrow: t("trustBoundary.eyebrow"),
              title: t("trustBoundary.title"),
              body: t("trustBoundary.body")
            }}
            deployableAi={{
              eyebrow: t("deployableAi.eyebrow"),
              title: t("deployableAi.title"),
              body: t("deployableAi.body")
            }}
            glyphs={storyData.shared.glyphs}
            trustBoundaryLabel={storyData.trustBoundary.label}
            deployableBadges={storyData.deployableAi.badges}
          />
        </StoryPageShell>

        <Section id="elementization-notes">
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
