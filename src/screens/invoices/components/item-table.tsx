import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { itemsSchema } from "@/types/schema/items-and-costs-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BoxIcon, CircleDollarSignIcon, EqualIcon, HashIcon, PlusIcon, XIcon } from "lucide-react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import TableInputError from "@/components/input/error/TableInputError";

export default function ItemTable() {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(itemsSchema),
    mode: "onChange",
    defaultValues: {
      items: [{ description: "", unitCost: "0", quantity: "1" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
    // rules: { required: "Required" },
  });

  const items = watch("items");

  const calculateAmount = (unitCost: string, quantity: string) => {
    // remove non-numeric char
    const numericUnitCost = parseFloat(unitCost.replace(/[^0-9.-]+/g, ""));

    if (isNaN(numericUnitCost)) return 0;
    return numericUnitCost * Number(quantity);
  };

  return (
    <div className="space-y-1.5">
      {/* headers */}
      <div className="flex justify-between w-full text-nowrap uppercase text-xs font-semibold text-neutral-500">
        <div className="w-[44%] flex place-items-center pl-2 space-x-1.5">
          <BoxIcon strokeWidth={1.5} />
          <span>Item</span>
        </div>
        <div className="w-[22%] flex place-items-center justify-center space-x-1.5">
          <CircleDollarSignIcon strokeWidth={1.5} />
          <span>Unit cost</span>
        </div>
        <div className="w-[12%] flex place-items-center justify-center space-x-1.5">
          <HashIcon strokeWidth={1.5} />
          <span>Qty</span>
        </div>
        <div className="w-[22%] flex place-items-center justify-center space-x-1.5">
          <EqualIcon strokeWidth={1.5} />
          <span>Amount</span>
        </div>
      </div>

      {/* table content */}
      <form
        onSubmit={handleSubmit(
          (data) => {
            console.log("Form submitted:", data);
          },
          (error) => {
            console.log("Validation errors:", error);
            console.log(fields);
            console.log(errors);
          }
        )}
      >
        <div className="relative border border-neutral-300 rounded-t-xl overflow-clip max-h-[22.5rem] overflow-y-scroll">
          <table className="w-full">
            <tbody className="divide-y divide-neutral-300">
              {fields.map((fd, i) => (
                <tr
                  key={fd.id}
                  className="flex justify-between w-full divide-x divide-neutral-300 overflow-clip"
                >
                  <td className="w-[44%] relative">
                    <Controller
                      name={`items.${i}.description`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter an item description"
                          // className="border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                          className={cn(
                            "border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12",
                            !!errors.items?.[i]?.description &&
                              "ring ring-inset ring-red-300 focus-visible:ring-red-300 focus-visible:ring",
                            i === 0 ? "rounded-tl-xl" : "rounded-none"
                          )}
                        />
                      )}
                    />
                    <Button
                      type="button"
                      className="z-10 shadow-sm shadow-neutral-300 absolute right-2 top-2 h-8 w-8 text-neutral-400 hover:text-neutral-500"
                      variant={"outline"}
                      size={"icon"}
                      disabled={fields.length === 1}
                      onClick={() => remove(i)}
                    >
                      <XIcon size={20} />
                    </Button>
                  </td>
                  <td className="w-[22%]">
                    <Controller
                      name={`items.${i}.unitCost`}
                      control={control}
                      render={({ field: { ref, ...rest } }) => (
                        <NumericFormat
                          getInputRef={ref}
                          {...rest}
                          placeholder="$0.00"
                          prefix="$"
                          customInput={Input}
                          thousandSeparator={true}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          allowNegative={false}
                          className={`text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                            !!errors.items?.[i]?.unitCost &&
                            "ring ring-inset ring-red-300 focus-visible:ring-red-300 focus-visible:ring"
                          }`}
                        />
                      )}
                    />
                  </td>
                  <td className="w-[12%]">
                    <Controller
                      name={`items.${i}.quantity`}
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          placeholder="1"
                          className={`text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                            !!errors.items?.[i]?.quantity &&
                            "ring ring-inset ring-red-300 focus-visible:ring-red-300 focus-visible:ring"
                          }`}
                        />
                      )}
                    />
                  </td>
                  <td className="w-[22%] bg-neutral-200/60 overflow-hidden">
                    <span className="flex justify-center place-items-center h-full text-neutral-500">
                      {`$${calculateAmount(items[i].unitCost, items[i].quantity).toFixed(2)}`}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          type="button"
          className="w-full flex space-x-1.5 justify-center place-items-center h-12 border-t-0 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 text-sm font-medium duration-100 transition-colors rounded-b-xl"
          onClick={() =>
            append({
              description: "",
              unitCost: "0",
              quantity: "1",
            })
          }
        >
          <PlusIcon strokeWidth={1.5} />
          <span>New item</span>
        </button>

        <button type="submit">[temp submit]</button>
      </form>

      <TableInputError
        items={errors.items as []}
        fields={["description", "unitCost", "quantity"]}
      />
    </div>
  );
}
