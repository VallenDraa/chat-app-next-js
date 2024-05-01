import { type Server } from 'socket.io';

export function initWebsocket(ws: Server) {
  ws.on('connection', socket => {
    socket.emit('message', 'Hello, world!');
  });
}
