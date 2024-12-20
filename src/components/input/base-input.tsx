import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BaseInputProps {
  label?: string;
  children?: React.ReactNode;
  placeholder?: string;
  hideBorder?: boolean;
  Icon?: LucideIcon;
  rounding?:
    | "rounded-xl"
    | "rounded-l-xl"
    | "rounded-t-xl"
    | "rounded-r-xl"
    | "rounded-b-xl"
    | "rounded-tl-xl"
    | "rounded-tr-xl"
    | "rounded-br-xl"
    | "rounded-bl-xl"
    | "rounded-none";
}

export default function BaseInput(props: BaseInputProps) {
  return (
    <div className="relative">
      {props.Icon && (
        <props.Icon
          className="text-neutral-400 absolute top-4 left-3.5 pointer-events-none"
          strokeWidth={1.5}
          size={24}
        />
      )}
      <label
        className={cn(
          props.Icon ? "pl-12" : "pl-3",
          "text-neutral-500 uppercase text-xs font-semibold absolute pointer-events-none top-2.5"
        )}
      >
        {props.label ?? "Prompt"}
      </label>
      <div>{props.children}</div>
    </div>
  );
}
