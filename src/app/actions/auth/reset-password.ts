"use server";
import z from "zod";
import { resetPasswordSchema } from "@/schemas";
import { findPasswordResetToken } from "@/repositories";
import { updateUserPasswordService } from "@/services/auth";

type ResetProperties = {
  token?: { errors: string[] };
  newPassword?: { errors: string[] };
  confirmNewPassword?: { errors: string[] };
};

interface ResetPasswordState {
  success: boolean;
  message?: string;
  errors?: ResetProperties;
}

type ResetPasswordReponse = Promise<ResetPasswordState>;

export async function resetPasswordAction(
  _prevState: ResetPasswordState | null,
  formData: FormData,
): ResetPasswordReponse {
  "use server";
  const rawData = Object.fromEntries(formData);
  const validated = resetPasswordSchema.safeParse(rawData);

  if (!validated.success) {
    return {
      errors: z.treeifyError(validated.error).properties,
      success: false,
    };
  }

  const { token, newPassword } = validated.data;

  try {
    const tokenRecord = await findPasswordResetToken(token);

    if (!tokenRecord || tokenRecord.usedAt) {
      return {
        message: "Token is invalid, expired, or has already been used.",
        success: false,
      };
    }

    await updateUserPasswordService(
      tokenRecord.userId.toString(),
      newPassword,
      tokenRecord._id.toString(),
    );

    return {
      message: "Password has been reset successfully!",
      success: true,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Something went wrong. Please try again later.",
      success: false,
    };
  }
}
