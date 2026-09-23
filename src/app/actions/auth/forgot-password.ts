"use server";
import { sendEmail } from "@/lib/mail/send-email";
import { findUserByEmail } from "@/repositories";
import { generatePasswordResetToken } from "@/services/auth";

type AuthProperties = {
  email?: { errors: string[] };
};

interface ForgotPasswordState {
  message: string;
  success: boolean;
  errors?: AuthProperties;
}

type ForgotPasswordResponse = Promise<ForgotPasswordState>;

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState | null,
  formData: FormData,
): ForgotPasswordResponse {
  "use server";
  const email = formData.get("email") as string;

  if (!email) {
    return { message: "Email is required.", success: false };
  }

  try {
    const user = await findUserByEmail(email);

    if (user) {
      const resetUrl = await generatePasswordResetToken(user._id.toString());

      await sendEmail({ name: user.name, email: user.email }, resetUrl);
    }

    return {
      message: "If that email exists, a reset link was sent.",
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
