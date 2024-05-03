import * as React from 'react';
import { Button, type ButtonProps } from './button';
import { UpdateIcon } from '@radix-ui/react-icons';

export type SubmitButtonProps = ButtonProps & {
  isSubmitting: boolean;
};

export const SubmitButton = React.forwardRef<
  HTMLButtonElement,
  SubmitButtonProps
>(({ isSubmitting, children, ...props }, ref) => (
  <Button ref={ref} {...props}>
    {isSubmitting && (
      <UpdateIcon className='mr-2 size-4 animate-spin' aria-hidden='true' />
    )}

    {children}
  </Button>
));

SubmitButton.displayName = 'SubmitButton';
