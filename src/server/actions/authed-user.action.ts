'use server';

import { AuthedUserRepository } from '~/server/repositories';
import {
  createAdminClient,
  createClient,
} from '~/server/external-services/supabase';
import { cookies } from 'next/headers';
import { type UserUpdate } from '~/types';
import { userProfileDto } from '~/server/dtos';

export async function getUserProfile() {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  const user = await authedUserRepository.getUser();
  return userProfileDto(user);
}

export async function editUser(newAttr: UserUpdate) {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  return authedUserRepository.editUser(newAttr);
}

export async function deleteUser() {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  return authedUserRepository.deleteUser();
}
