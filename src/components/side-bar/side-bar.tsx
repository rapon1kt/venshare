"use client";
import Link from "next/link";
import { Home, Library, LogOut, SquarePen, User, Users } from "lucide-react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const links = (name: string) => [
  { name: "Home", href: "/", icon: Home },
  { name: "Profile", href: `/${name}`, icon: User },
  { name: "Library", href: "/library", icon: Library },
];

export default function SideBar({ name }: { name: string }) {
  const path = usePathname();

  const isCurrentPage = (href: string) => href === path;

  return (
    <aside className="flex flex-col justify-between p-8 w-67 h-[94vh] border-r border-white/10">
      <div>
        <Link
          href="/write"
          className="mb-4 text-sm hover:bg-white/10 cursor-pointer bg-white/5 text-white/60 flex w-full gap-2 items-center justify-center py-1.5 rounded-md"
        >
          <SquarePen size={18} />
          Write
        </Link>
        <ul className="space-y-2">
          {links(name).map((link) => (
            <li
              className={`py-1 text-sm rounded-sm cursor-pointer text-white/60`}
              key={link.name}
            >
              <Link
                className={`flex gap-4 items-center ${isCurrentPage(link.href) && "font-semibold text-white"}`}
                href={link.href}
              >
                <link.icon size={18} />
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <hr className="border-white/10 my-4" />
        <div>
          <div className="flex items-center gap-4 text-neutral-300 mb-2">
            <Users size={18} />
            <p className="text-sm">Following</p>
          </div>
          <ul className="space-y-3">
            <li className="text-white/80 text-xs">Gustavo Raponi</li>
            <li className="text-white/80 text-xs">Kaio Kinoshita</li>
            <li className="text-white/80 text-xs">Tales Raponi Silva</li>
            <li className="text-white/80 text-xs">Fernando R. Silva</li>
            <li className="text-white/80 text-xs">Gustavo Raponi</li>
          </ul>
        </div>
      </div>
      <button
        onClick={() => signOut({ redirectTo: "/sign-in" })}
        className="text-sm hover:bg-white/10 cursor-pointer bg-white/5 text-white/60 flex w-full gap-2 items-center justify-center py-2 rounded-md"
      >
        <LogOut size={18} />
        Sign Out
      </button>
    </aside>
  );
}
