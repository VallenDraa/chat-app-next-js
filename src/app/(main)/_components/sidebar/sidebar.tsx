import * as React from 'react';

export type SidebarProps = {
  children: React.ReactNode;
};

export function Sidebar(props: SidebarProps) {
  const { children } = props;

  return (
    <section className='relative flex h-screen w-80 flex-col bg-slate-50 shadow-inner shadow-white'>
      {children}
    </section>
  );
}
