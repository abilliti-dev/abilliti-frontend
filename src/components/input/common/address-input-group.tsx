import { Building2Icon, BuildingIcon, HashIcon, MapPinIcon } from "lucide-react";
import InputGroup from "../input-group";
import TextInput from "../text-input";

export default function AddressInputGroup() {
  return (
    <InputGroup
      row1Inputs={[
        (props) => (
          <TextInput {...props} label="Street" placeholder="Enter an address" Icon={MapPinIcon} />
        ),
      ]}
      row2Inputs={[
        (props) => (
          <TextInput {...props} label="City" placeholder="Enter a city" Icon={BuildingIcon} />
        ),
        (props) => (
          <TextInput {...props} label="State" placeholder="Enter a state" Icon={Building2Icon} />
        ),
        (props) => <TextInput {...props} label="Zip code" placeholder="00000" Icon={HashIcon} />,
      ]}
    />
  );
}
