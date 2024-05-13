import { MessageSquareMoreIcon, UsersIcon, BellIcon } from 'lucide-react';
import { Button } from '~/components/ui/button';

export type SidebarPagesButtonProps = {
  onPageChange: (pageIdx: number) => void;
};

export const carouselPagesMenuItem = [
  { label: 'chats', icon: <MessageSquareMoreIcon size={16} />, pageIdx: 0 },
  { label: 'friends', icon: <UsersIcon size={16} />, pageIdx: 1 },
  { label: 'notifications', icon: <BellIcon size={16} />, pageIdx: 2 },
];

export function SidebarPagesMenu(props: SidebarPagesButtonProps) {
  const { onPageChange } = props;

  return (
    <div className='flex w-full border-b border-slate-200 p-2'>
      {carouselPagesMenuItem.map(item => (
        <Button
          key={item.pageIdx}
          variant='ghost'
          className='h-auto w-1/3 flex-col gap-1 text-xs'
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
