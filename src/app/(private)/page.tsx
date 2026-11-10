import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function PrivateHome() {
  const session = await auth();

  if (!session?.user?.name) {
    redirect("/sign-in");
  }

  const normalizedName = session.user.name.toLocaleLowerCase().replaceAll(" ", "");
  redirect(`/${normalizedName}`);
}