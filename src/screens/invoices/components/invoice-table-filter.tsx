import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  excludeFromFilteringFieldsArray,
  FilteringFields,
  filteringFieldsArray,
  Invoice,
} from "@/types";
import { useEffect } from "react";
import { filteringFieldsMap } from "@/screens/invoices/utils";
import { INVOICE_STATUS } from "@/enums";
import { Calendar } from "@/components/ui/calendar";

interface InvoiceTableFilterProps {
  table: any;
  filteringField: FilteringFields;
  setFilteringField: any;
  filterValue: string;
  setFilterValue: any;
  setFilteredItems: any;
  date: Date | undefined;
  setDate: any;
  data: Invoice[];
}

export default function InvoiceTableFilter({
  filteringField,
  setFilteringField,
  filterValue,
  setFilterValue,
  setFilteredItems,
  date,
  setDate,
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

  useEffect(() => {
    if (filteringField && filteringField !== "Status") {
      setFilterValue("");
    }
  }, [filteringField]);

  const handleStatusFilter = (e: any) => {
    setFilteringField("Status");
    setFilterValue(e.target.innerText);
  };

  return (
    <div className="flex items-center p-4">
      <Input
        placeholder="Filter invoices..."
        value={filterValue}
        onChange={(event) => setFilterValue(event.target.value)}
        className="max-w-sm rounded-r-none focus-visible:ring-[0]"
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="secondary"
            className="flex h-10 rounded-l-none border border-slate-200 border-l-0 bg-white px-3 py-2 text-sm focus-visible:ring-[0]"
          >
            {String(filteringField)}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {filteringFieldsArray
            .filter((field: any) => !excludeFromFilteringFieldsArray.includes(field))
            .map((item: FilteringFields, key) => (
              <DropdownMenuItem key={key} onClick={() => setFilteringField(item)}>
                {String(item)}
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Created date</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                disabled={(date) => date > new Date()}
                className="rounded-md border-none"
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Due date</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
              />
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Status</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {Object.values(INVOICE_STATUS).map((status, key) => (
                <DropdownMenuItem
                  key={key}
                  className="capitalize"
                  onClick={(event) => handleStatusFilter(event)}
                >
                  {status}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
