import {
  MessageSquareMoreIcon,
  UsersIcon,
  BellIcon,
  SettingsIcon,
} from 'lucide-react';
import { Button } from '~/components/ui/button';

export type SidebarPagesButtonProps = {
  onPageChange: (pageIdx: number) => void;
};

export const carouselPagesMenuItem = [
  { label: 'chats', icon: <MessageSquareMoreIcon size={16} />, pageIdx: 0 },
  { label: 'friends', icon: <UsersIcon size={16} />, pageIdx: 1 },
  { label: 'notifications', icon: <BellIcon size={16} />, pageIdx: 2 },
  { label: 'settings', icon: <SettingsIcon size={16} />, pageIdx: 3 },
];

export function SidebarPagesMenu(props: SidebarPagesButtonProps) {
  const { onPageChange } = props;

  return (
    <div className='flex w-full border-b border-slate-200 px-2 pb-2'>
      {carouselPagesMenuItem.map(item => (
        <Button
          key={item.pageIdx}
          variant='ghost'
          className='h-auto w-1/4 flex-col gap-1 text-xs'
          onClick={() => {
            onPageChange(item.pageIdx);
          }}
        >
          {item.icon}
          <span className='font-normal text-slate-700'>{item.label}</span>
        </Button>
      ))}
    </div>
  );
}
