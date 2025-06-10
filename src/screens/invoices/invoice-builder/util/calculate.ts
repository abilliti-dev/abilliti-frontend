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

const taxRateStringToNumber = (taxRate: string) => {
  let result = 0;
  if (taxRate) {
    const last = taxRate.length - 1;
    result = taxRate[last] === "%" ? parseFloat(taxRate.slice(0, last)) : parseFloat(taxRate);
  }
  return result;
};

const discountStringToNumber = (discount: string) => {
  return discount[0] === "$" ? parseFloat(discount.slice(1)) : parseFloat(discount);
};

const calculateTax = (subtotal: number, numericTaxRate: number) => {
  return subtotal * (numericTaxRate / 100);
};

const calculateTotal = (taxRate: string, discount: string, subtotal: number) => {
  let numericTaxRate = 0;
  let numericDiscount = 0;

  if (taxRate) numericTaxRate = taxRateStringToNumber(taxRate);
  if (discount) numericDiscount = discountStringToNumber(discount);

  const tax = calculateTax(subtotal, numericTaxRate);
  return subtotal + tax - numericDiscount;
};

const calculateAmount = (unitCost: string, quantity: number) => {
  // remove non-numeric char
  const numericUnitCost = parseFloat(unitCost.replace(/[^0-9.-]+/g, ""));

  if (isNaN(numericUnitCost)) return 0;
  return numericUnitCost * quantity;
};

export {
  calculateSubtotal,
  taxRateStringToNumber,
  discountStringToNumber,
  calculateTax,
  calculateTotal,
  calculateAmount,
};
