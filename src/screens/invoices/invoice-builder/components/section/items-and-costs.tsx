import DescriptionInput from "@/components/input/description-input";
import InputGroup from "@/components/input/input-group";
import TextInput from "@/components/input/text-input";
import ItemTable from "@/screens/invoices/components/item-table";
import {
  ItemsAndCostsFormFields,
  itemsAndCostsSchema,
} from "@/types/schema/items-and-costs-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

export default function ItemsAndCosts() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ItemsAndCostsFormFields>({
    resolver: zodResolver(itemsAndCostsSchema),
  });

  // const { formState: { errors } } = useForm<ItemsFields>({ resolver: zodResolver(itemsSchema) });

  return (
    <div className="space-y-8">
      <ItemTable />
      {/* <InputError fieldErrors={[{ name: "items", error: errors.items }]} /> */}

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
                  render={({ field }) => (
                    <TextInput {...inputProps} {...field} label="Tax Rate" placeholder="0.0%" />
                  )}
                />
              ),
            ]}
            row2Inputs={[
              (inputProps) => (
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <TextInput {...inputProps} {...field} label="Discount" placeholder="0.0%" />
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
    </div>
  );
}
