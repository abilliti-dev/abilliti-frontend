import { BriefcaseIcon, MailIcon, PhoneIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import ImageInput from "../../../components/input/image-input";
import { InvoiceFormControlProps } from "@/types/invoice-form-control-props";
import { Controller } from "react-hook-form";

export default function CompanyInfoInputGroup(props: InvoiceFormControlProps) {
  const keyName = "company.info";

  return (
    <InputGroup
      row1Inputs={[
        (inputProps) => (
          <Controller
            name={`${keyName}.name`}
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
            name={`${keyName}.image`}
            control={props.control}
            render={({ field }) => <ImageInput {...field} {...inputProps} label="Upload Logo" />}
          />
        ),
      ]}
      row2Inputs={[
        (inputProps) => (
          <Controller
            name={`${keyName}.email`}
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
            name={`${keyName}.phone`}
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
}
