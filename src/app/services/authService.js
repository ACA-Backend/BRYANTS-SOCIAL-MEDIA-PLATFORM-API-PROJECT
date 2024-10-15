import { User } from "../schema/userSchema.js"
import { ConflictError } from "../../lib/errorDefinition.js"; 

export const getUserById = async (id) => {
    return await User.findById(id).populate("followers").populate("following");
};

export const getUserByEmail = async (email) => {
    return await User.findOne({ email }).populate("followers").populate("following");
};

export const getUserByUserName = async (username) => {
    return await User.findOne({ username }).populate("followers").populate("following");
};

export const createUser = async (payload) => {
    const userExists = await User.findOne({
        $or: [{ email: payload.email }, { username: payload.username }]
    });

    if (userExists) throw new ConflictError("This email or username has been taken");

    return await User.create(payload);
};
