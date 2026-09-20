import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ResetPasswordForms from "@/components/forms/reset-password-forms";
import { redirect } from "next/navigation";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;

  if (!token) {
    redirect("/forgot-password");
  }

  return (
    <div className="h-screen w-full flex flex-col items-center">
      <section className="flex-1 flex items-center">
        <div className="space-y-4 border border-white/10 w-100 p-8 bg-white/1 rounded-sm text-center">
          <Link href="/forgot-password">
            <ArrowLeft className="text-neutral-600" />
          </Link>
          <div className="my-4">
            <h1 className="text-2xl text-white/80 text-start mb-2.5">
              Set new passsword
            </h1>
            <p className="text-white/40 text-sm text-justify">
              Create your new password! It must be at least 8 characters long.
            </p>
          </div>
          <ResetPasswordForms token={token} />
          <Link
            href="/sign-in"
            className="flex justify-center transition hover:bg-white/1 cursor-pointer text-sm w-full underline rounded-lg py-2 text-white/80"
          >
            Cancel
          </Link>
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
