const socketio = require("socket.io");
const Chat = require("./models/chat");

function initializeSocketServer(server) {
  const io = socketio(server);
 console.log()
  io.on("connection", (socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    socket.on("chat message", async ({ sender, receiver, message }) => {
      const chat = new Chat({
        sender,
        receiver,
        message,
      });

      await chat.save();

      io.emit("chat message", { sender, receiver, message });
    });
  });
}

module.exports = initializeSocketServer;
