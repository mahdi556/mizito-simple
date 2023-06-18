const Chat = require("../models/chat");

// GET /chats/:sender/:receiver - Fetch all chats between two users
exports.getChats = (req, res) => {
  const { sender, receiver } = req.params;

  Chat.find(
    {
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    },
    (err, chats) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving chats");
      } else {
        res.send(chats);
      }
    }
  );
};

// POST /chats - Create a new chat message
exports.createChat = (req, res) => {
  const { sender, receiver, message } = req.body;

  const newChat = new Chat({
    sender,
    receiver,
    message,
  });

  newChat.save((err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving chat message");
    } else {
      res.send(newChat);
    }
  });
};
