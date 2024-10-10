import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import SideMenuAccordion from "@/screens/dashboard/components/side-menu-accordion";
import { useState } from "react";

export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  return (
    <div
      className={`${
        isMenuOpen ? "w-[220px]" : "w-[80px]"
      } bg-gray-light shadow-inner inset-20 transition-all duration-300`}
    >
      <div className="h-full flex flex-col">
        <div className="relative">
          <Button
            className="absolute right-0 bottom-0 translate-x-1/2 translate-y-1/2 rounded-full p-1 bg-white text-slate-400 shadow-[-4px_0px_5px_-3px_rgba(0,0,0,0.2)]"
            size="icon"
            variant="ghost"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <CircleChevronLeft strokeWidth={1.5} />
            ) : (
              <CircleChevronRight strokeWidth={1.5} />
            )}
          </Button>
          <div className="pr-6 pl-4">
            <Logo variant={isMenuOpen ? "default" : "sm"} className="py-5 h-[70px]" />
            <Separator className="bg-slate-300" />
          </div>
        </div>

        <div className="flex flex-col flex-1 px-4 py-6 gap-y-2">
          <SideMenuAccordion {...{ isMenuOpen, setIsMenuOpen }} />
          <Separator className="bg-slate-300" />
        </div>
      </div>
    </div>
  );
}
