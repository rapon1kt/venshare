import { hashPassword } from "@/lib/password/password";
import { updatePasswordResetToken, updateUserPassword } from "@/repositories";

export async function updateUserPasswordService(
  userId: string,
  newPassword: string,
  resetTokenId: string,
) {
  const hashedPassword = await hashPassword(newPassword);

  await updateUserPassword({
    id: userId,
    newPassword: hashedPassword,
  });

  await updatePasswordResetToken(resetTokenId);
}
