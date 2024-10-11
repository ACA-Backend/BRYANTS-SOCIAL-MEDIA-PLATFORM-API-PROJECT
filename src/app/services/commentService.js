import { NotFoundError } from '../../lib/errorDefinItions.js';
import { Comment } from '../schema/commentSchema.js'; 

// Create a new comment
export const createComment = async ({ postId, userId, content }) => {
    const comment = await Comment.create({
        post: postId,
        user: userId,
        content
    });
    return comment;
};

// Get all comments for a specific post
export const getCommentsByPostId = async (postId) => {
    const comments = await Comment.find({ post: postId }).populate('user');
    if (!comments) throw new NotFoundError('No comments found for this post');
    return comments;
};

// Update a comment
export const updateComment = async (commentId, { content }) => {
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
    );
    if (!updatedComment) throw new NotFoundError('Comment not found');
    return updatedComment;
};

// Delete a comment
export const deleteComment = async (commentId) => {
    const deletedComment = await Comment.findByIdAndDelete(commentId);
    if (!deletedComment) throw new NotFoundError('Comment not found');
    return deletedComment;
};

export default {
    createComment,
    getCommentsByPostId,
    updateComment,
    deleteComment
};
