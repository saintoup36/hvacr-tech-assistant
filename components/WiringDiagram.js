export default function WiringDiagram({ currentTest, styles }) {
  if (!currentTest) return null;

  const title = currentTest.title.toLowerCase();

  if (
    title.includes("capacitor") ||
    title.includes("c to herm") ||
    title.includes("c to fan")
  ) {
    return (
      <div style={styles.diagramBox}>
        <h3>Wiring Diagram: Dual Capacitor</h3>

        <pre style={styles.diagram}>
{`
Dual Run Capacitor

FAN terminal  = fan motor side
C terminal    = common side
HERM terminal = compressor side

Meter Lead Placement:
Black lead on C
Red lead on HERM or FAN

Expected:
Capacitance should be within rating plus or minus 6 percent.
`}
        </pre>
      </div>
    );
  }

  if (
    title.includes("compressor") ||
    title.includes("common to run") ||
    title.includes("common to start") ||
    title.includes("start to run")
  ) {
    return (
      <div style={styles.diagramBox}>
        <h3>Wiring Diagram: Compressor Windings</h3>

        <pre style={styles.diagram}>
{`
Compressor Terminals

C = Common
R = Run
S = Start

Resistance Tests:
C to R = lowest reading
C to S = medium reading
R to S = highest reading

Rule:
R to S should equal C to R plus C to S.

Ground Test:
Any terminal to ground should read OL.
`}
        </pre>
      </div>
    );
  }

  if (
    title.includes("contactor") ||
    title.includes("line voltage") ||
    title.includes("load side")
  ) {
    return (
      <div style={styles.diagramBox}>
        <h3>Wiring Diagram: Contactor</h3>

        <pre style={styles.diagram}>
{`
Contactor

Line side:
L1 and L2

Load side:
T1 and T2

Coil terminals:
A1 and A2

Voltage Tests:
L1 to L2 = 208 to 240 VAC
T1 to T2 = 208 to 240 VAC when contactor is pulled in
Coil to coil = about 24 VAC
`}
        </pre>
      </div>
    );
  }

  if (
    title.includes("thermostat") ||
    title.includes("r to c") ||
    title.includes("y to c") ||
    title.includes("g to c") ||
    title.includes("w to c")
  ) {
    return (
      <div style={styles.diagramBox}>
        <h3>Wiring Diagram: Thermostat Low Voltage</h3>

        <pre style={styles.diagram}>
{`
Thermostat Terminals

R = 24V hot
C = 24V common
Y = cooling call
G = fan call
W = heat call
O/B = reversing valve

Common Tests:
R to C = about 24 VAC
Y to C = about 24 VAC during cooling
G to C = about 24 VAC during fan
W to C = about 24 VAC during heat
`}
        </pre>
      </div>
    );
  }

  return (
    <div style={styles.diagramBox}>
      <h3>Wiring Diagram</h3>
      <p>No diagram is available for this test yet.</p>
    </div>
  );
}