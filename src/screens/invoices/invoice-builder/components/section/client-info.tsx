import InputError from "@/components/input/error/InputError";
import ClientAddressInputGroup from "@/screens/invoices/components/client-address-input-group";
import ClientInfoInputGroup from "@/screens/invoices/components/client-info-input-group";
import { ClientInfoFormFields, clientInfoSchema } from "@/types/schema/client-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InvoiceFormSection, { InvoiceFormSectionProps } from "../invoice-form-section";

export default function ClientInfo(props: InvoiceFormSectionProps) {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ClientInfoFormFields>({
    resolver: zodResolver(clientInfoSchema),
  });

  return (
    <InvoiceFormSection {...props} handleSubmit={handleSubmit}>
      <div className="space-y-2.5">
        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Client details</label>
          <ClientInfoInputGroup control={control} />
          <InputError
            fieldErrors={[
              { name: "Client name", error: errors.name },
              { name: "Email", error: errors.email },
              { name: "Phone", error: errors.phone },
            ]}
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm text-neutral-500 font-medium">Client address</label>
          <ClientAddressInputGroup control={control} />
          <InputError
            fieldErrors={[
              { name: "Street", error: errors.address?.street },
              { name: "City", error: errors.address?.city },
              { name: "State", error: errors.address?.state },
              { name: "Zip code", error: errors.address?.zipCode },
            ]}
          />
        </div>
      </div>
    </InvoiceFormSection>
  );
}
