import * as z from 'zod';
import { type UserUpdate } from '~/types';

export const usernameValidator = z
  .string()
  .trim()
  .min(3, 'Username must have atleast 3 characters')
  .max(20, 'Username must be less than 20 characters');

export const userUpdateValidator: z.ZodType<UserUpdate> = z.object({
  username: usernameValidator,
  profile_status: z
    .string()
    .max(100, 'Profile status must be less than 100 characters')
    .optional(),
});
