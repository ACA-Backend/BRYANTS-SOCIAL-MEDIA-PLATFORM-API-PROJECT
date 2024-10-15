import { User } from "../schema/userSchema.js" 
import { NotFoundError, UnauthenticatedError } from '../../lib/errorDefinition.js';
import { generateToken } from '../providers/jwtProvider.js'; 
import * as authService from './authService.js'; 
import argon2 from 'argon2'; 

export const authenticateUser = async (payload) => {
    const user = payload.username
        ? await authService.getUserByUserName(payload.username)
        : await authService.getUserByEmail(payload.email);

    if (!user) throw new NotFoundError('Invalid credentials, please try again');

    const isPasswordCorrect = await argon2.verify(user.password, payload.password);
    if (!isPasswordCorrect) throw new UnauthenticatedError('Invalid credentials, please try again');

    return generateToken({
        sub: user._id,
        username: user.username,
        email: user.email,
        followers: user.followers,
        following: user.following,
    });
};

export const registerUser = async (payload) => {
    return await authService.createUser(payload);
};

export const getUserById = async (id) => {
    const user = await User.findById(id).populate("followers").populate("following");
    if (!user) throw new NotFoundError("User not found");
    return user;
};

export const updateUser = async (id, payload) => {
    const user = await User.findByIdAndUpdate(id, payload, { new: true });
    if (!user) throw new NotFoundError("User not found");
    return user;
};

export const followUser = async (followerId, followingId) => {
    const user = await User.findById(followerId);
    const userToFollow = await User.findById(followingId);

    if (!user || !userToFollow) throw new NotFoundError("User not found");

    if (!user.following.includes(followingId)) {
        user.following.push(followingId);
        userToFollow.followers.push(followerId);
        await user.save();
        await userToFollow.save();
    }

    return userToFollow;
};

export const unfollowUser = async (followerId, followingId) => {
    const user = await User.findById(followerId);
    const userToUnfollow = await User.findById(followingId);

    if (!user || !userToUnfollow) throw new NotFoundError("User not found");

    user.following = user.following.filter(id => id.toString() !== followingId);
    userToUnfollow.followers = userToUnfollow.followers.filter(id => id.toString() !== followerId);
    
    await user.save();
    await userToUnfollow.save();

    return userToUnfollow;
};

export const searchUsers = async( query ) => {
    return await User.find({
        $or: [
            {
                username: { $regex: query, $options: 'i'}
            },
            {
                email: { $regex: query, $options: 'i'}
            },
        ],
    });
};

export default {
    authenticateUser,
    registerUser,
    getUserById,
    updateUser,
    followUser,
    unfollowUser,
    searchUsers,
};

