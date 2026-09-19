import mongoose, { Schema, Model } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  image?: string;

  password?: string;

  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      select: false,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

export const UserModel: Model<IUser> =
  mongoose.models.User ?? mongoose.model<IUser>("User", userSchema);
