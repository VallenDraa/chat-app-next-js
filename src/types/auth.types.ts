import {
  type loginValidator,
  type registerValidator,
} from '~/utils/validators';
import type * as z from 'zod';

export type Register = z.infer<typeof registerValidator>;
export type Login = z.infer<typeof loginValidator>;
