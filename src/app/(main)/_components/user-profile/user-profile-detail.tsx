'use client';

import Image from 'next/image';
import * as React from 'react';

import { env } from '~/env';
import { type UserProfile } from '~/types';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Button } from '~/components/ui/button';
import { ArrowLeftIcon } from '@radix-ui/react-icons';

export type UserProfileDetailProps = UserProfile & {
  isOpen: boolean;
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

export function UserProfileDetail(props: UserProfileDetailProps) {
  const {
    username,
    profileStatus,
    profilePicture,
    createdAt,
    isOpen,
    onClose,
  } = props;

  const localeDate = new Date(createdAt).toLocaleDateString();

  return isOpen ? (
    <Card className='absolute inset-0 z-10 rounded-none border-0 bg-slate-50 shadow-inner shadow-white'>
      <CardHeader className='border-b border-slate-200 bg-slate-100 px-2 py-4'>
        <div className='flex items-center gap-2'>
          <Button
            variant='ghost'
            className='hover:bg-slate-200'
            onClick={() => {
              onClose(false);
            }}
            aria-label='Close Profile Detail'
          >
            <ArrowLeftIcon />
          </Button>

          <CardTitle>{`${username}'s profile`}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className='grid place-content-center bg-gradient-to-br py-4 dark:from-slate-950 dark:via-slate-800 dark:to-slate-700'>
          <Image
            alt={username}
            src={
              profilePicture ?? env.NEXT_PUBLIC_DEFAULT_LIGHT_PROFILE_PICTURE
            }
            height={100}
            width={100}
          />
        </div>

        <div className='flex flex-col items-center py-5'>
          <p className='text-xl font-semibold'>{username}</p>
          <p className='text-muted-foreground'>{profileStatus ?? 'dssds'}</p>
          <p className='pt-2 text-xs text-muted-foreground'>{`joined on ${localeDate}`}</p>
        </div>
      </CardContent>
    </Card>
  ) : null;
}
