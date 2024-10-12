import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BoxIcon, CircleDollarSignIcon, EqualIcon, HashIcon, PlusIcon, XIcon } from "lucide-react";
import { useState } from "react";

export interface Item {
  description: string;
  unitCost: number;
  quantity: number;
  amount: number;
}

export default function ItemTable() {
  const [items, setItems] = useState<Item[]>([
    {
      description: "",
      unitCost: 0,
      quantity: 1,
      amount: 0,
    },
  ]);

  const addItem = () => {
    setItems([...items, { description: "", unitCost: 0, quantity: 1, amount: 0 }]);
  };

  const removeItem = (index: number) => () => {
    setItems(items.filter((_, i) => i !== index));
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
      <div>
        <div className="relative border border-neutral-300 rounded-t-xl overflow-clip max-h-[22.5rem] overflow-y-scroll">
          <table className="w-full">
            <tbody className="divide-y divide-neutral-300">
              {items.map((_item, i) => (
                <tr className="flex justify-between w-full divide-x divide-neutral-300 overflow-clip">
                  <td className="w-[44%] relative">
                    <Input
                      placeholder="Enter an item description"
                      className="border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 pr-12"
                    />
                    <Button
                      className="z-10 shadow-sm shadow-neutral-300 absolute right-2 top-2 h-8 w-8 text-neutral-400 hover:text-neutral-500"
                      variant={"outline"}
                      size={"icon"}
                      disabled={items.length === 1}
                      onClick={removeItem(i)}
                    >
                      <XIcon size={20} />
                    </Button>
                  </td>
                  <td className="w-[22%]">
                    <Input
                      type="number"
                      placeholder="$0.00"
                      className="text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </td>
                  <td className="w-[12%]">
                    <Input
                      type="number"
                      defaultValue={1}
                      className="text-center border-none h-12 focus-visible:ring-0 focus-visible:ring-offset-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </td>
                  <td className="w-[22%] bg-neutral-200/60 overflow-hidden">
                    <span className="flex justify-center place-items-center h-full text-neutral-500">
                      $0.00
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button
          className="w-full flex space-x-1.5 justify-center place-items-center h-12 border-t-0 border border-neutral-300 text-neutral-600 hover:bg-neutral-50 text-sm font-medium duration-100 transition-colors rounded-b-xl"
          onClick={addItem}
        >
          <PlusIcon strokeWidth={1.5} />
          <span>New item</span>
        </button>
      </div>
    </div>
  );
}
