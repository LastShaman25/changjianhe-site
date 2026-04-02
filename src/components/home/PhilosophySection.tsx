import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";

type PhilosophySectionProps = {
  eyebrow: string;
  title: string;
  text: string;
};

export default function PhilosophySection({
  eyebrow,
  title,
  text
}: PhilosophySectionProps) {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="metal-panel p-8 sm:p-10">
            <ScrollFadeIn>
              <p className="section-label">{eyebrow}</p>
            </ScrollFadeIn>
            <HeadlineReveal
              className="headline-lg mt-6 max-w-xl"
              lines={
                title === "Powerful systems should also be trustworthy systems."
                  ? [
                      "Powerful systems should also be",
                      <span key="trustworthy">
                        {/* ACCENT: confirm this word */}
                        <em className="text-[var(--color-accent)] not-italic">trustworthy</em>
                        {" systems."}
                      </span>
                    ]
                  : [
                      "强大的系统，",
                      <span key="trustworthy-zh">
                        "也应当是"
                        {/* ACCENT: confirm this word */}
                        <em className="text-[var(--color-accent)] not-italic">可信</em>
                        "的系统。"
                      </span>
                    ]
              }
            />
          </div>

          <div className="metal-panel p-8 sm:p-10">
            <ScrollFadeIn delay={0.44}>
              <p className="body-lg max-w-2xl">{text}</p>
            </ScrollFadeIn>
          </div>
        </div>
      </Container>
    </Section>
  );
}
