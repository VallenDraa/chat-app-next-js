import {
  type SupabaseAdminClient,
  type SupabaseClient,
} from '~/server/external-services/supabase';

export class AuthRepository {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly supabaseAdmin: SupabaseAdminClient,
  ) {}

  async login(email: string, password: string, captchaToken: string) {
    const { error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
      options: { captchaToken },
    });

    if (error) {
      throw error;
    }
  }

  async register(
    email: string,
    username: string,
    password: string,
    captchaToken: string,
  ) {
    const {
      data: { user },
      error: signUpError,
    } = await this.supabase.auth.signUp({
      email,
      password,
      options: { captchaToken },
    });

    if (signUpError) {
      throw signUpError;
    }

    if (!user) {
      throw new Error('Cannot get registered user!');
    }

    const { error: createUserError } = await this.supabase
      .from('users')
      .insert({ id: user.id, username });

    if (createUserError) {
      const { error } = await this.supabaseAdmin.auth.admin.deleteUser(user.id);

      if (error) {
        throw error;
      }

      throw new Error(createUserError.message);
    }
  }
}
