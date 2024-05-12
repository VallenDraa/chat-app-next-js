import * as z from 'zod';
import { usernameValidator } from './authed-user.validator';

export const registerValidator = z.object({
  email: z.string().trim().email(),
  username: usernameValidator,
  password: z.string().trim().min(8),
});

export const loginValidator = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});
