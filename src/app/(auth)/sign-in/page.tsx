"use client";
import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";
import { AuthAlert } from "@/components/alert/auth-alert";
import { AuthState, handleSignIn } from "@/app/actions/auth";
import { getAuthMessage } from "@/utils/auth-param-callbacks";
import { GitHubIcon, GoogleIcon } from "@/components/provider-icons";

const initialState: AuthState = {
  message: "",
  sucess: false,
  errors: undefined,
};

export default function SignIn() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const authMessage = getAuthMessage(error);

  const [state, formAction, isPending] = useActionState(
    handleSignIn,
    initialState,
  );

  return (
    <main className="h-screen w-full flex flex-col items-center">
      <section className="flex-1 flex flex-col justify-center space-y-4 px-8">
        <div>
          <h1 className="text-7xl text-white/80">Sign In</h1>
          <p className="mt-1 text-lg text-white/30">
            Continue to share and explore content with other people.
          </p>
        </div>
        <AuthAlert authState={state} authMessage={authMessage} />
        <form className="flex flex-col w-full gap-4" action={formAction}>
          <input type="hidden" name="providerId" value="credentials" />
          <div className="flex flex-col gap-2">
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
          </div>
          <button
            disabled={isPending}
            className="transition hover:bg-white/1 cursor-pointer text-sm w-full border border-white/10 rounded-lg py-2 text-white/80"
          >
            {isPending ? "Loading..." : "Sign In"}
          </button>
          <Link
            href="/sign-up"
            className="bg-linear-to-r from-white/3 via-white/7 to-white/3 bg-size-[200%_auto] bg-position-[0%_center] hover:bg-position-[100%_center] transition-[background-position] duration-500 ease-in-out text-center cursor-pointer text-sm w-full block rounded-lg py-2 text-white/80"
          >
            Create new account
          </Link>
          <Link
            href="/forgot-password"
            className="w-fit text-xs text-white/60 underline"
          >
            Forgot password?
          </Link>
        </form>
        <div className="flex items-center gap-4 select-none">
          <hr className="border-white/10 flex-1" />
          <p className="text-white/30 font-medium text-xs">OR</p>
          <hr className="border-white/10 flex-1" />
        </div>
        <div className="space-y-4 text-white/80">
          <form className="w-full" action={formAction}>
            <input type="hidden" name="providerId" value="google" />
            <button
              className="transition hover:bg-white/1 flex items-center justify-center gap-2 text-sm cursor-pointer w-full border border-white/10 rounded-lg py-2 text-white/80"
              type="submit"
            >
              <GoogleIcon />
              Continue with Google
            </button>
          </form>
          <form className="w-full" action={formAction}>
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
