"use client";
import React from "react";
import { HyperText } from "./magicui/hyper-text";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const router = useRouter();
  const user = useUser();
  const pathName = usePathname();
  return (
    
    <div className="bg-blue-200 border border-b-1 w-full h-[10%] px-3 py-2 flex flex-row justify-between">
      <div>
        <HyperText className="text-4xl font-bold ml-2 text-blue-500 cursor-pointer">
          PINGUARD
        </HyperText>
      </div>
      <div className="flex flex-row mr-3 py-2">
        {!user.isSignedIn && (
          <Button
            onClick={() => router.push("/signup")}
            className="text-xl font-semibold"
          >
            Get Started
          </Button>
        )}

        {user.isSignedIn && pathName !== "/dashboard" && (
          <Button
            onClick={() => router.push("/dashboard")}
            className="text-xl font-semibold"
          >
            Dashboard
          </Button>
        )}

        {pathName === "/dashboard" && <UserButton />}
      </div>
    </div>
  );
};

export default Navbar;
