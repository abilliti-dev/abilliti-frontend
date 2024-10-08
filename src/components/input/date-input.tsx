import { cn } from "@/lib/utils";
// import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function DateInput(props: BaseInputProps) {
  const [date, setDate] = useState<Date>();

  return (
    <BaseInput label={props.label} Icon={CalendarIcon}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "pl-12",
              props.hideBorder && "border-none",
              props.rounding ?? "rounded-xl",
              "h-14 pt-6 focus-visible:ring-[2.5px] focus-visible:ring-green-secondary focus-visible:ring-offset-0 focus-visible:ring-inset placeholder:text-neutral-400 text-xs w-full"
            )}
          >
            <text
              className={cn(
                date ? "text-neutral-800" : "text-neutral-400",
                "absolute left-12 text-xs"
              )}
            >
              {date ? format(date, "PPP") : props.placeholder ?? "Select a date"}
            </text>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </BaseInput>
  );
}
