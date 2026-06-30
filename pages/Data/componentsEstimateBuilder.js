export default function EstimateBuilder({
  form,
  handleChange,
  estimateSubtotal,
  estimateTax,
  estimateTotal,
  formatMoney,
  styles,
}) {
  return (
    <div style={styles.toolPanel}>
      <h3>Estimate Builder</h3>

      <input
        name="serviceFee"
        placeholder="Service Fee"
        style={styles.input}
        value={form.serviceFee}
        onChange={handleChange}
      />

      <input
        name="laborHours"
        placeholder="Labor Hours"
        style={styles.input}
        value={form.laborHours}
        onChange={handleChange}
      />

      <input
        name="hourlyRate"
        placeholder="Hourly Rate"
        style={styles.input}
        value={form.hourlyRate}
        onChange={handleChange}
      />

      <input
        name="partsCost"
        placeholder="Parts Cost"
        style={styles.input}
        value={form.partsCost}
        onChange={handleChange}
      />

      <input
        name="taxPercent"
        placeholder="Tax %"
        style={styles.input}
        value={form.taxPercent}
        onChange={handleChange}
      />

      <input
        name="discount"
        placeholder="Discount"
        style={styles.input}
        value={form.discount}
        onChange={handleChange}
      />

      <div style={styles.invoiceBox}>
        <p>Subtotal: {formatMoney(estimateSubtotal())}</p>
        <p>Tax: {formatMoney(estimateTax())}</p>
        <p>Discount: {formatMoney(form.discount)}</p>
        <h3>Total: {formatMoney(estimateTotal())}</h3>
      </div>
    </div>
  );
}