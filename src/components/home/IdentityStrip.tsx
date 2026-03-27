import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import Reveal from "@/components/motion/Reveal";

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
        <Reveal>
          <div className="metal-panel p-8 sm:p-10 lg:p-12">
            <p className="section-label">{eyebrow}</p>

            <div className="mt-6 grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
              <div>
                <h3 className="headline-lg max-w-2xl">{title}</h3>
              </div>

              <div>
                <p className="body-md max-w-xl">{text}</p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
