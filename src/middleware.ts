import { type MiddlewareConfig, type NextRequest } from 'next/server';
import { updateSession } from '~/server/external-services/supabase';

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config: MiddlewareConfig = {
  matcher:
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
};
