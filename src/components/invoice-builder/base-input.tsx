import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";

interface BaseInputProps {
  label: string;
  placeholder: string;
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
          "text-neutral-500 uppercase text-sm font-semibold absolute pointer-events-none top-2.5"
        )}
      >
        {props.label}
      </label>
      <Input
        placeholder={props.placeholder}
        className={cn(
          props.Icon && "pl-12",
          "h-16 pt-6 rounded-xl focus-visible:ring-green-secondary focus-visible:ring-[3px] placeholder:text-neutral-400"
        )}
      />
    </div>
  );
}
