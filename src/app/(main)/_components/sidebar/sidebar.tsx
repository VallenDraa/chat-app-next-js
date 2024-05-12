import * as React from 'react';

export type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar(props: SidebarProps) {
  const { children } = props;

  return (
    <section className='relative h-screen w-80 bg-slate-50 shadow-inner shadow-white'>
      {children}
    </section>
  );
}
