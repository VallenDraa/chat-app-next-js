import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';
import nextEnv from '@next/env';
import { initWebsocket } from '~/server/websocket';

nextEnv.loadEnvConfig(process.cwd(), process.env.NODE_ENV !== 'production');

async function main() {
  const env = await import('~/env').then(m => m.env);

  const dev = env.NODE_ENV !== 'production';
  const hostname = 'localhost';
  const port = 3000;

  // When using middleware `hostname` and `port` must be provided below
  const app = next({ dev, hostname, port });
  const handler = app.getRequestHandler();

  void app.prepare().then(() => {
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    const httpServer = createServer(handler);
    const ws = new Server(httpServer);

    initWebsocket(ws);

    httpServer
      .once('error', err => {
        console.error(err);
        process.exit(1);
      })
      .listen(port, () => {
        console.log(`> Ready on http://${hostname}:${port}`);
      });
  });
}

void main();
