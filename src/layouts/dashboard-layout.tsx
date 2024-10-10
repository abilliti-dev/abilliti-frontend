import IconButton from "@/components/button/icon-button";
import Logo from "@/components/logo";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import SideMenu from "@/screens/dashboard/components/side-menu";
import SideMenuAccordion from "@/screens/dashboard/components/side-menu-accordion";
import { BellIcon, CircleChevronLeft, Info, Settings } from "lucide-react";
import { useState } from "react";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <main className="h-screen w-full flex bg-slate-100">
      <SideMenu />

      <div className="flex-1">
        <nav className="flex items-center justify-between p-4 h-[72px]">
          {/* TODO: Replace with current page */}
          <h1 className="text-2xl font-semibold ml-4">Page Title</h1>
          <div className="flex items-center gap-x-4">
            <IconButton variant="outline" Icon={BellIcon} />
            <Avatar>
              {/* TODO: Change with user initials */}
              <AvatarFallback className="bg-green-bg">US</AvatarFallback>
            </Avatar>
          </div>
        </nav>

        <div className="px-4 pl-6">
          <Separator className="bg-slate-300" />
        </div>
        {props.children}
      </div>
    </main>
  );
}
