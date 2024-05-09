import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { createClient } from '~/server/external-services/supabase';

export async function authRoutesMiddleware() {
  const supabase = createClient(cookies());
  await supabase.auth.signOut();

  return NextResponse.next();
}
