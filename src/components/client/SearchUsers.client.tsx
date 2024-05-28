"use client";
import { SearchIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { useDebounceCallback } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { ApiResponse } from "@/types/ApiResponse";
import axios from "axios";
import { useToast } from "../ui/use-toast";
import { User } from "@/models/User.model";
import { Skeleton } from "../ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";

const SearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [isSearchingUser, setIsSearchingUser] = useState(false);
  const debounceName = useDebounceCallback(setName, 400);
  const { toast } = useToast();

  const form = useForm({
    defaultValues: {
      name: "",
    },
  });
  useEffect(() => {
    const findUsers = async () => {
      if (name) {
        setIsSearchingUser(true);
        try {
          const response = await axios.get<ApiResponse>(`/api/get-users/${name}`);
          if (response.data.success && response.data.users) {
            setUsers(response.data.users || []);
            console.log(response.data.users);
          }
        } catch (error: any) {
          toast({
            title: "Searching Users",
            description: error.message,
            variant: "destructive",
          });
        } finally {
          setIsSearchingUser(false);
        }
      }
      if (name === "") {
        setUsers([]);
      }
    };
    findUsers();
  }, [name]);

  function getInitials(fullName: string): string {
    const words = fullName.split(" ");
    let initials = "";
    for (const word of words) {
      if (word.length > 0) {
        initials += word[0].toUpperCase();
      }
    }
    return initials;
  }

  return (
    <>
      <Form {...form}>
        <form className="px-4 ">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4" />

                    <Input
                      className="w-full  pl-8 "
                      placeholder="Search users..."
                      type="search"
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        debounceName(e.target.value);
                      }}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <nav className="grid gap-1 px-2 pt-4 pb-1 ">
        {isSearchingUser ? (
          [...Array(1)].map((_, idx) => (
            <div key={idx} className="flex items-center gap-2 rounded-lg p-2 transition-colors">
              <Skeleton className="h-12 w-12 rounded-full bg-muted" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[100px] bg-muted" />
                <Skeleton className="h-4 w-[150px] bg-muted" />
              </div>
            </div>
          ))
        ) : (
          <>
            {users.length > 0 ? (
              users?.map((user) => (
                <Link
                  key={user._id}
                  className="flex items-center gap-2 rounded-lg p-2 transition-colors"
                  href={`/chat/${user._id}`}
                >
                  <Avatar className="border w-10 h-10">
                    <AvatarImage alt="User Avatar" src="/placeholder-user.jpg" />
                    <AvatarFallback>{user && getInitials(user.fullName)}</AvatarFallback>
                  </Avatar>
                  <div
                    className="grid gap-0.5"
                    onClick={() => {
                      setUsers([]);
                      form.reset({ name: "" });
                    }}
                  >
                    <p className="text-sm font-medium leading-none">{user?.fullName}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                {`@${user.username}`}
              </p>
                  </div>
                </Link>
              ))
            ) : (
              <span className="text-sm px-4 pb-2">
                {name.length > 0 && users.length > 1 &&  "No user with this name found"}
              </span>
            )}
          </>
        )}
      </nav>
    </>
  );
};

export default SearchUsers;
