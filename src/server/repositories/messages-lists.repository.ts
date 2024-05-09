import { type SupabaseClient } from '~/server/external-services/supabase';

export class MessagesListsRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getMessagesList() {
    throw new Error('Method not implemented.');
  }

  async getMessagesLists() {
    throw new Error('Method not implemented.');
  }

  async createMessagesList() {
    throw new Error('Method not implemented.');
  }

  async updateMessagesList() {
    throw new Error('Method not implemented.');
  }

  async deleteMessagesList() {
    throw new Error('Method not implemented.');
  }
}
