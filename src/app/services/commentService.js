import { NotFoundError } from '../../lib/errorDefinitions.js';
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

// Getting all comments for a post
export const getCommentsByPostId = async (postId) => {
    const comments = await Comment.find({ post: postId }).populate('user');
    if (!comments) throw new NotFoundError('No comments found for this post');
    return comments;
};

// Updating a comment
export const updateComment = async (commentId, { content }) => {
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { content },
        { new: true }
    );
    if (!updatedComment) throw new NotFoundError('Comment not found');
    return updatedComment;
};

// Deleting a comment
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
