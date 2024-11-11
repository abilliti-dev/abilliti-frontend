import AddressInputGroup from "@/screens/invoices/components/address-input-group";
import { Controller, useForm } from "react-hook-form";
import CompanyInfoInputGroup from "@/screens/invoices/components/company-info-input-group";
import ClientInfoInputGroup from "@/screens/invoices/components/client-info-input-group";
import DateInputGroup from "@/screens/invoices/components/date-input-group";
import DescriptionInput from "@/components/input/description-input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { invoiceFormSchema } from "@/types/schema/invoice-form-schema";

type FormFields = z.infer<typeof invoiceFormSchema>;

export default function GeneralInfo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormFields>({
    resolver: zodResolver(invoiceFormSchema),
  });

  const submit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="space-y-2.5">
        <div className="space-y-1.5">
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <DescriptionInput
                {...field}
                label="Job details"
                placeholder="Enter short job description"
              />
            )}
          />
          {/* {errors.description && <p>{errors.description.message}</p>} */}
          <DateInputGroup control={control} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Company information</label>
          <CompanyInfoInputGroup control={control} />
          <AddressInputGroup keyName="company.address" control={control} />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Client information</label>
          <ClientInfoInputGroup control={control} />
          <AddressInputGroup keyName="client.address" control={control} />
        </div>
      </div>
      <button type="submit">click</button>
    </form>
  );
}
