import { Controller, useForm } from "react-hook-form";
import DateInputGroup from "@/screens/invoices/components/date-input-group";
import DescriptionInput from "@/components/input/description-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GeneralInvoiceInfoFormFields,
  generalInvoiceInfoSchema,
} from "@/types/schema/general-invoice-info-schema";

export default function GeneralInfo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GeneralInvoiceInfoFormFields>({
    resolver: zodResolver(generalInvoiceInfoSchema),
  });

  const submit = (data: unknown) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(submit)}>
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
        {errors.description && <p>{errors.description.message}</p>}
        <DateInputGroup control={control} />
      </div>
      <button type="submit">click</button>
    </form>
  );
}
