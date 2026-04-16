const mongoose = require('mongoose');

const chatRoomSchema = new mongoose.Schema({
  isGroupChat: { type: Boolean, default: false },
  name: { type: String, required: false }, // For group chats
  participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' }
}, { timestamps: true });

const ChatRoom = mongoose.model('ChatRoom', chatRoomSchema);
module.exports = ChatRoom;
