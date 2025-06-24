import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { parseJwt } from "@/lib/utils";
import SideMenu from "@/components/side-menu/side-menu";
import { BellIcon } from "lucide-react";
import { TMenuPagesMapToTitle } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { TMenuPages } from "@/contexts/dashboard-context";
import { useSessionStorage } from "usehooks-ts";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  const [currentPage] = useSessionStorage<TMenuPages>("currentPage", "home");

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
          <h1 className="text-2xl font-semibold ml-4">{TMenuPagesMapToTitle.get(currentPage)}</h1>
          <div className="flex items-center gap-x-4">
            <Button size="icon" variant="outline">
              <BellIcon />
            </Button>
            <Avatar>
              <AvatarFallback className="bg-green-bg">
                {getUserInitials(parseJwt(sessionStorage.idToken))}
              </AvatarFallback>
            </Avatar>
          </div>
        </nav>
        <div className="p-5">{props.children}</div>
      </div>
    </main>
  );
}
