const Chat = require('../models/chat');

exports.getChatRoom = async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const chats = await Chat.find({room: roomId}).populate('user');
    res.render('chat', {user: req.user, chats: chats, roomId: roomId});
  } catch(error) {
    console.error(error);
    res.render('error');
  }
};

exports.postMessage = async (req, res) => {
  try {
    const message = req.body.message;
    const roomId = req.body.roomId;
    const user = req.user._id;

    // Save message to database
    const chat = new Chat({message: message, room: roomId, user: user});
    await chat.save();

    // Emit message to other users in the chat room
    io.emit('receive-message', message, user);

    res.send('Success');
  } catch(error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};
