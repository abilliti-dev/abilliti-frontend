/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationButton from "@/components/button/pagination-button";
import IconWithTextButton from "@/components/button/icon-with-text-button";
import { ArchiveIcon } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
// import { InvoiceForm } from "@/types/invoice-form";

export interface InvoiceFormSectionProps {
  children?: React.ReactNode;
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  stepAmount: number;
  handleSubmit?: (
    onValid: SubmitHandler<any>,
    onInvalid?: SubmitErrorHandler<any> | undefined
  ) => (e?: React.BaseSyntheticEvent) => Promise<void>;
  saveData: (data: any) => void;
  // setInvoiceForm: Dispatch<SetStateAction<InvoiceForm>>;
}

export default function InvoiceFormSection(props: InvoiceFormSectionProps) {
  const submit = (action: string) => {
    return props.handleSubmit!(
      (data) => {
        props.saveData(data);
        if (action === "next") {
          props.setStep(props.step + 1);
        }
      },
      (errors) => console.log("Error:", errors)
    );
  };

  return (
    <form
      className="rounded-xl border bg-white w-full h-full min-w-[553px] flex flex-col justify-between divide-y"
      onSubmit={props.handleSubmit!(submit(""))}
    >
      {/* content */}
      <div className="p-3">{props.children}</div>

      {/* footer */}
      <div className="flex justify-between px-3 py-2">
        <IconWithTextButton
          type="button"
          Icon={ArchiveIcon}
          variant={"outline"}
          className="font-normal"
        >
          Save as draft
        </IconWithTextButton>
        <PaginationButton
          onClickPrevious={() => props.setStep(props.step - 1)}
          onClickNext={() => submit("next")()}
          disablePrevious={props.step <= 1}
          disableNext={props.step === props.stepAmount}
        />
      </div>
    </form>
  );
}
