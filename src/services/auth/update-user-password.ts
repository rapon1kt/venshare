import { hashPassword } from "@/lib/password/password";
import {
  findUserById,
  updatePasswordResetToken,
  updateUserPassword,
} from "@/repositories";

export async function updateUserPasswordService(
  userId: string,
  newPassword: string,
  resetTokenId: string,
) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const hashedPassword = await hashPassword(newPassword);

  await updateUserPassword({
    id: userId,
    newPassword: hashedPassword,
  });

  await updatePasswordResetToken(resetTokenId);
}
