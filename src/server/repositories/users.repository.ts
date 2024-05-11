import { type SupabaseClient } from '~/server/external-services/supabase';

export class UsersRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getUserById(id: string) {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) {
      throw new Error('Failed to get user');
    }

    return user;
  }

  async getUserByUsername(username: string) {
    const { data: user, error } = await this.supabase
      .from('users')
      .select('')
      .eq('username', username)
      .maybeSingle();

    if (error) {
      throw new Error('Failed to get user');
    }

    return user;
  }

  async getUsers() {
    throw new Error('Method not implemented');
  }
}
