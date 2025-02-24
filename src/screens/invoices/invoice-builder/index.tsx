import { useState } from "react";
import { sections } from "./data/sections";
import DashboardLayout from "@/layouts/dashboard-layout";
import DashboardContextProvider from "@/contexts/dashboard-context";
import { defaultInvoiceForm, InvoiceForm } from "@/types/invoice-form";
import InvoicePreview from "./components/invoice-preview";
import { cn } from "@/lib/utils";

export default function InvoiceBuilderPage() {
  const [step, setStep] = useState<number>(1);
  const [invoiceForm, setInvoiceForm] = useState<InvoiceForm>(defaultInvoiceForm);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const saveData = (formData: any) => {
    if (formData) {
      if (step === 1) {
        setInvoiceForm((prevForm) => (prevForm["general"] = formData));
      } else if (step === 2) {
        setInvoiceForm((prevForm) => (prevForm["company"] = formData));
      } else if (step === 3) {
        setInvoiceForm((prevForm) => (prevForm["client"] = formData));
      } else if (step === 4) {
        setInvoiceForm((prevForm) => (prevForm["itemsAndCosts"] = formData));
      } else {
        console.log("Unhandled section");
      }
    } else {
      console.log("Error: Missing form data");
    }

    console.log("invoice form:", invoiceForm);
  };
  return (
    <DashboardContextProvider>
      <DashboardLayout>
        <button onClick={() => setStep(4)}>dev override (items-costs-section)</button>

        <div className="grid grid-cols-2">
          <div className="col-span-1 p-10 flex justify-end place-items-start">
            <InvoicePreview />
          </div>
          <div className="col-span-1 p-10 flex justify-start place-items-start">
            {sections.map((section, i: number) => {
              return (
                <div key={i} className={cn(step !== i + 1 && "hidden")}>
                  <section.component
                    saveData={saveData}
                    setStep={setStep}
                    step={step}
                    stepAmount={sections.length}
                    invoiceForm={invoiceForm}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </DashboardLayout>
    </DashboardContextProvider>
  );
}
