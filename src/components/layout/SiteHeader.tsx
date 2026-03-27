"use client";

import Container from "@/components/layout/Container";
import LocaleLink from "@/components/ui/LocaleLink";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { navItems } from "@/data/nav";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

export default function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Site");
  const navT = useTranslations("Site.nav");

  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-[rgba(8,9,11,0.78)] backdrop-blur-xl">
      <Container wide>
        <div className="flex min-h-[78px] items-center justify-between gap-6 py-3">
          <LocaleLink href="/" className="flex min-w-0 items-center gap-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-silver-2)] shadow-[0_0_18px_rgba(215,220,229,0.6)]" />
            <div className="min-w-0">
              <span className="block truncate text-sm font-medium tracking-[-0.01em] text-[var(--color-text)]">
                {t("brandName")}
              </span>
              <span className="hidden text-xs uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:block">
                {t("brandTitle")}
              </span>
            </div>
          </LocaleLink>

          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-2 py-2">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    className={`rounded-full px-3 py-2 text-sm transition ${
                      active
                        ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                        : "text-[var(--color-text-muted)] hover:bg-white/5 hover:text-[var(--color-text-soft)]"
                    }`}
                  >
                    {navT(item.labelKey)}
                  </LocaleLink>
                );
              })}
            </nav>

            <LocaleSwitcher />
          </div>

          <div className="lg:hidden">
            <LocaleSwitcher />
          </div>
        </div>
      </Container>
    </header>
  );
}
