"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import PaginationButton from "@/components/button/pagination-button";
import IconWithTextButton from "@/components/button/icon-with-text-button";
import { ArchiveIcon, EyeIcon, PlusCircleIcon } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { sections } from "../data/sections";
import Stepper from "./stepper";
import { InvoiceForm } from "@/types/invoice-form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ConfirmationDialog from "@/components/dialog/confirmation-dialog";
import InvoicePDF from "./pdf/invoice-pdf";
import { PDFViewer } from "@react-pdf/renderer";

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
  const [confirmDialogIsOpen, setConfirmDialogIsOpen] = useState(false);
  const [previewIsOpen, setPreviewIsOpen] = useState(false);
  const isLastStep = props.step === props.stepAmount;

  const createInvoice = () => {
    // ! view console log for submission (until we setup the api)
    console.log("Invoice submission:", props.invoiceForm);
  };

  const saveInvoice = (action: string) => {
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
        onSubmit={props.handleSubmit ? props.handleSubmit(saveInvoice("")) : undefined}
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
              {isLastStep ? (
                <IconWithTextButton
                  type="button"
                  Icon={PlusCircleIcon}
                  className="font-normal bg-neutral-700"
                  onClick={() => setConfirmDialogIsOpen(true)}
                >
                  Create invoice
                </IconWithTextButton>
              ) : (
                <IconWithTextButton
                  type="button"
                  Icon={ArchiveIcon}
                  variant="outline"
                  className="font-normal"
                >
                  Save as draft
                </IconWithTextButton>
              )}
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
            <PaginationButton
              onClickPrevious={() => props.setStep(props.step - 1)}
              onClickNext={() => saveInvoice("next")()}
              disablePrevious={props.step <= 1}
              disableNext={props.step === props.stepAmount}
            />
          </div>
        </div>
      </form>

      <Dialog open={previewIsOpen} onOpenChange={(open) => setPreviewIsOpen(open)}>
        <DialogContent className="p-10 max-w-3xl">
          <PDFViewer width="100%" height={700}>
            <InvoicePDF invoice={props.invoiceForm} />
          </PDFViewer>
        </DialogContent>
      </Dialog>

      <ConfirmationDialog
        isOpen={confirmDialogIsOpen}
        setIsOpen={setConfirmDialogIsOpen}
        onConfirm={createInvoice}
      />
    </>
  );
}
