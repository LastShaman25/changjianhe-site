import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import Reveal from "@/components/motion/Reveal";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";

type ContactCtaProps = {
  eyebrow: string;
  title: string;
  text: string;
  primary: string;
  secondary: string;
};

export default function ContactCta({
  eyebrow,
  title,
  text,
  primary,
  secondary
}: ContactCtaProps) {
  return (
    <Section>
      <Container>
        <Reveal>
          <div className="metal-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,rgba(255,84,76,0.08),transparent)]" />
            <p className="section-label">{eyebrow}</p>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <h3 className="headline-xl max-w-3xl">{title}</h3>
                <p className="body-lg mt-6 max-w-2xl">{text}</p>
              </div>

              <div className="flex flex-wrap items-end gap-4 lg:justify-end">
                <MotionButtonWrap>
                  <LocaleLink href="/contact" className="btn-primary">
                    {primary}
                  </LocaleLink>
                </MotionButtonWrap>

                <MotionButtonWrap>
                  <a
                    href="https://www.linkedin.com/in/lastshaman"
                    target="_blank"
                    rel="noreferrer"
                    className="btn-secondary"
                  >
                    {secondary}
                  </a>
                </MotionButtonWrap>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
