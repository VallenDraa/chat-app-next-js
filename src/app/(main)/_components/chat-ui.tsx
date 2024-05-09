'use client';

import * as React from 'react';
import { Button } from '~/components/ui/button';
import { useSocketEvents } from '~/hooks';
import { type Message } from '~/types';
import { socket } from '~/utils';

export type ChatUiProps = {
  messages: Message[];
};

export function ChatUi(props: ChatUiProps) {
  const { messages } = props;

  useSocketEvents(
    React.useMemo(
      () => [{ name: 'message:receive', handler: console.log }],
      [],
    ),
  );

  return (
    <div>
      <Button
        onClick={() => {
          socket.emit('message:send', 'Hello, world!');
        }}
      >
        send message
      </Button>

      {messages.map(message => (
        <div key={message.id}>
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}
