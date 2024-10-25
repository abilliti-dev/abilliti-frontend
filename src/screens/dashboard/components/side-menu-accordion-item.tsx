import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TMenuPages } from "@/contexts/dashboard-context";
import useDashboardContext from "@/hooks/use-dashboard-context";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface SideMenuAccordionItemProps {
  value: TMenuPages;
  title: string;
  icon: LucideIcon;
  isMenuOpen: boolean;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordionItem(props: SideMenuAccordionItemProps) {
  const { currentPage, setCurrentPage } = useDashboardContext();

  const handleOnClick = () => {
    if (!props.isMenuOpen) {
      props.setIsMenuOpen(true);
    }

    setCurrentPage(props.value);
  };

  return (
    <>
      {props.isMenuOpen ? (
        <AccordionItem
          value={props.value}
          className="border-none"
          data-state={currentPage === props.value ? "open" : "closed"}
        >
          <AccordionTrigger
            className={`${
              props.isMenuOpen ? "" : "[&>svg]:hidden"
            } [&[data-state=open]]:bg-gradient-to-r from-green-primary via-green-primary to-gradient-light-green [&[data-state=open]]:text-white px-4 rounded-lg py-2`}
            onClick={handleOnClick}
          >
            <div className="flex items-center gap-x-3 [data-state=open]:bg-blue-200">
              <props.icon size={20} strokeWidth={1.5} />
              {props.isMenuOpen && <p>{props.title}</p>}
            </div>
          </AccordionTrigger>
          {props.isMenuOpen && (
            <AccordionContent
              className="px-4"
              data-state={currentPage === props.value ? "open" : "closed"}
            >
              <ul className="list-disc pt-1">
                <Button variant="link" size="sm">
                  <li className="text-neutral-500">Submenu 1</li>
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
      ) : (
        <Button
          variant="secondary"
          className={`${
            currentPage === props.value ? " bg-gradient-to-r text-white" : "text-black"
          } from-green-primary via-green-primary to-gradient-light-green  p-2 w-full`}
          onClick={handleOnClick}
        >
          <props.icon size={24} strokeWidth={1.5} />
        </Button>
      )}
    </>
  );
}
