import IconButton from "@/components/button/icon-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BellIcon } from "lucide-react";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <main className="h-screen w-full white">
      <nav className="flex items-center justify-between p-4">
        {/* TODO: Replace with current page */}
        <h1 className="text-2xl font-semibold">Page Title</h1>
        <div className="flex items-center gap-x-4">
          <IconButton variant="outline" Icon={BellIcon} />
          <Avatar>
            {/* TODO: Replace with user avatar */}
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />{" "}
            <AvatarFallback>PP</AvatarFallback>
          </Avatar>
        </div>
      </nav>
      <Separator className="bg-slate-300" />
      {props.children}
    </main>
  );
}
