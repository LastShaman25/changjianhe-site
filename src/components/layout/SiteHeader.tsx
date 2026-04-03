"use client";

import { useEffect } from "react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import LocaleLink from "@/components/ui/LocaleLink";
import LocaleSwitcher from "@/components/nav/LocaleSwitcher";
import { navItems } from "@/data/nav";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import logoImage from "@/pic/logo_black.png";

export default function SiteHeader() {
  const pathname = usePathname();
  const t = useTranslations("Site");
  const navT = useTranslations("Site.nav");

  useEffect(() => {
    const header = document.querySelector("header");

    if (!header) {
      return;
    }

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty(
        "--header-height",
        `${header.offsetHeight}px`
      );
    };

    updateHeaderHeight();

    const observer = new ResizeObserver(updateHeaderHeight);
    observer.observe(header);

    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-[rgba(19,19,19,0.86)] backdrop-blur-xl">
      <Container wide>
        <div className="flex min-h-[78px] items-center justify-between gap-6 border-b border-[var(--color-border)] py-3">
          <LocaleLink href="/" className="flex min-w-0 items-center gap-2">
            <Image
              src={logoImage}
              alt="CJ logo"
              className="-ml-2 h-16 w-auto object-contain"
              sizes="64px"
              priority
            />
            <div className="min-w-0">
              <span className="block truncate text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text)]">
                {t("brandName")}
              </span>
              <span className="hidden text-[0.7rem] uppercase tracking-[0.18em] text-[var(--color-text-muted)] sm:block">
                {t("brandTitle")}
              </span>
            </div>
          </LocaleLink>

          <div className="hidden items-center gap-6 lg:flex">
            <nav className="flex items-center gap-2 bg-[var(--color-surface-low)] px-2 py-2">
              {navItems.map((item) => {
                const active =
                  pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <LocaleLink
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-2 text-sm uppercase tracking-[0.08em] transition ${
                      active
                        ? "bg-[var(--color-accent)] text-[#170606]"
                        : "text-[var(--color-text-muted)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-soft)]"
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
