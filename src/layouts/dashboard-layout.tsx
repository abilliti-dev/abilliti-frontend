import IconButton from "@/components/button/icon-button";
import Logo from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BellIcon, CircleChevronLeft, HelpCircle, HomeIcon, Info, Settings } from "lucide-react";

export interface DashboardLayoutProps {
  children?: React.ReactNode;
}

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <main className="h-screen w-full flex">
      <div className="w-[220px] bg-slate-100 shadow-inner inset-20">
        <div className="h-full flex flex-col">
          <div className="relative">
            <Button
              className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 rounded-full p-1 bg-white text-slate-400 shadow-[-4px_0px_5px_-3px_rgba(0,0,0,0.2)]"
              size="icon"
              variant="ghost"
            >
              <CircleChevronLeft strokeWidth={1.5} />
            </Button>
            <div className="pr-6 pl-4">
              <Logo className="py-5 h-[70px]" />
              <Separator className="bg-slate-300" />
            </div>
          </div>

          <div className="flex flex-col flex-1 px-4 py-6 gap-y-2">
            {[
              { name: "Home", icon: HomeIcon },
              { name: "Finances", icon: HomeIcon },
              { name: "Invoices", icon: HomeIcon },
            ].map((navItem, index) => (
              <Button
                className="flex items-center gap-x-4 justify-start"
                variant="secondary"
                key={index}
              >
                <navItem.icon size={20} strokeWidth={1.5} />
                <p>{navItem.name}</p>
              </Button>
            ))}

            <Separator className="bg-slate-300" />
            {[
              { name: "Settings", icon: Settings },
              { name: "Help", icon: Info },
            ].map((navItem, index) => (
              <Button
                className="flex items-center gap-x-4 justify-start"
                variant="secondary"
                key={index}
              >
                <navItem.icon size={20} strokeWidth={1.5} />
                <p>{navItem.name}</p>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1">
        <nav className="flex items-center justify-between p-4 h-[72px]">
          {/* TODO: Replace with current page */}
          <h1 className="text-2xl font-semibold ml-4">Page Title</h1>
          <div className="flex items-center gap-x-4">
            <IconButton variant="outline" Icon={BellIcon} />
            <Avatar>
              {/* TODO: Change with user initials */}
              <AvatarFallback>US</AvatarFallback>
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
