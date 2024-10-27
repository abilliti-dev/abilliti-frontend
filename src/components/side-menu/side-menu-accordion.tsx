import { Accordion } from "@/components/ui/accordion";
import SideMenuAccordionItem from "@/components/side-menu/side-menu-accordion-item";
import { Hammer, Home, Info, PiggyBank, ReceiptText, Settings } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { Separator } from "@/components/ui/separator";
import useDashboardContext from "@/hooks/use-dashboard-context";

export interface SideMenuAccordionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordion(props: SideMenuAccordionProps) {
  const { currentPage } = useDashboardContext();

  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-none drop-shadow-none border-none space-y-2"
      value={currentPage}
    >
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="home"
        icon={Home}
        title="Home"
        hideSubmenu
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="finances"
        icon={PiggyBank}
        title="Finances"
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="invoices"
        icon={ReceiptText}
        title="Invoices"
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="jobs"
        icon={Hammer}
        title="Jobs"
      />
      <Separator className="bg-slate-300" />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="settings"
        icon={Settings}
        title="Settings"
        hideSubmenu
      />
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="help"
        icon={Info}
        title="Help"
        hideSubmenu
      />
    </Accordion>
  );
}
