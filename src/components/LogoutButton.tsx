"use client";
import React from "react";
import { Button } from "./ui/button";
import { LogOutIcon } from "lucide-react";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <>
      <Button className="rounded-full" size="icon" variant="outline" onClick={() => signOut()}>
        <LogOutIcon className="h-4 w-4" />
        <span className="sr-only">Logout</span>
      </Button>
    </>
  );
};

export default LogoutButton;
