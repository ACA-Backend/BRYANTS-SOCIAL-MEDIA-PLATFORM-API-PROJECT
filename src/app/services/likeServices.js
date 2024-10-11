import { NotFoundError, ConflictError, BadRequestError } from '../../lib/error-definitions.js';
import { Post } from '../schema/post.schema.js';
import { Like } from '../schema/like.schema.js';

/**
 * Like a post.
 * @param {ObjectId} userId - The ID of the user who is liking the post.
 * @param {ObjectId} postId - The ID of the post to like.
 * @returns {Object} - The liked post data.
 */
export const likePost = async (userId, postId) => {
    //this will Check if post exists
    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError('Post not found');

    //while this will Check if the user has already liked the post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (existingLike) throw new ConflictError('You have already liked this post');

    //code to create a new like
    const like = await Like.create({ user: userId, post: postId });

    //code to update the post's likes count
    post.likes.push(like._id);
    await post.save();

    return like;
};

/**
 * Unlike a post.
 * @param {ObjectId} userId - The ID of the user who is unliking the post.
 * @param {ObjectId} postId - The ID of the post to unlike.
 * @returns {Object} - The unliked post data.
 */
export const unlikePost = async (userId, postId) => {
    // Checking if post exists
    const post = await Post.findById(postId);
    if (!post) throw new NotFoundError('Post not found');

    // Checking if the user has liked the post
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (!existingLike) throw new BadRequestError('You have not liked this post yet');

    // Removing the like
    await existingLike.remove();

    // Updating the post's likes count
    post.likes.pull(existingLike._id);
    await post.save();

    return { success: true, message: 'Post unliked successfully' };
};

/**
 * Get all likes for a post.
 * @param {ObjectId} postId - The ID of the post to get likes for.
 * @returns {Array} - List of likes.
 */
export const getLikesForPost = async (postId) => {
    // Checking if post exists
    const post = await Post.findById(postId).populate('likes');
    if (!post) throw new NotFoundError('Post not found');

    return post.likes;
};
