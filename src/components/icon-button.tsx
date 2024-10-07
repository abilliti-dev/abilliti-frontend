import { LucideIcon } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";

interface IconButtonProps extends ButtonProps {
  Icon: LucideIcon;
  iconSize?: number;
  iconStrokeWidth?: number;
}

export default function IconButton(props: IconButtonProps) {
  return (
    <Button className="flex space-x-1.5 place-items-center" {...props}>
      <props.Icon size={props.iconSize ?? 20} strokeWidth={props.iconStrokeWidth ?? 1.5} />
      <div>{props.children}</div>
    </Button>
  );
}
