import asyncHandler from "../../lib/asyncHandler.js";
import { NotFoundError, BadRequestError } from "../../lib/errorDefinitions.js";
import * as likeService from "../services/likeService.js";

// FUNCTION FOR LIKING A COMMENT OR POST
export const likeContent = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;

    if (!["post", "comment"].includes(contentType)) {
        throw new BadRequestError("Invalid content type, must be 'post' or 'comment'");
    }

    const like = await likeService.likeContent({
        contentId,
        contentType,
        userId: req.user._id,
    });

    if (!like) {
        throw new NotFoundError(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} not found`);
    }

    res.status(200).json({
        success: true,
        message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} liked successfully`,
        data: {
            like,
        },
    });
});

// Unliking a post or comment
export const unlikeContent = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;

    if (!["post", "comment"].includes(contentType)) {
        throw new BadRequestError("Invalid content type, must be 'post' or 'comment'");
    }

    const unliked = await likeService.unlikeContent({
        contentId,
        contentType,
        userId: req.user._id,
    });

    if (!unliked) {
        throw new NotFoundError(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} not found or not liked by this user`);
    }

    res.status(200).json({
        success: true,
        message: `${contentType.charAt(0).toUpperCase() + contentType.slice(1)} unliked successfully`,
    });
});

// Getting likes for a post or comment
export const getLikes = asyncHandler(async (req, res) => {
    const { contentType, contentId } = req.params;

    if (!["post", "comment"].includes(contentType)) {
        throw new BadRequestError("Invalid content type, must be 'post' or 'comment'");
    }

    const likes = await likeService.getLikes({
        contentId,
        contentType,
    });

    if (!likes) {
        throw new NotFoundError(`${contentType.charAt(0).toUpperCase() + contentType.slice(1)} not found or no likes yet`);
    }

    res.status(200).json({
        success: true,
        data: {
            likes,
        },
    });
});
