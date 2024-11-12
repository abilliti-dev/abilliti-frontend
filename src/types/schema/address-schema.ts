import { z } from "zod";

export type AddressFormFields = z.infer<typeof addressSchema>;

export const addressSchema = z.object({
  street: z.string().min(1, "Required").max(100),
  city: z.string().min(1).max(60),
  state: z.string().min(1).max(60),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
});
