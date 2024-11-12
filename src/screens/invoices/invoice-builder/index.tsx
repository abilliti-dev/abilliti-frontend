import { useState } from "react";
import InvoicePreview from "./components/invoice-preview";
import SectionContainer from "./components/section/section-container";
import Stepper from "./components/stepper";
import { sections } from "./data/sections";
import DashboardLayout from "@/layouts/dashboard-layout";
import DashboardContextProvider from "@/contexts/dashboard-context";
import { cn } from "@/lib/utils";

export default function InvoiceBuilderPage() {
  const [step, setStep] = useState<number>(1);

  return (
    <DashboardContextProvider>
      <DashboardLayout>
        <div className="grid grid-cols-2">
          <div className="col-span-1 p-10 flex justify-end place-items-start">
            <InvoicePreview />
          </div>
          <div className="col-span-1 p-10 flex justify-start place-items-start">
            <div className="w-full">
              <Stepper labels={sections.map((sec) => sec.label)} step={step} setStep={setStep} />
              <SectionContainer setStep={setStep} step={step} stepAmount={sections.length}>
                {/* {sections[step as keyof typeof sections].section} */}
                {sections.map((section, i: number) => {
                  return (
                    <div key={i} className={cn(step !== i + 1 && "hidden")}>
                      <section.component />
                    </div>
                  );
                })}
              </SectionContainer>
            </div>
          </div>
        </div>
      </DashboardLayout>
    </DashboardContextProvider>
  );
}
