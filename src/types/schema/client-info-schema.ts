import { z } from "zod";
import { addressSchema } from "./address-schema";

export type ClientInfoFormFields = z.infer<typeof clientInfoSchema>;

export const clientInfoSchema = z.object({
  name: z.string().min(1).max(60, "Exceeded max character length of 60"),
  email: z.string().email().max(60, "Exceeded max character length of 60"),
  phone: z
    .string()
    .min(1)
    .regex(/^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"),
  address: addressSchema,
});
