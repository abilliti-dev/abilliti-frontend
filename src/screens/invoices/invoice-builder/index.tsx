import InvoicePreview from "./components/invoice-preview";
import GeneralInfo from "./components/section/general-info";

export default function InvoiceBuilderPage() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="col-span-1 p-10 flex justify-end place-items-center">
        <InvoicePreview />
      </div>
      <div className="col-span-1 p-10 flex justify-start place-items-center">
        <GeneralInfo />
      </div>
    </div>
  );
}
