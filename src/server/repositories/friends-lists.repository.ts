import { type SupabaseClient } from '~/server/external-services/supabase';

export class FriendsListsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getFriends() {
    throw new Error('Method not implemented.');
  }

  async sendFriendRequest() {
    throw new Error('Method not implemented.');
  }

  async cancelFriendRequest() {
    throw new Error('Method not implemented.');
  }

  async unfriend() {
    throw new Error('Method not implemented.');
  }

  async blockFriend() {
    throw new Error('Method not implemented.');
  }
}
