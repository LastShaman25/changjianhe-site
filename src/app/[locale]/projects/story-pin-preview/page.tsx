import type { Metadata } from "next";
import type { Locale } from "@/data/projects";
import SiteShell from "@/components/layout/SiteShell";
import Section from "@/components/layout/Section";
import ContentBody from "@/components/layout/ContentBody";
import StoryPageShell from "@/components/story/StoryPageShell";
import StoryPinPreview from "@/components/story/StoryPinPreview";

type PageProps = {
  params: Promise<{ locale: Locale }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === "zh" ? "StoryPin 预览" : "StoryPin Preview"
  };
}

export default async function StoryPinPreviewPage() {
  return (
    <SiteShell>
      <main>
        <StoryPageShell>
          <Section>
            <ContentBody>
              <div className="max-w-3xl">
                <p className="section-label">Shared StoryPin Preview</p>
                <h1 className="headline-lg mt-6">Pinned sequence test surface</h1>
                <p className="body-md mt-6">
                  Use this temporary page to verify pin hold, scrub reversal, and natural release
                  into the content below before the real project pages are connected.
                </p>
              </div>
            </ContentBody>
          </Section>

          <StoryPinPreview />

          <Section>
            <ContentBody className="story-notes-shell">
              <div className="max-w-3xl">
                <p className="section-label">Release Target</p>
                <h2 className="headline-lg mt-6">This content should appear after the pin releases.</h2>
                <p className="body-md mt-6">
                  Scroll past the final chapter and confirm that this notes section enters naturally,
                  without overlap, jump, or collapse. Then scrub back up and confirm the sequence resets
                  cleanly to the first chapter.
                </p>
              </div>
            </ContentBody>
          </Section>
        </StoryPageShell>
      </main>
    </SiteShell>
  );
}
