import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const supportedLocales = ["pt", "en", "es", "fr", "it", "de", "ru", "ar", "zh", "ja"];
const defaultLocale = "en";

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get("locale")?.value;
  if (cookieLocale && supportedLocales.includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language") || "";
  if (acceptLanguage.startsWith("pt")) return "pt";
  if (acceptLanguage.startsWith("es")) return "es";
  if (acceptLanguage.startsWith("fr")) return "fr";
  if (acceptLanguage.startsWith("it")) return "it";
  if (acceptLanguage.startsWith("de")) return "de";
  if (acceptLanguage.startsWith("ru")) return "ru";
  if (acceptLanguage.startsWith("ar")) return "ar";
  if (acceptLanguage.startsWith("zh")) return "zh";
  if (acceptLanguage.startsWith("ja")) return "ja";

  return defaultLocale;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.includes(".")
  ) {
    return NextResponse.next();
  }

  const pathLocale = pathname.split("/")[1];
  if (pathLocale && supportedLocales.includes(pathLocale)) {
    return NextResponse.next();
  }

  const locale = getLocale(request);

  const newUrl = new URL(
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`,
    request.url,
  );
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico).*)"],
};
