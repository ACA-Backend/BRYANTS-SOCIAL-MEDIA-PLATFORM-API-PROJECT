import asyncHandler from '../../lib/asyncHandler.js'
import { NotFoundError, BadRequestError } from '../../lib/errorDefinitions.js';
import * as userService from '../services/userService.js';

// Searching for users by their username or email
export const searchUsers = asyncHandler(async (req, res) => {
  const { query } = req.query; 

  if (!query) {
    throw new BadRequestError('Search query is required');
  }

  const users = await userService.searchUsers(query);

  if (users.length === 0) {
    throw new NotFoundError('No users found matching the query');
  }

  return res.status(200).json({
    success: true,
    message: `${users.length} user(s) found`,
    data: users.map((user) => ({
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      followers: user.followers.length,
      following: user.following.length,
    })),
  });
});
