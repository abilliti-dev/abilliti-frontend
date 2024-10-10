import { DashboardContext } from "@/contexts/dashboard-context";
import { useContext } from "react";

export default function useDashboardContext() {
  const ctx = useContext(DashboardContext);

  if (!ctx) {
    throw new Error("useDashboardContext must be used within a DashboardContextProvider");
  }

  return ctx;
}
