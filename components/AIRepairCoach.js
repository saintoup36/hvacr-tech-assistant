export default function AIRepairCoach({ currentTest, styles }) {
  if (!currentTest) return null;

  const title = currentTest.title.toLowerCase();

  let explanation =
    "This test helps isolate the failed component, circuit, or operating condition before replacing parts.";

  let warning =
    "Always follow safety procedures and verify power conditions before touching wires or components.";

  let nextStep =
    "Record the reading, compare it to the expected value, and continue the workflow.";

  if (title.includes("line voltage")) {
    explanation =
      "We check line voltage first because the equipment cannot operate if proper power is not reaching it.";
    warning =
      "This is a high-voltage test. Keep one hand clear, use insulated probes, and do not touch live terminals.";
    nextStep =
      "If voltage is missing, check the breaker, disconnect, fuse, wiring, or incoming power source.";
  }

  if (title.includes("contactor") || title.includes("coil voltage")) {
    explanation =
      "We check the contactor coil because the thermostat must send about 24 volts to pull the contactor in.";
    warning =
      "Stay clear of the high-voltage side of the contactor while testing the low-voltage coil.";
    nextStep =
      "If 24 volts is present but the contactor does not pull in, the contactor coil may be failed.";
  }

  if (title.includes("capacitor") || title.includes("c to herm") || title.includes("c to fan")) {
    explanation =
      "We test the capacitor because a weak capacitor can prevent a compressor or fan motor from starting properly.";
    warning =
      "Turn power off and discharge the capacitor before testing. Never test capacitance on a live circuit.";
    nextStep =
      "If the reading is more than 6 percent below the rating, replace the capacitor.";
  }

  if (title.includes("common to run") || title.includes("common to start") || title.includes("start to run")) {
    explanation =
      "We test compressor windings to confirm the internal motor windings are not open, shorted, or out of expected relationship.";
    warning =
      "Power must be off before resistance testing. Never use ohms on an energized circuit.";
    nextStep =
      "Compare all three readings. Start-to-run should equal common-to-start plus common-to-run.";
  }

  if (title.includes("to ground")) {
    explanation =
      "We test to ground to make sure the compressor or motor is not shorted to the equipment frame.";
    warning =
      "A short to ground is serious. Do not continue operating the equipment if continuity to ground is found.";
    nextStep =
      "If any terminal shows continuity to ground, stop diagnosis and treat the component as unsafe or failed.";
  }

  if (title.includes("superheat")) {
    explanation =
      "Superheat helps show whether the evaporator is being properly fed with refrigerant.";
    warning =
      "Wear gloves and eye protection when working around refrigerant lines and gauges.";
    nextStep =
      "High superheat may point toward low charge, restriction, or evaporator starvation.";
  }

  if (title.includes("subcooling")) {
    explanation =
      "Subcooling helps show whether there is enough liquid refrigerant leaving the condenser.";
    warning =
      "Confirm airflow before adjusting refrigerant charge. Bad airflow can mislead pressure readings.";
    nextStep =
      "High subcooling may point toward overcharge or restriction. Low subcooling may point toward undercharge.";
  }

  if (title.includes("temperature split")) {
    explanation =
      "Temperature split shows how much heat the system is removing from the air.";
    warning =
      "Keep temperature probes away from moving blower parts.";
    nextStep =
      "A normal cooling split is often around 16 to 22 degrees Fahrenheit, depending on conditions.";
  }

  return (
    <div style={styles.coachBox}>
      <h3>AI Repair Coach</h3>

      <p>
        <strong>Why this test matters:</strong> {explanation}
      </p>

      <p>
        <strong>Safety reminder:</strong> {warning}
      </p>

      <p>
        <strong>What to do next:</strong> {nextStep}
      </p>
    </div>
  );
}