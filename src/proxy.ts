import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

const handleI18n = createI18nMiddleware(i18n);

function isStaticAsset(pathname: string) {
  return pathname.startsWith("/assets/") || /\.[a-z0-9]+$/i.test(pathname);
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";

    return NextResponse.rewrite(url);
  }

  if (isStaticAsset(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  return handleI18n(request, event);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sitemap.ts|blogs(?:/.*)?).*)",
  ],
};