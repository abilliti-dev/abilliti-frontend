import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { FilteringFields, filteringFieldsArray, Invoice } from "@/types";
import { useEffect } from "react";
import { filteringFieldsMap } from "../utils";

interface InvoiceTableFilterProps {
  table: any;
  filteringField: FilteringFields;
  setFilteringField: any;
  filterValue: string;
  setFilterValue: any;
  setFilteredItems: any;
  data: Invoice[];
}

export default function InvoiceTableFilter({
  filteringField,
  setFilteringField,
  filterValue,
  setFilterValue,
  setFilteredItems,
  data,
}: InvoiceTableFilterProps) {
  useEffect(() => {
    if (filterValue) {
      setFilteredItems(
        data.filter((item) =>
          item[filteringFieldsMap.get(filteringField) as keyof Invoice]
            .toLowerCase()
            .includes(filterValue.toLowerCase())
        )
      );
    } else {
      setFilteredItems(data);
    }
  }, [filterValue]);

  return (
    <div className="flex items-center py-4">
      <Input
        placeholder="Filter invoices..."
        // value={(table.getColumn(filteringField)?.getFilterValue() as string) ?? ""}
        value={filterValue}
        // onChange={(event) => table.getColumn(filteringField)?.setFilterValue(event.target.value)}
        onChange={(event) => setFilterValue(event.target.value)}
        className="max-w-sm rounded-r-none focus-visible:ring-0"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="flex h-10 rounded-l-none border border-slate-200 border-l-0 bg-white px-3 py-2 text-sm focus-visible:ring-0"
          >
            {String(filteringField)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filteringFieldsArray.map((item: FilteringFields, key) => (
            <DropdownMenuItem key={key} onClick={() => setFilteringField(item)}>
              {String(item)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
