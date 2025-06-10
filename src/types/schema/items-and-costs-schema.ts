import { z } from "zod";

const itemSchema = z.object({
  description: z.string().min(1, "Item description is required").max(40),
  unitCost: z.string(), // enforced in ui
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .min(1, "Quantity must be at least 1"),
});

export const itemsSchema = z.array(itemSchema).min(1, "At least one item is required.");

export const itemsAndCostsSchema = z.object({
  items: z.array(itemSchema).min(1, "At least one item is required."),
  notes: z.string().optional(),
  taxRate: z.string(), // enforced in ui
  discount: z.string(), // enforced in ui
});

export type ItemsAndCostsFormFields = z.infer<typeof itemsAndCostsSchema>;
