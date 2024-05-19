import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './schema';

export const chatRoomsTable = pgTable('chat_rooms', {
  id: uuid('id').primaryKey(),
  userOneId: uuid('user_one_id').references(() => usersTable.userId),
  userTwoId: uuid('user_two_id').references(() => usersTable.userId),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
