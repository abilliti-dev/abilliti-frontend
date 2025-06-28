import { createContext, Dispatch, SetStateAction, useState } from "react";

export type TMenuPages =
  | "home"
  | "finances"
  | "invoices"
  | "invoices/invoice-builder"
  | "jobs"
  | "settings"
  | "help";

export interface IDashboardContext {
  currentPage: TMenuPages;
  setCurrentPage: Dispatch<SetStateAction<TMenuPages>>;
}

export const DashboardContext = createContext<IDashboardContext | null>(null);

interface IDashboardProviderProps {
  children: React.ReactNode;
}

export default function DashboardContextProvider(props: IDashboardProviderProps) {
  const [currentPage, setCurrentPage] = useState<TMenuPages>("home");

  return (
    <DashboardContext.Provider value={{ currentPage, setCurrentPage }}>
      {props.children}
    </DashboardContext.Provider>
  );
}
