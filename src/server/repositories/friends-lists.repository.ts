import { db, friendsListsTable, usersTable } from '~/server/db';
import { or, eq, and, inArray, ilike, count } from 'drizzle-orm';
import {
  type PaginationArgs,
  type Friend,
  type FriendsListStatus,
  type PaginatedResponse,
} from '~/types';
import { alias } from 'drizzle-orm/pg-core';
import { friendDto } from '~/server/dtos';

export class FriendsListsRepository {
  async getFriends({
    limit = 20,
    page = 1,
    userId,
    searchQuery = '',
    status,
  }: {
    userId: string;
    searchQuery?: string;
    status: FriendsListStatus[];
  } & PaginationArgs): Promise<PaginatedResponse<Friend[]>> {
    const users = alias(usersTable, 'users');

    const friendsListQueryResults = await db
      .select()
      .from(friendsListsTable)
      .where(
        and(
          or(
            eq(friendsListsTable.userOneId, userId),
            eq(friendsListsTable.userTwoId, userId),
          ),
          inArray(friendsListsTable.status, status),
        ),
      )
      .innerJoin(
        users,
        and(
          or(
            eq(users.userId, friendsListsTable.userOneId),
            eq(users.userId, friendsListsTable.userTwoId),
          ),
          ilike(users.username, `%${searchQuery}%`),
        ),
      )
      .limit(limit)
      .offset((page - 1) * limit);

    const [{ total } = { total: 0 }] = await db
      .select({ total: count() })
      .from(friendsListsTable)
      .where(
        and(
          or(
            eq(friendsListsTable.userOneId, userId),
            eq(friendsListsTable.userTwoId, userId),
          ),
          inArray(friendsListsTable.status, status),
        ),
      )
      .innerJoin(
        users,
        and(
          or(
            eq(users.userId, friendsListsTable.userOneId),
            eq(users.userId, friendsListsTable.userTwoId),
          ),
          ilike(users.username, `%${searchQuery}%`),
        ),
      );

    const friends = friendsListQueryResults.reduce<Friend[]>((prev, curr) => {
      if (curr.users.userId === userId) {
        return prev;
      }

      return [friendDto(curr.friends_lists, curr.users), ...prev];
    }, []);

    return {
      data: friends,
      limit,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async sendFriendRequest() {
    throw new Error('Method not implemented.');
  }

  async cancelFriendRequest() {
    throw new Error('Method not implemented.');
  }

  async unfriend() {
    throw new Error('Method not implemented.');
  }

  async blockFriend() {
    throw new Error('Method not implemented.');
  }
}
