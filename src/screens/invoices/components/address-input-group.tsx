import { Building2Icon, BuildingIcon, HashIcon, MapPinIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import { Controller } from "react-hook-form";
import { InvoiceFormControlProps } from "@/types/invoice-form-control-props";

interface AddressInputGroupProps extends InvoiceFormControlProps {
  keyName: "company.address" | "client.address";
}

export default function AddressInputGroup(props: AddressInputGroupProps) {
  return (
    <InputGroup
      row1Inputs={[
        (inputProps) => (
          <Controller
            name={`${props.keyName}.street`}
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="Street"
                placeholder="Enter an address"
                Icon={MapPinIcon}
              />
            )}
          />
        ),
      ]}
      row2Inputs={[
        (inputProps) => (
          <Controller
            name={`${props.keyName}.city`}
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="City"
                placeholder="Enter a city"
                Icon={BuildingIcon}
              />
            )}
          />
        ),
        (inputProps) => (
          <Controller
            name={`${props.keyName}.state`}
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="State"
                placeholder="Enter a state"
                Icon={Building2Icon}
              />
            )}
          />
        ),
        (inputProps) => (
          <Controller
            name={`${props.keyName}.zipCode`}
            control={props.control}
            render={({ field }) => (
              <TextInput
                {...field}
                {...inputProps}
                label="Zip code"
                placeholder="00000"
                Icon={HashIcon}
              />
            )}
          />
        ),
      ]}
    />
  );
}
