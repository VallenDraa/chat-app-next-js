import { type usersTable } from '~/server/db';

export type User = typeof usersTable.$inferSelect;
export type UserInsert = typeof usersTable.$inferInsert;
export type UserUpdate = Partial<
  Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'userId'>
>;

export type UserProfile = Omit<User, 'id' | 'updatedAt' | 'userId'>;
