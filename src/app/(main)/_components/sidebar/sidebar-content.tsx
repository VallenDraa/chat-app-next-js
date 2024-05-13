'use client';

import {
  Carousel,
  CarouselContent,
  type CarouselApi,
} from '~/components/ui/carousel';

import * as React from 'react';
import { SidebarPagesMenu } from './sidebar-pages-menu';

export type SidebarContentProps = {
  children: React.ReactNode;
};

export function SidebarContent(props: SidebarContentProps) {
  const { children } = props;

  const [carouselApi, setCarouselApi] = React.useState<CarouselApi>();
  const handleChangeSidebarPage = (page: number) => {
    if (!carouselApi) {
      return;
    }

    carouselApi.scrollTo(page);
  };

  return (
    <Carousel setApi={setCarouselApi} className='flex grow flex-col'>
      <SidebarPagesMenu onPageChange={handleChangeSidebarPage} />
      <CarouselContent className='h-full' wrapperClassName='h-full'>
        {children}
      </CarouselContent>
    </Carousel>
  );
}
