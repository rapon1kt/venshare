"use server";
import z from "zod";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { signUpUser } from "@/services/auth";
import { signUpSchema, signInSchema } from "@/schemas";

type AuthProperties = {
  name?: { errors: string[] };
  email?: { errors: string[] };
  password?: { errors: string[] };
  confirmPassword?: { errors: string[] };
};

export type AuthState = {
  sucess: boolean;
  message: string;
  errors?: AuthProperties;
};

type AuthResponse = Promise<AuthState>;

export async function handleSignIn(
  _prevState: AuthState | null,
  formData: FormData,
): Promise<AuthResponse> {
  const providerId = formData.get("providerId")?.toString();

  if (!providerId) {
    return { sucess: false, message: "Invalid sign-in method." };
  }

  try {
    if (providerId === "credentials") {
      return await handleCredentialsSignIn(formData);
    }

    await signIn(providerId, {
      redirectTo: "/",
    });

    return { sucess: true, message: "Welcome back!" };
  } catch (error) {
    return handleSignInError(error);
  }
}

async function handleCredentialsSignIn(
  formData: FormData,
): Promise<AuthResponse> {
  const credentials = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!credentials.success) {
    return {
      sucess: false,
      message: "Invalid credentials.",
    };
  }

  await signIn("credentials", {
    ...credentials.data,
    redirectTo: "/",
  });

  return { sucess: true, message: "Welcome back!" };
}

function handleSignInError(error: unknown): AuthState {
  if (!(error instanceof AuthError)) {
    throw error;
  }

  switch (error.type) {
    case "CredentialsSignin":
      return { sucess: false, message: "Invalid credentials." };
    default:
      return {
        sucess: false,
        message: "Something went wrong. Try again later.",
      };
  }
}

export async function handleSignUp(
  _prevState: AuthState | null,
  formData: FormData,
): AuthResponse {
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
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      return {
        sucess: false,
        message: "An account with this email already exists.",
      };
    }

    console.error("An unexpected error occurred: ", error);

    return {
      sucess: false,
      message: "Something went wrong while creating your account.",
    };
  }
}
