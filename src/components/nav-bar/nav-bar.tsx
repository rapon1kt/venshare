import { Bell, Menu, Search, User } from "lucide-react";
import { InputWithIcon } from "../input/input";

export default function NavBar() {
  return (
    <nav className="flex border-b border-white/10 h-[6vh]">
      <div className="w-67 border-r border-white/10 pl-8 py-4 flex items-center gap-4">
        <Menu size={24} />
        <h1 className="text-2xl">venshare</h1>
      </div>
      <div className="flex-1 px-4 flex justify-between items-center">
        <InputWithIcon
          Icon={Search}
          name="search"
          placeholder="Search"
          type="text"
          iconStyle={{
            className: "absolute top-2.25 left-2.5 text-neutral-400",
            size: 18,
          }}
          style="pl-10 w-67 text-sm placeholder-white/60 transition text-white outline-1 outline-white/15 focus:outline-white/30 px-2 py-2 rounded-lg"
        />
        <div className="flex items-center space-x-8">
          <Bell className="cursor-pointer text-white/67" size={18} />
          <User className="cursor-pointer text-white/67" size={18} />
        </div>
      </div>
    </nav>
  );
}
