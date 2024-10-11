import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";
import { ImageUpIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ImageInput(props: BaseInputProps) {
  return (
    <BaseInput label={props.label ?? "Upload"} Icon={ImageUpIcon}>
      <Input
        className={cn(props.hideBorder && "border-none", props.rounding ?? "rounded-xl", "hidden")}
        type="file"
      />
      <div
        className={cn(
          props.hideBorder ? "border-none" : "border",
          props.rounding ?? "rounded-xl",
          "flex justify-end border h-full place-items-center px-3"
        )}
      >
        <text className="text-xs absolute bottom-2 left-12 pointer-events-none text-neutral-600">
          {props.placeholder ?? ".jpg, .jpeg, .png"}
        </text>
        <Button
          className="z-10 shadow-sm shadow-neutral-300 font-medium text-xs px-4 text-neutral-600"
          variant={"outline"}
          size={"sm"}
        >
          Browse
        </Button>
      </div>
    </BaseInput>
  );
}
