import { InvoiceForm } from "@/types/invoice-form";
import { Document, Page, View, Text, Image } from "@react-pdf/renderer";
import ItemsTable from "./table/items-table";
import ItemsTableData from "./table/items-table-data";
import { styles } from "./styles";
import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  taxRateStringToNumber,
} from "../../util/calculate";
import formatMoney from "../../util/format-money";

interface InvoicePDFProps {
  invoice: InvoiceForm;
}

export default function InvoicePDF(props: InvoicePDFProps) {
  const { general, company, client, itemsAndCosts } = props.invoice;
  const subtotal = calculateSubtotal(itemsAndCosts.items);
  const total = calculateTotal(itemsAndCosts.taxRate, itemsAndCosts.discount, subtotal);
  const taxRate = taxRateStringToNumber(props.invoice.itemsAndCosts.taxRate);
  const tax = calculateTax(subtotal, taxRate);

  return (
    <Document>
      <Page size="A4" style={styles.ySpaceLarge}>
        <View style={[styles.invoiceDetailsContainer, styles.ySpaceLarge]}>
          <View style={[styles.flexRow]}>
            <View style={styles.ySpaceMedium}>
              <View>
                <Text style={styles.title}>INVOICE</Text>
                <Text>Invoice ID (Generated)</Text>
              </View>

              <View style={styles.ySpaceSmall}>
                <Text style={styles.h1}>{company.name || "Company name"}</Text>

                <View>
                  <Text>{company.address.street || "Street"}</Text>
                  <Text>
                    {company.address.city || "City"}, {company.address.state || "State"}{" "}
                    {company.address.zipCode || "Zip code"}
                  </Text>
                  <Text>{company.phone || "Phone number"}</Text>
                  <Text>{company.email || "Email address"}</Text>
                </View>
              </View>
            </View>

            <Image src={props.invoice.company.image} style={styles.logo} />
          </View>

          <View style={styles.flexRow}>
            <View style={styles.ySpaceMedium}>
              <Text style={styles.h2}>BILLED TO</Text>
              <View>
                <Text>{client.name || "Client name"}</Text>
                <Text>
                  {client.address.city || "City"}, {client.address.state || "State"}{" "}
                  {client.address.zipCode || "Zip code"}
                </Text>
                <Text>{client.phone || "Phone number"}</Text>
                <Text>{client.email || "Email address"}</Text>
              </View>
            </View>

            <View style={styles.ySpaceMedium}>
              <Text style={styles.h2}>JOB DETAILS</Text>
              <Text>{general.description || "Job description"}</Text>
            </View>

            <View style={styles.ySpaceMedium}>
              <View style={styles.ySpaceMedium}>
                <Text style={styles.h2}>INVOICE DATE</Text>
                <Text>{new Date(general.date.issue).toLocaleDateString()}</Text>
              </View>

              <View style={styles.ySpaceMedium}>
                <Text style={styles.h2}>PAYMENT DUE</Text>
                <Text>
                  {general.date.due ? new Date(general.date.due).toLocaleDateString() : "N/A"}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.itemsAndCostsContainer, styles.ySpaceMedium]}>
          <ItemsTable>
            {itemsAndCosts.items.map((item, i) => (
              <ItemsTableData item={item} key={i} />
            ))}
          </ItemsTable>

          <View style={styles.flexRow} break>
            <View>
              <Text style={styles.fontSemibold}>Notes</Text>
              <Text>{itemsAndCosts.notes || "Enter notes, comments, or terms/conditions"}</Text>
            </View>

            <View style={[styles.ySpaceMedium, styles.costsContainer]}>
              <View>
                <View style={styles.flexRow}>
                  <Text>Subtotal</Text>
                  <Text>{formatMoney(subtotal)}</Text>
                </View>

                <View style={styles.flexRow}>
                  <Text>Tax rate</Text>
                  <Text>
                    {itemsAndCosts.taxRate && itemsAndCosts.taxRate !== "0"
                      ? itemsAndCosts.taxRate
                      : "0.0%"}
                  </Text>
                </View>

                <View style={styles.flexRow}>
                  <Text>Tax</Text>
                  <Text>+ {formatMoney(tax)}</Text>
                </View>

                <View style={styles.flexRow}>
                  <Text>Discount</Text>
                  <Text>
                    -{" "}
                    {itemsAndCosts.discount && itemsAndCosts.discount !== "0"
                      ? itemsAndCosts.discount
                      : "$0.00"}
                  </Text>
                </View>
              </View>

              <View style={[styles.flexRow, styles.fontSemibold]}>
                <Text>Total</Text>
                <Text>{formatMoney(total)}</Text>
              </View>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
}
