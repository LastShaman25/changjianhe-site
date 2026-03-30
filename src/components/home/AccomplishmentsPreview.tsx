import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/motion/Reveal";
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
          <Reveal>
            <div className="metal-panel p-8 sm:p-10">
              <p className="section-label">{eyebrow}</p>
              <h3 className="headline-lg mt-6 max-w-2xl">{title}</h3>
              <p className="body-md mt-6 max-w-2xl">{text}</p>
              <MotionButtonWrap className="mt-8 inline-flex">
                <LocaleLink href="/accomplishments" className="btn-secondary">
                  {cta}
                </LocaleLink>
              </MotionButtonWrap>
            </div>
          </Reveal>

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
