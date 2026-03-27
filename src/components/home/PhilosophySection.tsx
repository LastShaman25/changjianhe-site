import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

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
          <Reveal>
            <div className="metal-panel p-8 sm:p-10">
              <p className="section-label">{eyebrow}</p>
              <h3 className="headline-lg mt-6 max-w-xl">{title}</h3>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="metal-panel p-8 sm:p-10">
              <p className="body-lg max-w-2xl">{text}</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
