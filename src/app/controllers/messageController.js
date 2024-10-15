import asyncHandler from '../../lib/asyncHandler.js'
import { BadRequestError, NotFoundError, ForbiddenError } from '../../lib/errorDefinitions.js';
import * as messageService from '../services/messageService.js';

// Sending a message to another user
export const sendMessage = asyncHandler(async (req, res) => {
  const { recipientId, content } = req.body;
  const senderId = req.user._id; 

  if (!recipientId || !content) {
    throw new BadRequestError('Recipient ID and message content are required');
  }

  const message = await messageService.createMessage(senderId, recipientId, content);

  return res.status(201).json({
    success: true,
    message: 'Message sent successfully',
    data: message,
  });
});

// Getting messages between two users (the sender and the reciver)
export const getMessages = asyncHandler(async (req, res) => {
  const { recipientId } = req.params;
  const senderId = req.user._id;

  if (!recipientId) {
    throw new BadRequestError('Recipient ID is required');
  }

  const messages = await messageService.getMessagesBetweenUsers(senderId, recipientId);

  if (messages.length === 0) {
    throw new NotFoundError('No messages found between the users');
  }

  return res.status(200).json({
    success: true,
    message: 'Messages fetched successfully',
    data: messages,
  });
});

// Deleting a message 
export const deleteMessage = asyncHandler(async (req, res) => {
  const { messageId } = req.params;
  const userId = req.user._id;

  const message = await messageService.getMessageById(messageId);

  if (!message) {
    throw new NotFoundError('Message not found');
  }

  // making sure that only the sender or reciver can delete the message
  if (message.sender.toString() !== userId.toString() && message.recipient.toString() !== userId.toString()) {
    throw new ForbiddenError('You do not have permission to delete this message');
  }

  await messageService.deleteMessage(messageId);

  return res.status(200).json({
    success: true,
    message: 'Message deleted successfully',
  });
});
