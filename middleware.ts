import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (!pathname.startsWith('/admin')) return NextResponse.next();

  const auth = req.headers.get('authorization');
  const USER = process.env.ADMIN_USERNAME || '';
  const PASS = process.env.ADMIN_PASSWORD || '';

  function unauthorized() {
    return new Response('Unauthorized', {
      status: 401,
      headers: { 'WWW-Authenticate': 'Basic realm="Admin Area", charset="UTF-8"' },
    });
  }

  if (!USER || !PASS) return unauthorized();
  if (!auth) return unauthorized();

  const [scheme, encoded] = auth.split(' ');
  if (scheme !== 'Basic' || !encoded) return unauthorized();
  const decoded = Buffer.from(encoded, 'base64').toString();
  const [user, pass] = decoded.split(':');
  if (user !== USER || pass !== PASS) return unauthorized();

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};

