import {
  type SupabaseClient,
  type SupabaseAdminClient,
} from '~/server/external-services/supabase';
import { type UserUpdate } from '~/types';

export class AuthedUserRepository {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly supabaseAdmin: SupabaseAdminClient,
  ) {}

  async getSupabaseUserInfo() {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error) {
      throw error;
    }

    if (!user) {
      throw new Error("Cannot get user's information!");
    }

    return user;
  }

  async getAuthedUser() {
    const supabaseUserInfo = await this.getSupabaseUserInfo();

    const { data: user, error } = await this.supabase
      .from('users')
      .select('*')
      .eq('id', supabaseUserInfo.id)
      .single();

    if (error) {
      throw new Error("Cannot get user's information!");
    }

    return user;
  }

  async editAuthedUser(newAttr: UserUpdate) {
    const user = await this.getAuthedUser();

    const { error } = await this.supabase
      .from('users')
      .update(newAttr)
      .eq('id', user.id);

    if (error) {
      throw new Error("Cannot update user's information!");
    }
  }

  async updateAuthedUserPassword(newPassword: string) {
    const { error } = await this.supabaseAdmin.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      throw new Error("Cannot update user's password information!");
    }
  }

  async deleteAuthedUser() {
    const user = await this.getAuthedUser();

    if (!user) {
      throw new Error('No user found!');
    }

    const { error: userDeletionError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', user.id);

    if (userDeletionError) {
      throw new Error("Cannot delete user's information!");
    }

    const { error: authDeletionError } =
      await this.supabaseAdmin.auth.admin.deleteUser(user.id);

    if (authDeletionError) {
      throw authDeletionError;
    }
  }
}
