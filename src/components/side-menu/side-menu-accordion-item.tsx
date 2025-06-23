import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { TMenuPages } from "@/contexts/dashboard-context";
import { TMenuPagesMapToTitle } from "@/lib/constants";
import { LucideIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";

export interface SideMenuAccordionItemProps {
  value: TMenuPages;
  title: string;
  Icon: LucideIcon;
  isMenuOpen: boolean;
  submenu?: TMenuPages[];
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
}

export default function SideMenuAccordionItem(props: SideMenuAccordionItemProps) {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useLocalStorage<TMenuPages>("currentPage", "home");

  const handlePrimaryPageChange = () => {
    if (!props.submenu) {
      // No submenu? Navigate immediately.
      setCurrentPage(props.value);
      navigate("/" + props.value);
    } else {
      // Has submenu? Delay navigation to let animation play.
      setCurrentPage(props.value);
      setTimeout(() => {
        navigate("/" + props.value);
      }, 200);
    }
  };
  const handleSecondaryPageChange = (item: string) => {
    navigate(item);
  };

  return (
    <>
      {props.isMenuOpen ? (
        <AccordionItem value={props.value} className="border-none">
          <AccordionTrigger
            className={`${
              !props.submenu ? "[&>svg]:hidden" : ""
            } [&[data-state=open]]:bg-gradient-to-r from-green-primary via-green-primary to-gradient-light-green [&[data-state=open]]:text-white px-4 rounded-lg py-2`}
            onClick={handlePrimaryPageChange}
          >
            <div className="flex items-center gap-x-3">
              <props.Icon size={20} strokeWidth={1.5} />
              <p>{props.title}</p>
            </div>
          </AccordionTrigger>
          {props.submenu && (
            <AccordionContent className="px-4 pb-0">
              <ul className="list-disc pt-1">
                {props.submenu.map((item, index) => {
                  const basePage = item.split("/")[0] as TMenuPages;
                  const isActive = currentPage === basePage;

                  return (
                    <Button
                      variant="link"
                      size="sm"
                      key={index}
                      className="block"
                      onClick={() => handleSecondaryPageChange(item)}
                    >
                      <li
                        className={isActive ? "text-green-primary underline" : "text-neutral-500"}
                      >
                        {TMenuPagesMapToTitle.get(item)}
                      </li>
                    </Button>
                  );
                })}
              </ul>
            </AccordionContent>
          )}
        </AccordionItem>
      ) : (
        <Button
          variant="secondary"
          className={`${
            currentPage === props.value ? "bg-gradient-to-r text-white" : "text-black"
          } from-green-primary via-green-primary to-gradient-light-green p-2 w-full`}
          onClick={handlePrimaryPageChange}
        >
          <props.Icon size={24} strokeWidth={1.5} />
        </Button>
      )}
    </>
  );
}
