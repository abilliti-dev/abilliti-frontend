import { INVOICE_STATUS } from "@/enums";

export type Invoice = {
  id: string;
  job: string;
  client: string;
  createdDate: string;
  dueDate: string;
  status: INVOICE_STATUS;
};

export const filteringFieldsArray = [
  "Invoice ID",
  "job",
  "Client",
  "Created Date",
  "Due Date",
  "Status",
] as const;

export type FilteringFields = (typeof filteringFieldsArray)[number];
