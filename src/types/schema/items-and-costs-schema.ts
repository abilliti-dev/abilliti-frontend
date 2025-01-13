import { z } from "zod";

const itemSchema = z.object({
  description: z.string().min(1, "Item description is required"),
  unitCost: z.string(),
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1"),
});

// export const itemsSchema = z.array(itemSchema).min(1, "At least one item is required.");
export const itemsSchema = z.object({
  items: z.array(itemSchema).min(1, "At least one item is required."),
});

export const itemsAndCostsSchema = z.object({
  items: itemsSchema,
  notes: z.string(), // TODO: specify rules
  taxRate: z.string(), // TODO: specify rules
  discount: z.string(), // TODO: specify rules
});

export type ItemsAndCostsFormFields = z.infer<typeof itemsAndCostsSchema>;
// export type ItemsFields = z.infer<typeof itemsSchema>;
