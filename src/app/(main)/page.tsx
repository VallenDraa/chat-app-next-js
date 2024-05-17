import { getAuthedUserProfile } from '~/server/actions';
import {
  ChatUi,
  FriendsSidebarPage,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarPage,
  UserProfileSection,
} from './_components';

export default async function Home() {
  const userProfile = await getAuthedUserProfile();

  return (
    <main className='flex'>
      <div className='basis-1/3'>
        <Sidebar>
          <SidebarHeader>
            <UserProfileSection {...userProfile} />
          </SidebarHeader>
          <SidebarContent>
            <SidebarPage>Chat</SidebarPage>
            <FriendsSidebarPage />
            <SidebarPage>Notifications</SidebarPage>
          </SidebarContent>
        </Sidebar>
      </div>
      <div className='basis-3/4'>
        <ChatUi messages={[]} />
      </div>
    </main>
  );
}
