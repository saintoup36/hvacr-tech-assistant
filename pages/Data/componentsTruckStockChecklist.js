export default function TruckStockChecklist({
  truckStockItems,
  checkedTruckStock,
  toggleTruckStock,
  styles,
}) {
  return (
    <div style={styles.toolPanel}>
      <h3>Truck Stock Checklist</h3>

      {truckStockItems.map((item) => (
        <label key={item} style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={checkedTruckStock.includes(item)}
            onChange={() => toggleTruckStock(item)}
          />
          {item}
        </label>
      ))}
    </div>
  );
}