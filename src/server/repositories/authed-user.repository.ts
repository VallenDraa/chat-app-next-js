import {
  type SupabaseClient,
  type SupabaseAdminClient,
} from '~/server/external-services/supabase';
import { type UserUpdate, type User } from '~/types';
import { db, usersTable } from '~/server/db';
import { eq } from 'drizzle-orm';
import { type User as SupabaseUser } from '@supabase/supabase-js';

export class AuthedUserRepository {
  constructor(
    private readonly supabase: SupabaseClient,
    private readonly supabaseAdmin: SupabaseAdminClient,
  ) {}

  async getSupabaseUserInfo(): Promise<SupabaseUser> {
    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser();

    if (error) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ AuthedUserRepository ~ getSupabaseUserInfo ~ error:',
        error,
      );
      throw error;
    }

    if (!user) {
      throw new Error("Cannot get user's information!");
    }

    return user;
  }

  async getAuthedUser(): Promise<User> {
    const supabaseUserInfo = await this.getSupabaseUserInfo();

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.userId, supabaseUserInfo.id));

    if (!user) {
      throw new Error("Cannot get user's information!");
    }

    return user;
  }

  async editAuthedUser(newAttr: UserUpdate): Promise<void> {
    const user = await this.getAuthedUser();

    if (!user) {
      throw new Error('No user found!');
    }

    await db.update(usersTable).set(newAttr).where(eq(usersTable.id, user.id));
  }

  async updateAuthedUserPassword(newPassword: string): Promise<void> {
    const { error } = await this.supabaseAdmin.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ AuthedUserRepository ~ updateAuthedUserPassword ~ error:',
        error,
      );
      throw new Error("Cannot update user's password information!");
    }
  }

  async deleteAuthedUser(): Promise<void> {
    const user = await this.getAuthedUser();

    if (!user) {
      throw new Error('No user found!');
    }

    const { error: userDeletionError } = await this.supabase
      .from('users')
      .delete()
      .eq('id', user.id);

    if (userDeletionError) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ AuthedUserRepository ~ deleteAuthedUser ~ userDeletionError:',
        userDeletionError,
      );
      throw new Error("Cannot delete user's information!");
    }

    const { error: authDeletionError } =
      await this.supabaseAdmin.auth.admin.deleteUser(user.id);

    if (authDeletionError) {
      // eslint-disable-next-line no-console
      console.log(
        '🚀 ~ AuthedUserRepository ~ deleteAuthedUser ~ authDeletionError:',
        authDeletionError,
      );
      throw authDeletionError;
    }
  }
}
