import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TMenuPages } from "@/contexts/dashboard-context";
import { LucideIcon } from "lucide-react";

export interface SideMenuAccordionItemProps {
  value: TMenuPages;
  title: string;
  icon: LucideIcon;
  isMenuOpen: boolean;
}

export default function SideMenuAccordionItem(props: SideMenuAccordionItemProps) {
  return (
    <AccordionItem value={props.value} className="border-none">
      <AccordionTrigger
        className={`${
          props.isMenuOpen ? "" : "[&>svg]:hidden"
        } [&[data-state=open]]:bg-gradient-to-r from-green-primary via-green-primary to-gradient-light-green [&[data-state=open]]:text-white px-4 rounded-lg py-2`}
      >
        <div className="flex items-center gap-x-3 [data-state=open]:bg-blue-200">
          <props.icon size={20} strokeWidth={1.5} />
          {props.isMenuOpen && <p>{props.title}</p>}
        </div>
      </AccordionTrigger>
      {props.isMenuOpen && (
        <AccordionContent className="px-4">
          <ul className="list-disc pt-1 text-slate-600">
            <Button variant="link" size="sm">
              <li>Submenu 1</li>
            </Button>
            <Button variant="link" size="sm">
              <li>Submenu 1</li>
            </Button>
            <Button variant="link" size="sm">
              <li>Submenu 1</li>
            </Button>
          </ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
