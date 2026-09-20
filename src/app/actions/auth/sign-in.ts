"use server";
import { signIn } from "@/lib/auth";
import { AuthError } from "next-auth";
import { signInSchema } from "@/schemas";

export async function signInWithGoogle() {
  "use server";
  await signIn("google", { redirectTo: "/" });
}

export async function signInWithGitHub() {
  "use server";
  await signIn("github", { redirectTo: "/" });
}

type SignInProperties = {
  name?: { errors: string[] };
  email?: { errors: string[] };
  password?: { errors: string[] };
};

export type SignInState = {
  sucess: boolean;
  message: string;
  errors?: SignInProperties;
};

type AuthResponse = Promise<SignInState>;

export async function handleSignIn(
  _prevState: SignInState | null,
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

function handleSignInError(error: unknown): SignInState {
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
