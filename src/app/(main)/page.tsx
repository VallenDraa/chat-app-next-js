import { getUserProfile } from '~/server/actions';
import {
  ChatUi,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  UserProfileSection,
} from './_components';
import { CarouselItem } from '~/components/ui/carousel';

export default async function Home() {
  const userProfile = await getUserProfile();

  return (
    <main className='flex'>
      <div className='basis-1/3'>
        <Sidebar>
          <SidebarHeader>
            <UserProfileSection {...userProfile} />
          </SidebarHeader>
          <SidebarContent>
            <CarouselItem>1</CarouselItem>
            <CarouselItem>2</CarouselItem>
            <CarouselItem>3</CarouselItem>
            <CarouselItem>4</CarouselItem>
          </SidebarContent>
        </Sidebar>
      </div>
      <div className='basis-3/4'>
        <ChatUi messages={[]} />
      </div>
    </main>
  );
}
