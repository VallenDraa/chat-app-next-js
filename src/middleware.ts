import { type MiddlewareConfig, type NextRequest } from 'next/server';
import { sessionMiddleware } from '~/server/middleware';
import { AUTH_ROUTES } from './constants';
import { authRoutesMiddleware } from '~/server/middleware';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.includes(pathname)) {
    return authRoutesMiddleware();
  }

  return sessionMiddleware(request);
}

export const config: MiddlewareConfig = {
  matcher:
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
};
