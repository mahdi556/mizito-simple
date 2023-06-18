module.exports = function(server){
  const io = require('socket.io')(server);

  io.on('connection', socket => {
    console.log(`User ${socket.id} connected`);

    // Join room event
    socket.on('join-room', (roomId, userId) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });

    // Send message event
    socket.on('send-message', (message, roomId, userId) => {
      io.to(roomId).emit('receive-message', message, userId);
      console.log(`User ${userId} sent message in room ${roomId}: ${message}`);
    });

    // Disconnect event
    socket.on('disconnect', () => {
      console.log(`User ${socket.id} disconnected`);
    });
  });
};
