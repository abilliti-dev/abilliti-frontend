import ClientAddressInputGroup from "@/screens/invoices/components/client-address-input-group";
import ClientInfoInputGroup from "@/screens/invoices/components/client-info-input-group";
import { ClientInfoFormFields, clientInfoSchema } from "@/types/schema/client-info-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function ClientInfo() {
  const {
    // handleSubmit,
    control,
    // formState: { errors },
  } = useForm<ClientInfoFormFields>({
    resolver: zodResolver(clientInfoSchema),
  });

  return (
    <div className="space-y-1.5">
      {/* <label className="text-sm text-neutral-500 font-medium">Client information</label> */}
      <ClientInfoInputGroup control={control} />
      <ClientAddressInputGroup control={control} />
    </div>
  );
}
