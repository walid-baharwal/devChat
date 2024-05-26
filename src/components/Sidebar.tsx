import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  BellIcon,
  FlipVerticalIcon,
  LogOutIcon,
  MessageCircleIcon,
  PhoneIcon,
  SearchIcon,
  SendIcon,
  VideoIcon,
} from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-[100vh] w-[100%] lg:min-h-[70vh] lg:w-[70%] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-gray-100/40 lg:block dark:bg-gray-800/40">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-[60px] items-center border-b px-6">
            <Link className="flex items-center gap-2 font-semibold" href="#">
              <MessageCircleIcon className="h-6 w-6" />
              <span className="">Chat App</span>
            </Link>
            <Button className="ml-auto h-8 w-8" size="icon" variant="outline">
              <BellIcon className="h-4 w-4" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <form className="px-4">
              <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input
                  className="w-full bg-white shadow-none appearance-none pl-8 dark:bg-gray-950"
                  placeholder="Search chats..."
                  type="search"
                />
              </div>
            </form>
            <nav className="grid gap-2 px-4 pt-4">
              <Link
                className="flex items-center gap-4 rounded-lg bg-gray-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
                href="#"
              >
                <Avatar className="border w-10 h-10">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">John Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    Hey, how's it going?
                  </p>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <Avatar className="border w-10 h-10">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">Jane Doe</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    Sounds good, let's do it!
                  </p>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <Avatar className="border w-10 h-10">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">Bob Smith</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    Attached the file you requested.
                  </p>
                </div>
              </Link>
              <Link
                className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                href="#"
              >
                <Avatar className="border w-10 h-10">
                  <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <p className="text-sm font-medium leading-none">Sarah Lee</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    Let's discuss the project details.
                  </p>
                </div>
              </Link>
            </nav>
          </div>
          <div className="mt-auto border-t px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="text-sm font-medium">John Doe</div>
             <LogoutButton/>
            </div>
          </div>
        </div>
      </div>
      {/* right section */}
      {children}
    </div>
  );
}
