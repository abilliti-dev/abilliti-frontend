import { z } from "zod";
import { imageSchema } from "./image-schema";
import { addressSchema } from "./address-schema";

export type CompanyInfoFormFields = z.infer<typeof companyInfoSchema>;

const prefixExceeded = "Exceeded max character length of";

export const companyInfoSchema = z.object({
  name: z.string().min(1, "Required").max(40, `${prefixExceeded} 40`),
  image: imageSchema,
  email: z.string().min(1, "Required").email().max(40, `${prefixExceeded} 40`),
  phone: z
    .string()
    .min(1)
    .regex(/^(\+?\d{1,2}\s?)?(\(?\d{3}\)?[\s.-]?)?\d{3}[\s.-]?\d{4}$/, "Invalid phone number"),
  address: addressSchema,
});
