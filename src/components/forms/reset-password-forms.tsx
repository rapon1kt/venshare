"use client";

import { resetPasswordAction } from "@/app/actions/auth/reset-password";
import { getFieldErrors } from "@/utils";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { InputWithIcon } from "../input/input";
import { RectangleEllipsis } from "lucide-react";

export default function ResetPasswordForms({ token }: { token: string }) {
  const router = useRouter();

  const [state, formAction, pending] = useActionState(
    resetPasswordAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => {
        router.push("/sign-in");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [state?.success, router]);

  const alertDivColor = state?.success
    ? "bg-green-500/10 border-green-200/10"
    : "bg-red-500/10 border-red-200/10";

  return (
    <form className="flex flex-col w-full gap-4" action={formAction}>
      <div
        hidden={Boolean(!state?.errors)}
        className={`flex flex-col max-w-lg text-start justify-start px-4 py-2 border rounded-md ${alertDivColor}`}
      >
        {state?.errors && (
          <ul>
            {getFieldErrors(state).map(({ field, error }) => (
              <li className="text-red-200/60 text-sm" key={`${field}-${error}`}>
                &bull; {error}
              </li>
            ))}
          </ul>
        )}
      </div>
      {state?.message && (
        <p
          className={`py-4 rounded-sm border text-sm text-start px-4 ${state.success ? "text-green-300/40 bg-green-900/10" : "text-red-400/40 bg-red-900/10"}`}
        >
          {state.message}
        </p>
      )}
      <input type="hidden" name="token" value={token || ""} />
      <div className="flex flex-col gap-1 text-start">
        <label htmlFor="newPassword" className="text-white/70 text-base">
          New Password
        </label>
        <InputWithIcon
          iconStyle={{
            className: "absolute top-2.5 left-3 text-neutral-600",
            size: 16,
          }}
          id="newPassword"
          name="newPassword"
          type="password"
          placeholder="••••••••"
          Icon={RectangleEllipsis}
          style="pl-10 w-full text-sm transition text-white/60 outline outline-white/10 px-2 py-2 rounded-lg focus:outline-2 focus:outline-white/15"
          required
        />
      </div>
      <div className="flex flex-col gap-1 text-start mb-2">
        <label htmlFor="confirmPassword" className="text-white/70 text-base">
          Confirm Password
        </label>
        <input
          name="confirmNewPassword"
          className="w-full transition text-sm text-white/60 outline outline-white/10 px-2 py-2 rounded-lg focus:outline-2 focus:outline-white/15"
          placeholder="Confirm your password"
          type="password"
          required
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="transition hover:bg-white/1 cursor-pointer text-sm w-full border border-white/10 rounded-lg py-2 text-white/80"
      >
        Update password
      </button>
    </form>
  );
}
