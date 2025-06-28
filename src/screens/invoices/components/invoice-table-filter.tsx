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
  createdDate: Date | undefined;
  setCreatedDate: any;
  dueDate: Date | undefined;
  setDueDate: any;
  data: Invoice[];
}

export default function InvoiceTableFilter({
  filteringField,
  setFilteringField,
  filterValue,
  setFilterValue,
  setFilteredItems,
  createdDate,
  setCreatedDate,
  dueDate,
  setDueDate,
  data,
}: InvoiceTableFilterProps) {
  useEffect(() => {
    if (filterValue) {
      if (filteringField?.toString().toLowerCase().includes("date")) {
        setFilteredItems(
          data.filter(
            (item) =>
              new Date(
                item[filteringFieldsMap.get(filteringField) as keyof Invoice]
              ).toLocaleDateString() == filterValue
          )
        );
      } else {
        setFilteredItems(
          data.filter((item) =>
            item[filteringFieldsMap.get(filteringField) as keyof Invoice]
              .toLowerCase()
              .includes(filterValue.toLowerCase())
          )
        );
      }
    } else {
      setFilteredItems(data);
    }
  }, [filterValue]);

  const handleStatusFilter = (e: any) => {
    setFilteringField("Status");
    setFilterValue(e.target.innerText);
  };

  const handleSelectCreateDate = (date: Date) => {
    setCreatedDate(date);
    setFilterValue(date?.toLocaleDateString() ?? "");
    setFilteringField("Created date");
  };

  const handleSelectDueDate = (date: Date) => {
    setDueDate(date);
    setFilterValue(date?.toLocaleDateString() ?? "");
    setFilteringField("Due date");
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
        <DropdownMenuContent onChange={() => console.log("t")}>
          {filteringFieldsArray
            .filter((field: any) => !excludeFromFilteringFieldsArray.includes(field))
            .map((item: FilteringFields, key) => (
              <DropdownMenuItem
                key={key}
                onClick={() => {
                  setFilterValue("");
                  setFilteringField(item);
                }}
              >
                {String(item)}
              </DropdownMenuItem>
            ))}
          <DropdownMenuSeparator />
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Created date</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <Calendar
                mode="single"
                selected={createdDate}
                onSelect={(date) => handleSelectCreateDate(date as Date)}
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
                selected={dueDate}
                onSelect={(date) => handleSelectDueDate(date as Date)}
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
