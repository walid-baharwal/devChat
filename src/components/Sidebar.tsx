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
import Link from "next/link";
import LogoutButton from "./client/LogoutButton.client";
import Conversations from "./client/Conversations.client";

export default function Sidebar() {
  return (
    <div className="hidden border-r lg:block dark:bg-black/40">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-[60px] items-center border-b px-6">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <MessageCircleIcon className="h-6 w-6" />
            <span className="">Dev Chat</span>
          </Link>
          <Button className="ml-auto h-8 w-8" size="icon">
            <BellIcon className="h-4 w-4" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <form className="px-4">
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />
              <Input className="w-full  pl-8 " placeholder="Search chats..." type="search" />
            </div>
          </form>
          <nav className="grid gap-1 px-2 pt-4 ">
            {/* All conversations */}
            <Conversations />
          </nav>
        </div>
        <div className="mt-auto border-t px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium">John Doe</div>
            <LogoutButton />
          </div>
        </div>
      </div>
    </div>
  );
}
