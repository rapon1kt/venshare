import crypto from "crypto";
import dbConnect from "@/lib/db/mongoose";
import { PasswordResetToken } from "@/models";

export async function findPasswordResetToken(token: string) {
  await dbConnect();
  const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
  return await PasswordResetToken.findOne({
    tokenHash: hashedToken,
    expiresAt: { $gt: new Date() },
  });
}

export async function createPasswordResetToken(data: {
  userId: string;
  tokenHash: string;
  expiresAt: Date;
}) {
  await dbConnect();

  await PasswordResetToken.create({
    userId: data.userId,
    tokenHash: data.tokenHash,
    expiresAt: data.expiresAt,
  });
}

export async function updatePasswordResetToken(id: string) {
  await dbConnect();
  await PasswordResetToken.updateOne(
    { _id: id },
    {
      $set: {
        usedAt: new Date(),
      },
    },
  );
}
