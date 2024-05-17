'use client';

import * as React from 'react';
import { ScrollArea } from '~/components/ui/scroll-area';
import { type Friend } from '~/types';
import { FriendsSearchBar } from './friends-search-bar';
import Image from 'next/image';

export type FriendsListProps = {
  initialFriends: Friend[];
};

export function FriendsList(props: FriendsListProps) {
  const { initialFriends } = props;

  const [searchQuery, setSearchQuery] = React.useState('');
  const [friends, setFriends] = React.useState(initialFriends);

  return (
    <>
      <FriendsSearchBar onSearch={setSearchQuery} />
      <ScrollArea className='mt-4 h-1 grow px-2'>
        <div className='flex flex-col gap-2 divide-y'>
          {friends.map(data => (
            <div key={data.id} className='flex items-center gap-2 pt-2'>
              <Image
                height={40}
                width={40}
                className='h-10 w-10 rounded-full'
                src={data.userProfile.profilePicture ?? ''}
                alt={data.userProfile.username}
              />

              <div className='grow overflow-hidden text-left'>
                <p className='truncate font-semibold'>
                  {data.userProfile.username}
                </p>
                <p className='truncate text-sm font-normal text-muted-foreground'>
                  {data.userProfile.profileStatus ?? '-'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
}
