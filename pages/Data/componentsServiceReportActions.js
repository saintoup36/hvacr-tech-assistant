export default function ServiceReportActions({
  copyServiceReport,
  copyInvoice,
  printFullReport,
  printInvoice,
  saveReport,
  styles,
}) {
  return (
    <>
      <button style={styles.secondaryButton} onClick={copyServiceReport}>
        Copy Full Report
      </button>

      <button style={styles.secondaryButton} onClick={copyInvoice}>
        Copy Invoice
      </button>

      <button style={styles.secondaryButton} onClick={printFullReport}>
        Print / Save Report as PDF
      </button>

      <button style={styles.secondaryButton} onClick={printInvoice}>
        Print / Save Invoice as PDF
      </button>

      <button style={styles.saveButton} onClick={saveReport}>
        Save Report
      </button>
    </>
  );
}