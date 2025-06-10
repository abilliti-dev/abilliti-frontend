import { z } from "zod";

export type AddressFormFields = z.infer<typeof addressSchema>;

const prefixExceeded = "Exceeded max character length of";

export const addressSchema = z.object({
  street: z.string().min(1, "Required").max(100, `${prefixExceeded} 100`),
  city: z.string().min(1, "Required").max(60, `${prefixExceeded} 60`),
  state: z.string().min(1, "Required").max(60, `${prefixExceeded}, 60`),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code"),
});
