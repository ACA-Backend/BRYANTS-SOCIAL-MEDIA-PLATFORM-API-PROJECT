import asyncHandler from "../../lib/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../../lib/errorDefinitions.js";
import * as notificationService from "../services/notificationService.js";

/**
 * Create a new notification for a user.
 * @route POST /notifications
 * @access Private
 */
export const createNotification = asyncHandler(async (req, res) => {
    const { recipientId, type, content } = req.body;

    // Validating the notification data
    if (!recipientId || !type || !content) {
        throw new BadRequestError("All notification fields are required");
    }

    const notification = await notificationService.createNotification({
        recipient: recipientId,
        type,
        content,
        sender: req.user._id, 
    });

    return res.status(201).json({
        success: true,
        message: "Notification created successfully",
        data: notification,
    });
});

/**
 * Get all notifications for the logged-in user.
 * @route GET /notifications
 * @access Private
 */
export const getNotifications = asyncHandler(async (req, res) => {
    const notifications = await notificationService.getNotifications(req.user._id);

    return res.status(200).json({
        success: true,
        message: "Notifications fetched successfully",
        data: notifications,
    });
});

/**
 * Mark a notification as read.
 * @route PUT /notifications/:id/read
 * @access Private
 */
export const markNotificationAsRead = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await notificationService.markAsRead(req.user._id, id);

    if (!notification) {
        throw new NotFoundError("Notification not found or not accessible");
    }

    return res.status(200).json({
        success: true,
        message: "Notification marked as read",
        data: notification,
    });
});

/**
 * Delete a notification.
 * @route DELETE /notifications/:id
 * @access Private
 */
export const deleteNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const notification = await notificationService.deleteNotification(req.user._id, id);

    if (!notification) {
        throw new NotFoundError("Notification not found or not accessible");
    }

    return res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
    });
});
