import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  io.on('connection', (socket) => {
    console.log('A user connected');

    // Emit a message to the connected client
    socket.emit('welcome', 'Welcome to the Socket.IO server!');
    // Listen for a custom event from the client
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      // Emit a message to all connected clients
      io.emit('broadcast', `Message from user: ${msg}`);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
