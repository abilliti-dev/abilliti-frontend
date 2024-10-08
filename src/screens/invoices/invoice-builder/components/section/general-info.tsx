import CompanyInfoInputGroup from "@/components/input/common/company-info-input-group";
import SectionContainer from "./section-container";
import AddressInputGroup from "@/components/input/common/address-input-group";
import ClientInfoInputGroup from "@/components/input/common/client-info-input-group";

export default function GeneralInfo() {
  return (
    <SectionContainer>
      <div className="space-y-2">
        <CompanyInfoInputGroup />
        <AddressInputGroup />

        <ClientInfoInputGroup />
        <AddressInputGroup />
      </div>
    </SectionContainer>
  );
}
