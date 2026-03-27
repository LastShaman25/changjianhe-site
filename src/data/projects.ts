export type Locale = "en" | "zh";
export type ProjectSlug = "elementization" | "aloa" | "ai-learning-assistant";
export type LocalizedText = Record<Locale, string>;

export type ProjectCategory = "infrastructure" | "research" | "product";

export type ProjectEntry = {
  slug: ProjectSlug;
  href: `/projects/${ProjectSlug}`;
  featured: boolean;
  categoryKey: ProjectCategory;
  category: LocalizedText;
  title: LocalizedText;
  summary: LocalizedText;
  eyebrow: LocalizedText;
  hero: LocalizedText;
  contentPath: Record<Locale, string>;
};

export const projects = [
  {
    slug: "elementization",
    href: "/projects/elementization",
    featured: true,
    categoryKey: "infrastructure",
    category: {
      en: "Infrastructure",
      zh: "基础设施"
    },
    title: {
      en: "Elementization Infrastructure",
      zh: "Elementization 基础设施"
    },
    summary: {
      en: "A framework for turning raw data into trainable representations for privacy-sensitive and regulated AI deployment.",
      zh: "一个将原始数据转化为可训练表示形式的基础设施框架，面向隐私敏感与强监管环境中的 AI 落地。"
    },
    eyebrow: {
      en: "Flagship Infrastructure Project",
      zh: "旗舰基础设施项目"
    },
    hero: {
      en: "Trainable data transformation for high-regulation AI systems.",
      zh: "面向高监管 AI 系统的可训练数据转化基础设施。"
    },
    contentPath: {
      en: "src/content/en/projects/elementization.mdx",
      zh: "src/content/zh/projects/elementization.mdx"
    }
  },
  {
    slug: "aloa",
    href: "/projects/aloa",
    featured: true,
    categoryKey: "research",
    category: {
      en: "Research",
      zh: "研究"
    },
    title: {
      en: "Agnostic Membership Inference Attack on Two-Tower Neural Networks",
      zh: "面向 Two-Tower 神经网络的无关先验成员推断攻击"
    },
    summary: {
      en: "First-author research on attack design, evaluation, and analysis for recommendation models and ML security.",
      zh: "围绕推荐模型与机器学习安全的一作研究，聚焦攻击设计、实验评估与结果分析。"
    },
    eyebrow: {
      en: "Flagship Research Project",
      zh: "旗舰研究项目"
    },
    hero: {
      en: "Membership inference research for modern recommendation architectures.",
      zh: "面向现代推荐架构的成员推断攻击研究。"
    },
    contentPath: {
      en: "src/content/en/projects/aloa.mdx",
      zh: "src/content/zh/projects/aloa.mdx"
    }
  },
  {
    slug: "ai-learning-assistant",
    href: "/projects/ai-learning-assistant",
    featured: true,
    categoryKey: "product",
    category: {
      en: "Product",
      zh: "产品"
    },
    title: {
      en: "AI Learning Assistant",
      zh: "AI 学习助手"
    },
    summary: {
      en: "A pilot-stage assistant concept focused on deployable learning workflows, institutional usability, and practical AI support.",
      zh: "一个试点阶段的智能助手概念，聚焦可部署的学习工作流、机构可用性与实际 AI 支持能力。"
    },
    eyebrow: {
      en: "Flagship Product Project",
      zh: "旗舰产品项目"
    },
    hero: {
      en: "A pilot-stage assistant for deployable, institution-facing learning workflows.",
      zh: "一个面向机构级学习场景、可真实部署的试点型智能助手。"
    },
    contentPath: {
      en: "src/content/en/projects/ai-learning-assistant.mdx",
      zh: "src/content/zh/projects/ai-learning-assistant.mdx"
    }
  }
] satisfies readonly ProjectEntry[];

export const featuredProjects = projects.filter((project) => project.featured);

export function getProjectBySlug(slug: ProjectSlug) {
  return projects.find((project) => project.slug === slug);
}
