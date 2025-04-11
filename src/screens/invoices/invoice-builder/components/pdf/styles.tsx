import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  tableContainer: {
    rowGap: 6,
  },

  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  tableColumnWidthPrimary: {
    width: "290px",
    textAlign: "left",
  },

  tableColumnWidthSecondary: {
    width: "60px",
    textAlign: "right",
  },

  tableDivider: {
    height: 1,
    width: 495,
    backgroundColor: "#262626",
  },

  fontSemibold: {
    fontWeight: 600,
  },

  title: {
    fontSize: 24,
    fontWeight: 600,
    color: "#262626",
  },

  invoiceDetailsContainer: {
    fontSize: "12px",
    padding: "30px 50px",
  },

  itemsAndCostsContainer: {
    backgroundColor: "#e5e5e5",
    fontSize: "12px",
    padding: "20px 50px",
  },

  notes: {
    maxWidth: "300px",
  },

  ySpaceSmall: {
    rowGap: 8,
  },

  ySpaceMedium: {
    rowGap: 16,
  },

  ySpaceLarge: {
    rowGap: 24,
  },

  h1: {
    fontWeight: 500,
    fontSize: 14,
  },

  h2: {
    color: "#8E8E8E",
    fontSize: 9,
    fontWeight: 600,
  },

  costsContainer: {
    width: 180,
  },

  flexRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  logo: {
    width: 100,
    height: 100,
    objectFit: "cover",
  },

  footer: {
    position: "absolute",
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 10,
    color: "grey",
  },
});
