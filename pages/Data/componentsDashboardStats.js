export default function DashboardStats({ savedReports, styles }) {
  const reports = savedReports || [];

  const totalJobs = reports.length;

  const completedJobs = reports.filter(
    (report) => report.jobStatus === "Completed"
  ).length;

  const openJobs = reports.filter(
    (report) => report.jobStatus !== "Completed"
  ).length;

  const totalRevenue = reports.reduce((sum, report) => {
    return sum + Number(report.estimateTotal || 0);
  }, 0);

  return (
    <div style={styles.dashboardGrid}>
      <div style={styles.statCard}>
        <h3>Total Jobs</h3>
        <p>{totalJobs}</p>
      </div>

      <div style={styles.statCard}>
        <h3>Completed</h3>
        <p>{completedJobs}</p>
      </div>

      <div style={styles.statCard}>
        <h3>Open Jobs</h3>
        <p>{openJobs}</p>
      </div>

      <div style={styles.statCard}>
        <h3>Total Estimates</h3>
        <p>${totalRevenue.toFixed(2)}</p>
      </div>
    </div>
  );
}