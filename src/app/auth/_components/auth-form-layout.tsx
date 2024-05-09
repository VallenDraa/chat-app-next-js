import Link from 'next/link';
import * as React from 'react';

export type AuthFormLayoutProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  redirectTitle: string;
  redirectLink: string;
  redirectLinkText: string;
};

export function AuthFormLayout(props: AuthFormLayoutProps) {
  const {
    title,
    subtitle,
    children,
    redirectLink,
    redirectLinkText,
    redirectTitle,
  } = props;

  return (
    <div className='mx-auto grid max-w-[350px] gap-6'>
      <div className='grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>{title}</h1>
        <p className='text-balance text-muted-foreground'>{subtitle}</p>
      </div>

      {children}

      <div className='mt-4 text-center text-sm'>
        <span>{redirectTitle}</span>{' '}
        <Link href={redirectLink} className='underline underline-offset-2'>
          {redirectLinkText}
        </Link>
      </div>
    </div>
  );
}
