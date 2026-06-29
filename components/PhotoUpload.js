export default function PhotoUpload({
  beforePreview,
  afterPreview,
  handlePhotoUpload,
  form,
  handleChange,
  styles,
}) {
  return (
    <>
      <h3 style={styles.sectionTitleChecks}>Before Repair Photo</h3>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handlePhotoUpload(e, "before")}
      />

      {beforePreview && (
        <img
          src={beforePreview}
          alt="Before Repair"
          style={styles.photoPreview}
        />
      )}

      <textarea
        name="beforePhotoNotes"
        placeholder="Before Photo Notes: what did you see before repair?"
        style={styles.textarea}
        value={form.beforePhotoNotes}
        onChange={handleChange}
      />

      <h3 style={styles.sectionTitleChecks}>After Repair Photo</h3>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={(e) => handlePhotoUpload(e, "after")}
      />

      {afterPreview && (
        <img
          src={afterPreview}
          alt="After Repair"
          style={styles.photoPreview}
        />
      )}

      <textarea
        name="afterPhotoNotes"
        placeholder="After Photo Notes: what changed after repair?"
        style={styles.textarea}
        value={form.afterPhotoNotes}
        onChange={handleChange}
      />
    </>
  );
}