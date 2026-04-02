import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import HeadlineReveal from "@/components/motion/HeadlineReveal";
import ScrollFadeIn from "@/components/motion/ScrollFadeIn";
import ProjectCards from "@/components/projects/ProjectCards";
import type { Locale, ProjectEntry } from "@/data/projects";

type FeaturedProjectsProps = {
  eyebrow: string;
  title: string;
  text: string;
  locale: Locale;
  projects: ProjectEntry[];
};

export default function FeaturedProjects({
  eyebrow,
  title,
  text,
  locale,
  projects
}: FeaturedProjectsProps) {
  const titleLines =
    title === "Flagship projects across infrastructure, research, and intelligent systems."
      ? [
          <span key="flagship">
            <em className="text-[var(--color-accent)] not-italic">Flagship</em>
            {" projects across infrastructure,"}
          </span>,
          "research, and intelligent systems."
        ]
      : [title];

  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <ScrollFadeIn>
            <p className="section-label">{eyebrow}</p>
          </ScrollFadeIn>
          <HeadlineReveal className="headline-xl mt-6" lines={titleLines} />
          <ScrollFadeIn delay={0.44}>
            <p className="body-lg mt-6">{text}</p>
          </ScrollFadeIn>
        </div>

        <div className="mt-10">
          <ProjectCards
            items={projects.map((project) => ({
              key: project.slug,
              href: project.href,
              eyebrow: project.category[locale],
              title: project.title[locale],
              summary: project.summary[locale]
            }))}
          />
        </div>
      </Container>
    </Section>
  );
}
