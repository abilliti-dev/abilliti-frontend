import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import DashboardLayout from "@/layouts/dashboard-layout";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return <DashboardLayout></DashboardLayout>;
}
