import { z } from "zod";

export type GeneralInvoiceInfoFormFields = z.infer<typeof generalInvoiceInfoSchema>;

export const generalInvoiceInfoSchema = z.object({
  description: z.string().max(100),
  date: z.object({
    issue: z.date(),
    due: z.date(),
  }),
});
