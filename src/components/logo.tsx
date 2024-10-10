import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
  variant?: "sm" | "default";
}

export default function Logo(props: LogoProps) {
  return (
    <img
      src={
        props.variant && props.variant == "sm"
          ? "/src/assets/abilliti-logo-small.svg"
          : "/Abilliti.svg"
      }
      alt="logo"
      className={cn(props.className, "cursor-pointer max-h-[350px]")}
      onClick={() => {
        window.location.href = "/";
      }}
    />
  );
}
