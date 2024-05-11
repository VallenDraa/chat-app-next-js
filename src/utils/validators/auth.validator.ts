import * as z from 'zod';

export const registerValidator = z.object({
  email: z.string().trim().email(),
  username: z
    .string()
    .trim()
    .min(3, 'Username must have atleast 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  password: z.string().trim().min(8),
});

export const loginValidator = z.object({
  email: z.string().trim().email(),
  password: z.string().trim().min(8),
});
