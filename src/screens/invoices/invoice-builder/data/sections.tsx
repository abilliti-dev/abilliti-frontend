import { InvoiceFormSectionProps } from "../components/invoice-form-section";
import ClientInfo from "../components/section/client-info";
import CompanyInfo from "../components/section/company-info";
import Confirmation from "../components/section/confirmation";
import GeneralInfo from "../components/section/general-info";
import ItemsAndCosts from "../components/section/items-and-costs";

export const sections = [
  // { component: () => <GeneralInfo />, label: "General" },
  // { component: () => <CompanyInfo />, label: "Company" },
  // { component: () => <ClientInfo />, label: "Client" },
  // { component: () => <ItemsAndCosts />, label: "Items and costs" },
  // { component: () => <Confirmation />, label: "Confirmation" },
  { component: (props: InvoiceFormSectionProps) => <GeneralInfo {...props} />, label: "General" },
  { component: (props: InvoiceFormSectionProps) => <CompanyInfo {...props} />, label: "Company" },
  { component: (props: InvoiceFormSectionProps) => <ClientInfo {...props} />, label: "Client" },
  {
    component: (props: InvoiceFormSectionProps) => <ItemsAndCosts {...props} />,
    label: "Items and costs",
  },
  {
    component: (props: InvoiceFormSectionProps) => <Confirmation {...props} />,
    label: "Confirmation",
  },
];
