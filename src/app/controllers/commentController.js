import asyncHandler from "../../lib/asyncHandler.js";
import { BadRequestError, NotFoundError } from "../../lib/errorDefinitions.js";
import * as commentService from "../services/commentService.js";
import validator from "../../lib/inputValidator.js";
import { createCommentRequest } from "../requests/createCommentRequest.js";

// Creating a new comment
export const createComment = asyncHandler(async (req, res) => {
    const { errors } = validator(createCommentRequest, req.body);

    if (errors) {
        throw new BadRequestError("Invalid comment data", errors);
    }

    const comment = await commentService.createComment({
        content: req.body.content,
        author: req.user._id, // Assuming req.user is populated via auth middleware
        post: req.params.postId, // Assuming postId is passed as a route param
    });

    res.status(201).json({
        success: true,
        message: "Comment created successfully",
        data: {
            comment,
        },
    });
});

//code to get comments for a post
export const getCommentsByPost = asyncHandler(async (req, res) => {
    const comments = await commentService.getCommentsByPost(req.params.postId);

    if (!comments) {
        throw new NotFoundError("No comments found for this post");
    }

    res.status(200).json({
        success: true,
        data: {
            comments,
        },
    });
});

// Updating a comment
export const updateComment = asyncHandler(async (req, res) => {
    const updatedComment = await commentService.updateComment(req.params.commentId, req.body.content, req.user._id);

    if (!updatedComment) {
        throw new NotFoundError("Comment not found or you don't have permission to edit it");
    }

    res.status(200).json({
        success: true,
        message: "Comment updated successfully",
        data: {
            comment: updatedComment,
        },
    });
});

// Deleting a comment
export const deleteComment = asyncHandler(async (req, res) => {
    const deleted = await commentService.deleteComment(req.params.commentId, req.user._id);

    if (!deleted) {
        throw new NotFoundError("Comment not found or you don't have permission to delete it");
    }

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
});


export default {
    createComment,
    getCommentsByPost,
    updateComment,
    deleteComment
};
