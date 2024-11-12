import { BriefcaseIcon, MailIcon, PhoneIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import ImageInput from "../../../components/input/image-input";
import { Control, Controller } from "react-hook-form";
import { CompanyInfoFormFields } from "@/types/schema/company-info-schema";
import { memo } from "react";

export interface CompanyInfoControlProps {
  control?: Control<CompanyInfoFormFields>;
}

const CompanyInfoInputGroup = memo((props: CompanyInfoControlProps) => {
  return (
    <InputGroup
      row1Inputs={[
        (inputProps) => (
          <Controller
            name="name"
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="Company name"
                placeholder="Enter your company name"
                Icon={BriefcaseIcon}
              />
            )}
          />
        ),
        (inputProps) => (
          <Controller
            name="image"
            control={props.control}
            render={({ field }) => <ImageInput {...field} {...inputProps} label="Upload Logo" />}
          />
        ),
      ]}
      row2Inputs={[
        (inputProps) => (
          <Controller
            name="email"
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="Email"
                placeholder="janedoe@gmail.com"
                Icon={MailIcon}
              />
            )}
          />
        ),
        (inputProps) => (
          <Controller
            name="phone"
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="Phone number"
                placeholder="(000) 000-0000"
                Icon={PhoneIcon}
              />
            )}
          />
        ),
      ]}
    />
  );
});

CompanyInfoInputGroup.displayName = "CompanyInfoInputGroup";
export default CompanyInfoInputGroup;
