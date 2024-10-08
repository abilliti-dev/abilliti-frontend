import { BriefcaseIcon, MailIcon, PhoneIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import ImageInput from "../../../components/input/image-input";

export default function CompanyInfoInputGroup() {
  return (
    <InputGroup
      row1Inputs={[
        (props) => (
          <TextInput
            {...props}
            label="Company name"
            placeholder="Enter your company name"
            Icon={BriefcaseIcon}
          />
        ),
        (props) => <ImageInput {...props} label="Upload Logo" />,
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
