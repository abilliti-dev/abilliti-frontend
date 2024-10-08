import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";

export default function ClientInfoInputGroup() {
  return (
    <InputGroup
      row1Inputs={[
        (props) => (
          <TextInput
            {...props}
            label="Client name"
            placeholder="Enter a client name"
            Icon={UserIcon}
          />
        ),
      ]}
      row2Inputs={[
        (props) => (
          <TextInput {...props} label="Email" placeholder="janedoe@gmail.com" Icon={MailIcon} />
        ),
        (props) => (
          <TextInput
            {...props}
            label="Phone number"
            placeholder="(000) 000-0000"
            Icon={PhoneIcon}
          />
        ),
      ]}
    />
  );
}
