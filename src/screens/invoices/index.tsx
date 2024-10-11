import { InvoiceTable } from "./components/invoice-table";
import { columns } from "./utils";
import { INVOICE_STATUS } from "@/enums";

export default function Invoices() {
  // Replace this with the hook to get the data
  const data = [
    {
      client: "John Doe",
      createdDate: "9/11/01",
      dueDate: "4/20/69",
      id: "ID-694201738",
      job: "Window washing",
      status: INVOICE_STATUS.CREATED,
    },
    {
      client: "John Doe",
      createdDate: "9/11/01",
      dueDate: "4/20/69",
      id: "ID-694201738",
      job: "This is fifty characters.This is fifty characters.",
      status: INVOICE_STATUS.CREATED,
    },
  ];

  return (
    <>
      <InvoiceTable columns={columns} data={data} />
    </>
  );
}
