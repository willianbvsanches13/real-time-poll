import 'module-alias/register'
import { setupApp } from '@/main/config/app'

(async () => {
  const { io, httpServer } = await setupApp();

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('join-poll', ({ pollID }: { pollID: string }) => {
      console.log(`Socket ${socket.id} joined poll ${pollID}`);
      socket.rooms.forEach((room) => {
        if (room !== socket.id) {
          socket.leave(room);
        }
      });
      socket.join(pollID);
    });

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(3000, () => {
    console.log('HTTP Server and Socket Server are running at http://localhost:3000');
  });

  console.log('Execute after listen');
})()
