import InputGroup2x2 from "@/components/input/group/input-group-2x2";
import SectionContainer from "./section-container";
import TextInput from "@/components/input/text-input";

export default function GeneralInfo() {
  return (
    <SectionContainer>
      <InputGroup2x2
        Input1={(props) => <TextInput {...props} label="Test" />}
        Input2={TextInput}
        Input3={TextInput}
        Input4={TextInput}
      />
    </SectionContainer>
  );
}
