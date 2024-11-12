import ClientInfo from "../components/section/client-info";
import CompanyInfo from "../components/section/company-info";
import Confirmation from "../components/section/confirmation";
import GeneralInfo from "../components/section/general-info";
import ItemsAndCosts from "../components/section/items-and-costs";

export const sections = {
  1: {
    section: <GeneralInfo />,
    label: "General",
  },
  2: {
    section: <CompanyInfo />,
    label: "Company",
  },
  3: {
    section: <ClientInfo />,
    label: "Client",
  },
  4: {
    section: <ItemsAndCosts />,
    label: "Items and costs",
  },
  5: {
    section: <Confirmation />,
    label: "Confirmation",
  },
};
