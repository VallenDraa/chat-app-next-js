'use client';

import * as z from 'zod';
import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, useFormState } from 'react-hook-form';
import { SubmitButton } from '~/components/ui/submit-button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Input } from '~/components/ui/input';
import { PasswordInput } from '~/components/ui/password-input';
import { login } from '~/server/actions';
import { toast } from 'sonner';
import { getErrorMessage } from '~/utils/error';

export const loginValidator = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type Login = z.infer<typeof loginValidator>;

export function LoginForm() {
  const form = useForm<Login>({
    resolver: zodResolver(loginValidator),
    defaultValues: { email: '', password: '' },
  });

  const { isSubmitting } = useFormState(form);

  async function onSubmit(data: Login) {
    try {
      await login(data.email, data.password);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }
  }

  return (
    <Form {...form}>
      <form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>email</FormLabel>
              <FormControl>
                <Input placeholder='johndoe@gmail.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem>
              <FormLabel>password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='imMoreThan8Characters' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <SubmitButton isSubmitting={isSubmitting}>login</SubmitButton>
      </form>
    </Form>
  );
}
