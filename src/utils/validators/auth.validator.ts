import * as z from 'zod';

export const registerValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const loginValidator = registerValidator;
