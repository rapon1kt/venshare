import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { NextAuthConfig } from "next-auth";
import clientPromise from "../db/mongodb";
import { createProviders } from "./providers";

export const nextAuthConfig = {
  adapter: MongoDBAdapter(clientPromise),
  providers: createProviders(),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: { signIn: "/sign-in", error: "/sign-in " },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.id = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user) session.user.id = token.id as string;
      return session;
    },
  },
} satisfies NextAuthConfig;
