export const diagnostics = [
  {
    symptom: "compressor not starting",
    title: "Compressor Not Starting",
    causes: [
      "Failed capacitor",
      "Bad contactor",
      "Low voltage",
      "Open overload",
      "Failed compressor"
    ],
    tools: [
      "Multimeter",
      "Clamp meter",
      "Capacitor tester"
    ],
    checks: [
      "Verify incoming voltage",
      "Inspect contactor",
      "Test capacitor",
      "Check compressor winding resistance"
    ]
  },

  {
    symptom: "not cooling",
    title: "System Not Cooling",
    causes: [
      "Low refrigerant charge",
      "Dirty evaporator coil",
      "Dirty condenser coil",
      "Poor airflow",
      "Faulty compressor"
    ],
    tools: [
      "Digital gauges",
      "Leak detector",
      "Thermometer"
    ],
    checks: [
      "Measure pressures",
      "Inspect coils",
      "Check airflow",
      "Measure superheat and subcooling"
    ]
  },

  {
    symptom: "high head pressure",
    title: "High Head Pressure",
    causes: [
      "Dirty condenser coil",
      "Overcharged system",
      "Condenser fan failure",
      "Non-condensables"
    ],
    tools: [
      "Digital gauges",
      "Thermometer",
      "Multimeter"
    ],
    checks: [
      "Inspect condenser coil",
      "Verify condenser fan operation",
      "Check refrigerant charge"
    ]
  }
];