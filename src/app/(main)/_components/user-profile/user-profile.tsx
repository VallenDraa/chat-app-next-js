'use client';

import * as React from 'react';
import { UserProfileButton } from './user-profile-button';
import { UserProfileDetail } from './user-profile-detail';
import { type UserProfile } from '~/types';

export type UserProfileSectionProps = UserProfile;

export function UserProfileSection(props: UserProfileSectionProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <UserProfileButton
        {...props}
        onClick={() => {
          setIsOpen(true);
        }}
      />
      <UserProfileDetail {...props} isOpen={isOpen} onClose={setIsOpen} />
    </>
  );
}
