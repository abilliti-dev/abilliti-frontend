import { z } from "zod";
import { addressSchema } from "./address-schema";

export const clientSchema = z.object({
  info: z.object({
    name: z.string().min(1, "Required").max(60),
    email: z.string().email("Invalid email"),
    phone: z.string().length(10, "Invalid phone number"),
  }),
  address: addressSchema,
});
