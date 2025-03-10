import { Building2Icon, BuildingIcon, HashIcon, MapPinIcon } from "lucide-react";
import InputGroup from "../../../components/input/input-group";
import TextInput from "../../../components/input/text-input";
import { Control, Controller } from "react-hook-form";
import { CompanyInfoFormFields } from "@/types/schema/company-info-schema";
import { memo } from "react";

export interface CompanyAddressInputGroupProps {
  control?: Control<CompanyInfoFormFields>;
}

const CompanyAddressInputGroup = memo((props: CompanyAddressInputGroupProps) => {
  const keyName = "address";

  return (
    <InputGroup
      row1Inputs={[
        (inputProps) => (
          <Controller
            name={`${keyName}.street`}
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
            name={`${keyName}.city`}
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
            name={`${keyName}.state`}
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
            name={`${keyName}.zipCode`}
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
});

CompanyAddressInputGroup.displayName = "CompanyAddressInputGroup";
export default CompanyAddressInputGroup;
