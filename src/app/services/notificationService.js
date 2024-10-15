import { notification } from '../schema/notificationSchema.js';
import { NotFoundError } from '../../lib/errorDefinitions.js';

export const createNotification = async (payload) => {
  const newNotification = await notification.create(payload);
  return newNotification;
};

export const getUserNotifications = async (userId) => {
  return await notification.find({ recipient: userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (notificationId) => {
  const notificationToUpdate = await notification.findById(notificationId);
  if (!notificationToUpdate) {
    throw new NotFoundError('Notification not found');
  }
  notificationToUpdate.isRead = true;
  await notificationToUpdate.save();
  return notificationToUpdate;
};

export const deleteNotification = async (notificationId) => {
  const notificationToDelete = await notification.findByIdAndDelete(notificationId);
  if (!notificationToDelete) {
    throw new NotFoundError('Notification not found');
  }
  return notificationToDelete;
};
