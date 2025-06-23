import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import SideMenuAccordion from "@/components/side-menu/side-menu-accordion";
import { useLocalStorage } from "usehooks-ts";

export default function SideMenu() {
  const [isMenuOpen, setIsMenuOpen] = useLocalStorage<boolean>("isMenuOpen", true);

  return (
    <div
      className={`${
        isMenuOpen ? "w-[220px]" : "w-[80px]"
      } bg-gray-light shadow-inner inset-20 transition-all duration-300`}
    >
      <div className="h-full flex flex-col">
        <div className="relative">
          <Button
            className="absolute right-0 bottom-0 z-10 translate-x-1/2 translate-y-1/2 rounded-full p-1 bg-neutral-50 text-slate-400 shadow-[-4px_0px_5px_-3px_rgba(0,0,0,0.2)]"
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
          <div className="flex flex-col items-center justify-center">
            <Logo
              variant={isMenuOpen ? "default" : "sm"}
              className="py-5 h-[70px] transform translate-x-[5px]"
            />
          </div>
        </div>

        <div className="flex flex-col flex-1 px-4 py-6 gap-y-2">
          <SideMenuAccordion {...{ isMenuOpen, setIsMenuOpen }} />
        </div>
      </div>
    </div>
  );
}
