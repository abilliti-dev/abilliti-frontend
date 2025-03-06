import { forwardRef, memo } from "react";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";

interface TextInputProps extends BaseInputProps {
  value?: string;
  onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = memo(
  forwardRef<HTMLInputElement, TextInputProps>((props, ref) => {
    const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
      if (props.onChange) props.onChange(ev);
    };

    return (
      <BaseInput label={props.label} Icon={props.Icon}>
        <Input
          ref={ref}
          value={props.value}
          onChange={handleInputChange}
          placeholder={props.placeholder ?? "Type here"}
          className={cn(
            props.Icon && "pl-12",
            props.hideBorder ? "border-none" : "border-neutral-300",
            props.rounding ?? "rounded-xl",
            "pt-6 h-full focus-visible:ring-[2.5px] focus-visible:ring-green-secondary focus-visible:ring-offset-0 focus-visible:ring-inset placeholder:text-neutral-400 text-xs"
          )}
        />
      </BaseInput>
    );
  })
);

// necessary for forwardRef
TextInput.displayName = "TextInput";
export default TextInput;
