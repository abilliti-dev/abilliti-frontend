import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import { InvoiceFormControlProps } from "@/types/invoice-form-control-props";
import { Controller } from "react-hook-form";

export default function ClientInfoInputGroup(props: InvoiceFormControlProps) {
  const keyName = "client.info";

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
                label="Client name"
                placeholder="Enter a client name"
                Icon={UserIcon}
              />
            )}
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
