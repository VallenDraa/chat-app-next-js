import { type Database } from './database.types';

export type User = Database['public']['Tables']['users']['Row'];
export type UserUpdate = Omit<
  Database['public']['Tables']['users']['Update'],
  'id' | 'created_at' | 'updated_at' | 'profile_picture'
>;

export type UserProfile = {
  username: string;
  profilePicture: string | null;
  profileStatus: string | null;
  createdAt: string;
};
