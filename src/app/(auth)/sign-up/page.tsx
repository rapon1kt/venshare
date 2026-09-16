"use client";
import { useActionState } from "react";
import {
  AuthState,
  handleSignUp,
  signInWithGitHub,
  signInWithGoogle,
} from "@/app/actions/auth";
import Link from "next/link";
import { AuthAlert } from "@/components/alert/auth-alert";
import { GitHubIcon, GoogleIcon } from "@/components/provider-icons";

const initialState: AuthState = {
  message: "",
  sucess: false,
  errors: undefined,
};

export default function SignUp() {
  const [state, formAction, isPending] = useActionState(
    handleSignUp,
    initialState,
  );

  return (
    <main className="h-screen w-full flex flex-col items-center">
      <section className="flex-1 flex flex-col justify-center space-y-4 px-8 sm:w-lg">
        <div className="flex flex-col gap-2">
          <h1 className="text-7xl text-white/80">Sign Up</h1>
          <p className="text-lg text-white/30">
            Create a free account or{" "}
            <Link className="underline" href="/sign-in">
              sign in
            </Link>
            . It&apos;s quick and easy!
          </p>
        </div>
        <AuthAlert authState={state} />
        <form className="flex flex-col w-full gap-4" action={formAction}>
          <input type="hidden" name="providerId" value="credentials" />
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <label className="text-white/70 text-base" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                autoComplete="name"
                className="transition text-white/60 outline outline-white/10 px-2 py-1.5 rounded-lg focus:outline-2 focus:outline-white/15"
                placeholder="Enter your name"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/70 text-base" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                autoComplete="email"
                className="transition text-white/60 outline outline-white/10 px-2 py-1.5 rounded-lg focus:outline-2 focus:outline-white/15"
                placeholder="Enter your email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/70 text-base" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                className="transition text-white/60 outline outline-white/10 px-2 py-1.5 rounded-lg focus:outline-2 focus:outline-white/15"
                placeholder="••••••••"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-white/70 text-base" htmlFor="password">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                autoComplete="current-password"
                className="transition text-white/60 outline outline-white/10 px-2 py-1.5 rounded-lg focus:outline-2 focus:outline-white/15"
                placeholder="••••••••"
              />
            </div>
          </div>
          <button
            disabled={isPending}
            className="bg-linear-to-r from-white/3 via-white/7 to-white/3 bg-size-[200%_auto] bg-position-[0%_center] hover:bg-position-[100%_center] transition-[background-position] duration-500 ease-in-out text-center cursor-pointer text-sm w-full block rounded-lg py-2 text-white/80"
          >
            {isPending ? "Loading..." : "Create new account"}
          </button>
        </form>
        <Link
          href="/sign-in"
          className="transition border text-center hover:bg-white/1 border-white/10 cursor-pointer text-sm w-full rounded-lg py-2 text-white/80"
        >
          I already have an account
        </Link>
        <div className="flex items-center gap-4 select-none">
          <hr className="border-white/10 flex-1" />
          <p className="text-white/30 font-medium text-xs">OR</p>
          <hr className="border-white/10 flex-1" />
        </div>
        <div className="space-y-4 text-white/80">
          <form className="w-full" action={signInWithGoogle}>
            <input type="hidden" name="providerId" value="google" />
            <button
              className="transition hover:bg-white/1 flex items-center justify-center gap-2 text-sm cursor-pointer w-full border border-white/10 rounded-lg py-2 text-white/80"
              type="submit"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>
          <form className="w-full" action={signInWithGitHub}>
            <input type="hidden" name="providerId" value="github" />
            <button
              className="transition hover:bg-white/1 flex items-center justify-center gap-2 text-sm cursor-pointer w-full border border-white/10 rounded-lg py-2 text-white/80"
              type="submit"
            >
              <GitHubIcon />
              Continue with GitHub
            </button>
          </form>
        </div>
      </section>
      <footer className="py-4 text-center">
        <p className="text-xs text-white">
          &copy; {new Date().getFullYear()} &bull; venshare
        </p>
      </footer>
    </main>
  );
}
