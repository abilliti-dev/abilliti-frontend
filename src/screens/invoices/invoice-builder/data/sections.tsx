import Confirmation from "../components/section/confirmation";
import GeneralInfo from "../components/section/general-info";
import ItemsAndCosts from "../components/section/items-and-costs";

export const sections = {
  1: {
    section: <GeneralInfo />,
    label: "General info",
  },
  2: {
    section: <ItemsAndCosts />,
    label: "Items and costs",
  },
  3: {
    section: <Confirmation />,
    label: "Confirmation",
  },
};
