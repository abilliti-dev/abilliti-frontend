import { z } from "zod";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./address-schema";

export type CompanyInfoFormFields = z.infer<typeof companyInfoSchema>;

export const companyInfoSchema = z.object({
  name: z.string().min(1).max(60),
  image: imageSchema,
  email: z.string().email(),
  phone: z.string().length(10),
  address: addressSchema,
});
