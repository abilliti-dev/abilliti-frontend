import InvoicePreview from "./components/invoice-preview";
import GeneralInfo from "./components/section/general-info";
import Stepper from "./components/stepper";

export default function InvoiceBuilderPage() {
  const steps = ["General info", "Items and costs", "Confirmation"];

  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-1 p-10 flex justify-end place-items-center">
        <InvoicePreview />
      </div>
      <div className="col-span-1 p-10 flex justify-start place-items-center">
        <div>
          <Stepper labels={steps} currentStep={1} />
          <GeneralInfo />
        </div>
      </div>
    </div>
  );
}
