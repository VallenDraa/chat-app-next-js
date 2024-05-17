import { getFriends } from '~/server/actions/friends-lists.action';
import { SidebarPage } from '../../sidebar-page';
import { getAuthedUserId } from '~/server/actions';
import { FriendsList } from './friends-list';

export async function FriendsSidebarPage() {
  const authedUserId = await getAuthedUserId();
  const { data: friends } = await getFriends({
    userId: authedUserId,
    page: 14,
  });

  return (
    <SidebarPage>
      <FriendsList initialFriends={friends} />
    </SidebarPage>
  );
}
