import createMiddleware from "next-intl/middleware";
import type { NextRequest } from "next/server";
import { routing } from "./i18n/routing";

export default function middleware(request: NextRequest) {
  const savedLocale = request.cookies.get("NEXT_LOCALE")?.value;
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase();
  const defaultLocale = savedLocale === "en" || savedLocale === "zh"
    ? savedLocale
    : country === "CN" ? "zh" : "en";

  // URL > remembered language > country. Browser language must not override
  // the English default outside China (or when geolocation is unavailable).
  const response = createMiddleware({
    ...routing,
    defaultLocale,
    localeDetection: false
  })(request);

  const explicitLocale = request.nextUrl.pathname.match(/^\/(en|zh)(?:\/|$)/)?.[1];
  if (explicitLocale) {
    response.cookies.set("NEXT_LOCALE", explicitLocale, {
      path: "/",
      sameSite: "lax"
    });
  }
  // A visitor-specific redirect must not be reused for another country/cookie.
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}

export const config = {
  matcher: ["/((?!api|trpc|_next|_vercel|.*\\..*).*)"]
};
