// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/site(.*)',
//   '/api/uploadthing',
//   '/agency/sign-in(.*)',
//   '/agency/sign-up(.*)',
// ]);




// export default clerkMiddleware(async (auth, req) => {
//   if (!isPublicRoute(req)) {
//     await auth.protect()
//   }

// })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// }



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isPublicRoute = createRouteMatcher([
//   '/',
//   '/site(.*)',
//   '/api/uploadthing',
//   '/agency/sign-in(.*)',
//   '/agency/sign-up(.*)',
// ]);

// export default clerkMiddleware(async (auth, req) => {
//   // Protect non-public routes
//   if (!isPublicRoute(req)) {
//     auth.protect();
//   }

//   // Custom subdomain/domain logic
//   const url = req.nextUrl;
//   const searchParams = url.searchParams.toString();
//   const hostname = req.headers.get('host');
//   const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`;

//   let customSubDomain: string | undefined = undefined;

//   if (hostname && process.env.NEXT_PUBLIC_DOMAIN) {
//     const baseDomain = process.env.NEXT_PUBLIC_DOMAIN;

//     // Remove port if present (e.g., localhost:3000)
//     const cleanHost = hostname.split(':')[0];

//     // Extract subdomain (if not the root domain)
//     if (cleanHost !== baseDomain && cleanHost.endsWith(baseDomain)) {
//       customSubDomain = cleanHost.replace(`.${baseDomain}`, '');
//     }
//   }

//   // Example: redirect agencies to a dashboard route
//   if (
//     customSubDomain &&
//     !['www', 'app'].includes(customSubDomain) && // skip common subdomains
//     !url.pathname.startsWith('/agency')
//   ) {
//     const redirectUrl = new URL(`/agency/${customSubDomain}${url.pathname}`, req.url);
//     return NextResponse.rewrite(redirectUrl);
//   }

//   // Otherwise, continue as normal
//   return NextResponse.next();
// });

// export const config = {
//   matcher: [
//     // Skip static files and _next
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always match API routes
//     '/(api|trpc)(.*)',
//   ],
// };

// middleware.ts

import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher(['/site', '/api/uploadthing']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  const url = req.nextUrl;
  const searchParams = url.searchParams.toString();
  const pathWithSearchParams = `${url.pathname}${searchParams ? `?${searchParams}` : ''}`;

  const host = req.headers.get('host') || '';
  const customSubDomain = host
    .split(`${process.env.NEXT_PUBLIC_DOMAIN}`)
    .filter(Boolean)[0];

  // Handle subdomain rewrite
  if (customSubDomain) {
    return NextResponse.rewrite(
      new URL(`/${customSubDomain}${pathWithSearchParams}`, req.url)
    );
  }

  // Redirect sign-in/up globally to agency subroute
  if (url.pathname === '/sign-in' || url.pathname === '/sign-up') {
    return NextResponse.redirect(new URL('/agency/sign-in', req.url));
  }

  // Redirect root domain to /site
  if (
    url.pathname === '/' ||
    (url.pathname === '/site' && host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL('/site', req.url));
  }

  // Rewrite for known account areas
  if (
    url.pathname.startsWith('/agency') ||
    url.pathname.startsWith('/subaccount') ||
    url.pathname.startsWith('/payment-successfull')
  ) {
    return NextResponse.rewrite(new URL(`${pathWithSearchParams}`, req.url));
  }

  // Redirect unauthenticated users
  if (!isPublicRoute(req) && !userId) {
    const signInUrl = new URL('/sign-in', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next(); // Default fallthrough
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
