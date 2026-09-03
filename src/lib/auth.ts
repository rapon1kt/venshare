import clientPromise from "./mongodb";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import NextAuth, { NextAuthConfig } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [GitHub, Google],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
    updateAge: 24 * 60 * 60,
  },
  pages: { signIn: "/sign-in", error: "/sign-in", signOut: "/sign-out" },
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

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions);
