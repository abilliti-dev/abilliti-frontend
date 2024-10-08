import AddressInputGroup from "@/screens/invoices/components/address-input-group";
import SectionContainer from "./section-container";
import CompanyInfoInputGroup from "@/screens/invoices/components/company-info-input-group";
import ClientInfoInputGroup from "@/screens/invoices/components/client-info-input-group";

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
