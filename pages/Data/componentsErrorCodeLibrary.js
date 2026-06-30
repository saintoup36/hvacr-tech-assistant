export default function ErrorCodeLibrary({
  errorCodeLibrary,
  selectedError,
  form,
  handleChange,
  styles,
}) {
  return (
    <div style={styles.toolPanel}>
      <h3>Error Code Library</h3>

      <select
        name="errorBrand"
        style={styles.input}
        value={form.errorBrand}
        onChange={handleChange}
      >
        {Object.keys(errorCodeLibrary).map((brand) => (
          <option key={brand} value={brand}>
            {brand}
          </option>
        ))}
      </select>

      <select
        name="errorCode"
        style={styles.input}
        value={form.errorCode}
        onChange={handleChange}
      >
        {errorCodeLibrary[form.errorBrand].map((item) => (
          <option key={item.code} value={item.code}>
            {item.code}
          </option>
        ))}
      </select>

      {selectedError && (
        <div style={styles.infoCard}>
          <p>
            <strong>Meaning:</strong> {selectedError.meaning}
          </p>
          <p>
            <strong>First Checks:</strong> {selectedError.checks}
          </p>
        </div>
      )}
    </div>
  );
}