"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { SignOutButton } from "@clerk/nextjs";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  return (
    <Sidebar className="bg-blue-100" collapsible="icon" {...props}>
      <SidebarHeader>
        <Button
          onClick={() => router.push("/")}
          className="text-3xl font-bold "
        >
          PINGUARD
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="flex justify-center gap-y-3 mt-3">
          <SidebarGroupLabel className="flex justify-center">
            <Button
              onClick={() => router.push("/dashboard")}
              className="text-xl font-semibold bg-transparent"
            >
              Dashboard
            </Button>
          </SidebarGroupLabel>
          <SidebarGroupLabel className="flex justify-center mt-3">
            <Button
              onClick={() => router.push("/dashboard/addWebsite")}
              className="text-xl font-semibold bg-transparent"
            >
              Add Website
            </Button>
          </SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex justify-center">
          <SignOutButton redirectUrl="/">
            <Button className="font-semibold text-xl bg-blue-200">
              Logout
            </Button>
          </SignOutButton>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
