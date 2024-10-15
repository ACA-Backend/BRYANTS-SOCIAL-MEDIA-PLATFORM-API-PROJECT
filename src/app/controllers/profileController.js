import asyncHandler from '../../lib/asyncHandler.js'
import {
  NotFoundError,
  BadRequestError,
} from '../../lib/errorDefinitions.js';
import * as userService from '../services/userService.js';

//this will fetch user profile by ID
export const getProfile = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    throw new NotFoundError('User profile not found');
  }

  return res.status(200).json({
    success: true,
    message: 'User profile fetched successfully',
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      bio: user.bio,
      followers: user.followers,
      following: user.following,
    },
  });
});

// Updating user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id; // Extract from req.user set by authMiddleware
  const { username, bio } = req.body;

  //code to ensure that the request body has the valid data
  if (!username || !bio) {
    throw new BadRequestError('Username and bio are required for updating profile');
  }

  const updatedUser = await userService.updateUser(userId, { username, bio });

  return res.status(200).json({
    success: true,
    message: 'User profile updated successfully',
    data: {
      id: updatedUser._id,
      username: updatedUser.username,
      bio: updatedUser.bio,
      followers: updatedUser.followers,
      following: updatedUser.following,
    },
  });
});

// following a user
export const followUser = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const currentUserId = req.user._id; 

  const followedUser = await userService.followUser(currentUserId, id);

  return res.status(200).json({
    success: true,
    message: `You are now following ${followedUser.username}`,
  });
});

//to unfollow a user
export const unfollowUser = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  const currentUserId = req.user._id; 

  const unfollowedUser = await userService.unfollowUser(currentUserId, id);

  return res.status(200).json({
    success: true,
    message: `You have unfollowed ${unfollowedUser.username}`,
  });
});
