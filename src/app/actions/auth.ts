"use server";
import { signIn } from "@/lib/auth";
import { signInSchema } from "@/schemas/sign-in-schema";
import { AuthError } from "next-auth";

export interface ActionState {
  error: string | null;
}

export async function handleSignIn(
  _prevState: ActionState | null,
  formData: FormData,
): Promise<ActionState> {
  const providerId = formData.get("providerId")?.toString();

  if (!providerId) {
    return { error: "Invalid sign-in method." };
  }

  try {
    if (providerId === "credentials") {
      return await handleCredentialsSignIn(formData);
    }

    await signIn(providerId, {
      redirectTo: "/",
    });

    return { error: null };
  } catch (error) {
    return handleSignInError(error);
  }
}

async function handleCredentialsSignIn(
  formData: FormData,
): Promise<ActionState> {
  const credentials = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!credentials.success) {
    return {
      error: "Please provide a valid email and password.",
    };
  }

  await signIn("credentials", {
    ...credentials.data,
    redirectTo: "/",
  });

  return { error: null };
}

function handleSignInError(error: unknown): ActionState {
  if (!(error instanceof AuthError)) {
    throw error;
  }

  switch (error.type) {
    case "CredentialsSignin":
      return { error: "Invalid credentials." };
    default:
      return {
        error: "Something went wrong. Try again later.",
      };
  }
}
