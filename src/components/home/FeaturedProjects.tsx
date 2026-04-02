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
  return (
    <Section>
      <Container>
        <div className="max-w-3xl">
          <ScrollFadeIn>
            <p className="section-label">{eyebrow}</p>
          </ScrollFadeIn>
          <HeadlineReveal
            className="headline-xl mt-6"
            lines={
              title === "Flagship projects across infrastructure, research, and intelligent systems."
                ? [
                    <span key="flagship">
                      {/* ACCENT: confirm this word */}
                      <em className="text-[var(--color-accent)] not-italic">Flagship</em>
                      {" projects across infrastructure,"}
                    </span>,
                    "research, and intelligent systems."
                  ]
                : [
                    <span key="infrastructure-zh">
                      "围绕"
                      {/* ACCENT: confirm this word */}
                      <em className="text-[var(--color-accent)] not-italic">基础设施</em>
                      "、研究与"
                    </span>,
                    "智能系统的代表性工作。"
                  ]
            }
          />
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
