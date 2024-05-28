"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowBigLeft, FlipVerticalIcon, PhoneIcon, SendIcon, VideoIcon } from "lucide-react";
import TooltipComponent from "@/components/TooltipComponenet";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ApiResponse, Conversation } from "@/types/ApiResponse";
import { Message } from "@/models/Message.model";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { User as UserModel } from "@/models/User.model";
import { User } from "next-auth";
import { Skeleton } from "@/components/ui/skeleton";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { messageSchema } from "@/schemas/messageSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
export default function Chat() {
  const [receiverData, setReceiverData] = useState<UserModel | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [receiverDataLoading, setReceiverDataLoading] = useState(false);
  const [messageLoading, setMessageLoading] = useState(false);
  const params = useParams<{ _id: string }>();
  const router = useRouter();
  const { toast } = useToast();
  const { data: session } = useSession();
  const user: User = session?.user;

  const getMessages = async () => {
    setMessageLoading(true);

    try {
      const response = await axios.get<ApiResponse>(`/api/get-messages/${params._id}`);
      if (response.data.success) {
        setMessages(response.data.messages || []);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setMessageLoading(false);
    }
  };

  const getReceiverData = async () => {
    setReceiverDataLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/get-user/${params._id}`);
      if (response.data.success) {
        setReceiverData(response.data.userData || null);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to fetch receiver data",
        variant: "destructive",
      });
    } finally {
      setReceiverDataLoading(false);
    }
  };

  const form = useForm<z.infer<typeof messageSchema>>({
    resolver: zodResolver(messageSchema),
    defaultValues: {
      content: "",
    },
  });

  const {
    watch,
    formState: { errors },
  } = form;

  const watchContent = watch("content");

  const submit = async (data: z.infer<typeof messageSchema>) => {
    try {
      const response = await axios.post<ApiResponse>(`/api/send-message`, {
        content: data.content,
        receiver: receiverData?._id,
      });
      form.reset({ content: "" });
      if (response.data.success && response.data.singleMessage) {
        setMessages([...messages, response.data.singleMessage]);
      } else {
        toast({
          description: response.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Message sending Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    let isCancelled = false;
    const fetchData = async () => {
      try {
        await Promise.all([getMessages(), getReceiverData()]);
      } catch (error: any) {
        if (!isCancelled) {
          toast({
            title: "Error",
            description: "Failed to fetch data " + error.message,
            variant: "destructive",
          });
        }
      }
    };

    fetchData();

    return () => {
      isCancelled = true;
    };
  }, []);
  
  function getInitials(fullName: string) {
    const words = fullName.split(" ");
    const initials = `${words[0][0]}${words[1][0]}`;
    return initials.toUpperCase();
  }

  return (
    <>
      <div className="flex flex-col">
        <div className="flex h-14 lg:h-[60px] items-center px-4 gap-4 border-b ">
          {!receiverDataLoading ? (
            <div className="flex items-center gap-4">
              <Avatar className="border w-10 h-10">
                <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                <AvatarFallback>
                  {receiverData && getInitials(receiverData?.fullName)}
                </AvatarFallback>
              </Avatar>
              <div className="grid gap-0.5">
                <p className="text-sm font-medium leading-none">{receiverData?.fullName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Online</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 rounded-lg p-2 transition-colors">
              <Skeleton className="h-10 w-10 rounded-full bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-2 w-[100px] bg-muted" />
                <Skeleton className="h-2 w-[50px] bg-muted" />
              </div>
            </div>
          )}
          <div className="ml-auto flex items-center gap-2">
            <TooltipComponent
              icon={PhoneIcon}
              message="Feature Coming Soon"
              size="icon"
              variant="ghost"
            />
            <TooltipComponent
              icon={VideoIcon}
              message="Feature Coming Soon"
              size="icon"
              variant="ghost"
            />
            <TooltipComponent
              icon={FlipVerticalIcon}
              message="Feature Coming Soon"
              size="icon"
              variant="ghost"
            />
            <TooltipComponent
              icon={ArrowBigLeft}
              message="Close Chat"
              size="icon"
              variant="ghost"
              onClick={() => router.replace("/")}
            />
          </div>
        </div>

        {/* chats */}

        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-3">
            {!messageLoading ? (
              session && messages.length > 0 ? (
                messages.map((message) => {
                  if (message.sender.toString() === user._id) {
                    return (
                      <div
                        key={message._id}
                        className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm ml-auto bg-primary text-primary-foreground"
                      >
                        {message?.content}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={message._id}
                        className="flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm bg-muted"
                      >
                        {message?.content}
                      </div>
                    );
                  }
                })
              ) : (
                ""
              )
            ) : (
              <>
                <Skeleton className="h-6 w-[150px] rounded-lg  bg-muted" />
                <Skeleton className="h-10 w-[300px] rounded-lg  bg-muted" />
                <Skeleton className="h-6 w-[150px] rounded-lg ml-auto bg-muted" />
                <Skeleton className="h-10 w-[300px] rounded-lg ml-auto  bg-muted" />
                <Skeleton className="h-6 w-[150px] rounded-lg  bg-muted" />
                <Skeleton className="h-10 w-[300px] rounded-lg  bg-muted" />
              </>
            )}
          </div>
        </div>

        {/* Send Message */}
        <div className="border-t">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(submit)}
              className="flex w-full items-center space-x-2 p-3 py-4"
            >
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input {...field} type="text" className="flex-1" placeholder="Message..." />
                    </FormControl>
                    <FormMessage className="text-red-600 absolute" />
                  </FormItem>
                )}
              />

              <Button size="icon" type="submit" disabled={!watchContent}>
                <span className="sr-only">Send</span>
                <SendIcon className="h-4 w-4" />
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
}
