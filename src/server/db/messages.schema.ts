import { pgTable, uuid, timestamp, pgEnum, text } from 'drizzle-orm/pg-core';
import { messagesListsTable, authUsersTable } from './schema';

export const messageStatusEnum = pgEnum('message_status', [
  'FAIL',
  'SENT',
  'SENDING',
  'READ',
]);

export const messageTypesEnum = pgEnum('message_type', ['FILE', 'TEXT']);

export const messagesTable = pgTable('messages', {
  id: uuid('id').primaryKey(),
  content: text('content').notNull(),
  messageType: messageTypesEnum('message_type').notNull(),
  messageStatus: messageStatusEnum('message_status')
    .notNull()
    .default('SENDING'),
  userId: uuid('user_id')
    .notNull()
    .references(() => authUsersTable.id),
  messageListId: uuid('message_list_id')
    .notNull()
    .references(() => messagesListsTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
