import { LucideIcon, TextIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface DescriptionInputProps {
  placeholder?: string;
  label?: string;
  Icon?: LucideIcon;
  maxCharacterLength?: number;
  onChange?: (input: string) => void;
  error?: boolean;
}

export default function DescriptionInput(props: DescriptionInputProps) {
  const iconProps = {
    className: "text-neutral-400 absolute top-3 left-3 pointer-events-none",
    strokeWidth: 1.5,
    size: 24,
  };
  const maxCharacterLength = props.maxCharacterLength ?? 100;
  const [input, setInput] = useState("");

  const handleChange = (ev: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(ev.target.value);
    if (props.onChange) props.onChange(ev.target.value);
  };

  return (
    <div className="relative w-full h-full">
      {props.Icon ? <props.Icon {...iconProps} /> : <TextIcon {...iconProps} />}
      <label className="ml-10 text-neutral-500 uppercase text-xs font-semibold absolute pointer-events-none top-1 px-2 py-1 rounded-full backdrop-blur-md">
        {props.label ?? "Description"}
      </label>
      <Textarea
        onChange={handleChange}
        maxLength={maxCharacterLength}
        placeholder={props.placeholder ?? "Type here"}
        className={cn(
          props.error
            ? "ring-[2.5px] ring-red-300 focus-visible:ring-[2.5px] focus-visible:ring-red-300 ring-inset"
            : "focus-visible:ring-[2.5px] focus-visible:ring-green-secondary focus-visible:ring-inset",
          "rounded-xl pl-12 pt-6 placeholder:text-neutral-400 text-xs min-h-24 resize-none border-neutral-300 h-full focus-visible:ring-offset-0"
        )}
      />
      <div className="px-2 py-1 rounded-full backdrop-blur-md absolute bottom-2 right-2 flex justify-center place-items-center pointer-events-none">
        <span className="text-xs text-neutral-500">{`${input.length}/${maxCharacterLength}`}</span>
      </div>
    </div>
  );
}
