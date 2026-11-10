import NavBar from "@/components/nav-bar/nav-bar";
import SideBar from "@/components/side-bar/side-bar";
import { auth } from "@/lib/auth";

export default async function PrivateLayout({ children }: LayoutProps<"/">) {
  const session = await auth();

  const normalizeName = (name: string) =>
    name.toLocaleLowerCase().replaceAll(" ", "");

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="flex flex-row">
        <SideBar name={normalizeName(session?.user.name)} />
        {children}
      </div>
    </div>
  );
}
