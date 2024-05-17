'use server';

import * as z from 'zod';
import { FriendsListsRepository } from '../repositories';

export async function getFriends({
  limit,
  page,
  userId,
  searchQuery,
}: Omit<Parameters<FriendsListsRepository['getFriends']>[0], 'status'>) {
  const parsedUserId = await z.string().uuid().parseAsync(userId);

  const friendsListRepo = new FriendsListsRepository();

  const friends = await friendsListRepo.getFriends({
    limit,
    userId: parsedUserId,
    page,
    searchQuery,
    status: ['FRIEND'],
  });

  return friends;
}

export async function getPendingFriends({
  limit,
  page,
  userId,
  searchQuery,
}: Omit<Parameters<FriendsListsRepository['getFriends']>[0], 'status'>) {
  const parsedUserId = await z.string().uuid().parseAsync(userId);

  const friendsListRepo = new FriendsListsRepository();

  const friends = await friendsListRepo.getFriends({
    limit,
    userId: parsedUserId,
    page,
    searchQuery,
    status: ['PENDING'],
  });

  return friends;
}

export async function getBlockedFriends({
  limit,
  page,
  userId,
  searchQuery,
}: Omit<Parameters<FriendsListsRepository['getFriends']>[0], 'status'>) {
  const parsedUserId = await z.string().uuid().parseAsync(userId);

  const friendsListRepo = new FriendsListsRepository();

  const friends = await friendsListRepo.getFriends({
    limit,
    userId: parsedUserId,
    page,
    searchQuery,
    status: ['BLOCKED'],
  });

  return friends;
}
