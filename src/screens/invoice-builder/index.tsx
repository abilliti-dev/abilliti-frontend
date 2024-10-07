import TextInput from "@/components/invoice-builder/text-input/text-input";
import { BriefcaseIcon } from "lucide-react";

export default function InvoiceBuilderPage() {
  return (
    <div className="relative flex place-items-center justify-center pt-20">
      <TextInput label="Label" Icon={BriefcaseIcon} placeholder="Placeholder" />
    </div>
  );
}
