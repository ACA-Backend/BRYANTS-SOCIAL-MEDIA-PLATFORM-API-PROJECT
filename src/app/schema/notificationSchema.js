import { Schema, model } from 'mongoose'

const notificationSchema = new Schema(
  {
    recipient: { type: Schema.Types.ObjectId,
         ref: 'user',
         required: true
     },
    sender: { type: Schema.Types.ObjectId,
         ref: 'user',
         required: true
     },
    type: { type: String, enum: ['like', 'comment', 'follow'],
         required: true
     }, //this specifies the type of notification
    post: { type: Schema.Types.ObjectId,
         ref: 'post',
         default: null
     }, // Optional though, this is in case of a post-related notifications
    comment: { type: Schema.Types.ObjectId,
         ref: 'comment',
         default: null
     }, // Optional also, in case of a comment-related notifications
    isRead: { type: Boolean, 
         default: false
     }, //this code tracks whether the notification has been read or not
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt
);

export const notification = model('notification', notificationSchema);
