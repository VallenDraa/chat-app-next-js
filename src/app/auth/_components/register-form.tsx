'use client';
import * as React from 'react';
import { register } from '~/server/actions';
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
import { toast } from 'sonner';
import { getErrorMessage } from '~/utils/error';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import { env } from '~/env';
import { type Register } from '~/types';
import { registerValidator } from '~/utils/validators';

export function RegisterForm() {
  const captcha = React.useRef<HCaptcha>(null);
  const [captchaToken, setCaptchaToken] = React.useState<string | null>(null);

  const form = useForm<Register>({
    resolver: zodResolver(registerValidator),
    defaultValues: { email: '', password: '' },
  });

  const { isSubmitting } = useFormState(form);

  async function onSubmit(data: Register) {
    try {
      await register(data.email, data.password, captchaToken);
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    }

    captcha.current?.resetCaptcha();
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

        <HCaptcha
          ref={captcha}
          sitekey={env.NEXT_PUBLIC_HCAPTCHA_SITEKEY}
          onVerify={token => {
            setCaptchaToken(token);
          }}
        />

        <SubmitButton isSubmitting={isSubmitting}>sign up</SubmitButton>
      </form>
    </Form>
  );
}
