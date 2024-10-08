import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";
import { ImageUpIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ImageInput(props: BaseInputProps) {
  return (
    <div className="relative">
      <BaseInput label={props.label ?? "Upload"} Icon={ImageUpIcon}>
        <Input
          placeholder={props.placeholder ?? "Accepts .jpg, .jpeg, .png"}
          className={cn(
            "pl-12",
            props.hideBorder && "border-none",
            props.rounding ?? "rounded-xl",
            "h-14 pt-6 focus-visible:ring-[2.5px] focus-visible:ring-green-secondary focus-visible:ring-offset-0 focus-visible:ring-inset placeholder:text-neutral-400 text-xs pointer-events-none"
          )}
        />
        <Button
          className="absolute right-2 top-2.5 z-10 shadow-sm shadow-neutral-300 font-medium text-xs px-4 text-neutral-600"
          variant={"outline"}
          size={"sm"}
        >
          Browse
        </Button>
      </BaseInput>
    </div>
  );
}
