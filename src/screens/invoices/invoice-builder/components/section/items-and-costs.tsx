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

export default function ItemsAndCosts() {
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

  // const { formState: { errors } } = useForm<ItemsFields>({ resolver: zodResolver(itemsSchema) });

  return (
    <form
      onSubmit={handleSubmit(
        (data) => console.log("form submitted:", data),
        (error) => console.log("errors:", error)
      )}
    >
      <div className="space-y-8">
        <div className="space-y-2">
          <ItemTable control={control} watch={watch} errors={errors} />
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
              <span>$0.00</span>
            </div>
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
                        thousandSeparator={true}
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
                        thousandSeparator={true}
                        decimalScale={2}
                        fixedDecimalScale={true}
                        allowNegative={false}
                      />
                    )}
                  />
                ),
              ]}
            />
            <div className="flex justify-between px-2 text-sm text-neutral-600 font-semibold">
              <span>Total</span>
              <span>$0.00</span>
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

      <button type="submit">[temp submit]</button>
    </form>
  );
}
