const calculateSubtotal = (
  items: { unitCost: string; quantity: number; description: string }[]
) => {
  let subtotal = 0;

  for (const item of items) {
    let numericUnitCost = 0;
    if (item.unitCost) {
      numericUnitCost =
        item.unitCost[0] === "$" ? parseFloat(item.unitCost.slice(1)) : parseFloat(item.unitCost);
    }
    subtotal += numericUnitCost * item.quantity;
  }

  return subtotal;
};

const calculateTotal = (taxRate: string, discount: string, subtotal: number) => {
  let numericTaxRate = 0;
  let numericDiscount = 0;

  if (taxRate) {
    const last = taxRate.length - 1;
    numericTaxRate =
      taxRate[last] === "%" ? parseFloat(taxRate.slice(0, last)) : parseFloat(taxRate);
  }
  if (discount) {
    numericDiscount = discount[0] === "$" ? parseFloat(discount.slice(1)) : parseFloat(discount);
  }

  const tax = subtotal * (numericTaxRate / 100);
  return subtotal + tax - numericDiscount;
};

export { calculateSubtotal, calculateTotal };
