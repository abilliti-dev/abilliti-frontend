import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "../ui/button";
import { ClassNameValue } from "tailwind-merge";

interface IconWithTextButtonProps extends ButtonProps {
  Icon: LucideIcon;
  iconSize?: number;
  iconStrokeWidth?: number;
  iconClassName?: ClassNameValue;
}

export default function IconWithTextButton(props: IconWithTextButtonProps) {
  return (
    <Button {...props}>
      <div className="flex space-x-1.5 place-items-center">
        <props.Icon
          size={props.iconSize ?? 20}
          strokeWidth={props.iconStrokeWidth ?? 1.5}
          className={props.iconClassName as string}
        />
        <div>{props.children}</div>
      </div>
    </Button>
  );
}
