'use server';

import { AuthedUserRepository } from '~/server/repositories';
import {
  createAdminClient,
  createClient,
} from '~/server/external-services/supabase';
import { cookies } from 'next/headers';
import { type UserUpdate } from '~/types';
import { userProfileDto } from '~/server/dtos';

export async function getAuthedUserProfile() {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  const user = await authedUserRepository.getAuthedUser();
  return userProfileDto(user);
}

export async function getAuthedUserId() {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  const user = await authedUserRepository.getAuthedUser();

  return user.userId;
}

export async function editAuthedUser(newAttr: UserUpdate) {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  return authedUserRepository.editAuthedUser(newAttr);
}

export async function deleteAuthedUser() {
  const cookiesStore = cookies();

  const authedUserRepository = new AuthedUserRepository(
    createClient(cookiesStore),
    createAdminClient(cookiesStore),
  );

  return authedUserRepository.deleteAuthedUser();
}
