import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import BaseInput, { BaseInputProps } from "./base-input";
import { ImageUpIcon } from "lucide-react";
import { Button } from "../ui/button";
import { forwardRef, useRef, useState, useImperativeHandle } from "react";

interface ImageInputProps extends BaseInputProps {
  onChange?: (file: File | null) => void;
}

interface CustomHTMLInputElement extends HTMLInputElement {
  click: () => void;
}

const ImageInput = forwardRef<CustomHTMLInputElement, ImageInputProps>((props, ref) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // converts the received parent ref into this custom ref
  useImperativeHandle(ref, () => inputRef.current!);

  const handleBrowseClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const file = ev.target.files?.[0];
    setImageFile(file ?? null);
    if (props.onChange) props.onChange(file ?? null);
  };

  const truncateFilename = (filename: string) => {
    const maxLength = 16;
    if (filename.length <= maxLength) return filename;
    const extension = filename.split(".").pop();
    const truncatedName = `${filename.slice(0, maxLength / 2)}...${filename.slice(
      -(maxLength / 2 - (extension?.length || 0))
    )}`;
    return truncatedName;
  };

  return (
    <BaseInput label={props.label ?? "Image Upload"} Icon={props.Icon ?? ImageUpIcon}>
      <Input
        ref={inputRef}
        className="hidden"
        type="file"
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
        <span className="text-xs absolute bottom-2 left-12 pointer-events-none text-neutral-600">
          {imageFile ? truncateFilename(imageFile.name) : props.placeholder ?? ".jpg, .jpeg, .png"}
        </span>
        <Button
          className="z-10 shadow-sm shadow-neutral-300 font-medium text-xs px-4 text-neutral-600"
          variant={"outline"}
          size={"sm"}
          onClick={handleBrowseClick}
          type="button"
        >
          Browse
        </Button>
      </div>
    </BaseInput>
  );
});

ImageInput.displayName = "ImageInput";
export default ImageInput;
