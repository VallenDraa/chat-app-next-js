import { cookies } from 'next/headers';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '~/server/external-services/supabase';

export async function authRoutesMiddleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = cookies();

  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();

  const supabaseCookies = request.cookies
    .getAll()
    .map(cookie => cookie.name)
    .filter(name => name.startsWith('sb-'));

  for (const supabaseCookie of supabaseCookies) {
    response.cookies.delete(supabaseCookie);
  }

  return response;
}
