import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";

type IdentityStripProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export default function IdentityStrip({
  eyebrow,
  title,
  text
}: IdentityStripProps) {
  return (
    <Section>
      <Container>
        <div className="metal-panel p-8 sm:p-10 lg:p-12">
          <ScrollFadeIn>
            <p className="section-label">{eyebrow}</p>
          </ScrollFadeIn>

          <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
            <div>
              <HeadlineReveal
                className="headline-lg max-w-2xl"
                lines={
                  title === "Research-minded. Builder-driven. Deployment-focused."
                    ? [
                        "Research-minded.",
                        <span key="builder-driven">
                          {/* ACCENT: confirm this word */}
                          <em className="text-[var(--color-accent)] not-italic">Builder-driven.</em>
                        </span>,
                        "Deployment-focused."
                      ]
                    : [
                        "研究导向，",
                        <span key="builder-driven-zh">
                          {/* ACCENT: confirm this word */}
                          <em className="text-[var(--color-accent)] not-italic">建造驱动，</em>
                        </span>,
                        "部署优先。"
                      ]
                }
              />
            </div>

            <div>
              <ScrollFadeIn delay={0.56}>
                <p className="body-md max-w-xl">{text}</p>
              </ScrollFadeIn>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
