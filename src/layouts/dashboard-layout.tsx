import IconButton from "@/components/button/icon-button";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { parseJwt } from "@/lib/utils";
import SideMenu from "@/screens/dashboard/components/side-menu";
import { BellIcon } from "lucide-react";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const getUserInitials = (jwt: unknown) => {
    if (jwt === null || typeof jwt !== "object") {
      return "A";
    }

    let initials = "";
    if ("given_name" in jwt && "family_name" in jwt) {
      if (typeof jwt.given_name === "string") {
        initials += jwt.given_name.charAt(0);
      }
      if (typeof jwt.family_name === "string") {
        initials += jwt.family_name.charAt(0);
      }
    }

    return initials.length > 0 ? initials : "A";
  };

  return (
    <main className="h-screen w-full flex bg-neutral-50">
      <SideMenu />
      <Separator className="bg-slate-300 absolute top-[71px]" />

      <div className="flex-1">
        <nav className="flex items-center justify-between p-4 h-[72px]">
          {/* TODO: Replace with current page */}
          <h1 className="text-2xl font-semibold ml-4">Page Title</h1>
          <div className="flex items-center gap-x-4">
            <IconButton variant="outline" Icon={BellIcon} />
            <Avatar>
              <AvatarFallback className="bg-green-bg">
                {getUserInitials(parseJwt(sessionStorage.idToken))}
              </AvatarFallback>
            </Avatar>
          </div>
        </nav>
        {props.children}
      </div>
    </main>
  );
}
