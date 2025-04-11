import { Item } from "@/types/item";
import { Text, View } from "@react-pdf/renderer";
import { styles } from "../styles";
import { calculateAmount } from "../../../util/calculate";
import formatMoney from "../../../util/format-money";

interface ItemsTableDataProps {
  item: Item;
}

const ItemsTableData = (props: ItemsTableDataProps) => {
  const amt = calculateAmount(props.item.unitCost, props.item.quantity);

  return (
    <View style={styles.tableRow}>
      <Text style={styles.tableColumnWidthPrimary}>{props.item.description}</Text>
      <Text style={styles.tableColumnWidthSecondary}>
        {props.item.unitCost === "0" ? "$0.00" : props.item.unitCost}
      </Text>
      <Text style={styles.tableColumnWidthSecondary}>{props.item.quantity}</Text>
      <Text style={styles.tableColumnWidthSecondary}>{amt ? formatMoney(amt) : "$0.00"}</Text>
    </View>
  );
};

export default ItemsTableData;
