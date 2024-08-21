export interface SlideBoxProps {
  children?: React.ReactNode;
  stepAmount: number;
  currentStep: number;
}

export default function SlideBox({ children, stepAmount, currentStep }: SlideBoxProps) {
  return (
    <div className="bg-white w-[55%] min-w-[325px] shadow rounded-2xl px-6 py-10 gap-10 flex flex-col">
      {children}
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
    </div>
  );
}
