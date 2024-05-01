'use client';

import * as React from 'react';
import { socket } from '~/utils/socket';

export default function Home() {
  const [isConnected, setIsConnected] = React.useState(false);
  const [transport, setTransport] = React.useState('N/A');

  React.useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport('N/A');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    socket.on('message', data => {
      console.log(data);
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <div>
      <p>Status: {isConnected ? 'connected' : 'disconnected'}</p>
      <p>Transport: {transport}</p>
    </div>
  );
}
