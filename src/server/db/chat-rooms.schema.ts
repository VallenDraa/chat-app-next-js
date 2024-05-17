import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { authUsersTable } from './schema';

export const chatRoomsTable = pgTable('chat_rooms', {
  id: uuid('id').primaryKey(),
  userOneId: uuid('user_one_id').references(() => authUsersTable.id),
  userTwoId: uuid('user_two_id').references(() => authUsersTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
