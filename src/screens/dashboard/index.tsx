import DashboardLayout from "@/layouts/dashboard-layout";
import { useState } from "react";

export default function Dashboard() {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return <DashboardLayout></DashboardLayout>;
}
