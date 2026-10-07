import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { isIndexableHost } from "@/lib/site";

function localeFromPath(pathname: string) {
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "el";
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const locale = localeFromPath(pathname);
  const requestHeaders = new Headers(request.headers);

  requestHeaders.set("x-krs-locale", locale);
  requestHeaders.set("x-krs-pathname", pathname);

  const nextUrl = request.nextUrl.clone();

  if (locale === "en") {
    nextUrl.pathname = pathname === "/en" ? "/" : pathname.slice(3) || "/";
  }

  const response =
    locale === "en"
      ? NextResponse.rewrite(nextUrl, { request: { headers: requestHeaders } })
      : NextResponse.next({ request: { headers: requestHeaders } });

  if (!isIndexableHost(request.headers.get("host"))) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
