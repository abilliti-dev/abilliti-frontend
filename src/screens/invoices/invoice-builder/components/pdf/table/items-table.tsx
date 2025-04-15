import { View, Text } from "@react-pdf/renderer";
import { ReactElement } from "react";
import ItemsTr from "./items-table-data";
import { styles } from "../styles";

interface ItemTableProps {
  children: ReactElement<typeof ItemsTr> | ReactElement<typeof ItemsTr>[];
}

const ItemsTable = (props: ItemTableProps) => (
  <View style={styles.tableContainer}>
    <View style={[styles.tableRow, styles.fontSemibold]}>
      <Text style={styles.tableColumnWidthPrimary}>Item</Text>
      <Text style={styles.tableColumnWidthSecondary}>Unit cost</Text>
      <Text style={styles.tableColumnWidthSecondary}>Quantity</Text>
      <Text style={styles.tableColumnWidthSecondary}>Amount</Text>
    </View>
    <View style={styles.tableDivider} />
    {props.children}
    <View style={styles.tableDivider} />
  </View>
);

export default ItemsTable;
