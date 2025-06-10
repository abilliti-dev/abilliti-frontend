import { z } from "zod";
import { addressSchema } from "./address-schema";

export type ClientInfoFormFields = z.infer<typeof clientInfoSchema>;

const prefixExceeded = "Exceeded max character length of";

export const clientInfoSchema = z.object({
  name: z.string().min(1, "Required").max(40, `${prefixExceeded} 40`),
  email: z.string().min(1, "Required").email().max(40, `${prefixExceeded} 40`),
  phone: z
    .string()
    .min(1, "Required")
    .regex(/^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"),
  address: addressSchema,
});
