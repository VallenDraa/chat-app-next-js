'use client';

import { useEffect } from 'react';
import { socket } from '~/utils';

export interface Event {
  name: string;
  handler(...args: unknown[]): unknown;
}

export function useSocketEvents(events: Event[]) {
  useEffect(() => {
    for (const { name, handler } of events) {
      socket.on(name, handler);
    }

    return () => {
      for (const { name } of events) {
        socket.off(name);
      }
    };
  }, [events]);
}
