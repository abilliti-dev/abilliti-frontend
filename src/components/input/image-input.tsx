import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";
import { ImageUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { useRef, useState } from "react";

export interface ImageInputProps extends BaseInputProps {
  handleFileChange?: (file: File | null) => void;
}

export default function ImageInput(props: ImageInputProps) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleBrowseClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    setImageFile(file ?? null);
    if (props.handleFileChange) props.handleFileChange(file ?? null);
  };

  const truncateFilename = (filename: string) => {
    const maxLength = 16;
    if (filename.length <= maxLength) return filename;
    const extension = filename.split(".").pop(); // Get file extension
    const truncatedName = `${filename.slice(0, maxLength / 2)}...${filename.slice(
      -(maxLength / 2 - (extension?.length || 0))
    )}`;
    return truncatedName;
  };

  return (
    <BaseInput label={props.label ?? "Image Upload"} Icon={props.Icon ?? ImageUpIcon}>
      <Input
        className="hidden"
        type="file"
        ref={inputRef}
        accept=".jpg, .jpeg, .png"
        onChange={handleFileChange}
      />
      <div
        className={cn(
          props.hideBorder ? "border-none" : "border-neutral-300",
          props.rounding ?? "rounded-xl",
          "flex justify-end border h-full place-items-center px-3"
        )}
      >
        <text className="text-xs absolute bottom-2 left-12 pointer-events-none text-neutral-600">
          {imageFile ? truncateFilename(imageFile.name) : props.placeholder ?? ".jpg, .jpeg, .png"}
        </text>
        <Button
          className="z-10 shadow-sm shadow-neutral-300 font-medium text-xs px-4 text-neutral-600"
          variant={"outline"}
          size={"sm"}
          onClick={handleBrowseClick}
        >
          Browse
        </Button>
      </div>
    </BaseInput>
  );
}
