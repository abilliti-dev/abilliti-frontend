import DateInput from "@/components/input/date-input";
import InputGroup from "@/components/input/input-group";
import { ControlProps } from "@/types/invoice-form-control-props";
import { Controller } from "react-hook-form";

export default function DateInputGroup(props: ControlProps) {
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
