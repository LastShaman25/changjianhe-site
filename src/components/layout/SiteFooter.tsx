import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";
import LocaleLink from "@/components/ui/LocaleLink";
import { navItems } from "@/data/nav";
import { useTranslations } from "next-intl";

export default function SiteFooter() {
  const t = useTranslations("Site");
  const navT = useTranslations("Site.nav");
  const footerT = useTranslations("Site.footer");

  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(to_top,rgba(255,255,255,0.03),transparent)]">
      <Section className="py-10 sm:py-12">
        <Container>
          <div className="metal-panel px-6 py-8 sm:px-8 sm:py-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-xl">
                <p className="section-label">{footerT("frame")}</p>
                <p className="headline-lg mt-5 text-[1.55rem] sm:text-[1.85rem]">{t("brandName")}</p>
                <p className="body-md mt-4 reading-measure">{t("brandTitle")}</p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:min-w-[26rem]">
                <div>
                  <p className="section-label">{footerT("navigation")}</p>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm text-[var(--color-text-muted)]">
                    {navItems.map((item) => (
                      <LocaleLink
                        key={item.href}
                        href={item.href}
                        className="rounded-full border border-white/8 px-3 py-2 transition hover:border-white/16 hover:bg-white/5 hover:text-[var(--color-text-soft)]"
                      >
                        {navT(item.labelKey)}
                      </LocaleLink>
                    ))}
                  </div>
                </div>

                <div className="sm:justify-self-end">
                  <p className="section-label">{footerT("signature")}</p>
                  <p className="body-sm mt-4 max-w-xs">{footerT("signatureText")}</p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </footer>
  );
}
