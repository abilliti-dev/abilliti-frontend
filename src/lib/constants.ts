import { TMenuPages } from "@/contexts/dashboard-context";

export const TMenuPagesMapToTitle: Map<TMenuPages, string> = new Map([
  ["home", "Home"],
  ["finances", "Finances"],
  ["invoices", "Invoices"],
  ["invoice-builder", "Invoice Builder"],
  ["jobs", "Jobs"],
  ["settings", "Settings"],
  ["help", "Help"],
]);
