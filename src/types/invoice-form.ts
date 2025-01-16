export interface InvoiceForm {
  general: {
    description: string;
    date: { issue: Date; due?: Date };
  };
  company: {
    name: string;
    image?: File;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  client: {
    name: string;
    email: string;
    phone: string;
    address: {
      street: string;
      city: string;
      state: string;
      zipCode: string;
    };
  };
  itemsAndCosts: {
    items: { description: string; unitCost: string; quantity: number }[];
    notes: string;
    taxRate: string;
    discount: string;
  };
}

export const defaultInvoiceForm: InvoiceForm = {
  general: {
    description: "",
    date: { issue: new Date(), due: undefined },
  },
  company: {
    name: "",
    image: undefined,
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  client: {
    name: "",
    email: "",
    phone: "",
    address: {
      street: "",
      city: "",
      state: "",
      zipCode: "",
    },
  },
  itemsAndCosts: {
    items: [{ description: "", unitCost: "$0.00", quantity: 1 }],
    notes: "",
    discount: "",
    taxRate: "",
  },
};
