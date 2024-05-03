'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '~/server/external-services/supabase';

export async function login(email: string, password: string) {
  const supabase = createClient(cookies());

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(email: string, password: string) {
  const supabase = createClient(cookies());

  const { error } = await supabase.auth.signUp({ email, password });

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
