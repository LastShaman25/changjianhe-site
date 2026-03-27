import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import type { Locale, ProjectEntry } from "@/data/projects";
import Reveal from "@/components/motion/Reveal";
import StaggerGroup from "@/components/motion/StaggerGroup";
import MotionCard from "@/components/motion/MotionCard";

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
        <Reveal>
          <div className="max-w-3xl">
            <p className="section-label">{eyebrow}</p>
            <h3 className="headline-xl mt-6">{title}</h3>
            <p className="body-lg mt-6">{text}</p>
          </div>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3" stagger={0.11}>
          {projects.map((project) => (
            <MotionCard key={project.slug}>
              <LocaleLink href={project.href} className="metal-card group block h-full p-6">
                <p className="section-label">{project.category[locale]}</p>
                <h4 className="headline-lg mt-5 text-[1.7rem] transition group-hover:translate-x-[2px]">
                  {project.title[locale]}
                </h4>
                <p className="body-md mt-4">{project.summary[locale]}</p>
              </LocaleLink>
            </MotionCard>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
