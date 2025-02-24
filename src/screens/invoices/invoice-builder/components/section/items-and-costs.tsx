"use client";

import DescriptionInput from "@/components/input/description-input";
import InputError from "@/components/input/error/InputError";
import TableInputError from "@/components/input/error/TableInputError";
import InputGroup from "@/components/input/input-group";
import TextInput from "@/components/input/text-input";
import ItemTable from "@/screens/invoices/components/item-table";
import {
  ItemsAndCostsFormFields,
  itemsAndCostsSchema,
} from "@/types/schema/items-and-costs-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import InvoiceFormSection, { InvoiceFormSectionProps } from "../invoice-form-section";
import { useEffect, useMemo, useState } from "react";

export default function ItemsAndCosts(props: InvoiceFormSectionProps) {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<ItemsAndCostsFormFields>({
    resolver: zodResolver(itemsAndCostsSchema),
    mode: "onChange",
    defaultValues: {
      items: [{ description: "", unitCost: "0", quantity: 1 }],
      notes: "",
      discount: "",
      taxRate: "0",
    },
  });

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  const formatMoney = (money: number) => {
    return "$" + (Math.round(money * 100) / 100).toFixed(2);
  };

  const taxRate = watch("taxRate");
  const discount = watch("discount");

  useEffect(() => {
    let numericTaxRate = 0;
    let numericDiscount = 0;

    if (taxRate) {
      const last = taxRate.length - 1;
      numericTaxRate =
        taxRate[last] === "%" ? parseFloat(taxRate.slice(0, last)) : parseFloat(taxRate);
    }
    if (discount) {
      numericDiscount = discount[0] === "$" ? parseFloat(discount.slice(1)) : parseFloat(discount);
    }

    const tax = subtotal * (numericTaxRate / 100);
    setTotal(subtotal + tax - numericDiscount);
  }, [subtotal, taxRate, discount]);

  const taxAndDiscountGroup = useMemo(
    () => (
      <InputGroup
        row1Inputs={[
          (inputProps) => (
            <Controller
              name="taxRate"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <NumericFormat
                  getInputRef={ref}
                  {...rest}
                  {...inputProps}
                  label="Tax Rate"
                  placeholder="0.0%"
                  defaultValue={0}
                  suffix="%"
                  customInput={TextInput}
                  decimalScale={1}
                  fixedDecimalScale={true}
                  allowNegative={false}
                  isAllowed={(values) => {
                    const { floatValue } = values;
                    return floatValue !== undefined && floatValue >= 0 && floatValue <= 100;
                  }}
                />
              )}
            />
          ),
        ]}
        row2Inputs={[
          (inputProps) => (
            <Controller
              name="discount"
              control={control}
              render={({ field: { ref, ...rest } }) => (
                <NumericFormat
                  getInputRef={ref}
                  {...rest}
                  {...inputProps}
                  label="Discount"
                  placeholder="$0.00"
                  defaultValue={0}
                  prefix="$"
                  customInput={TextInput}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  allowNegative={false}
                />
              )}
            />
          ),
        ]}
      />
    ),
    [control]
  );

  return (
    <InvoiceFormSection {...props} handleSubmit={handleSubmit}>
      <div className="space-y-8">
        <div className="space-y-2">
          <ItemTable control={control} watch={watch} errors={errors} setSubtotal={setSubtotal} />
          <TableInputError
            items={errors.items as []}
            fields={["description", "unitCost", "quantity"]}
          />
        </div>

        <div className="flex space-x-2">
          <div className="w-1/2">
            <Controller
              name="notes"
              control={control}
              render={({ field }) => (
                <DescriptionInput
                  {...field}
                  label="Notes"
                  placeholder="Enter notes, comments, or terms/conditions"
                />
              )}
            />
          </div>
          <div className="space-y-2 w-1/2">
            <div className="flex justify-between px-2 text-sm text-neutral-600 font-medium">
              <span>Subtotal</span>
              <span>{formatMoney(subtotal)}</span>
            </div>

            {taxAndDiscountGroup}

            <div className="flex justify-between px-2 text-sm text-neutral-600 font-semibold">
              <span>Total</span>
              <span>{formatMoney(total)}</span>
            </div>
          </div>
        </div>

        <InputError
          fieldErrors={[
            { name: "notes", error: errors.notes },
            { name: "discount", error: errors.discount },
            { name: "tax rate", error: errors.taxRate },
          ]}
        />
      </div>
    </InvoiceFormSection>
  );
}
