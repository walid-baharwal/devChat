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

export default function Chat() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <div className="flex items-center gap-4">
            <Avatar className="border w-10 h-10">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">John Doe</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button className="rounded-full" size="icon" variant="ghost">
              <PhoneIcon className="h-4 w-4" />
              <span className="sr-only">Call</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <VideoIcon className="h-4 w-4" />
              <span className="sr-only">Video call</span>
            </Button>
            <Button className="rounded-full" size="icon" variant="ghost">
              <FlipVerticalIcon className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800">
              <p>Hey, how's it going?</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">You - 2:30 PM</p>
            </div>
            <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
              <p>I'm doing great, thanks for asking!</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">John - 2:31 PM</p>
            </div>
            <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm bg-gray-100 dark:bg-gray-800">
              <p>Awesome, let's catch up soon.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">You - 2:32 PM</p>
            </div>
            <div className="flex w-max max-w-[65%] flex-col gap-2 rounded-full px-4 py-2 text-sm ml-auto bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900">
              <p>Sounds good, I'm free this weekend.</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">John - 2:33 PM</p>
            </div>
          </div>
        </div>
        <div className="border-t">
          <form className="flex w-full items-center space-x-2 p-3">
            <Input
              autoComplete="off"
              className="flex-1"
              id="message"
              placeholder="Type your message..."
            />
            <Button size="icon" type="submit">
              <span className="sr-only">Send</span>
              <SendIcon className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
