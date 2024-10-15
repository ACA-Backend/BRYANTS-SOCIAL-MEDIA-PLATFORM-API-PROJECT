import { Schema, model } from "mongoose";

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'post',
        required: true
    },
    comment: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
        default: null
    }

}, { timestamps: true });

export const like = model('like', likeSchema);