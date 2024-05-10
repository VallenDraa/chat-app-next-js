import { type MiddlewareConfig, type NextRequest } from 'next/server';
import { authRoutesMiddleware, sessionMiddleware } from '~/server/middlewares';
import { AUTH_ROUTES } from './constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (AUTH_ROUTES.includes(pathname)) {
    return authRoutesMiddleware(request);
  }

  return sessionMiddleware(request);
}

export const config: MiddlewareConfig = {
  matcher:
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
};
