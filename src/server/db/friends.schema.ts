import { pgTable, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';
import { authUsersTable } from './schema';

export const friendsStatusEnum = pgEnum('friends_status', [
  'PENDING',
  'FRIEND',
  'BLOCKED',
]);

export const friendsListsTable = pgTable('friends_lists', {
  id: uuid('id').primaryKey(),
  status: friendsStatusEnum('status').notNull().default('PENDING'),
  userOneId: uuid('user_one_id')
    .notNull()
    .references(() => authUsersTable.id),
  userTwoId: uuid('user_two_id')
    .notNull()
    .references(() => authUsersTable.id),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
