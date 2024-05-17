import { type User } from '~/types';
import { type Friend, type FriendsListItem } from '~/types/friends-lists.types';
import { userProfileDto } from '~/server/dtos';

export const friendDto = (friendData: FriendsListItem, user: User): Friend => ({
  id: friendData.id,
  createdAt: friendData.createdAt,
  status: friendData.status,
  userProfile: userProfileDto(user),
});
