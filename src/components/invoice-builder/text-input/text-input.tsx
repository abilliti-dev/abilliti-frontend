import { cn } from "@/lib/utils";
import { Input } from "../../ui/input";
import BaseInput, { BaseInputProps } from "../base-input";

export interface TextInputProps extends BaseInputProps {
  placeholder: string;
}

export default function TextInput(props: TextInputProps) {
  return (
    <BaseInput label={props.label} Icon={props.Icon}>
      <Input
        placeholder={props.placeholder}
        className={cn(
          props.Icon && "pl-12",
          "h-16 pt-6 rounded-xl focus-visible:ring-green-secondary focus-visible:ring-[3px] placeholder:text-neutral-400"
        )}
      />
    </BaseInput>
  );
}
