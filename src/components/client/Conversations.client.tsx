"use client";
import React, { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Skeleton } from "../ui/skeleton";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "../ui/use-toast";

const Conversations = () => {
  const { toast } = useToast();
  const [conversations, setConversations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getConversations = async () => {
    setLoading(true);
    try {
      const response = await axios.get<ApiResponse>(`/api/get-conversations`);
      if (response.data.success) {
        setConversations(response.data.conversations || []);
      }
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      toast({
        title: "Error",
        description: axiosError.response?.data.message ?? "Failed to fetch messages",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getConversations();
  }, []);

  function getInitials(fullName: string) {
    const words = fullName.split(" ");
    console.log("words ::", words);

    const initials = `${words[0][0]}${words[1][0]}`;

    return initials.toUpperCase();
  }

  return loading ? (
    <>
      <div className="flex items-center gap-2 rounded-lg p-2 transition-colors">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-muted" />
          <Skeleton className="h-4 w-[150px] bg-muted" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg p-2 transition-colors">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-muted" />
          <Skeleton className="h-4 w-[150px] bg-muted" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg p-2 transition-colors">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-muted" />
          <Skeleton className="h-4 w-[150px] bg-muted" />
        </div>
      </div>
      <div className="flex items-center gap-2 rounded-lg p-2 transition-colors">
        <Skeleton className="h-12 w-12 rounded-full bg-muted" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-[100px] bg-muted" />
          <Skeleton className="h-4 w-[150px] bg-muted" />
        </div>
      </div>
    </>
  ) : (
    <>
      { conversations.length > 0 ? (
        conversations.map((conversation) => (
          <Link
            key={conversation._id}
            className="flex items-center gap-2 rounded-lg p-2 transition-colors"
            href="#"
          >
            <Avatar className="border w-10 h-10">
              <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
              <AvatarFallback>{getInitials(conversation.user?.fullName)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-0.5">
              <p className="text-sm font-medium leading-none">{conversation.user?.fullName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {conversation.lastMessage?.content}
              </p>
            </div>
          </Link>
        ))
      ) : (
        <span>No messages yet</span>
      )}
    </>
  );
};

export default Conversations;