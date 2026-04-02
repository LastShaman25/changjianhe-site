import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

type ResearchTickerProps = {
  locale: "en" | "zh";
};

const tickerTerms = {
  en: [
    "MACHINE LEARNING SECURITY",
    "TWO-TOWER NETWORKS",
    "MEMBERSHIP INFERENCE",
    "PRIVACY-PRESERVING AI",
    "ELEMENTIZATION",
    "APPLIED MATHEMATICS",
    "DEPLOYABLE SYSTEMS"
  ],
  zh: [
    "机器学习安全",
    "双塔网络",
    "成员推断",
    "隐私保护 AI",
    "ELEMENTIZATION",
    "应用数学",
    "可部署系统"
  ]
} as const;

export default function ResearchTicker({ locale }: ResearchTickerProps) {
  const content = tickerTerms[locale].join("  ·  ");
  const loop = `${content}  ·  ${content}  ·  `;

  return (
    <Section className="overflow-hidden py-8">
      <Container wide>
        <div className="research-ticker border-y border-[var(--color-border)] py-4">
          <div className="research-ticker__track" aria-hidden="true">
            <span>{loop}</span>
            <span>{loop}</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
