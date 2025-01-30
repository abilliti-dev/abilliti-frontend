import { INVOICE_STATUS } from "@/enums";
import { columns } from "@/screens/invoices/utils";

export type Invoice = {
  id: string;
  job: string;
  client: string;
  createdDate: string;
  dueDate: string;
  status: INVOICE_STATUS;
};

export const filteringFieldsArray = columns.map((item) => item.header);

export const excludeFromFilteringFieldsArray = ["Status"];

export type FilteringFields = (typeof filteringFieldsArray)[number];
