import { InvoiceForm } from "@/types/invoice-form";
import { ImageOffIcon } from "lucide-react";
import {
  calculateAmount,
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  taxRateStringToNumber,
} from "../util/calculate";
import formatMoney from "../util/format-money";

interface InvoicePreviewProps {
  invoice: InvoiceForm;
}

export default function InvoicePreview(props: InvoicePreviewProps) {
  const { general, company, client, itemsAndCosts } = props.invoice;
  const subtotal = calculateSubtotal(itemsAndCosts.items);
  const total = calculateTotal(itemsAndCosts.taxRate, itemsAndCosts.discount, subtotal);
  const taxRate = taxRateStringToNumber(props.invoice.itemsAndCosts.taxRate);
  const tax = calculateTax(subtotal, taxRate);

  return (
    <div className="border shadow-lg bg-white w-[min(30vw,500px)] aspect-[8.5/11] shrink-0 h-fit relative">
      <div className="p-6 space-y-4 pb-4">
        <div className="flex justify-between">
          <div className="space-y-2">
            {/* title section */}
            <div className="-space-y-1">
              <h1 className="font-semibold text-neutral-800 text-base">INVOICE</h1>
              <p className="text-[9px]">Invoice ID (Generated)</p>
            </div>

            {/* company details */}
            <div className="space-y-1">
              <h2 className="text-[10px] font-semibold">{company.name || "Company name"}</h2>
              <div className="text-[9px] -space-y-0.5">
                <p>{company.address.street || "Street"}</p>
                <p>
                  {company.address.city || "City"}, {company.address.state || "State"}{" "}
                  {company.address.zipCode || "Zip code"}
                </p>
                <p>{company.phone || "Phone number"}</p>
                <p>{company.email || "Email address"}</p>
              </div>
            </div>
          </div>

          {company.image ? (
            <img
              src={URL.createObjectURL(company.image)}
              alt={company.image.name}
              className="object-cover h-16 w-16"
            />
          ) : (
            <div className="outline-dashed h-16 w-16 outline-neutral-300 outline-[2.5px] flex justify-center place-items-center">
              <ImageOffIcon className="text-neutral-300" size={40} strokeWidth={1.5} />
            </div>
          )}
        </div>

        <div className="flex justify-between">
          {/* client details */}
          <div className="space-y-1">
            <h3 className="uppercase text-[8px] font-bold text-neutral-500">BILLED TO</h3>
            <div className="text-[9px] -space-y-0.5">
              <p>{client.name || "Client name"}</p>
              <p>{client.address.street || "Street"}</p>
              <p>
                {client.address.city || "City"}, {client.address.state || "State"}{" "}
                {client.address.zipCode || "Zip code"}
              </p>
              <p>{client.phone || "Phone number"}</p>
              <p>{client.email || "Email address"}</p>
            </div>
          </div>

          <div className="space-y-1">
            <h3 className="uppercase text-[8px] font-bold text-neutral-500">JOB DETAILS</h3>
            <p className="text-[9px]">{general.description || "Job description"}</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <h3 className="uppercase text-[8px] font-bold text-neutral-500">INVOICE DATE</h3>
              <p className="text-[9px]">{new Date(general.date.issue).toLocaleDateString()}</p>
            </div>

            <div className="space-y-1">
              <h3 className="uppercase text-[8px] font-bold text-neutral-500">PAYMENT DUE</h3>

              <p className="text-[9px]">
                {general.date.due ? new Date(general.date.due).toLocaleDateString() : "N/A"}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-neutral-200/80 px-6 py-4 text-[9px] space-y-4">
        <table className="w-full border-b border-neutral-600">
          <thead>
            <tr>
              <th className="text-left border-b border-neutral-600 font-medium">Item</th>
              <th className="text-right border-b border-neutral-600 font-medium">Unit cost</th>
              <th className="text-right border-b border-neutral-600 font-medium">Quantity</th>
              <th className="text-right border-b border-neutral-600 font-medium">Amount</th>
            </tr>
          </thead>

          <tbody>
            {itemsAndCosts.items.map((item, i) => {
              const amt = calculateAmount(item.unitCost, item.quantity);
              return (
                <tr key={i}>
                  <td className="text-left">{item.description}</td>
                  <td className="text-right">{item.unitCost}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">{amt ? formatMoney(amt) : "$0.00"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="flex justify-between">
          <div className="space-y-1">
            <h3 className="uppercase text-[8px] font-bold text-neutral-500">NOTES</h3>
            <p className="text-[9px]">
              {itemsAndCosts.notes || "Enter notes, comments, or terms/conditions"}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-1 space-y-4">
              <div className="-space-y-0.5">
                <p>Subtotal</p>
                <p>Tax rate</p>
                <p>Tax</p>
                <p>Discount</p>
              </div>

              <p className="font-bold">Total</p>
            </div>

            <div className="col-span-1 space-y-4 text-right">
              <div className="-space-y-0.5">
                <p>{formatMoney(subtotal)}</p>
                <p>
                  {itemsAndCosts.taxRate && itemsAndCosts.taxRate !== "0"
                    ? itemsAndCosts.taxRate
                    : "0.0%"}
                </p>
                <p>+{formatMoney(tax)}</p>
                <p>
                  -
                  {itemsAndCosts.discount && itemsAndCosts.discount !== "0"
                    ? itemsAndCosts.discount
                    : "$0.00"}
                </p>
              </div>

              <p className="font-bold">{formatMoney(total)}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute text-[7px] text-neutral-500 bottom-2 flex flex-col place-items-center w-full">
        <p>Page 1 of 1</p>
        <p>Generated using Abilliti</p>
      </div>
    </div>
  );

  // aspect-[8.5/11] -> letter page shape
}
