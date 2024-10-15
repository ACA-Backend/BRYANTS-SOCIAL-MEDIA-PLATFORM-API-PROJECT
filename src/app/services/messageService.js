import { Message } from '../schema/messageSchema.js'

// Creating a new message
export const createMessage = async (senderId, recipientId, content) => {
  return await Message.create({
    sender: senderId,
    recipient: recipientId,
    content,
  });
};

// Getting messages between two users
export const getMessagesBetweenUsers = async (senderId, recipientId) => {
  return await Message.find({
    $or: [
      { sender: senderId, recipient: recipientId },
      { sender: recipientId, recipient: senderId },
    ],
  }).sort({ createdAt: 1 }); // Sort by creation time (oldest first)
};

// Getting a message by its ID
export const getMessageById = async (messageId) => {
  return await Message.findById(messageId);
};

// to delete a message by ID
export const deleteMessage = async (messageId) => {
  return await Message.findByIdAndDelete(messageId);
};
