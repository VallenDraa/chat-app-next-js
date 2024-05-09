import { type Database } from './database.types';

export type Message = Database['public']['Tables']['messages']['Row'];
export type MessageUpdate = Database['public']['Tables']['messages']['Update'];

export type MessagesList =
  Database['public']['Tables']['messages_lists']['Row'];
export type MessagesListUpdate =
  Database['public']['Tables']['messages_lists']['Update'];
