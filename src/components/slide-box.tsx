export interface SlideBoxProps {
  stepAmount: number;
  currentStep: number;
}

export default function SlideBox({ stepAmount, currentStep }: SlideBoxProps) {
  return (
    <div className="flex flex-row gap-x-4">
      {Array(stepAmount)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className={`h-3 w-[33%] rounded flex-grow ${
              index + 1 === currentStep ? "bg-green-primary" : "bg-gray-light"
            }`}
          />
        ))}
    </div>
  );
}
