import DateInput from "@/components/input/date-input";
import InputGroup from "@/components/input/input-group";
import { GeneralInvoiceInfoFormFields } from "@/types/schema/general-invoice-info-schema";
import { Control, Controller } from "react-hook-form";

interface DateInputGroupProps {
  // control: Control<GeneralInvoiceInfoFormFields>;
  control: Control<GeneralInvoiceInfoFormFields>;
}

export default function DateInputGroup(props: DateInputGroupProps) {
  const keyName = "date";

  return (
    <InputGroup
      row1Inputs={[
        (inputProps) => (
          <Controller
            name={`${keyName}.issue`}
            control={props.control}
            render={({ field }) => <DateInput {...field} {...inputProps} label="Issue date" />}
          />
        ),
        (inputProps) => (
          <Controller
            name={`${keyName}.due`}
            control={props.control}
            render={({ field }) => <DateInput {...field} {...inputProps} label="Due date" />}
          />
        ),
      ]}
    />
  );
}
