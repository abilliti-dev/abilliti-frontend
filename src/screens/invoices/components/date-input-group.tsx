import DateInput from "@/components/input/date-input";
import InputGroup from "@/components/input/input-group";

export default function DateInputGroup() {
  return (
    <InputGroup
      row1Inputs={[
        (props) => <DateInput {...props} label="Issue date" />,
        (props) => <DateInput {...props} label="Due date" />,
      ]}
    />
  );
}
