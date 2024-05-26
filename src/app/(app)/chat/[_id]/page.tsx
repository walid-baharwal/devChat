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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function Chat() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex h-14 lg:h-[60px] items-center px-4 gap-4 border-b ">
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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button  className="rounded-lg" size="icon" variant="ghost">
                    <PhoneIcon className="h-4 w-4" />
                    <span className="sr-only">Call</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feature Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button disabled className="rounded-lg" size="icon" variant="ghost">
                    <VideoIcon className="h-4 w-4" />
                    <span className="sr-only">Video call</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feature Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button  className="rounded-lg " size="icon" variant="ghost">
                    <FlipVerticalIcon className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Feature Coming Soon</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* chats */}
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              Hi, how can I help you today?
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
              Hey, Im having trouble with my account.
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted">
              What seems to be the problem?
            </div>
            <div className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground">
              I cant log in.
            </div>
          </div>
        </div>
        <div className="border-t">
          <form className="flex w-full items-center space-x-2 p-3 py-4">
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
