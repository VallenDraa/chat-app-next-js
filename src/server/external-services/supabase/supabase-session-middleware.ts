import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { PROTECTED_ROUTES } from '~/constants';
import { env } from '~/env';
import { type Database } from '~/types';

/**
 * Updates sesssion and enforce protected routes
 * @param request
 * @returns
 */
export async function updateSession(request: NextRequest) {
  const { pathname } = request.nextUrl;
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient<Database>(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });

          response = NextResponse.next({
            request: { headers: request.headers },
          });

          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });

          response = NextResponse.next({
            request: { headers: request.headers },
          });

          response.cookies.set({ name, value: '', ...options });
        },
      },
    },
  );

  // Refreshing the auth token
  const user = await supabase.auth.getUser();

  // Redirect user from protected routes if the auth token is invalid
  if (PROTECTED_ROUTES.includes(pathname) && user.error) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return response;
}
