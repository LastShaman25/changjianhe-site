import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/projects",
  "/projects/elementization",
  "/projects/aloa",
  "/projects/ai-learning-assistant",
  "/research",
  "/accomplishments",
  "/contact"
] as const;

const locales = ["en", "zh"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const localizedPath = `/${locale}${route}`;

      return {
        url: absoluteUrl(localizedPath),
        lastModified,
        changeFrequency: route === "" ? "weekly" : "monthly",
        priority: route === "" ? 1 : route === "/projects" ? 0.9 : 0.7,
        alternates: {
          languages: {
            en: absoluteUrl(`/en${route}`),
            zh: absoluteUrl(`/zh${route}`)
          }
        }
      };
    })
  );
}
