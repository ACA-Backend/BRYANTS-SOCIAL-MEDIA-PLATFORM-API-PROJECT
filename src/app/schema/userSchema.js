import { model, Schema } from 'mongoose';
import argon from 'argon2';

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          return !/\s/.test(value); 
      },
      message: 'Password should not contain spaces',
    },
   },
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    profilePicture: {
      type: String,
      required: false,
      default: null,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// code to hash the password before saving
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await argon.hash(this.password);
  }
  next();
});
//code hashing the password before updating it.
UserSchema.pre('findOneAndUpdate', async function (next) {
    const update = this.getUpdate();
    if (update.password) {
        update.password = await argon.hash(update.password);
    }
    next();
});

// code used to verify the password 
UserSchema.methods.verifyPassword = async function (password) {
  return await argon.verify(this.password, password);
};

export const User = model('User', UserSchema);
