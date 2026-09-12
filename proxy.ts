import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

export function proxy(request: import("next/server").NextRequest) {
  return intlProxy(request);
}

export const config = {
  // Match only internationalized pathnames, ignore api, static files, next internals
  matcher: ["/", "/(id|en)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
