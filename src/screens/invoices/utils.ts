import { Invoice } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<Invoice>[] = [
  {
    accessorKey: "id",
    header: "Invoice ID",
  },
  {
    accessorKey: "job",
    header: "Job",
  },
  {
    accessorKey: "client",
    header: "Client",
  },
  {
    accessorKey: "createdDate",
    header: "Created date",
  },
  {
    accessorKey: "dueDate",
    header: "Due date",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];

export const filteringFieldsMap = new Map(
  columns.map((item: any) => [item.header, item.accessorKey])
);
