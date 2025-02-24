import { NumericFormat } from "react-number-format";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BoxIcon, CircleDollarSignIcon, EqualIcon, HashIcon, PlusIcon, XIcon } from "lucide-react";
import { Control, Controller, FieldErrors, useFieldArray, UseFormWatch } from "react-hook-form";
import { ItemsAndCostsFormFields } from "@/types/schema/items-and-costs-schema";
import { Dispatch, SetStateAction, useEffect } from "react";

interface ItemTableProps {
  control: Control<ItemsAndCostsFormFields>;
  watch: UseFormWatch<ItemsAndCostsFormFields>;
  errors: FieldErrors<ItemsAndCostsFormFields>;
  setSubtotal: Dispatch<SetStateAction<number>>;
}

export default function ItemTable(props: ItemTableProps) {
  const { fields, append, remove } = useFieldArray({ control: props.control, name: "items" });
  const items = props.watch("items");

  const calculateAmount = (unitCost: string, quantity: number) => {
    // remove non-numeric char
    const numericUnitCost = parseFloat(unitCost.replace(/[^0-9.-]+/g, ""));

    if (isNaN(numericUnitCost)) return 0;
    return numericUnitCost * quantity;
  };

  useEffect(() => {
    let subtotal = 0;

    for (const item of items) {
      let numericUnitCost = 0;
      if (item.unitCost) {
        numericUnitCost =
          item.unitCost[0] === "$" ? parseFloat(item.unitCost.slice(1)) : parseFloat(item.unitCost);
      }
      subtotal += numericUnitCost * item.quantity;
    }

    props.setSubtotal(subtotal);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(items)]);

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
      <div>
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
                      control={props.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          placeholder="Enter an item description"
                          // className="border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                          className={cn(
                            "border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12",
                            !!props.errors.items?.[i]?.description &&
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
                      control={props.control}
                      render={({ field: { ref, ...rest } }) => (
                        <NumericFormat
                          getInputRef={ref}
                          {...rest}
                          placeholder="$0.00"
                          prefix="$"
                          customInput={Input}
                          decimalScale={2}
                          fixedDecimalScale={true}
                          allowNegative={false}
                          className={`text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                            !!props.errors.items?.[i]?.unitCost &&
                            "ring ring-inset ring-red-300 focus-visible:ring-red-300 focus-visible:ring"
                          }`}
                        />
                      )}
                    />
                  </td>
                  <td className="w-[12%]">
                    <Controller
                      name={`items.${i}.quantity`}
                      control={props.control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          type="number"
                          placeholder="1"
                          className={`text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
                            !!props.errors.items?.[i]?.quantity &&
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
              quantity: 1,
            })
          }
        >
          <PlusIcon strokeWidth={1.5} />
          <span>New item</span>
        </button>
      </div>
    </div>
  );
}
