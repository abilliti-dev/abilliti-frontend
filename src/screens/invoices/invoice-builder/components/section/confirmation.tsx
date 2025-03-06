"use client";

import InvoiceFormSection, { InvoiceFormSectionProps } from "../invoice-form-section";
import { calculateSubtotal, calculateTotal } from "../../util/calculate";
import formatMoney from "../../util/format-money";

export default function Confirmation(props: InvoiceFormSectionProps) {
  const total = calculateTotal(
    props.invoiceForm.itemsAndCosts.taxRate,
    props.invoiceForm.itemsAndCosts.discount,
    calculateSubtotal(props.invoiceForm.itemsAndCosts.items)
  );

  const totalItems = props.invoiceForm.itemsAndCosts.items.length;
  const totalCost = formatMoney(total);
  const dueDate = new Date(props.invoiceForm.general.date.due as Date).toLocaleDateString();

  return (
    <InvoiceFormSection {...props} handleSubmit={undefined}>
      <div className="space-y-8">
        <div className="rounded-xl space-y-8 relative">
          <h1 className="text-center font-bold text-3xl text-neutral-700">{"You're all setup!"}</h1>
          <div className="flex justify-between px-10 font-medium">
            <div className="text-center w-40 text-neutral-700">
              <h2 className="text-2xl">{totalItems} items</h2>
              <span>Total items</span>
            </div>
            <div className="text-center w-40 text-neutral-700">
              <h2 className="text-2xl">{totalCost}</h2>
              <span>Total cost</span>
            </div>
            <div className="text-center w-40 text-neutral-700">
              <h2 className="text-2xl">{dueDate}</h2>
              <span>Due date</span>
            </div>
          </div>
          <h3 className="flex justify-center w-full">
            <span className="text-center text-neutral-700 font-medium text-lg w-3/5">
              Confirm that every detail is correct by reviewing the invoice preview
            </span>
          </h3>
        </div>
      </div>
    </InvoiceFormSection>
  );
}
