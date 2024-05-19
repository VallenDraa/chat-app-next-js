import { pgTable, pgEnum, uuid, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './schema';
import { relations } from 'drizzle-orm';

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
    .references(() => usersTable.userId),
  userTwoId: uuid('user_two_id')
    .notNull()
    .references(() => usersTable.userId),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});

export const friendsListsRelations = relations(
  friendsListsTable,
  ({ one }) => ({
    userOne: one(usersTable, {
      fields: [friendsListsTable.userOneId],
      references: [usersTable.userId],
    }),
    userTwo: one(usersTable, {
      fields: [friendsListsTable.userTwoId],
      references: [usersTable.userId],
    }),
  }),
);
