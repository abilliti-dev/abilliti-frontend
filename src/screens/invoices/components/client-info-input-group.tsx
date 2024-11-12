import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import { Control, Controller } from "react-hook-form";
import { ClientInfoFormFields } from "@/types/schema/client-info-schema";

export interface CompanyInfoControlProps {
  control?: Control<ClientInfoFormFields>;
}

export default function ClientInfoInputGroup(props: CompanyInfoControlProps) {
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
}
