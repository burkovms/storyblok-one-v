import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// In Next.js 16 "Middleware" was renamed to "Proxy" — same functionality.
// This runs before each matched request and prefixes a locale when missing,
// e.g. /about → /en/about, so every page is served under /[lang].
const locales = ['en', 'uk'];
const defaultLocale = 'en';

// Pick the first browser-preferred language we support; else the default.
// function getLocale(request: NextRequest): string {
//   const header = request.headers.get('accept-language');
//   if (header) {
//     for (const part of header.split(',')) {
//       const code = part.split(';')[0].trim().toLowerCase().split('-')[0];
//       if (locales.includes(code)) return code;
//     }
//   }
//   return defaultLocale;
// }

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const hasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
  if (hasLocale) return;

  // const locale = getLocale(request);
  request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Run on everything except Next internals and files with an extension
  // (static assets like .css, .png, favicon.ico, etc.).
  matcher: ['/((?!_next|.*\\..*).*)'],
};
