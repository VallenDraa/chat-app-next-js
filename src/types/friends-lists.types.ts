import { type UserProfile } from '~/types';
import { type friendsListsTable } from '~/server/db';

export type FriendsListItem = typeof friendsListsTable.$inferSelect;
export type FriendsListInsert = typeof friendsListsTable.$inferInsert;
export type FriendsListUpdate = Partial<
  Omit<
    FriendsListItem,
    'id' | 'createdAt' | 'updatedAt' | 'userOneId' | 'userTwoId'
  >
>;

export type FriendsListStatus = FriendsListItem['status'];

export type Friend = Omit<
  FriendsListItem,
  'userOneId' | 'userTwoId' | 'user' | 'updatedAt'
> & {
  userProfile: UserProfile;
};
