import { type SupabaseClient } from '~/server/external-services/supabase';

export class MessagesRepository {
  constructor(private readonly supabase: SupabaseClient) {}

  async getMessages() {
    throw new Error('Method not implemented.');
  }

  async createTextMessage() {
    throw new Error('Method not implemented.');
  }

  async createFileMessage() {
    throw new Error('Method not implemented.');
  }

  async editTextMessage() {
    throw new Error('Method not implemented.');
  }

  async editFileMessage() {
    throw new Error('Method not implemented.');
  }

  async deleteMessage() {
    throw new Error('Method not implemented.');
  }
}
