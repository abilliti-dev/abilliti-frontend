import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { ClassNameValue } from "tailwind-merge";

interface IconButtonProps extends ButtonProps {
  Icon: LucideIcon;
  iconSize?: number;
  iconStrokeWidth?: number;
  iconClassName?: ClassNameValue;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <Button {...props}>
      <div className="flex space-x-1.5 place-items-center">
        <props.Icon
          size={props.iconSize ?? 20}
          strokeWidth={props.iconStrokeWidth ?? 1.5}
          className={props.iconClassName as string}
        />
        {props.children}
      </div>
    </Button>
  );
}
