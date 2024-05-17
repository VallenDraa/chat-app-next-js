import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { chatRoomsTable } from './schema';

export const messagesListsTable = pgTable('messages_lists', {
  id: uuid('id').primaryKey(),
  chatRoomId: uuid('chat_room_id')
    .notNull()
    .references(() => chatRoomsTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
