"use server";
import z from "zod";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { signUpSchema } from "@/schemas";
import { signUpUser } from "@/services/auth";

type SignUpProperties = {
  name?: { errors: string[] };
  email?: { errors: string[] };
  password?: { errors: string[] };
  confirmPassword?: { errors: string[] };
};

export type SignUpState = {
  sucess: boolean;
  message: string;
  errors?: SignUpProperties;
};

type SignUpResponse = Promise<SignUpState>;

export async function handleSignUp(
  _prevState: SignUpState | null,
  formData: FormData,
): SignUpResponse {
  "use server";
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const validatedFields = signUpSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      sucess: false,
      message: "Invalid fields value.",
      errors: z.treeifyError(validatedFields.error).properties,
    };
  }

  try {
    const { name, email, password } = validatedFields.data;

    await signUpUser({
      name,
      email,
      password,
    });

    await signIn("credentials", {
      email,
      password,
    });

    return {
      sucess: true,
      message: `Welcome, ${name}!`,
    };
  } catch (error) {
    return handleSignUpError(error);
  }
}

function handleSignUpError(error: unknown): SignUpState {
  if (!(error instanceof AuthError)) {
    throw error;
  }

  switch (error.type) {
    case "EmailSignInError":
    case "CredentialsSignin":
      return { sucess: false, message: "Invalid credentials." };
    default:
      return {
        sucess: false,
        message: "Something went wrong. Try again later.",
      };
  }
}
