import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";

export default function TextInput(props: BaseInputProps) {
  return (
    <BaseInput label={props.label} Icon={props.Icon}>
      <Input
        placeholder={props.placeholder ?? "Type here"}
        className={cn(
          props.Icon && "pl-12",
          props.hideBorder && "border-none",
          props.rounding ?? "rounded-xl",
          "pt-6 h-full focus-visible:ring-[2.5px] focus-visible:ring-green-secondary focus-visible:ring-offset-0 focus-visible:ring-inset placeholder:text-neutral-400 text-xs"
        )}
      />
    </BaseInput>
  );
}
