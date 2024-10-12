import DescriptionInput from "@/components/input/description-input";
import InputGroup from "@/components/input/input-group";
import TextInput from "@/components/input/text-input";
import ItemTable from "@/screens/invoices/components/item-table";

export default function ItemsAndCosts() {
  return (
    <div className="space-y-8">
      <ItemTable />

      <div className="flex space-x-2">
        <div className="w-1/2">
          <DescriptionInput
            label="Notes"
            placeholder="Enter notes, comments, or terms/conditions"
          />
        </div>
        <div className="space-y-2 w-1/2">
          <div className="flex justify-between px-2 text-sm text-neutral-600 font-medium">
            <span>Subtotal</span>
            <span>$0.00</span>
          </div>
          <InputGroup
            row1Inputs={[(props) => <TextInput {...props} />]}
            row2Inputs={[(props) => <TextInput {...props} />]}
          />
          <div className="flex justify-between px-2 text-sm text-neutral-600 font-semibold">
            <span>Total</span>
            <span>$0.00</span>
          </div>
        </div>
      </div>
    </div>
  );
}
