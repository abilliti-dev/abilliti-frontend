import { cn } from "@/lib/utils";
import BaseInput, { BaseInputProps } from "./base-input";
import { format } from "date-fns";
import { CalendarDaysIcon, ChevronDownIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "../ui/button";

interface DateInputProps extends BaseInputProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
}

export default function DateInput(props: DateInputProps) {
  // const [date, setDate] = useState<Date>();

  const handleSelect = (date?: Date) => {
    // setDate(date);
    if (props.onChange) props.onChange(date);
  };

  return (
    <BaseInput label={props.label ?? "Date"} Icon={CalendarDaysIcon}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            className={cn(
              props.hideBorder ? "border-none" : "border-neutral-300",
              props.rounding ?? "rounded-xl",
              "pl-12 h-full text-xs w-full relative hover:bg-opacity-0"
            )}
            variant={"ghost"}
          >
            <span
              className={cn(
                props.value ? "text-neutral-800" : "text-neutral-400",
                "absolute left-12 bottom-1.5 text-xs"
              )}
            >
              {props.value ? format(props.value, "PPP") : props.placeholder ?? "Select a date"}
            </span>

            <ChevronDownIcon
              className="absolute right-3 bottom-3 text-neutral-500 pointer-events-none"
              strokeWidth={1.5}
              size={20}
            />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" onSelect={handleSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </BaseInput>
  );
}
