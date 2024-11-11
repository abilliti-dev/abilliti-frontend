import { Control } from "react-hook-form";
import { InvoiceFormFields } from "./schema/invoice-form-schema";

export interface InvoiceFormControlProps {
  control?: Control<InvoiceFormFields>;
}
