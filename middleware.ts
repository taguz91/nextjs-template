import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';
import { getIronSession } from 'iron-session/edge';

import { sessionOptions } from 'src/constants/app';
import urls from 'config/urls.json';

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();
  const session = await getIronSession(req, res, sessionOptions);
  // do anything with session here:
  const { user } = session;

  if (!user?.access_token) {
    // unauthorized to see pages, need to login first/
    return NextResponse.redirect(new URL(urls.login, req.url));
  }

  return res;
};

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - favicon.ico (favicon file)
     * - /
     */
    `/((?!api|_next/static|favicon.ico|login|home).*)`,
  ],
};
