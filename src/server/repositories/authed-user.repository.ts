import { type SupabaseClient } from '~/server/external-services/supabase';

export class AuthedUserRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getUser() {
    throw new Error('Method not implemented.');
  }

  async editUser() {
    throw new Error('Method not implemented.');
  }

  async deleteUser() {
    throw new Error('Method not implemented.');
  }
}
