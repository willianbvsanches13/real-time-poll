import { Server, Socket } from "socket.io"

export default (io: Server): void => {
  io.on('connection', (socket: Socket) => {
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
}
