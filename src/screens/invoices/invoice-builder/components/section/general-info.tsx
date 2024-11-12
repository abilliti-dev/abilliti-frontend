import { Controller, useForm } from "react-hook-form";
import DateInputGroup from "@/screens/invoices/components/date-input-group";
import DescriptionInput from "@/components/input/description-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GeneralInvoiceInfoFormFields,
  generalInvoiceInfoSchema,
} from "@/types/schema/general-invoice-info-schema";
import InputError from "@/components/input/error/InputError";

export default function GeneralInfo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GeneralInvoiceInfoFormFields>({
    resolver: zodResolver(generalInvoiceInfoSchema),
    // defaultValues: {
    //   date: {
    //     issue: new Date(),
    //   },
    // },
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
        <InputError fieldErrors={[{ name: "Job details", error: errors.description }]} />
        <DateInputGroup control={control} />
        <InputError
          fieldErrors={[
            { name: "Issue date", error: errors.date?.issue },
            { name: "Due date", error: errors.date?.due },
          ]}
        />
      </div>
      <button type="submit">[temp submit]</button>
    </form>
  );
}
