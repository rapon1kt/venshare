import mongoose, { Model, Schema, Types } from "mongoose";

export interface IPasswordResetToken {
  usedAt: Date;
  expiresAt: Date;
  tokenHash: string;

  userId: Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const PasswordResetTokenSchema = new Schema<IPasswordResetToken>(
  {
    usedAt: { type: Date, required: false },
    expiresAt: { type: Date, required: true },
    tokenHash: { type: String, required: true, unique: true },
    userId: { type: Types.ObjectId, ref: "User", required: true, index: true },
  },
  { collection: "password_reset_tokens", timestamps: true },
);

PasswordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const PasswordResetTokenModel: Model<IPasswordResetToken> =
  mongoose.models.PasswordResetToken ??
  mongoose.model<IPasswordResetToken>(
    "PasswordResetToken",
    PasswordResetTokenSchema,
  );
