import AddressInputGroup from "@/screens/invoices/components/address-input-group";
import SectionContainer from "./section-container";
import CompanyInfoInputGroup from "@/screens/invoices/components/company-info-input-group";
import ClientInfoInputGroup from "@/screens/invoices/components/client-info-input-group";
import DateInputGroup from "@/screens/invoices/components/date-input-group";
import DescriptionInput from "@/components/input/description-input";

export default function GeneralInfo() {
  return (
    <SectionContainer>
      <div className="space-y-2.5">
        <div className="space-y-1.5">
          <DescriptionInput label="Job details" placeholder="Enter short job description" />
          <DateInputGroup />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Company information</label>
          <CompanyInfoInputGroup />
          <AddressInputGroup />
        </div>

        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Client information</label>
          <ClientInfoInputGroup />
          <AddressInputGroup />
        </div>
      </div>
    </SectionContainer>
  );
}
