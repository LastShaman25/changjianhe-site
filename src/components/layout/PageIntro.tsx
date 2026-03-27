import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageIntro({
  eyebrow,
  title,
  description
}: PageIntroProps) {
  return (
    <Section className="page-surface pt-28 pb-10 sm:pt-32 sm:pb-14 lg:pt-36">
      <Container>
        <div className="max-w-5xl">
          <p className="glass-badge">{eyebrow}</p>
          <h1 className="headline-xl mt-6">{title}</h1>
          <p className="body-lg mt-6 reading-measure-wide">{description}</p>
        </div>
      </Container>
    </Section>
  );
}
