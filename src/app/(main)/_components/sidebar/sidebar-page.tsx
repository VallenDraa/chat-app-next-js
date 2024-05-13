import { CarouselItem } from '~/components/ui/carousel';

export type SidebarPageProps = {
  children: React.ReactNode;
};

export function SidebarPage(props: SidebarPageProps) {
  const { children } = props;

  return (
    <CarouselItem>
      <div className='p-2'>{children}</div>
    </CarouselItem>
  );
}
