import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Menu } from "lucide-react";
import { useState } from "react";

export default function Dashboard() {
  const [displaySidebar, setDisplaySidebar] = useState(false);

  return (
    <section className="h-screen flex flex-col">
      <div className="px-3 py-1 shadow-sm">
        <Button
          variant="ghost"
          className=""
          size="icon"
          onClick={() => setDisplaySidebar((prev) => !prev)}
        >
          <Menu size={32} />
        </Button>
      </div>
      <Separator className="bg-gray-light" />
      {displaySidebar && (
        <div className="w-[300px] px-3 py-1 flex-1 bg-gray-light">
          <h1>Hello</h1>
        </div>
      )}
    </section>
  );
}
