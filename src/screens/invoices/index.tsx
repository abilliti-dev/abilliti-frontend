import DashboardLayout from "@/layouts/dashboard-layout";
import { InvoiceTable } from "./components/invoice-table";
import { columns } from "./utils";
import { INVOICE_STATUS } from "@/enums";

export default function Invoices() {
  // Replace this with the hook to get the data
  const data = [
    {
      client: "Marcos Villanueva",
      createdDate: "05/21/2025",
      dueDate: "3/4/5",
      id: "ID-123456789",
      job: "Window washing",
      status: INVOICE_STATUS.CREATED,
    },
    {
      client: "Emunch Pecson",
      createdDate: "5/6/7",
      dueDate: "7/8/9",
      id: "ID-987654321",
      job: "This is fifty characters.This is fifty characters.",
      status: INVOICE_STATUS.DRAFT,
    },
  ];

  return (
    <DashboardLayout>
      <InvoiceTable columns={columns} data={data} />
    </DashboardLayout>
  );
}
