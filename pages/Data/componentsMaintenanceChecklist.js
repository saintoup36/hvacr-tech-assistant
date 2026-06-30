export default function MaintenanceChecklist({
  maintenanceLibrary,
  maintenanceType,
  setMaintenanceType,
  styles,
}) {
  return (
    <div style={styles.toolPanel}>
      <h3>Maintenance Checklist</h3>

      <select
        style={styles.input}
        value={maintenanceType}
        onChange={(e) => setMaintenanceType(e.target.value)}
      >
        <option value="coolingPM">Cooling PM</option>
        <option value="heatingPM">Heating PM</option>
        <option value="refrigerationPM">Refrigeration PM</option>
      </select>

      <h4>{maintenanceLibrary[maintenanceType].title}</h4>

      <ul>
        {maintenanceLibrary[maintenanceType].items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}