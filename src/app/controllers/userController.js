import asyncHandler from "../../lib/asyncHandler.js";
import * as userService from "../services/userService.js";
import { NotFoundError } from "../../lib/errorDefinitions.js";

// Fetch user profile by ID
export const getUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const user = await userService.getUserById(id); 

    if (!user) {
        throw new NotFoundError("User not found");
    }

    return res.json({
        success: true,
        message: "User profile fetched successfully",
        data: {
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                followers: user.followers,
                following: user.following,
            },
        },
    });
});

// Update user information
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const updatedUser = await userService.updateUser(id, req.body); 

    if (!updatedUser) {
        throw new NotFoundError("User not found");
    }

    return res.json({
        success: true,
        message: "User profile updated successfully",
        data: {
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
            },
        },
    });
});

// Follow a user
export const followUser = asyncHandler(async (req, res) => {
    const { id } = req.params; 
    const loggedInUserId = req.user._id; 

    const updatedUser = await userService.followUser(loggedInUserId, id); 

    return res.json({
        success: true,
        message: "User followed successfully",
        data: {
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                followers: updatedUser.followers,
            },
        },
    });
});

// Unfollow a user
export const unfollowUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const loggedInUserId = req.user._id; 

    const updatedUser = await userService.unfollowUser(loggedInUserId, id); 

    return res.json({
        success: true,
        message: "User unfollowed successfully",
        data: {
            user: {
                id: updatedUser._id,
                username: updatedUser.username,
                followers: updatedUser.followers,
            },
        },
    });
});

export default {
    getUserProfile,
    updateUserProfile,
    followUser,
    unfollowUser,
};
