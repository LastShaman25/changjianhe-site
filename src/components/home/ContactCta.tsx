import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import ContactFocusMotion from "@/components/home/ContactFocusMotion";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import MotionButtonWrap from "@/components/motion/MotionButtonWrap";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";

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
        <ContactFocusMotion>
          <div className="metal-panel relative overflow-hidden p-8 sm:p-10 lg:p-12">
            <div className="absolute inset-y-0 right-0 w-24 bg-[linear-gradient(to_left,rgba(255,84,76,0.08),transparent)]" />
            <ScrollFadeIn>
              <p className="section-label">{eyebrow}</p>
            </ScrollFadeIn>

            <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div>
                <HeadlineReveal
                  className="headline-xl max-w-3xl"
                  lines={
                    title === "Open to research, product, and infrastructure conversations."
                      ? [
                          "Open to research, product, and",
                          <span key="infrastructure">
                            {/* ACCENT: confirm this word */}
                            <em className="text-[var(--color-accent)] not-italic">infrastructure</em>
                            {" conversations."}
                          </span>
                        ]
                      : [
                          "欢迎交流研究、产品与",
                          <span key="infrastructure-zh">
                            {/* ACCENT: confirm this word */}
                            <em className="text-[var(--color-accent)] not-italic">基础设施</em>
                            "相关机会。"
                          </span>
                        ]
                  }
                />
                <ScrollFadeIn delay={0.44}>
                  <p className="body-lg mt-6 max-w-2xl">{text}</p>
                </ScrollFadeIn>
              </div>

              <div className="flex flex-wrap items-end gap-4 lg:justify-end">
                <ScrollFadeIn delay={0.52} className="flex flex-wrap items-end gap-4 lg:justify-end">
                  <MotionButtonWrap>
                    <LocaleLink
                      href="/contact"
                      className="btn-primary"
                      data-contact-primary
                    >
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
                </ScrollFadeIn>
              </div>
            </div>
          </div>
        </ContactFocusMotion>
      </Container>
    </Section>
  );
}
