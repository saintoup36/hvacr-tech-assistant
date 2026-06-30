export default function WelcomeBanner({ styles }) {
  const hour = new Date().getHours();

  let greeting = "Welcome";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div style={styles.welcomeBanner}>
      <h2>{greeting} 👋</h2>

      <p>
        Welcome back to your HVAC/R Tech Assistant.
      </p>

      <p>
        Diagnose faster, repair smarter, and keep every customer
        organized.
      </p>
    </div>
  );
}