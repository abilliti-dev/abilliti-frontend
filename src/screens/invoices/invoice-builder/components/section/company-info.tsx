import CompanyAddressInputGroup from "@/screens/invoices/components/company-address-input-group";
import CompanyInfoInputGroup from "@/screens/invoices/components/company-info-input-group";
import { CompanyInfoFormFields, companyInfoSchema } from "@/types/schema/company-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CompanyInfo() {
  const {
    // handleSubmit,
    control,
    // formState: { errors },
  } = useForm<CompanyInfoFormFields>({
    resolver: zodResolver(companyInfoSchema),
  });

  return (
    <div className="space-y-1.5">
      {/* <label className="text-sm text-neutral-500 font-medium">Company information</label> */}
      <CompanyInfoInputGroup control={control} />
      <CompanyAddressInputGroup control={control} />
    </div>
  );
}
