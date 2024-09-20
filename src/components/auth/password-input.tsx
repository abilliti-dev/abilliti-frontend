import { EyeIcon, EyeOffIcon } from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PasswordInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(function PasswordInput(
  { className, ...props },
  ref
) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex relative">
      <input
        type={showPassword ? "text" : "password"}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-inherit hover:text-gray-dark"
      >
        {showPassword ? <EyeIcon /> : <EyeOffIcon />}
      </Button>
    </div>
  );
});

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
