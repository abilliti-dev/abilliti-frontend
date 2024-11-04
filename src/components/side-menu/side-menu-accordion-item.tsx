import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TMenuPages } from "@/contexts/dashboard-context";
import useDashboardContext from "@/hooks/use-dashboard-context";
import { TMenuPagesMapToTitle } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";

export interface SideMenuAccordionItemProps {
  value: TMenuPages;
  title: string;
  Icon: LucideIcon;
  isMenuOpen: boolean;
  submenu?: TMenuPages[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordionItem(props: SideMenuAccordionItemProps) {
  const { currentPage, setCurrentPage } = useDashboardContext();

  return (
    <>
      {props.isMenuOpen ? (
        <AccordionItem value={props.value} className="border-none">
          <AccordionTrigger
            className={`${
              !props.submenu ? "[&>svg]:hidden" : ""
            } [&[data-state=open]]:bg-gradient-to-r from-green-primary via-green-primary to-gradient-light-green [&[data-state=open]]:text-white px-4 rounded-lg py-2`}
            onClick={() => setCurrentPage(props.value)}
          >
            <div className="flex items-center gap-x-3">
              <props.Icon size={20} strokeWidth={1.5} />
              {props.isMenuOpen && <p>{props.title}</p>}
            </div>
          </AccordionTrigger>
          {props.isMenuOpen && props.submenu && (
            <AccordionContent className="px-4 pb-0">
              <ul className="list-disc pt-1">
                {props.submenu.map((item, index) => (
                  <Button
                    variant="link"
                    size="sm"
                    key={index}
                    className="block"
                    onClick={() => setCurrentPage(item)}
                  >
                    <li
                      className={
                        currentPage === item ? "text-green-primary underline" : "text-neutral-500"
                      }
                    >
                      {TMenuPagesMapToTitle.get(item)}
                    </li>
                  </Button>
                ))}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
      ) : (
        <Button
          variant="secondary"
          className={`${
            currentPage.split("-")[0] === props.value ? "bg-gradient-to-r text-white" : "text-black"
          } from-green-primary via-green-primary to-gradient-light-green p-2 w-full`}
          onClick={() => setCurrentPage(props.value)}
        >
          <props.Icon size={24} strokeWidth={1.5} />
        </Button>
      )}
    </>
  );
}
