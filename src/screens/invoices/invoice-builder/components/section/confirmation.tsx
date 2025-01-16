import IconWithTextButton from "@/components/button/icon-with-text-button";
import { CheckIcon, ExternalLinkIcon, PlusCircleIcon } from "lucide-react";
import { InvoiceFormSectionProps } from "../invoice-form-section";

export default function Confirmation(props: InvoiceFormSectionProps) {
  return (
    <div className="bg-green-400/50 rounded-xl space-y-8 relative">
      <div className="bg-white w-20 h-20 rounded-full absolute top-0 transform -translate-y-1/2 mx-auto inset-0 flex justify-center place-items-center">
        <div className="w-16 h-16 rounded-full bg-green-400/50 flex justify-center place-items-center">
          <CheckIcon className="text-white" strokeWidth={3} size={40} />
        </div>
      </div>

      <h1 className="text-center font-medium text-3xl pt-12 text-green-900">
        {"You're all setup!"}
      </h1>
      <div className="flex justify-between px-10 font-medium">
        <div className="text-center w-40 text-green-900">
          <h2 className="text-2xl">3 items</h2>
          <span>Total items</span>
        </div>
        <div className="text-center w-40 text-green-900">
          <h2 className="text-2xl">$327.90</h2>
          <span>Total cost</span>
        </div>
        <div className="text-center w-40 text-green-900">
          <h2 className="text-2xl">12-21-2024</h2>
          <span>Due date</span>
        </div>
      </div>
      <h3 className="flex justify-center w-full">
        <span className="text-center text-green-900 font-medium text-lg w-2/5">
          Confirm that every detail is correct by reviewing the invoice preview
        </span>
      </h3>

      <div className="flex space-x-2 px-3 pb-3">
        <IconWithTextButton
          Icon={ExternalLinkIcon}
          iconSize={24}
          iconStrokeWidth={2}
          iconClassName="text-neutral-600"
          variant={"outline"}
          size={"lg"}
          className="w-full bg-white text-neutral-600 text-lg font-normal"
        >
          Open preview
        </IconWithTextButton>
        <IconWithTextButton
          Icon={PlusCircleIcon}
          iconSize={24}
          iconStrokeWidth={2}
          size={"lg"}
          className="w-full bg-neutral-700 text-lg font-normal"
        >
          Create invoice
        </IconWithTextButton>
      </div>
    </div>
  );
}
