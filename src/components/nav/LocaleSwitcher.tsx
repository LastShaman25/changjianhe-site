"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  function handleSwitch(nextLocale: "en" | "zh") {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 p-1.5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <button
        type="button"
        onClick={() => handleSwitch("en")}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          locale === "en"
            ? "bg-white text-black shadow-[0_8px_18px_rgba(255,255,255,0.16)]"
            : "text-[var(--color-text-soft)] hover:bg-white/10"
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => handleSwitch("zh")}
        className={`rounded-full px-3 py-1.5 text-sm transition ${
          locale === "zh"
            ? "bg-white text-black shadow-[0_8px_18px_rgba(255,255,255,0.16)]"
            : "text-[var(--color-text-soft)] hover:bg-white/10"
        }`}
      >
        中文
      </button>
    </div>
  );
}
