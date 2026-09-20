"use client";
import Link from "next/link";
import { useActionState } from "react";
import { ArrowLeft, Mail } from "lucide-react";
import { InputWithIcon } from "@/components/input/input";
import { forgotPasswordAction } from "@/app/actions/auth/forgot-password";

export default function ForgotPassword() {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
    null,
  );

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <section className="flex-1 flex items-center">
        <div className="space-y-4 border border-white/10   w-100 p-8 bg-white/1 rounded-sm text-center">
          <Link href="/sign-in">
            <ArrowLeft className="text-neutral-600" />
          </Link>
          <div className="my-4">
            <h1 className="text-2xl text-white/80 text-start font-medium mb-2.5">
              Forgot Password?
            </h1>
            <p className="text-white/40 text-sm text-justify">
              Enter your email below. If you have a linked account, you will
              receive a recovery code!
            </p>
          </div>
          {state?.message && (
            <p
              className={`py-4 text-start text-sm px-4 rounded-sm border ${state.success ? "text-green-300/40 bg-green-900/10" : "text-red-400/40 bg-red-900/10"}`}
            >
              {state.message}
            </p>
          )}
          <form className="flex flex-col w-full gap-4" action={formAction}>
            <div className="flex flex-col gap-1 text-start mb-2">
              <label className="text-white/70 text-base" htmlFor="email">
                Email
              </label>
              <InputWithIcon
                iconStyle={{
                  className: "absolute top-2.5 left-3 text-neutral-600",
                  size: 16,
                }}
                Icon={Mail}
                type="email"
                name="email"
                placeholder="Enter your email"
                style="pl-10 w-full transition text-sm text-white/60 outline outline-white/10 px-2 py-2 rounded-lg focus:outline-2 focus:outline-white/15"
              />
            </div>
            <button
              disabled={pending}
              className="transition hover:bg-white/1 cursor-pointer text-sm w-full border border-white/10 rounded-lg py-2 text-white/80"
            >
              Reset Password
            </button>
            <Link href="/sign-in" className="text-sm underline text-white/80">
              Back to login
            </Link>
          </form>
        </div>
      </section>
      <footer className="py-4 text-center">
        <p className="text-xs text-white">
          &copy; {new Date().getFullYear()} &bull; venshare
        </p>
      </footer>
    </div>
  );
}
