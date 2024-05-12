/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
import Image from 'next/image';
import * as React from 'react';
import { Button } from '~/components/ui/button';
import { env } from '~/env';
import { type UserProfile } from '~/types';

export type UserProfilProps = Omit<UserProfile, 'createdAt'> & {
  onClick: () => void;
};

export function UserProfileButton(props: UserProfilProps) {
  const { onClick, username, profileStatus, profilePicture } = props;

  return (
    <Button
      onClick={onClick}
      variant='ghost'
      className='flex h-auto w-full items-start justify-start gap-2 px-3 py-1'
    >
      <Image
        alt={username}
        src={profilePicture ?? env.NEXT_PUBLIC_DEFAULT_LIGHT_PROFILE_PICTURE}
        height={50}
        width={50}
      />

      <div className='flex flex-col items-start justify-end'>
        <p className='truncate font-semibold'>{username}</p>
        <p className='truncate text-sm font-normal text-muted-foreground'>
          {profileStatus || 'add status'}
        </p>
      </div>
    </Button>
  );
}
