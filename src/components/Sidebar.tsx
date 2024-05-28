import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BellIcon, MessageCircleIcon, SearchIcon, SeparatorVertical } from "lucide-react";
import Link from "next/link";

import Conversations from "./client/Conversations.client";
import BottomSidebar from "./client/BottomSidebar.client";
import SearchUsers from "./client/SearchUsers.client";
import { Separator } from "./ui/separator";

export default function Sidebar() {
  return (
    <div className="hidden border-r lg:block dark:bg-black/70">
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
          <SearchUsers />
          <Separator />
          <nav className="grid gap-1 px-2 pt-4  duration-500">
            {/* All conversations */}
            <Conversations />
          </nav>
        </div>
        <div className="mt-auto border-t px-4 py-4">
          <BottomSidebar />
        </div>
      </div>
    </div>
  );
}
