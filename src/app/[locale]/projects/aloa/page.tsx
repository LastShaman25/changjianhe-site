import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import StoryPageShell from "@/components/story/StoryPageShell";
import AloaHero from "@/components/story/aloa/AloaHero";
import TwoTowerScene from "@/components/story/aloa/TwoTowerScene";
import EmbeddingFieldScene from "@/components/story/aloa/EmbeddingFieldScene";
import PerturbationScene from "@/components/story/aloa/PerturbationScene";
import InferenceScene from "@/components/story/aloa/InferenceScene";
import ChartsScene from "@/components/story/aloa/ChartsScene";
import { loadMdx } from "@/lib/mdx/loadMdx";
import { buildPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories.aloa" });

  return buildPageMetadata({
    locale,
    pathname: "/projects/aloa",
    title: t("hero.title"),
    description: t("hero.intro")
  });
}

export default async function AloaPage({ params }: PageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Stories.aloa" });
  const { Component } = await loadMdx({ locale, section: "projects", slug: "aloa" });

  return (
    <SiteShell>
      <main>
        <StoryPageShell
          progressItems={[
            { id: "aloa-hero", label: t("hero.eyebrow") },
            { id: "aloa-two-tower", label: t("twoTower.eyebrow") },
            { id: "aloa-field", label: t("embeddingField.eyebrow") },
            { id: "aloa-perturbation", label: t("perturbation.eyebrow") },
            { id: "aloa-inference", label: t("inference.eyebrow") },
            { id: "aloa-findings", label: t("charts.eyebrow") }
          ]}
        >
          <AloaHero
            id="aloa-hero"
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

          <div id="aloa-story">
            <TwoTowerScene
              id="aloa-two-tower"
              eyebrow={t("twoTower.eyebrow")}
              title={t("twoTower.title")}
              body={t("twoTower.body")}
            />
            <EmbeddingFieldScene
              id="aloa-field"
              eyebrow={t("embeddingField.eyebrow")}
              title={t("embeddingField.title")}
              body={t("embeddingField.body")}
            />
            <PerturbationScene
              id="aloa-perturbation"
              eyebrow={t("perturbation.eyebrow")}
              title={t("perturbation.title")}
              body={t("perturbation.body")}
            />
            <InferenceScene
              id="aloa-inference"
              eyebrow={t("inference.eyebrow")}
              title={t("inference.title")}
              body={t("inference.body")}
            />
            <ChartsScene
              id="aloa-findings"
              eyebrow={t("charts.eyebrow")}
              title={t("charts.title")}
              body={t("charts.body")}
              metricsLabel={t("charts.metricsLabel")}
              formulasLabel={t("charts.formulasLabel")}
              paperLabel={t("charts.paperLabel")}
            />
          </div>
        </StoryPageShell>

        <Section id="aloa-notes">
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
