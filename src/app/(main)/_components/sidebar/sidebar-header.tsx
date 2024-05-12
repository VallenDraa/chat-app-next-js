import * as React from 'react';

export type SidebarHeaderProps = {
  children: React.ReactNode;
};

export function SidebarHeader(props: SidebarHeaderProps) {
  const { children } = props;

  return <header className='p-2'>{children}</header>;
}
