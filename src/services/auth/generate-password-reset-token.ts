import { createPasswordResetToken } from "@/repositories";
import crypto from "crypto";

export async function generatePasswordResetToken(userId: string) {
  const resetToken = crypto.randomBytes(32).toString("hex");

  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  await createPasswordResetToken({
    userId,
    tokenHash,
    expiresAt: new Date(Date.now() + 3600000),
  });

  const resetUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

  return resetUrl;
}
