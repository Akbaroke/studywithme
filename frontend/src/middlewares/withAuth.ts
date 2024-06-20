import getSession from '@/services/getSession';
import {
  NextMiddleware,
  NextRequest,
  NextResponse,
  NextFetchEvent,
} from 'next/server';

export default function withAuth(
  middleware: NextMiddleware,
  requiredAuth: string[] = []
) {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    const sessionData = await getSession(req);

    if (requiredAuth.includes(pathname)) {
      if (!sessionData?.token) {
        const url = new URL('/login', req.url);
        url.searchParams.set('callbackUrl', encodeURI(req.url));
        return NextResponse.redirect(url);
      }
    }
    if (authRoutes.includes(pathname)) {
      if (sessionData?.token) {
        const url = new URL('/', req.url);
        return NextResponse.redirect(url);
      }
    }

    return middleware(req, next);
  };
}

const authRoutes = [
  '/login',
  '/register',
  '/forgot-password',
  '/reset-password/[token]',
  '/verify-otp',
  '/reset-password',
];
