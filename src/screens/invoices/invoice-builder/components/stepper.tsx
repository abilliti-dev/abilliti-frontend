import { cn } from "@/lib/utils";

interface StepperProps {
  labels: string[];
  currentStep: number;
}

export default function Stepper(props: StepperProps) {
  return (
    <div className="flex place-items-center justify-between">
      {props.labels.map((label, i) => (
        <div className={cn("flex place-items-center", `${i === 0 ? "w-fit" : "w-full"}`)}>
          {i !== 0 && (
            <div
              className={cn(
                i < props.currentStep ? "bg-green-primary" : "bg-neutral-300",
                "h-[2.5px] w-full"
              )}
            />
          )}
          <button
            key={i}
            className={cn(
              i + 1 === props.currentStep
                ? "bg-neutral-300 ring-inset ring-[3.5px] ring-green-primary text-green-primary"
                : i < props.currentStep
                ? "bg-green-primary text-green-primary"
                : "bg-neutral-300 text-neutral-500",
              "cursor-pointer w-4 h-4 rounded-full relative"
            )}
          >
            <span className="text-sm absolute font-medium text-nowrap top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8">
              {label}
            </span>
          </button>
        </div>
      ))}
    </div>
  );
}
