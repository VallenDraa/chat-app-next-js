import { type SupabaseClient } from '~/server/external-services/supabase';

export class ChatRoomsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getChatRooms() {
    throw new Error('Method not implemented.');
  }

  async createChatRooms() {
    throw new Error('Method not implemented.');
  }

  async updateChatRooms() {
    throw new Error('Method not implemented.');
  }

  async deleteChatRooms() {
    throw new Error('Method not implemented.');
  }
}
