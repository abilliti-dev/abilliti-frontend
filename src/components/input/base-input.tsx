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
    | "rounded-sm";
}

// Wrapper component to regulate all input types to the passed props
export default function BaseInput(props: BaseInputProps) {
  return (
    <div className="relative">
      {props.Icon && (
        <props.Icon
          className="text-neutral-400 absolute top-3 left-3 pointer-events-none"
          strokeWidth={1.5}
          size={24}
        />
      )}
      <label
        className={cn(
          props.Icon ? "pl-12" : "pl-3",
          "text-neutral-500 uppercase text-xs font-semibold absolute pointer-events-none top-2"
        )}
      >
        {props.label ?? "Prompt"}
      </label>
      <div className="h-12">{props.children}</div>
    </div>
  );
}
