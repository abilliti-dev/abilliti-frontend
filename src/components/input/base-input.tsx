import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BaseInputProps {
  label?: string;
  children?: React.ReactNode;
  placeholder?: string;
  hideBorder?: boolean;
  Icon?: LucideIcon;
}

export default function BaseInput(props: BaseInputProps) {
  return (
    <div className="relative">
      {props.Icon && (
        <props.Icon
          className="text-neutral-500 absolute top-5 left-3.5 pointer-events-none"
          strokeWidth={1.5}
          size={24}
        />
      )}
      <label
        className={cn(
          props.Icon ? "pl-12" : "pl-3",
          "text-neutral-500 uppercase text-xs font-semibold absolute pointer-events-none top-3"
        )}
      >
        {props.label ?? "Prompt"}
      </label>
      <div>{props.children}</div>
    </div>
  );
}
