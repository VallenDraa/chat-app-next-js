import 'server-only';

import { type UserProfile, type User } from '~/types';

export const userProfileDto = (user: User): UserProfile => ({
  username: user.username,
  profilePicture: user.profile_picture,
  profileStatus: user.profile_status,
  createdAt: user.created_at,
});
