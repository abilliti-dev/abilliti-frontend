import { useState } from "react";
import InvoicePreview from "./components/invoice-preview";
import SectionContainer from "./components/section/section-container";
import Stepper from "./components/stepper";
import { sections } from "./data/sections";

export default function InvoiceBuilderPage() {
  const [step, setStep] = useState<number>(1);

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-1 p-10 flex justify-end place-items-start">
        <InvoicePreview />
      </div>
      <div className="col-span-1 p-10 flex justify-start place-items-start">
        <div className="w-full">
          <Stepper
            labels={Object.values(sections).map((x) => x.label)}
            step={step}
            setStep={setStep}
          />
          <SectionContainer setStep={setStep} step={step} stepAmount={Object.keys(sections).length}>
            {sections[step as keyof typeof sections].section}
          </SectionContainer>
        </div>
      </div>
    </div>
  );
}
