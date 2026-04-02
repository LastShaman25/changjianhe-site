import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import StaggerGroup from "@/components/motion/StaggerGroup";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";
import MotionCard from "@/components/motion/MotionCard";

type AccomplishmentsPreviewProps = {
  eyebrow: string;
  title: string;
  text: string;
  items: string[];
  cta: string;
};

export default function AccomplishmentsPreview({
  eyebrow,
  title,
  text,
  items,
  cta
}: AccomplishmentsPreviewProps) {
  return (
    <Section>
      <Container>
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
          <div className="metal-panel p-8 sm:p-10">
            <ScrollFadeIn>
              <p className="section-label">{eyebrow}</p>
            </ScrollFadeIn>
            <HeadlineReveal
              className="headline-lg mt-6 max-w-2xl"
              lines={
                title === "Research, ventures, infrastructure, and product execution."
                  ? [
                      <span key="research">
                        {/* ACCENT: confirm this word */}
                        <em className="text-[var(--color-accent)] not-italic">Research</em>
                        {", ventures,"}
                      </span>,
                      "infrastructure, and product execution."
                    ]
                  : [
                      <span key="research-zh">
                        {/* ACCENT: confirm this word */}
                        <em className="text-[var(--color-accent)] not-italic">研究</em>
                        "、创业、"
                      </span>,
                      "基础设施与产品执行。"
                    ]
              }
            />
            <ScrollFadeIn delay={0.44}>
              <p className="body-md mt-6 max-w-2xl">{text}</p>
            </ScrollFadeIn>
            <ScrollFadeIn delay={0.52}>
              <MotionButtonWrap className="mt-8 inline-flex">
                <LocaleLink href="/accomplishments" className="btn-secondary">
                  {cta}
                </LocaleLink>
              </MotionButtonWrap>
            </ScrollFadeIn>
          </div>

          <StaggerGroup className="grid gap-4" delay={0.06} stagger={0.08}>
            {items.map((item) => (
              <MotionCard key={item}>
                <div className="bg-[linear-gradient(to_right,var(--color-warning)_0,var(--color-warning)_3px,transparent_3px)] px-5 py-4 [background-color:var(--color-surface-lowest)]">
                  <p className="body-md text-[var(--color-text)]">{item}</p>
                </div>
              </MotionCard>
            ))}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
