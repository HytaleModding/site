import { NextRequest, NextResponse } from "next/server";
import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

const handleI18n = createI18nMiddleware(i18n);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/en";

    return NextResponse.rewrite(url);
  }

  return handleI18n(request);
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|sitemap.ts|blogs(?:/.*)?).*)",
  ],
};