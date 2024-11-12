import InputError from "@/components/input/error/InputError";
import CompanyAddressInputGroup from "@/screens/invoices/components/company-address-input-group";
import CompanyInfoInputGroup from "@/screens/invoices/components/company-info-input-group";
import { CompanyInfoFormFields, companyInfoSchema } from "@/types/schema/company-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function CompanyInfo() {
  const {
    handleSubmit,
    control,
    // watch,
    formState: { errors },
  } = useForm<CompanyInfoFormFields>({
    resolver: zodResolver(companyInfoSchema),
  });

  // const name = watch("name");

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
      <div className="space-y-2.5">
        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Company details</label>
          <CompanyInfoInputGroup control={control} />
          <InputError
            fieldErrors={[
              { name: "Company name", error: errors.name },
              { name: "Upload logo", error: errors.image },
              { name: "Email", error: errors.email },
              { name: "Phone", error: errors.phone },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Company address</label>
          <CompanyAddressInputGroup control={control} />
          <InputError
            fieldErrors={[
              { name: "Street", error: errors.address?.street },
              { name: "City", error: errors.address?.city },
              { name: "State", error: errors.address?.state },
              { name: "Zip code", error: errors.address?.zipCode },
            ]}
          />
        </div>
      </div>
      <button type="submit">[temp button]</button>
    </form>
  );
}
