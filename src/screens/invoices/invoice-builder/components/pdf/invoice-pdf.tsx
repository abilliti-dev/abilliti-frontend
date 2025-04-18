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

  const edgePageMaxRows = 18; // max rows on first/last page
  const midPageMaxRows = 33; // max rows on pages in-between

  const processItemsInChunks = () => {
    const items = itemsAndCosts.items;
    const chunks = [];

    if (items.length <= edgePageMaxRows) {
      chunks.push(items);
    } else {
      // first chunk
      chunks.push(items.slice(0, 18));

      const remainingItems = items.slice(18);

      // process middle chunks
      const middleCount = Math.floor((remainingItems.length - edgePageMaxRows) / midPageMaxRows);
      for (let i = 0; i < middleCount; i++) {
        chunks.push(remainingItems.slice(i * midPageMaxRows, i * midPageMaxRows + midPageMaxRows));
      }

      const consumed = middleCount * 33;
      const remainingAfterMiddle = remainingItems.slice(consumed);

      // last chunk
      if (remainingAfterMiddle.length > 0) {
        chunks.push(remainingAfterMiddle);
      }
    }

    return chunks;
  };

  const chunkedItems = processItemsInChunks();

  return (
    <Document>
      {chunkedItems.map((chunk, pageIndex) => (
        <Page size="A4" style={styles.ySpaceLarge} key={pageIndex}>
          {pageIndex === 0 && (
            <View style={[styles.invoiceDetailsContainer, styles.ySpaceLarge]}>
              <View style={[styles.flexRow]}>
                <View style={styles.ySpaceMedium}>
                  <View>
                    <Text style={styles.title}>INVOICE</Text>
                    <Text>Invoice ID (Generated)</Text>
                  </View>

                  <View style={styles.ySpaceSmall}>
                    <Text style={[styles.h1, styles.fontSemibold]}>
                      {company.name || "[company name]"}
                    </Text>

                    <View>
                      <Text>{company.address.street || "[street address]"}</Text>
                      <Text>
                        {company.address.city || "[city]"}, {company.address.state || "[state]"}{" "}
                        {company.address.zipCode || "[zip code]"}
                      </Text>
                      <Text>{company.phone || "[phone number]"}</Text>
                      <Text>{company.email || "[email address]"}</Text>
                    </View>
                  </View>
                </View>

                <Image src={props.invoice.company.image} style={styles.logo} />
              </View>

              <View style={styles.flexRow}>
                <View style={[styles.ySpaceMedium, styles.maxWidthSmall]}>
                  <Text style={styles.h2}>BILLED TO</Text>
                  <View>
                    <Text>{client.name || "[client name]"}</Text>
                    <Text>
                      {client.address.city || "[city]"}, {client.address.state || "[state]"}{" "}
                      {client.address.zipCode || "[zip code]"}
                    </Text>
                    <Text>{client.phone || "[phone number]"}</Text>
                    <Text>{client.email || "[email address]"}</Text>
                  </View>
                </View>

                <View style={[styles.ySpaceMedium, styles.maxWidthSmall]}>
                  <Text style={styles.h2}>JOB DETAILS</Text>
                  <Text>{general.description || "[job details]"}</Text>
                </View>

                <View style={styles.ySpaceMedium}>
                  <View style={[styles.ySpaceMedium, styles.maxWidthSmall]}>
                    <Text style={styles.h2}>INVOICE DATE</Text>
                    <Text>{new Date(general.date.issue).toLocaleDateString()}</Text>
                  </View>

                  <View style={styles.ySpaceMedium}>
                    <Text style={styles.h2}>PAYMENT DUE</Text>
                    <Text>
                      {general.date.due
                        ? new Date(general.date.due).toLocaleDateString()
                        : "[mm/dd/yyyy]"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          )}

          <View
            style={[
              styles.itemsAndCostsContainer,
              styles.ySpaceMedium,
              { marginTop: pageIndex > 0 ? 40 : 0 },
            ]}
          >
            <ItemsTable>
              {chunk.map((item, i) => (
                <ItemsTableData item={item} key={i} />
              ))}
            </ItemsTable>

            {pageIndex === chunkedItems.length - 1 && (
              <View style={styles.flexRow}>
                <View style={styles.maxWidthMedium}>
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
            )}
          </View>

          <View style={styles.footer}>
            <Text>
              Page {pageIndex + 1} of {chunkedItems.length}
            </Text>
            <Text>Generated using Abilliti</Text>
          </View>
        </Page>
      ))}
    </Document>
  );
}
