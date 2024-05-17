import {
  pgSchema,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

const authSchema = pgSchema('auth');

export const authUsersTable = authSchema.table('users', {
  id: uuid('id').primaryKey(),
});

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey(),
  userId: uuid('user_id')
    .references(() => authUsersTable.id)
    .notNull(),
  username: text('username').notNull().unique(),
  profilePicture: text('profile_picture'),
  profileStatus: varchar('profile_status'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
    .defaultNow(),
});
