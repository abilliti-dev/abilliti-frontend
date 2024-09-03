import { cn } from "@/lib/utils";

export interface LogoProps {
  className?: string;
}

export default function Logo(props: LogoProps) {
  return (
    <img
      src="/Abilliti.svg"
      alt="logo"
      className={cn(props.className, "cursor-pointer max-h-[350px]")}
      onClick={() => {
        window.location.href = "/";
      }}
    />
  );
}
