import { Controller, useForm } from "react-hook-form";
import DateInputGroup from "@/screens/invoices/components/date-input-group";
import DescriptionInput from "@/components/input/description-input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  GeneralInvoiceInfoFormFields,
  generalInvoiceInfoSchema,
} from "@/types/schema/general-invoice-info-schema";
import InputError from "@/components/input/error/InputError";
// import { ErrorMessage } from "@hookform/error-message";

export default function GeneralInfo() {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<GeneralInvoiceInfoFormFields>({
    resolver: zodResolver(generalInvoiceInfoSchema),
    defaultValues: {
      date: {
        issue: new Date(),
      },
    },
  });

  return (
    <form onSubmit={handleSubmit((data) => console.log(data))}>
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
        {/* <ErrorMessage
          errors={errors}
          name="description"
          render={({ message }) => <p>{message}</p>}
        /> */}
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
