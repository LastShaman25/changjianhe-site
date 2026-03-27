import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/motion/Reveal";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";

type HeroSectionProps = {
  eyebrow: string;
  name: string;
  title: string;
  intro: string;
  ctaPrimary: string;
  ctaSecondary: string;
};

export default function HeroSection({
  eyebrow,
  name,
  title,
  intro,
  ctaPrimary,
  ctaSecondary
}: HeroSectionProps) {
  return (
    <Section className="relative flex min-h-screen items-center overflow-hidden hairline-grid">
      <Container wide>
        <div className="max-w-5xl">
          <Reveal>
            <p className="section-label">{eyebrow}</p>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="display-title mt-8 max-w-5xl">
              <span className="silver-text">{name}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <h2 className="headline-lg mt-8 max-w-3xl text-[var(--color-text-soft)]">
              {title}
            </h2>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="body-lg mt-8 max-w-2xl">
              {intro}
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-10 flex flex-wrap gap-4">
              <MotionButtonWrap>
                <LocaleLink href="/projects" className="btn-primary">
                  {ctaPrimary}
                </LocaleLink>
              </MotionButtonWrap>

              <MotionButtonWrap>
                <LocaleLink href="/contact" className="btn-secondary">
                  {ctaSecondary}
                </LocaleLink>
              </MotionButtonWrap>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}