import { Post } from '../schema/postSchema.js';

// Creating a new post
export const createPost = async (req, res, next) => {
  try {
    const { content } = req.body;
    const post = new Post({
      user: req.user.id,  // Assuming `req.user` contains authenticated user info
      content
    });
    await post.save();
    return res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

//to get a single post
export const getPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('user', 'username');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

//to update a post
export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    //code that ensures the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    post.content = req.body.content || post.content;
    await post.save();
    return res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// Deleting a post
export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Ensure the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    await post.remove();
    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};
