"use client";
import React from "react";
import { Button } from "../ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { User } from "next-auth";
import TooltipComponent from "../TooltipComponenet";

const BottomSidebar = () => {
  const { data: session } = useSession();
  const user: User = session?.user;
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium">{session && user.username}</div>

        <TooltipComponent
          icon={LogOutIcon}
          message="Logout"
          onClick={() => signOut()}
          size="icon"
          variant="default"
        />
      </div>
    </>
  );
};

export default BottomSidebar;
