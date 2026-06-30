export const workflowLabels = {
  compressorNotStarting: "Outdoor Unit Not Running",
  capacitorTesting: "Capacitor Testing",
  contactorTesting: "Contactor Testing",
  condenserFanMotor: "Condenser Fan Motor",
  blowerMotor: "Blower Motor",
  transformerTesting: "Transformer Testing",
  thermostatTesting: "Thermostat Testing",
  compressorWindingTesting: "Compressor Winding Testing",
  refrigerantCharging: "Refrigerant Charging Assistant",
  safetySwitchTesting: "Safety Switch Testing",
  airflowTesting: "Airflow Testing",
  txvRestrictionTesting: "TXV / Restriction Testing",
  breakerTripping: "Breaker Tripping",
  furnaceIgnition: "Furnace Ignition",
  preventiveMaintenance: "Preventive Maintenance",
  heatPumpReversingValve: "Heat Pump Reversing Valve",
  defrostBoardTesting: "Defrost Board Testing",
};

const errorCodeLibrary = {
  Carrier: [
    {
      code: "33",
      meaning: "Limit circuit fault or airflow restriction.",
      checks:
        "Check filter, blower, duct restriction, limit switch, and temperature rise.",
    },
    {
      code: "31",
      meaning: "Pressure switch did not close or reopened.",
      checks:
        "Check inducer, venting, pressure tubing, drain trap, and pressure switch.",
    },
  ],
  Trane: [
    {
      code: "3 Flash",
      meaning: "Pressure switch problem.",
      checks:
        "Check inducer operation, vent blockage, tubing, and switch continuity.",
    },
    {
      code: "4 Flash",
      meaning: "Open limit circuit.",
      checks: "Check airflow, filter, blower speed, and high-limit switch.",
    },
  ],
  Lennox: [
    {
      code: "E240",
      meaning: "Low flame current.",
      checks: "Clean flame sensor, verify ground, inspect flame quality.",
    },
    {
      code: "E228",
      meaning: "Pressure switch calibration or open issue.",
      checks: "Check venting, inducer, tubing, and pressure switch.",
    },
  ],
  Goodman: [
    {
      code: "1 Flash",
      meaning: "System lockout.",
      checks:
        "Check ignition sequence, flame sensor, gas supply, and rollout/limit switches.",
    },
    {
      code: "3 Flash",
      meaning: "Pressure switch stuck open.",
      checks: "Check inducer, vent pipe, hose, condensate drain, and switch.",
    },
  ],
  Rheem: [
    {
      code: "2 Flash",
      meaning: "Pressure switch open.",
      checks: "Check inducer draft, vent blockage, tubing, and condensate.",
    },
    {
      code: "5 Flash",
      meaning: "Flame sensed when no flame should be present.",
      checks: "Check gas valve leakage, flame sensor wiring, and control board.",
    },
  ],
};
