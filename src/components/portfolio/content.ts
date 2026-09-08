import type { Locale } from '@/data/projects';
export type Pair = [
    string,
    string
];
export const pick = (value: Pair, locale: Locale) => value[locale === 'zh' ? 1 : 0];
export const works = [
    { slug: 'rental-agent', name: ['NYC / NJ Rental Agent', '纽约 / 新泽西租房助手'] as Pair, kind: ['Applied intelligence', '应用智能'] as Pair, summary: ['From a city of listings to a considered shortlist.', '从城市中的房源，走向有依据的候选清单。'] as Pair, status: ['Interactive sample', '交互示例'] as Pair },
    { slug: 'elementization', name: ['Elementization', 'Elementization'] as Pair, kind: ['Data infrastructure', '数据基础设施'] as Pair, summary: ['A computational substrate with an explicit capability boundary.', '具有明确能力边界的计算载体。'] as Pair, status: ['Studio MVP-A', 'Studio MVP-A'] as Pair },
    { slug: 'aloa', name: ['What does a model remember?', '模型记住了什么？'] as Pair, kind: ['Machine learning security', '机器学习安全'] as Pair, summary: ['Membership inference in two-tower recommendation models.', '双塔推荐模型中的成员推断。'] as Pair, status: ['Research paper', '研究论文'] as Pair },
    { slug: 'ai-learning-assistant', name: ['AI Learning Assistant', 'AI 学习助手'] as Pair, kind: ['Learning systems', '学习系统'] as Pair, summary: ['Instruction that adapts to pace, capacity, and reinforcement needs.', '根据学习速度、承载能力与巩固需求调整教学。'] as Pair, status: ['System overview', '系统概述'] as Pair }
];
export const pageCopy: Record<string, {
    eyebrow: Pair;
    title: Pair;
    intro: Pair;
}> = {
    about: { eyebrow: ['The person behind the work', '作品背后的人'], title: ['Ideas need a builder.', '让想法走向实现。'], intro: ['I’m Changjian “CJ” He—an AI researcher, applied mathematician, and founder connecting rigorous questions with practical systems.', '我是何昌健（CJ），一名人工智能研究者、应用数学实践者和创业者，致力于连接严谨的问题与实际系统。'] },
    projects: { eyebrow: ['Selected work / 01—04', '精选作品 / 01—04'], title: ['Research into reality.', '让研究成为现实。'], intro: ['Four perspectives on building intelligent systems: a useful product, a new data substrate, an attack on model privacy, and a learning workflow.', '通过实用产品、新的数据载体、模型隐私攻击与学习工作流，探索智能系统的构建。'] },
    research: { eyebrow: ['Questions worth pursuing', '值得探索的问题'], title: ['Understand the system.\nTest its boundaries.', '理解系统。\n检验边界。'], intro: ['My research explores what model behavior reveals—and how explicit assumptions can make AI systems easier to evaluate.', '我的研究关注模型行为揭示的信息，以及明确的假设如何帮助评估人工智能系统。'] },
    accomplishments: { eyebrow: ['Selected milestones', '阶段性成果'], title: ['A record of building.', '持续构建的记录。'], intro: ['Research, implementation, and product exploration. Each milestone links to the work and its present scope.', '研究、工程实现与产品探索。每项成果都连接到具体工作及其当前范围。'] },
    contact: { eyebrow: ['Start a conversation', '开始交流'], title: ['Let’s build\nwhat’s next.', '一起构建\n下一步。'], intro: ['For research collaborations, engineering opportunities, and ambitious products that need technical depth.', '欢迎探讨研究合作、工程机会，以及需要技术深度的产品。'] },
    'rental-agent': { eyebrow: ['01 / Applied intelligence', '01 / 应用智能'], title: ['A city of options.\nA clearer choice.', '城市中的选择。\n更清晰的决定。'], intro: ['Explore a sample NYC / NJ rental workflow: narrow the area, compare options, and build a shortlist.', '体验纽约 / 新泽西租房工作流：缩小区域、比较房源、建立候选清单。'] },
    elementization: { eyebrow: ['02 / Data infrastructure', '02 / 数据基础设施'], title: ['Change the substrate.\nDefine what’s possible.', '改变数据载体。\n定义可能性。'], intro: ['Structured records become computational elements for a declared scope of operations. The public demonstration explains the relationship, not the private transformation.', '将结构化记录转为支持声明范围内操作的计算元素。公开演示说明输入与输出的关系，不展示私有变换。'] },
    aloa: { eyebrow: ['03 / ALOA · Machine learning security', '03 / ALOA · 机器学习安全'], title: ['What does a\nmodel remember?', '模型\n记住了什么？'], intro: ['Agnostic membership inference on two-tower neural networks. The question is whether a record belonged to training—not how to reconstruct it.', '面向双塔神经网络的成员推断。问题是记录是否参与了训练，而不是如何重建记录。'] },
    'ai-learning-assistant': { eyebrow: ['04 / Learning systems', '04 / 学习系统'], title: ['Learning that\nadapts to you.', '让教学\n适应学习者。'], intro: ['A Learning Pace & Handling Evaluation Engine updates a student learning profile to guide reinforcement, knowledge intensity, and teaching actions.', '学习速度与应对能力评估引擎持续更新学生学习画像，指导巩固频率、知识密度与教学行动。'] }
};
