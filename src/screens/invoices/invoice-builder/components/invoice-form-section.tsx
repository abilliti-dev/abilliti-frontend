"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationButton from "@/components/button/pagination-button";
import IconWithTextButton from "@/components/button/icon-with-text-button";
import { ArchiveIcon, EyeIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { sections } from "../data/sections";
import Stepper from "./stepper";
import { InvoiceForm } from "@/types/invoice-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";

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
  invoiceForm: InvoiceForm;
}

export default function InvoiceFormSection(props: InvoiceFormSectionProps) {
  const [previewIsOpen, setPreviewIsOpen] = useState(false);

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
    <>
      <form
        className="space-y-4"
        onSubmit={props.handleSubmit ? props.handleSubmit(submit("")) : undefined}
      >
        {/* header-stepper */}
        <Stepper
          handleSubmit={props.handleSubmit}
          saveData={props.saveData}
          labels={sections.map((sec) => sec.label)}
          step={props.step}
          setStep={props.setStep}
        />

        <div className="rounded-xl border bg-white h-full w-[500px] flex flex-col justify-between divide-y">
          {/* content */}
          <div className="p-3">{props.children}</div>

          {/* footer */}
          <div className="flex justify-between px-3 py-2">
            <div className="flex space-x-1.5">
              <IconWithTextButton
                type="button"
                Icon={ArchiveIcon}
                variant="outline"
                className="font-normal"
              >
                Save as draft
              </IconWithTextButton>
              <div className="lg:hidden block">
                <IconWithTextButton
                  type="button"
                  Icon={EyeIcon}
                  variant="outline"
                  className="font-normal"
                  onClick={() => setPreviewIsOpen(true)}
                >
                  Open preview
                </IconWithTextButton>
              </div>
            </div>
            <PaginationButton
              onClickPrevious={() => props.setStep(props.step - 1)}
              onClickNext={() => submit("next")()}
              disablePrevious={props.step <= 1}
              disableNext={props.step === props.stepAmount}
            />
          </div>
        </div>
      </form>

      <Dialog open={previewIsOpen} onOpenChange={(open) => setPreviewIsOpen(open)}>
        <DialogContent className="p-10">
          <div className="aspect-[8.5/11] border shadow-lg" />
        </DialogContent>
      </Dialog>
    </>
  );
}
