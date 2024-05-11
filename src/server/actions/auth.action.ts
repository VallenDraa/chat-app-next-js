'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import {
  createAdminClient,
  createClient,
} from '~/server/external-services/supabase';
import { AuthRepository, UsersRepository } from '~/server/repositories';
import { loginValidator, registerValidator } from '~/utils/validators';

export async function login(
  email: string,
  password: string,
  captchaToken: string | null,
) {
  if (!captchaToken) {
    throw new Error('Captcha token is required');
  }

  const { email: parsedEmail, password: parsedPassword } =
    await loginValidator.parseAsync({ email, password });

  const authRepo = new AuthRepository(
    createClient(cookies()),
    createAdminClient(cookies()),
  );

  await authRepo.login(parsedEmail, parsedPassword, captchaToken);

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function register(
  email: string,
  username: string,
  password: string,
  captchaToken: string | null,
) {
  if (!captchaToken) {
    throw new Error('Captcha token is required');
  }

  const {
    email: parsedEmail,
    username: parsedUsername,
    password: parsedPassword,
  } = await registerValidator.parseAsync({ email, password, username });

  const supabase = createClient(cookies());
  const supabaseAdmin = createAdminClient(cookies());

  // Check if the username that is trying to be registered already taken
  const usersRepo = new UsersRepository(supabase);
  const user = await usersRepo.getUserByUsername(username);

  if (user) {
    throw new Error('Username is already taken');
  }

  const authRepo = new AuthRepository(supabase, supabaseAdmin);
  await authRepo.register(
    parsedEmail,
    parsedUsername,
    parsedPassword,
    captchaToken,
  );

  revalidatePath('/', 'layout');
  redirect('/');
}
