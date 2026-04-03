import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import MdxContent from "@/components/content/MdxContent";
import StoryPageShell from "@/components/story/StoryPageShell";
import AloaHero from "@/components/story/aloa/AloaHero";
import AloaPinnedStory from "@/components/story/aloa/AloaPinnedStory";
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
        <StoryPageShell>
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

          <AloaPinnedStory
            id="aloa-story"
            locale={locale}
            twoTower={{
              eyebrow: t("twoTower.eyebrow"),
              title: t("twoTower.title"),
              body: t("twoTower.body")
            }}
            embeddingField={{
              eyebrow: t("embeddingField.eyebrow"),
              title: t("embeddingField.title"),
              body: t("embeddingField.body")
            }}
            perturbation={{
              eyebrow: t("perturbation.eyebrow"),
              title: t("perturbation.title"),
              body: t("perturbation.body")
            }}
            inference={{
              eyebrow: t("inference.eyebrow"),
              title: t("inference.title"),
              body: t("inference.body")
            }}
            charts={{
              eyebrow: t("charts.eyebrow"),
              title: t("charts.title"),
              body: t("charts.body")
            }}
            metricsLabel={t("charts.metricsLabel")}
            formulasLabel={t("charts.formulasLabel")}
            paperCta={t("charts.paperCta")}
            paperHref="https://arxiv.org/search/?query=membership+inference+two+tower&searchtype=all"
            formulaLeft={t("charts.formulaLeft")}
            formulaRight={t("charts.formulaRight")}
          />
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
