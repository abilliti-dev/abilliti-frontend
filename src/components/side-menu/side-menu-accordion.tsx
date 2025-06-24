import { Accordion } from "@/components/ui/accordion";
import SideMenuAccordionItem from "@/components/side-menu/side-menu-accordion-item";
import { Hammer, Home, Info, PiggyBank, ReceiptText, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import { TMenuPages } from "@/contexts/dashboard-context";
import { useSessionStorage } from "usehooks-ts";

export interface SideMenuAccordionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordion(props: SideMenuAccordionProps) {
  const [currentPage] = useSessionStorage<TMenuPages>("currentPage", "home");

  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-none drop-shadow-none border-none space-y-2"
      value={currentPage.split("-")[0]}
    >
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="home"
        Icon={Home}
        title="Home"
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="finances"
        Icon={PiggyBank}
        title="Finances"
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="invoices"
        Icon={ReceiptText}
        title="Invoices"
        submenu={["invoice-builder"]}
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="jobs"
        Icon={Hammer}
        title="Jobs"
      />
      <Separator className="bg-slate-300" />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="settings"
        Icon={Settings}
        title="Settings"
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="help"
        Icon={Info}
        title="Help"
      />
    </Accordion>
  );
}
