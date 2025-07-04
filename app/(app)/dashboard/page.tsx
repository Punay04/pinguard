import Navbar from "@/components/navbar";
import { AppSidebar } from "@/components/sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const Page = () => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
         
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
};

export default Page;
