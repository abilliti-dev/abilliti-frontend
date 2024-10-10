import { Accordion } from "@/components/ui/accordion";
import SideMenuAccordionItem from "./side-menu-accordion-item";
import { Hammer, PiggyBank, ReceiptText } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface SideMenuAccordionProps {
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordion(props: SideMenuAccordionProps) {
  const handleOnClick = () => {
    if (!props.isMenuOpen) {
      props.setIsMenuOpen(true);
    }
  };

  return (
    <Accordion
      type="single"
      collapsible
      className="shadow-none drop-shadow-none border-none space-y-2"
    >
      <SideMenuAccordionItem
        isMenuOpen={props.isMenuOpen}
        setIsMenuOpen={props.setIsMenuOpen}
        value="home"
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
    </Accordion>
  );
}
