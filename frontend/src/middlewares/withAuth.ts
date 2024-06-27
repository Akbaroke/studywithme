import { NextResponse } from 'next/server';
import type { NextRequest, NextFetchEvent, NextMiddleware } from 'next/server';
import getSession from '@/services/getSession';

export default function withAuth(
  middleware: NextMiddleware,
  requiredAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const sessionData = await getSession(req);

    const isProtectedRoute = requiredAuth.some((route) => {
      const regex = new RegExp(`^${route.replace('*', '.*')}$`);
      return regex.test(pathname);
    });

    if (isProtectedRoute && !sessionData?.token) {
      const url = new URL('/login', req.url);
      url.searchParams.set('callbackUrl', encodeURI(req.url));
      return NextResponse.redirect(url);
    }

    const isAuthRoute = authRoutes.some((route) => {
      const regex = new RegExp(`^${route.replace('*', '.*')}$`);
      return regex.test(pathname);
    });

    if (isAuthRoute && sessionData?.token) {
      const url = new URL('/', req.url);
      return NextResponse.redirect(url);
    }

    return middleware(req, next);
  };
}

export function mainMiddleware(req: NextRequest) {
  return NextResponse.next();
}

const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password/*',
  '/verify-otp',
  '/reset-password',
];
