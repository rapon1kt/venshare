import { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { signInSchema } from "@/schemas/sign-in-schema";
import Credentials from "next-auth/providers/credentials";
import { authenticateUser } from "@/services/auth/authenticate-user";

export const createProviders = (): Provider[] => [
  GitHub,
  Google,
  Credentials({
    async authorize(credentials) {
      const validated = signInSchema.safeParse(credentials);

      if (!validated.success) return null;

      return await authenticateUser(
        validated.data.email,
        validated.data.password,
      );
    },
  }),
];
