import { z } from "zod";

export type GeneralInvoiceInfoFormFields = z.infer<typeof generalInvoiceInfoSchema>;

export const generalInvoiceInfoSchema = z.object({
  description: z.string().min(1, "Required").max(100),
  date: z
    .object({
      issue: z.date({ message: "Required" }),
      due: z.date({ message: "Required" }),
    })
    .refine((data) => data.issue <= data.due, {
      message: "Due date must be later than the issue date",
      path: ["due"], // "point error to "due"
    }),
});
