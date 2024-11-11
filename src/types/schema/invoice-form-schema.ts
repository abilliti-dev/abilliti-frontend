import { z } from "zod";
import { companySchema } from "./company-schema";
import { clientSchema } from "./client-schema";

export type InvoiceFormFields = z.infer<typeof invoiceFormSchema>;

export const invoiceFormSchema = z.object({
  description: z.string().max(100),
  date: z.object({
    issue: z.date(),
    due: z.date(),
  }),
  company: companySchema,
  client: clientSchema,
});
