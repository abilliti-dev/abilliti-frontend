import { z } from "zod";

export const addressSchema = z.object({
  street: z.string().min(1).max(100),
  city: z.string().min(1).max(60),
  state: z.string().min(1).max(60),
  zipCode: z.string().length(5),
});
