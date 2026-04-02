"use client";

import ScrollFadeIn from "@/components/motion/ScrollFadeIn";

type AboutBioSectionProps = {
  locale: "en" | "zh";
};

const aboutBioContent = {
  en: {
    heading: "About",
    paragraphs: [
      "Changjian “CJ” He is an AI researcher, applied mathematician, and founder working at the intersection of machine learning security, deployable AI infrastructure, and product-minded technical execution.",
      "His work is centered on a practical question: how do we build intelligent systems that remain technically ambitious while still meeting the real constraints of privacy, regulation, trust, and operational deployment?",
      "Rather than separating research from implementation, he treats them as mutually reinforcing. Mathematical structure sharpens system design. Product thinking clarifies what matters in practice. Deployment constraints force rigor."
    ],
    sections: [
      {
        heading: "What defines the work",
        bullets: [
          "Research-minded reasoning with an emphasis on security, model behavior, and formal clarity.",
          "Builder-driven execution across infrastructure, product framing, and technical communication.",
          "Deployment-focused judgment, especially in environments where raw data access, compliance, or trust boundaries cannot be treated as an afterthought."
        ]
      },
      {
        heading: "Current direction",
        paragraphs: [
          "Current focus areas include secure AI systems, privacy-sensitive training workflows, recommendation-model security, and institution-ready intelligent assistants.",
          "The long-term goal is not only to make AI systems more capable, but to make them more realistic to deploy in the settings where the stakes are highest."
        ]
      }
    ]
  },
  zh: {
    heading: "关于",
    paragraphs: [
      "何昌健（Changjian “CJ” He）是一名 AI 研究者、应用数学背景的建设者与创业者，工作聚焦于机器学习安全、可部署的 AI 基础设施，以及兼具技术深度与现实可行性的智能系统。",
      "我的核心问题始终很明确：当隐私、监管、可信边界与真实部署条件都不能被忽略时，我们应当如何构建依然先进、依然有效的智能系统？",
      "我并不把研究、系统实现与产品判断视为彼此割裂的工作。数学结构能够帮助我们更清晰地理解系统，产品思维能够帮助我们识别真正重要的问题，而部署约束则会逼迫方案变得更加严谨。"
    ],
    sections: [
      {
        heading: "工作特征",
        bullets: [
          "以研究为导向，关注安全、模型行为与形式化清晰度。",
          "以建设为驱动，连接基础设施、产品框架与技术表达。",
          "以部署为目标，尤其重视高监管、高信任要求环境中的实际落地。"
        ]
      },
      {
        heading: "当前方向",
        paragraphs: [
          "当前重点包括安全型 AI 系统、隐私敏感训练流程、推荐模型安全，以及可面向机构环境部署的智能学习助手。",
          "长期目标并不只是让 AI 系统更强，而是让它们在高价值、强约束的环境里也真正可用、可信、可部署。"
        ]
      }
    ]
  }
} as const;

export default function AboutBioSection({ locale }: AboutBioSectionProps) {
  const content = aboutBioContent[locale];

  return (
    <>
      <h1 className="headline-xl mt-12 first:mt-0">{content.heading}</h1>

      {content.paragraphs.map((paragraph, index) => (
        <ScrollFadeIn key={paragraph} delay={index * 0.08} y={16}>
          <p className="body-md mt-6 max-w-3xl">{paragraph}</p>
        </ScrollFadeIn>
      ))}

      <h2 className="headline-lg mt-14 border-t border-[var(--color-border)] pt-8 text-[2rem] sm:text-[2.4rem]">
        {content.sections[0].heading}
      </h2>
      <ul className="body-md mt-6 ml-5 max-w-3xl list-disc space-y-3 marker:text-[var(--color-silver-3)]">
        {content.sections[0].bullets.map((item) => (
          <li key={item} className="pl-1">
            {item}
          </li>
        ))}
      </ul>

      <h2 className="headline-lg mt-14 border-t border-[var(--color-border)] pt-8 text-[2rem] sm:text-[2.4rem]">
        {content.sections[1].heading}
      </h2>
      {content.sections[1].paragraphs.map((paragraph, index) => (
        <ScrollFadeIn
          key={paragraph}
          delay={0.08 + index * 0.08}
          y={16}
        >
          <p className="body-md mt-6 max-w-3xl">{paragraph}</p>
        </ScrollFadeIn>
      ))}
    </>
  );
}
