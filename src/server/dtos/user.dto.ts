import 'server-only';

import { type UserProfile, type User } from '~/types';

export const userProfileDto = (user: User): UserProfile => ({
  username: user.username,
  profilePicture: user.profilePicture,
  profileStatus: user.profileStatus,
  createdAt: user.createdAt,
});
