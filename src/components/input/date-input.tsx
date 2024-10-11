import { cn } from "@/lib/utils";
import BaseInput, { BaseInputProps } from "./base-input";
import { format } from "date-fns";
import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";

export default function DateInput(props: BaseInputProps) {
  const [date, setDate] = useState<Date>();

  return (
    <BaseInput label={props.label ?? "Date"} Icon={CalendarDaysIcon}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              props.hideBorder && "border-none",
              props.rounding ?? "rounded-xl",
              "pl-12 h-12 text-xs w-full relative hover:bg-opacity-0"
            )}
            variant={"ghost"}
          >
            <text
              className={cn(
                date ? "text-neutral-800" : "text-neutral-400",
                "absolute left-12 bottom-1.5 text-xs"
              )}
            >
              {date ? format(date, "PPP") : props.placeholder ?? "Select a date"}
            </text>

            <ChevronDownIcon
              className="absolute right-3 bottom-3 text-neutral-500 pointer-events-none"
              strokeWidth={1.5}
              size={20}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </BaseInput>
  );
}
