import { z } from "zod";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./address-schema";

export const companySchema = z.object({
  info: z.object({
    name: z.string().min(1).max(60),
    image: imageSchema,
    email: z.string().email(),
    phone: z.string().length(10),
  }),
  address: addressSchema,
});
