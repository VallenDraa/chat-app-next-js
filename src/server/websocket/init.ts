import { type Server } from 'socket.io';

export function initWebsocket(ws: Server) {
  ws.on('connection', socket => {
    socket.on('message:send', message => {
      socket.broadcast.emit('message:receive', message);
    });
  });
}
