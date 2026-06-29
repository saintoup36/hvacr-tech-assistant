import { useState } from "react";
import { diagnostics } from "../data/diagnostics";
import PhotoUpload from "../components/PhotoUpload";

const workflowLibrary = {
  compressorNotStarting: [
    {
      title: "Verify Line Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Black → L2, Red → L1",
      expected: "208–240 VAC",
      safety: "High voltage test. Do not touch live terminals.",
    },
    {
      title: "Check Contactor Coil Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Across contactor coil terminals",
      expected: "24 VAC",
      safety: "Low-voltage control test.",
    },
  ],

  capacitorTesting: [
    {
      title: "Turn Power Off",
      meter: "None",
      meterPosition: "OFF",
      leads: "Do not test live power",
      expected: "Power OFF confirmed",
      safety: "Turn off breaker and disconnect before touching capacitor.",
    },
    {
      title: "Discharge Capacitor",
      meter: "None",
      meterPosition: "OFF",
      leads: "Use insulated resistor or approved discharge tool",
      expected: "Capacitor safely discharged",
      safety: "Never touch capacitor terminals before discharging.",
    },
    {
      title: "Measure C to HERM",
      meter: "Capacitance",
      meterPosition: "µF",
      leads: "Red → HERM, Black → C",
      expected: "Within capacitor rating ±6%",
      safety: "Power must remain OFF.",
    },
    {
      title: "Measure C to FAN",
      meter: "Capacitance",
      meterPosition: "µF",
      leads: "Red → FAN, Black → C",
      expected: "Within capacitor rating ±6%",
      safety: "Power must remain OFF.",
    },
  ],

  contactorTesting: [
    {
      title: "Check Coil Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Across contactor coil terminals",
      expected: "24 VAC",
      safety: "Low-voltage test. Keep hands clear of high-voltage side.",
    },
    {
      title: "Check Line Side Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Black → L2, Red → L1",
      expected: "208–240 VAC",
      safety: "High voltage test.",
    },
    {
      title: "Check Load Side Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Black → T2, Red → T1",
      expected: "208–240 VAC when contactor is pulled in",
      safety: "High voltage test.",
    },
  ],

  condenserFanMotor: [
    {
      title: "Verify Fan Capacitor",
      meter: "Capacitance",
      meterPosition: "µF",
      leads: "Red → FAN, Black → C",
      expected: "Within capacitor rating ±6%",
      safety: "Turn power OFF and discharge capacitor before testing.",
    },
    {
      title: "Check Fan Motor Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Black → T2/Common, Red → Fan motor power lead",
      expected: "208–240 VAC",
      safety: "High voltage test. Keep hands clear of moving fan blade.",
    },
    {
      title: "Check Fan Motor Amp Draw",
      meter: "Amps",
      meterPosition: "A",
      leads: "Clamp around one fan motor wire only",
      expected: "At or below motor nameplate FLA",
      safety: "Keep wires clear of fan blade while testing.",
    },
  ],

  blowerMotor: [
    {
      title: "Verify Thermostat Fan Call",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → G, Black → C",
      expected: "24 VAC when fan is called",
      safety: "Low-voltage control test.",
    },
    {
      title: "Check Blower Motor Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Black → Neutral/Common, Red → Blower motor power lead",
      expected: "120 VAC or 208–240 VAC depending on equipment",
      safety: "High voltage test. Keep hands clear of blower wheel.",
    },
    {
      title: "Check Blower Capacitor",
      meter: "Capacitance",
      meterPosition: "µF",
      leads: "Across capacitor terminals after disconnecting wires",
      expected: "Within capacitor rating ±6%",
      safety: "Turn power OFF and discharge capacitor before testing.",
    },
    {
      title: "Check Blower Motor Amp Draw",
      meter: "Amps",
      meterPosition: "A",
      leads: "Clamp around one blower motor wire only",
      expected: "At or below motor nameplate FLA",
      safety: "Keep hands and wires away from moving blower wheel.",
    },
  ],

  transformerTesting: [
    {
      title: "Verify Line Voltage To Transformer",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Across transformer primary terminals",
      expected: "120V, 208V, or 240V depending on unit",
      safety: "High voltage test.",
    },
    {
      title: "Verify Transformer Secondary Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "R and C terminals",
      expected: "24 VAC",
      safety: "Low-voltage test.",
    },
    {
      title: "Check Low Voltage Fuse",
      meter: "Continuity",
      meterPosition: "Continuity / Beep",
      leads: "Across fuse terminals",
      expected: "Continuity present",
      safety: "Power OFF before continuity testing.",
    },
  ],

  thermostatTesting: [
    {
      title: "Check R to C",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → R, Black → C",
      expected: "24 VAC",
      safety: "Low-voltage test.",
    },
    {
      title: "Check Y to C During Cooling Call",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → Y, Black → C",
      expected: "24 VAC when cooling is requested",
      safety: "Low-voltage test.",
    },
    {
      title: "Check G to C During Fan Call",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → G, Black → C",
      expected: "24 VAC when fan is requested",
      safety: "Low-voltage test.",
    },
    {
      title: "Check W to C During Heat Call",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → W, Black → C",
      expected: "24 VAC when heat is requested",
      safety: "Low-voltage test.",
    },
  ],

  compressorWindingTesting: [
    {
      title: "Turn Power Off",
      meter: "None",
      meterPosition: "OFF",
      leads: "Disconnect power before testing compressor terminals",
      expected: "Power OFF confirmed",
      safety: "Never perform ohm tests on an energized compressor.",
    },
    {
      title: "Identify Compressor Terminals",
      meter: "Visual / Ohms",
      meterPosition: "Ω",
      leads: "Locate C, S, and R terminals",
      expected: "C = Common, S = Start, R = Run",
      safety: "Power must remain OFF.",
    },
    {
      title: "Measure Common To Run",
      meter: "Ohms",
      meterPosition: "Ω",
      leads: "Red → C, Black → R",
      expected: "Lowest resistance reading",
      safety: "Power OFF only.",
    },
    {
      title: "Measure Common To Start",
      meter: "Ohms",
      meterPosition: "Ω",
      leads: "Red → C, Black → S",
      expected: "Medium resistance reading",
      safety: "Power OFF only.",
    },
    {
      title: "Measure Start To Run",
      meter: "Ohms",
      meterPosition: "Ω",
      leads: "Red → S, Black → R",
      expected: "Highest resistance reading",
      safety: "Power OFF only.",
    },
    {
      title: "Check Compressor To Ground",
      meter: "Ohms / Continuity",
      meterPosition: "Ω / Continuity",
      leads: "One lead → compressor terminal, other lead → copper line or ground",
      expected: "OL / no continuity",
      safety: "Power OFF only. Any continuity to ground is a serious failure.",
    },
  ],

  safetySwitchTesting: [
    {
      title: "Check Float Switch",
      meter: "Continuity",
      meterPosition: "Continuity / Beep",
      leads: "Across float switch terminals",
      expected: "Closed / continuity present when drain is safe",
      safety: "Power OFF before continuity testing.",
    },
    {
      title: "Check High Pressure Switch",
      meter: "Continuity",
      meterPosition: "Continuity / Beep",
      leads: "Across high pressure switch terminals",
      expected: "Closed / continuity present under normal pressure",
      safety: "Power OFF before continuity testing.",
    },
    {
      title: "Check Low Pressure Switch",
      meter: "Continuity",
      meterPosition: "Continuity / Beep",
      leads: "Across low pressure switch terminals",
      expected: "Closed / continuity present under normal pressure",
      safety: "Power OFF before continuity testing.",
    },
    {
      title: "Check 24V Through Safety Circuit",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Across each safety device in the low-voltage circuit",
      expected: "24 VAC passing through closed safety circuit",
      safety: "Low-voltage test. Avoid shorting control wires.",
    },
  ],

  airflowTesting: [
    {
      title: "Inspect Air Filter",
      meter: "Visual Inspection",
      meterPosition: "Visual Inspection",
      leads: "N/A",
      expected: "Filter clean and unrestricted",
      safety: "Power off if removing blower door.",
    },
    {
      title: "Inspect Evaporator Coil",
      meter: "Visual Inspection",
      meterPosition: "Visual Inspection",
      leads: "N/A",
      expected: "Coil clean and unrestricted",
      safety: "Use caution around sharp fins.",
    },
    {
      title: "Measure Return Air Temperature",
      meter: "Thermometer",
      meterPosition: "Temperature",
      leads: "Return air duct",
      expected: "Record reading",
      safety: "Keep probe clear of moving parts.",
    },
    {
      title: "Measure Supply Air Temperature",
      meter: "Thermometer",
      meterPosition: "Temperature",
      leads: "Supply air duct",
      expected: "Record reading",
      safety: "Keep probe clear of moving parts.",
    },
    {
      title: "Calculate Temperature Split",
      meter: "Math",
      meterPosition: "Math",
      leads: "Return Temp - Supply Temp",
      expected: "16°F–22°F",
      safety: "N/A",
    },
    {
      title: "Check Blower Motor Amperage",
      meter: "Amps",
      meterPosition: "A",
      leads: "Clamp around one blower motor wire",
      expected: "At or below nameplate FLA",
      safety: "Keep clear of moving blower wheel.",
    },
  ],

  txvRestrictionTesting: [
    {
      title: "Measure Suction Pressure",
      meter: "Digital Gauges",
      meterPosition: "Gauge Set",
      leads: "Low side service port",
      expected: "System dependent",
      safety: "Wear PPE when connecting gauges.",
    },
    {
      title: "Measure Head Pressure",
      meter: "Digital Gauges",
      meterPosition: "Gauge Set",
      leads: "High side service port",
      expected: "System dependent",
      safety: "Wear PPE when connecting gauges.",
    },
    {
      title: "Measure Superheat",
      meter: "Temperature Clamp + Gauge",
      meterPosition: "Temperature + Gauge",
      leads: "Suction line near evaporator outlet",
      expected: "Depends on metering device",
      safety: "Keep clear of moving equipment.",
    },
    {
      title: "Measure Subcooling",
      meter: "Temperature Clamp + Gauge",
      meterPosition: "Temperature + Gauge",
      leads: "Liquid line near condenser outlet",
      expected: "Manufacturer target",
      safety: "Keep clear of moving equipment.",
    },
    {
      title: "Check Filter Drier Temperature Drop",
      meter: "Temperature Clamp",
      meterPosition: "Temperature",
      leads: "One probe before drier, one after",
      expected: "Less than 3°F",
      safety: "Do not burn yourself on hot lines.",
    },
    {
      title: "Inspect TXV Bulb",
      meter: "Visual Inspection",
      meterPosition: "Visual Inspection",
      leads: "TXV sensing bulb",
      expected: "Firmly attached and insulated",
      safety: "Power OFF if necessary.",
    },
  ],

  refrigerantCharging: [
  {
    title: "Verify Airflow Before Charging",
    meter: "Visual / Temperature",
    meterPosition: "Visual Inspection",
    leads: "Filter, blower, evaporator coil, supply and return",
    expected: "Airflow must be correct before charging",
    safety: "Do not charge system until airflow is verified.",
  },
  {
    title: "Check Refrigerant Type",
    meter: "Nameplate",
    meterPosition: "Visual Inspection",
    leads: "Read equipment data plate",
    expected: "Matches refrigerant being used",
    safety: "Never mix refrigerants.",
  },
  {
    title: "Measure Superheat",
    meter: "Gauge + Temperature Clamp",
    meterPosition: "Temperature + Gauge",
    leads: "Suction line near outdoor unit",
    expected: "Depends on metering device",
    safety: "Wear gloves and eye protection.",
  },
  {
    title: "Measure Subcooling",
    meter: "Gauge + Temperature Clamp",
    meterPosition: "Temperature + Gauge",
    leads: "Liquid line near outdoor unit",
    expected: "Manufacturer target",
    safety: "Wear gloves and eye protection.",
  },
],

  breakerTripping: [
    {
      title: "Check Breaker Size",
      meter: "Visual Inspection",
      meterPosition: "Visual Inspection",
      leads: "Compare breaker size to equipment nameplate",
      expected: "Breaker matches MCA/MOCP rating",
      safety: "Do not replace breaker with larger size unless nameplate allows it.",
    },
    {
      title: "Check Compressor To Ground",
      meter: "Ohms / Continuity",
      meterPosition: "Ω / Continuity",
      leads: "One lead → compressor terminal, other lead → ground",
      expected: "OL / no continuity",
      safety: "Power OFF only.",
    },
    {
      title: "Check Fan Motor To Ground",
      meter: "Ohms / Continuity",
      meterPosition: "Ω / Continuity",
      leads: "One lead → motor wire, other lead → ground",
      expected: "OL / no continuity",
      safety: "Power OFF only.",
    },
    {
      title: "Check Capacitor",
      meter: "Capacitance",
      meterPosition: "µF",
      leads: "Measure capacitor terminals",
      expected: "Within rating ±6%",
      safety: "Power OFF and discharge capacitor first.",
    },
  ],

  furnaceIgnition: [
    {
      title: "Check Thermostat Heat Call",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → W, Black → C",
      expected: "24 VAC during heat call",
      safety: "Low-voltage test.",
    },
    {
      title: "Check Inducer Motor Voltage",
      meter: "AC Voltage",
      meterPosition: "VAC 600",
      leads: "Across inducer motor terminals",
      expected: "120 VAC",
      safety: "High voltage test.",
    },
    {
      title: "Check Pressure Switch",
      meter: "Continuity",
      meterPosition: "Continuity / Beep",
      leads: "Across pressure switch terminals",
      expected: "Closed after inducer starts",
      safety: "Power OFF for continuity testing.",
    },
    {
      title: "Check Flame Sensor",
      meter: "Microamps DC",
      meterPosition: "µA DC",
      leads: "In series with flame sensor wire",
      expected: "Usually 1–5 µA DC",
      safety: "Gas furnace test. Use caution.",
    },
  ],

  heatPumpReversingValve: [
    {
      title: "Check O/B Signal",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Red → O/B, Black → C",
      expected: "24 VAC depending on mode",
      safety: "Low-voltage test.",
    },
    {
      title: "Check Reversing Valve Coil",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Across reversing valve coil",
      expected: "24 VAC when energized",
      safety: "Low-voltage test.",
    },
    {
      title: "Listen For Valve Shift",
      meter: "Observation",
      meterPosition: "Observation",
      leads: "Switch system between heat and cool",
      expected: "Valve shifts when energized/de-energized",
      safety: "Keep clear of moving equipment.",
    },
  ],

  defrostBoardTesting: [
    {
      title: "Check Defrost Sensor",
      meter: "Ohms",
      meterPosition: "Ω",
      leads: "Across defrost sensor terminals",
      expected: "Resistance changes with temperature",
      safety: "Power OFF before ohm testing.",
    },
    {
      title: "Check Defrost Board Output",
      meter: "AC Voltage",
      meterPosition: "VAC",
      leads: "Board output terminals",
      expected: "24 VAC output when defrost is active",
      safety: "Low-voltage test.",
    },
    {
      title: "Check Outdoor Fan During Defrost",
      meter: "Observation",
      meterPosition: "Observation",
      leads: "Observe outdoor fan operation",
      expected: "Outdoor fan may stop during defrost",
      safety: "Keep clear of fan blade.",
    },
  ],
preventiveMaintenance: [
  {
    title: "Inspect Air Filter",
    meter: "Visual Inspection",
    meterPosition: "Visual Inspection",
    leads: "Return air filter",
    expected: "Clean and properly installed",
    safety: "Turn system off before removing panels.",
  },
  {
    title: "Inspect Evaporator Coil",
    meter: "Visual Inspection",
    meterPosition: "Visual Inspection",
    leads: "Indoor coil",
    expected: "Clean coil, no ice, no blockage",
    safety: "Use caution around sharp fins.",
  },
  {
    title: "Inspect Condenser Coil",
    meter: "Visual Inspection",
    meterPosition: "Visual Inspection",
    leads: "Outdoor coil",
    expected: "Clean and unrestricted",
    safety: "Disconnect power before washing coil.",
  },
  {
    title: "Check Capacitor",
    meter: "Capacitance",
    meterPosition: "µF",
    leads: "Measure capacitor terminals after discharge",
    expected: "Within rating ±6%",
    safety: "Power OFF and discharge capacitor first.",
  },
  {
    title: "Check Temperature Split",
    meter: "Thermometer",
    meterPosition: "Temperature",
    leads: "Return air minus supply air",
    expected: "16°F–22°F",
    safety: "Keep probe clear of blower wheel.",
  },
],

};

const workflowLabels = {
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

const truckStockItems = [
  "Capacitors",
  "Contactors",
  "Fuses",
  "Transformers",
  "Thermostat wire",
  "Wire nuts",
  "Drain tablets",
  "PVC fittings",
  "Electrical tape",
  "Refrigerant caps",
  "Flame sensors",
  "Pressure switches",
];

const quizQuestions = [
  {
    question:
      "You measure 240 VAC at L1 and L2, but 0 VAC at the contactor coil. What should you check next?",
    options: [
      "Compressor windings",
      "Thermostat call, transformer, fuse, float switch, and safety circuit",
      "Replace the compressor immediately",
      "Add refrigerant",
    ],
    answer:
      "Thermostat call, transformer, fuse, float switch, and safety circuit",
  },
  {
    question:
      "A capacitor is rated 45/5 µF. The HERM side reads 32 µF. What is the best conclusion?",
    options: [
      "Capacitor is acceptable",
      "Capacitor is weak and should be replaced",
      "Compressor is overcharged",
      "Thermostat is bad",
    ],
    answer: "Capacitor is weak and should be replaced",
  },
  {
    question:
      "High superheat and low subcooling usually points toward what condition?",
    options: [
      "Overcharge",
      "Low refrigerant charge or leak",
      "Dirty condenser only",
      "Bad blower relay only",
    ],
    answer: "Low refrigerant charge or leak",
  },
];

const maintenanceLibrary = {
  coolingPM: {
    title: "Cooling Preventive Maintenance",
    items: [
      "Replace or inspect air filter.",
      "Inspect evaporator coil condition.",
      "Inspect and clean condenser coil.",
      "Check thermostat operation.",
      "Check blower motor operation and amperage.",
      "Check condenser fan motor operation and amperage.",
      "Inspect capacitor ratings and readings.",
      "Check contactor condition and voltage.",
      "Record suction pressure, head pressure, superheat, and subcooling.",
      "Check temperature split.",
      "Inspect drain line and float switch.",
      "Confirm system cycles off properly.",
    ],
  },
  heatingPM: {
    title: "Heating Preventive Maintenance",
    items: [
      "Check thermostat heat call.",
      "Inspect burners and flame pattern.",
      "Check inducer motor operation.",
      "Check pressure switch operation.",
      "Clean flame sensor if needed.",
      "Check ignitor condition.",
      "Check gas valve operation.",
      "Verify blower operation.",
      "Measure temperature rise.",
      "Check safety controls.",
      "Confirm proper shutdown sequence.",
    ],
  },
  refrigerationPM: {
    title: "Refrigeration Preventive Maintenance",
    items: [
      "Inspect door gaskets.",
      "Check box temperature.",
      "Inspect evaporator fans.",
      "Inspect evaporator coil for ice pattern.",
      "Inspect condenser coil.",
      "Check condenser fan operation.",
      "Check suction and head pressure.",
      "Check superheat and subcooling.",
      "Inspect sight glass if present.",
      "Check defrost timer or control.",
      "Inspect drain line and pan.",
      "Confirm product temperature recovery.",
    ],
  },
};

const ptReference = {
  "R-410A": [
    { temp: "35°F", pressure: "101 PSI" },
    { temp: "40°F", pressure: "118 PSI" },
    { temp: "45°F", pressure: "130 PSI" },
    { temp: "50°F", pressure: "143 PSI" },
  ],
  "R-454B": [
    { temp: "35°F", pressure: "96 PSI" },
    { temp: "40°F", pressure: "111 PSI" },
    { temp: "45°F", pressure: "124 PSI" },
    { temp: "50°F", pressure: "137 PSI" },
  ],
  "R-32": [
    { temp: "35°F", pressure: "112 PSI" },
    { temp: "40°F", pressure: "129 PSI" },
    { temp: "45°F", pressure: "144 PSI" },
    { temp: "50°F", pressure: "160 PSI" },
  ],
  "R-134a": [
    { temp: "35°F", pressure: "30 PSI" },
    { temp: "40°F", pressure: "35 PSI" },
    { temp: "45°F", pressure: "40 PSI" },
    { temp: "50°F", pressure: "45 PSI" },
  ],
  "R-404A": [
    { temp: "20°F", pressure: "55 PSI" },
    { temp: "25°F", pressure: "63 PSI" },
    { temp: "30°F", pressure: "72 PSI" },
    { temp: "35°F", pressure: "81 PSI" },
  ],
};

const partsLibrary = [
  {
    name: "Capacitor",
    symptoms: "Motor hums, compressor hard starts, fan not spinning",
    tests: "Capacitance µF test with power OFF",
    commonFailure: "Reading more than 6% below rating",
  },
  {
    name: "Contactor",
    symptoms:
      "Outdoor unit not starting, pitted contacts, no voltage to load side",
    tests: "24V coil test, line/load voltage test",
    commonFailure: "Coil open, contacts burned, contactor not pulling in",
  },
  {
    name: "Transformer",
    symptoms: "No 24V, thermostat blank, control circuit dead",
    tests: "Primary voltage and secondary voltage test",
    commonFailure: "No 24V output or blown low-voltage fuse",
  },
  {
    name: "TXV / Metering Device",
    symptoms: "High superheat, low suction, possible restriction",
    tests: "Superheat, subcooling, bulb placement, filter drier temp drop",
    commonFailure: "Restricted flow or sensing bulb issue",
  },
  {
    name: "Flame Sensor",
    symptoms: "Furnace lights then shuts off",
    tests: "Microamp DC flame signal test",
    commonFailure: "Weak flame signal below acceptable range",
  },
];

export default function Home() {
  const [form, setForm] = useState({
    customerName: "",
    equipmentType: "",
    brand: "",
    modelNumber: "",
    refrigerant: "",
    suctionPressure: "",
    headPressure: "",
    superheat: "",
    subcooling: "",
    ambientTemp: "",
    symptom: "",
    notes: "",
    beforePhotoNotes: "",
    afterPhotoNotes: "",
    jobStatus: "New",
    serviceFee: "",
    laborHours: "",
    hourlyRate: "",
    partsCost: "",
    taxPercent: "",
    discount: "",
    errorBrand: "Carrier",
    errorCode: "33",
  });

const [selectedWorkflow, setSelectedWorkflow] = useState(
  "compressorNotStarting"
);
const [workflowStep, setWorkflowStep] = useState(0);
const [reading, setReading] = useState("");
const [workflowResult, setWorkflowResult] = useState("");
const [apprenticeMode, setApprenticeMode] = useState(true);
const [savedReports, setSavedReports] = useState([]);
const [historySearch, setHistorySearch] = useState("");
const [equipmentHistory, setEquipmentHistory] = useState([]);
const [diagnosis, setDiagnosis] = useState(null);
const [beforePhoto, setBeforePhoto] = useState(null);
const [afterPhoto, setAfterPhoto] = useState(null);
const [beforePreview, setBeforePreview] = useState("");
const [afterPreview, setAfterPreview] = useState("");

const [suggestedWorkflow, setSuggestedWorkflow] = useState("");
const [refrigerantResult, setRefrigerantResult] = useState(null);
const [maintenanceType, setMaintenanceType] = useState("coolingPM");
const [quizStarted, setQuizStarted] = useState(false);
const [quizIndex, setQuizIndex] = useState(0);
const [quizScore, setQuizScore] = useState(0);
const [selectedQuizAnswer, setSelectedQuizAnswer] = useState("");
const [quizFeedback, setQuizFeedback] = useState("");
const [checkedTruckStock, setCheckedTruckStock] = useState([]);
const [activeTab, setActiveTab] = useState("job");

const currentWorkflow = workflowLibrary[selectedWorkflow] || [];
const currentTest = currentWorkflow[workflowStep];

const selectedError =
  errorCodeLibrary[form.errorBrand]?.find(
    (item) => item.code === form.errorCode
  ) || errorCodeLibrary[form.errorBrand]?.[0];

function getSuggestedWorkflow(symptomText) {
  const text = symptomText.toLowerCase();

  if (
    text.includes("outside") ||
    text.includes("outdoor") ||
    text.includes("compressor not starting") ||
    text.includes("unit not running")
  ) {
    return "compressorNotStarting";
  }

  if (text.includes("humming") || text.includes("capacitor")) {
    return "capacitorTesting";
  }

  if (text.includes("contactor")) {
    return "contactorTesting";
  }

  if (text.includes("condenser fan") || text.includes("fan not spinning")) {
    return "condenserFanMotor";
  }

  if (text.includes("blower") || text.includes("no airflow")) {
    return "blowerMotor";
  }

  if (text.includes("transformer") || text.includes("low voltage")) {
    return "transformerTesting";
  }

  if (text.includes("thermostat")) {
    return "thermostatTesting";
  }

  if (text.includes("winding") || text.includes("compressor short")) {
    return "compressorWindingTesting";
  }

  if (text.includes("float") || text.includes("safety switch")) {
    return "safetySwitchTesting";
  }

  if (text.includes("airflow") || text.includes("frozen coil")) {
    return "airflowTesting";
  }

  if (
    text.includes("restriction") ||
    text.includes("txv") ||
    text.includes("filter drier")
  ) {
    return "txvRestrictionTesting";
  }

  if (text.includes("breaker") || text.includes("tripping")) {
    return "breakerTripping";
  }

  if (text.includes("furnace") || text.includes("ignition")) {
    return "furnaceIgnition";
  }

  if (text.includes("reversing valve") || text.includes("heat pump")) {
    return "heatPumpReversingValve";
  }

  if (text.includes("defrost")) {
    return "defrostBoardTesting";
  }

  return "";
}

  
  function money(value) {
    const number = Number(value);
    if (Number.isNaN(number)) return 0;
    return number;
  }

  function estimateSubtotal() {
    return (
      money(form.serviceFee) +
      money(form.laborHours) * money(form.hourlyRate) +
      money(form.partsCost)
    );
  }

  function estimateTax() {
    return (estimateSubtotal() * money(form.taxPercent)) / 100;
  }

  function estimateTotal() {
    return estimateSubtotal() + estimateTax() - money(form.discount);
  }

  function handlePhotoUpload(e, type) {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (type === "before") {
        setBeforePhoto(file);
        setBeforePreview(reader.result);
      } else {
        setAfterPhoto(file);
        setAfterPreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }

  function formatMoney(value) {
    return `$${Number(value || 0).toFixed(2)}`;
  }

  function handleChange(e) {
    const updatedForm = { ...form, [e.target.name]: e.target.value };

    if (e.target.name === "errorBrand") {
      updatedForm.errorCode = errorCodeLibrary[e.target.value][0].code;
    }

    setForm(updatedForm);

    if (e.target.name === "symptom") {
      setSuggestedWorkflow(getSuggestedWorkflow(e.target.value));
    }
  }

  function applySuggestedWorkflow() {
    if (!suggestedWorkflow) return;

    setSelectedWorkflow(suggestedWorkflow);
    setWorkflowStep(0);
    setReading("");
    setWorkflowResult("");
    setActiveTab("diagnosis");
  }

  function getMeterExplanation(meter) {
    if (meter === "AC Voltage") return "Used to measure live electrical voltage.";
    if (meter === "Ohms" || meter === "Ohms / Continuity")
      return "Used to measure resistance with power OFF.";
    if (meter === "Continuity")
      return "Used to verify whether a switch, fuse, or wire path is closed.";
    if (meter === "Capacitance")
      return "Used to test capacitor health with power OFF.";
    if (meter === "Amps") return "Used to measure current draw on one wire only.";
    if (meter === "Thermometer" || meter.includes("Temperature"))
      return "Used to measure air or refrigerant line temperature.";
    if (meter === "Visual Inspection")
      return "Used to inspect the part or condition without meter testing.";

    return "Follow the listed test instructions and manufacturer safety procedures.";
  }

  function getTestWhy(test) {
    if (!test) return "This step helps confirm the next safe diagnostic direction.";

    const title = test.title.toLowerCase();

    if (title.includes("line voltage"))
      return "This confirms the equipment is receiving the correct power before checking smaller parts.";
    if (title.includes("coil voltage"))
      return "This proves whether the control circuit is sending the signal needed to pull in the contactor.";
    if (title.includes("capacitor"))
      return "A weak capacitor can stop a motor or compressor from starting properly.";
    if (title.includes("amp"))
      return "Amp draw tells you whether the motor is working too hard or failing.";
    if (title.includes("thermostat") || title.includes("r to c"))
      return "This confirms the thermostat and low-voltage control circuit are sending the correct signal.";
    if (title.includes("safety") || title.includes("switch"))
      return "A safety switch can open the control circuit and stop the system from running.";
    if (title.includes("superheat") || title.includes("subcooling"))
      return "These readings help separate refrigerant charge problems from airflow or restriction problems.";
    if (title.includes("temperature split"))
      return "Temperature split helps confirm whether the system is actually removing heat from the air.";
    if (title.includes("to ground"))
      return "This checks for a dangerous short to ground before the equipment is operated again.";

    return "This test helps isolate the failed circuit, component, or operating condition.";
  }

  function getLeadCards(leads) {
    if (!leads || leads === "N/A") {
      return [{ label: "Instruction", value: leads || "N/A", type: "info" }];
    }

    return leads.split(",").map((part) => {
      const trimmed = part.trim();

      if (trimmed.toLowerCase().includes("red")) {
        return { label: "Red Lead", value: trimmed, type: "red" };
      }

      if (trimmed.toLowerCase().includes("black")) {
        return { label: "Black Lead", value: trimmed, type: "black" };
      }

      if (trimmed.toLowerCase().includes("clamp")) {
        return { label: "Clamp Meter", value: trimmed, type: "clamp" };
      }

      return { label: "Lead Placement", value: trimmed, type: "info" };
    });
  }

  function getLeadCardStyle(type) {
    if (type === "red") return styles.redLeadCard;
    if (type === "black") return styles.blackLeadCard;
    if (type === "clamp") return styles.clampLeadCard;
    return styles.infoLeadCard;
  }

  function getCustomerExplanation(diagnosisTitle) {
    const title = diagnosisTitle.toLowerCase();

    if (title.includes("low refrigerant")) {
      return "The system may not have enough refrigerant to cool properly. A leak check should be performed before adding refrigerant.";
    }

    if (title.includes("overcharged")) {
      return "The system may have too much refrigerant, which can make pressures rise and reduce cooling efficiency.";
    }

    if (title.includes("dirty condenser") || title.includes("airflow")) {
      return "The system may not be moving enough air across the coil, which can cause high pressure, weak cooling, or freezing.";
    }

    if (title.includes("restriction")) {
      return "A refrigerant control or filter component may be limiting refrigerant flow and reducing system performance.";
    }

    return "The equipment is not operating under normal conditions. Additional testing is recommended to confirm the exact cause before replacing parts.";
  }

  function getRecommendedParts(diagnosisTitle) {
    const title = diagnosisTitle.toLowerCase();

    if (title.includes("low refrigerant")) {
      return ["Leak detector", "Nitrogen", "Vacuum pump", "Refrigerant scale"];
    }

    if (title.includes("overcharged")) {
      return [
        "Recovery machine",
        "Recovery tank",
        "Digital gauges",
        "Refrigerant scale",
      ];
    }

    if (title.includes("dirty condenser")) {
      return ["Coil cleaner", "Water hose", "Fin comb", "Thermometer"];
    }

    if (title.includes("restriction")) {
      return [
        "Filter drier",
        "Temperature clamps",
        "Vacuum pump",
        "Recovery machine",
      ];
    }

    return ["Multimeter", "Clamp meter", "Temperature probe", "Basic hand tools"];
  }

  function getDiagnosticConfidence() {
    if (!diagnosis) return 0;

    const title = diagnosis.title.toLowerCase();

    if (
      title.includes("low refrigerant") &&
      Number(form.superheat) > 20 &&
      Number(form.subcooling) < 5
    ) {
      return 92;
    }

    if (
      title.includes("overcharged") &&
      Number(form.headPressure) > 325 &&
      Number(form.subcooling) > 15
    ) {
      return 90;
    }

    if (title.includes("dirty condenser") && Number(form.headPressure) > 325) {
      return 84;
    }

    if (
      title.includes("restriction") &&
      Number(form.suctionPressure) < 60 &&
      Number(form.superheat) > 20
    ) {
      return 88;
    }

    if (title.includes("general")) return 45;

    return 70;
  }

  function analyzeRefrigerantReadings() {
    const suction = Number(form.suctionPressure);
    const head = Number(form.headPressure);
    const superheat = Number(form.superheat);
    const subcooling = Number(form.subcooling);
    const ambient = Number(form.ambientTemp);

    if (
      Number.isNaN(suction) ||
      Number.isNaN(head) ||
      Number.isNaN(superheat) ||
      Number.isNaN(subcooling)
    ) {
      setRefrigerantResult({
        title: "More Readings Needed",
        message:
          "Enter suction pressure, head pressure, superheat, and subcooling before running the refrigerant assistant.",
      });
      return;
    }

    if (superheat > 20 && subcooling < 5) {
      setRefrigerantResult({
        title: "Likely Undercharged System",
        message:
          "High superheat with low subcooling commonly points toward low refrigerant charge or a refrigerant leak. Leak check before charging.",
      });
      return;
    }

    if (head > 325 && subcooling > 15) {
      setRefrigerantResult({
        title: "Likely Overcharged System",
        message:
          "High head pressure with high subcooling often points toward excess refrigerant or poor charging procedure. Confirm airflow before recovering refrigerant.",
      });
      return;
    }

    if (suction < 60 && superheat > 20 && subcooling >= 8) {
      setRefrigerantResult({
        title: "Possible Refrigerant Restriction",
        message:
          "Low suction, high superheat, and normal-to-high subcooling can point toward a TXV, filter drier, or liquid-line restriction.",
      });
      return;
    }

    if (head > 325 && subcooling <= 12) {
      setRefrigerantResult({
        title: "Possible Condenser Airflow Problem",
        message:
          "High head pressure without high subcooling may point toward dirty condenser coil, weak condenser fan, or restricted outdoor airflow.",
      });
      return;
    }

    if (!Number.isNaN(ambient) && ambient > 95 && head > 300) {
      setRefrigerantResult({
        title: "High Ambient Condition",
        message:
          "Outdoor temperature is high. Confirm condenser cleanliness, airflow, and manufacturer charging chart before adjusting charge.",
      });
      return;
    }

    setRefrigerantResult({
      title: "Readings Need More Context",
      message:
        "The readings do not strongly point to one condition. Compare to manufacturer data, indoor airflow, outdoor temperature, and equipment type.",
    });
  }

  function startQuiz() {
    setQuizStarted(true);
    setQuizIndex(0);
    setQuizScore(0);
    setSelectedQuizAnswer("");
    setQuizFeedback("");
  }

  function submitQuizAnswer() {
    const currentQuiz = quizQuestions[quizIndex];

    if (!selectedQuizAnswer) {
      setQuizFeedback("Choose an answer first.");
      return;
    }

    if (selectedQuizAnswer === currentQuiz.answer) {
      setQuizScore((score) => score + 1);
      setQuizFeedback("Correct. Good troubleshooting logic.");
    } else {
      setQuizFeedback(`Not quite. Correct answer: ${currentQuiz.answer}`);
    }
  }

  function nextQuizQuestion() {
    if (quizIndex < quizQuestions.length - 1) {
      setQuizIndex((index) => index + 1);
      setSelectedQuizAnswer("");
      setQuizFeedback("");
    } else {
      setQuizFeedback(
        `Quiz complete. Final score: ${quizScore} / ${quizQuestions.length}`
      );
    }
  }

  function toggleTruckStock(item) {
    if (checkedTruckStock.includes(item)) {
      setCheckedTruckStock(checkedTruckStock.filter((stock) => stock !== item));
    } else {
      setCheckedTruckStock([...checkedTruckStock, item]);
    }
  }

  function createInvoiceText() {
    return `
HVAC/R CUSTOMER INVOICE

Job Status: ${form.jobStatus}

Customer: ${form.customerName || "Not provided"}
Equipment: ${form.equipmentType || "Not provided"}
Brand: ${form.brand || "Not provided"}
Model: ${form.modelNumber || "Not provided"}

Diagnosis:
${diagnosis?.title || "Not generated"}

Customer Explanation:
${diagnosis ? getCustomerExplanation(diagnosis.title) : "Not generated"}

Recommended Action:
${diagnosis?.checks?.[0] || "Not generated"}

Charges:
Service Fee: ${formatMoney(form.serviceFee)}
Labor: ${form.laborHours || 0} hours x ${formatMoney(form.hourlyRate)} = ${formatMoney(
      money(form.laborHours) * money(form.hourlyRate)
    )}
Parts: ${formatMoney(form.partsCost)}
Subtotal: ${formatMoney(estimateSubtotal())}
Tax: ${formatMoney(estimateTax())}
Discount: ${formatMoney(form.discount)}
TOTAL DUE: ${formatMoney(estimateTotal())}

Notes:
${form.notes || "None"}
`;
  }

  function createFullReportText() {
    const estimate = `
ESTIMATE / INVOICE

Service Fee: ${formatMoney(form.serviceFee)}
Labor: ${form.laborHours || 0} hours x ${formatMoney(form.hourlyRate)} = ${formatMoney(
      money(form.laborHours) * money(form.hourlyRate)
    )}
Parts: ${formatMoney(form.partsCost)}
Subtotal: ${formatMoney(estimateSubtotal())}
Tax (${form.taxPercent || 0}%): ${formatMoney(estimateTax())}
Discount: ${formatMoney(form.discount)}
Total: ${formatMoney(estimateTotal())}
`;

    return `
HVAC/R SERVICE REPORT

Job Status: ${form.jobStatus}

Customer: ${form.customerName || "Not provided"}
Equipment: ${form.equipmentType || "Not provided"}
Brand: ${form.brand || "Not provided"}
Model: ${form.modelNumber || "Not provided"}
Refrigerant: ${form.refrigerant || "Not provided"}

Readings:
Suction: ${form.suctionPressure || "N/A"} PSI
Head: ${form.headPressure || "N/A"} PSI
Superheat: ${form.superheat || "N/A"}°F
Subcooling: ${form.subcooling || "N/A"}°F
Ambient: ${form.ambientTemp || "N/A"}°F

Complaint:
${form.symptom || "Not provided"}

Diagnosis:
${diagnosis?.title || "Not generated"}

Diagnostic Confidence:
${diagnosis ? getDiagnosticConfidence() : 0}%

Testing Workflow:
${workflowLabels[selectedWorkflow] || selectedWorkflow}
Current Test: ${currentTest?.title || "Not selected"}

Customer Explanation:
${diagnosis ? getCustomerExplanation(diagnosis.title) : "Not generated"}

Recommended Parts / Tools:
${diagnosis ? getRecommendedParts(diagnosis.title).join("\n") : "Not generated"}

Before Photo Notes:
${form.beforePhotoNotes || "None"}

After Photo Notes:
${form.afterPhotoNotes || "None"}

Technician Notes:
${form.notes || "None"}

${estimate}
`;
  }
  

  

  function copyServiceReport() {
    navigator.clipboard.writeText(createFullReportText());
    alert("Service report copied.");
  }

  function copyInvoice() {
    navigator.clipboard.writeText(createInvoiceText());
    alert("Invoice copied.");
  }

  function printTextDocument(title, content) {
    const printWindow = window.open("", "_blank");

    if (!printWindow) {
      alert("Popup blocked. Please allow popups to print.");
      return;
    }

    printWindow.document.open();
    printWindow.document.write(
      "<!doctype html><html><head><title></title><style>body{font-family:Arial,sans-serif;padding:30px;line-height:1.6;color:#111;}h1{font-size:24px;margin-bottom:20px;}pre{white-space:pre-wrap;font-size:14px;font-family:Arial,sans-serif;}</style></head><body><h1></h1><pre id='print-content'></pre></body></html>"
    );
    printWindow.document.close();

    printWindow.document.title = title;
    printWindow.document.querySelector("h1").textContent = title;
    printWindow.document.getElementById("print-content").textContent = content;

    setTimeout(() => {
      printWindow.focus();
      printWindow.print();
    }, 250);
  }

  function printFullReport() {
    printTextDocument("HVAC/R Service Report", createFullReportText());
  }

  function printInvoice() {
    printTextDocument("HVAC/R Customer Invoice", createInvoiceText());
  }

  function saveReport() {
    const newReport = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      jobStatus: form.jobStatus,
      customerName: form.customerName || "Not provided",
      equipmentType: form.equipmentType || "Not provided",
      brand: form.brand || "Not provided",
      modelNumber: form.modelNumber || "Not provided",
      refrigerant: form.refrigerant || "Not provided",
      suctionPressure: form.suctionPressure || "N/A",
      headPressure: form.headPressure || "N/A",
      superheat: form.superheat || "N/A",
      subcooling: form.subcooling || "N/A",
      ambientTemp: form.ambientTemp || "N/A",
      symptom: form.symptom || "Not provided",
      notes: form.notes || "None",
      beforePhotoNotes: form.beforePhotoNotes || "None",
      afterPhotoNotes: form.afterPhotoNotes || "None",
      diagnosisTitle: diagnosis?.title || "Not generated",
      causes: diagnosis?.causes || [],
      tools: diagnosis?.tools || [],
      checks: diagnosis?.checks || [],
      testingGuide: diagnosis?.testingGuide || [],
      expectedReadings: diagnosis?.expectedReadings || [],
      repairActions: diagnosis?.repairActions || [],
      estimateTotal: estimateTotal().toFixed(2),
    };

    const existingReports =
      JSON.parse(localStorage.getItem("hvacrReports")) || [];

    const updatedReports = [newReport, ...existingReports];

    localStorage.setItem("hvacrReports", JSON.stringify(updatedReports));
    setSavedReports(updatedReports);

    alert("Report saved.");
  }

  function viewSavedReports() {
    const reports = JSON.parse(localStorage.getItem("hvacrReports")) || [];
    setSavedReports(reports);
  }

  function searchEquipmentHistory() {
  const reports = JSON.parse(localStorage.getItem("hvacrReports")) || [];
  const search = historySearch.toLowerCase().trim();

  if (!search) {
    alert("Enter a customer name, brand, model, or equipment type.");
    return;
  }

  const matches = reports.filter((report) => {
    return (
      report.customerName?.toLowerCase().includes(search) ||
      report.brand?.toLowerCase().includes(search) ||
      report.modelNumber?.toLowerCase().includes(search) ||
      report.equipmentType?.toLowerCase().includes(search)
    );
  });

  setEquipmentHistory(matches);
}

  function deleteReport(id) {
    const reports = JSON.parse(localStorage.getItem("hvacrReports")) || [];
    const updatedReports = reports.filter((report) => report.id !== id);

    localStorage.setItem("hvacrReports", JSON.stringify(updatedReports));
    setSavedReports(updatedReports);
  }

  function deleteAllReports() {
    const confirmed = window.confirm("Delete all saved reports?");
    if (!confirmed) return;

    localStorage.removeItem("hvacrReports");
    setSavedReports([]);
  }

  function reopenReport(report) {
    setForm((current) => ({
      ...current,
      customerName: report.customerName || "",
      equipmentType: report.equipmentType || "",
      brand: report.brand || "",
      modelNumber: report.modelNumber || "",
      refrigerant: report.refrigerant || "",
      suctionPressure:
        report.suctionPressure === "N/A" ? "" : report.suctionPressure || "",
      headPressure:
        report.headPressure === "N/A" ? "" : report.headPressure || "",
      superheat: report.superheat === "N/A" ? "" : report.superheat || "",
      subcooling:
        report.subcooling === "N/A" ? "" : report.subcooling || "",
      ambientTemp:
        report.ambientTemp === "N/A" ? "" : report.ambientTemp || "",
      symptom:
        report.symptom === "Not provided" ? "" : report.symptom || "",
      notes: report.notes === "None" ? "" : report.notes || "",
      beforePhotoNotes:
        report.beforePhotoNotes === "None" ? "" : report.beforePhotoNotes || "",
      afterPhotoNotes:
        report.afterPhotoNotes === "None" ? "" : report.afterPhotoNotes || "",
      jobStatus: report.jobStatus || "New",
    }));

    setDiagnosis({
      title: report.diagnosisTitle || "Saved Report",
      causes: report.causes || ["Saved report loaded."],
      tools: report.tools || ["Saved report loaded."],
      checks: report.checks || ["Review the saved report."],
      testingGuide: report.testingGuide || ["Saved report loaded."],
      expectedReadings: report.expectedReadings || ["Saved report loaded."],
      repairActions: report.repairActions || ["Saved report loaded."],
    });

    setWorkflowStep(0);
    setReading("");
    setWorkflowResult("");
    setActiveTab("diagnosis");

    alert("Report loaded successfully.");
  }

  function autoSelectWorkflow(diagnosisTitle, symptom) {
    const text = `${diagnosisTitle} ${symptom}`.toLowerCase();

    if (text.includes("compressor")) return "compressorNotStarting";
    if (text.includes("capacitor")) return "capacitorTesting";
    if (text.includes("contactor")) return "contactorTesting";
    if (text.includes("blower")) return "blowerMotor";
    if (text.includes("condenser")) return "condenserFanMotor";
    if (text.includes("airflow")) return "airflowTesting";

    if (
      text.includes("restriction") ||
      text.includes("txv") ||
      text.includes("filter drier")
    ) {
      return "txvRestrictionTesting";
    }

    if (
      text.includes("low refrigerant") ||
      text.includes("undercharged") ||
      text.includes("overcharged")
    ) {
      return "refrigerantCharging";
    }

    if (text.includes("breaker")) return "breakerTripping";
    if (text.includes("thermostat")) return "thermostatTesting";
    if (text.includes("transformer")) return "transformerTesting";
    if (text.includes("furnace")) return "furnaceIgnition";
    if (text.includes("heat pump")) return "heatPumpReversingValve";
    if (text.includes("maintenance") || text.includes("pm")) return "preventiveMaintenance";

    return "";
  }

  function applyDiagnosisWithWorkflow(diagnosisObject) {
    setDiagnosis(diagnosisObject);

    const recommendedWorkflow = autoSelectWorkflow(
      diagnosisObject.title,
      form.symptom
    );

    if (recommendedWorkflow && workflowLibrary[recommendedWorkflow]) {
      setSelectedWorkflow(recommendedWorkflow);
      setWorkflowStep(0);
      setWorkflowResult("");
      setReading("");
    }
  }

  function generateDiagnosis() {
    const symptom = form.symptom.toLowerCase();

    const suction = Number(form.suctionPressure);
    const head = Number(form.headPressure);
    const superheat = Number(form.superheat);
    const subcooling = Number(form.subcooling);

    if (suction > 0 && superheat > 20 && subcooling < 5) {
      applyDiagnosisWithWorkflow({
        title: "Possible Low Refrigerant Charge",
        causes: ["System undercharged", "Refrigerant leak", "Improper charging"],
        tools: ["Digital gauges", "Leak detector", "Temperature clamps"],
        checks: [
          "Inspect for refrigerant leaks.",
          "Verify superheat and subcooling.",
          "Repair confirmed leaks before charging.",
          "Charge according to manufacturer specifications.",
        ],
        testingGuide: [
          "Connect gauges to the suction and liquid service ports.",
          "Attach temperature clamps to the suction and liquid lines.",
          "Measure indoor return-air and supply-air temperatures.",
          "Measure outdoor ambient temperature.",
          "Calculate superheat and subcooling.",
          "Inspect evaporator coil, condenser coil, and refrigerant lines for leak signs.",
        ],
        expectedReadings: [
          "Superheat: often higher than normal on an undercharged system.",
          "Subcooling: often lower than normal on an undercharged system.",
          "Suction Pressure: often lower than expected.",
          "Temperature Split: may be lower than normal.",
        ],
        repairActions: [
          "Find and repair refrigerant leaks.",
          "Pressure test if needed.",
          "Evacuate the system properly.",
          "Charge system according to manufacturer specifications.",
        ],
      });
      return;
    }

    if (head > 325 && subcooling > 15) {
      applyDiagnosisWithWorkflow({
        title: "Possible Overcharged System",
        causes: ["Excess refrigerant", "Improper charging procedure"],
        tools: ["Digital gauges", "Temperature clamps", "Recovery machine"],
        checks: [
          "Verify condenser airflow first.",
          "Confirm subcooling reading.",
          "Compare readings to manufacturer specifications.",
          "Recover excess refrigerant only if overcharge is confirmed.",
        ],
        testingGuide: [
          "Verify condenser coil is clean.",
          "Verify condenser fan is running properly.",
          "Connect gauges and temperature clamps.",
          "Measure liquid-line temperature.",
          "Calculate subcooling.",
          "Compare subcooling to the manufacturer target.",
        ],
        expectedReadings: [
          "Head Pressure: higher than normal.",
          "Subcooling: higher than manufacturer target.",
          "Compressor Amps: may be higher than normal.",
        ],
        repairActions: [
          "Recover refrigerant carefully.",
          "Adjust charge to manufacturer specifications.",
          "Recheck pressures, superheat, and subcooling.",
        ],
      });
      return;
    }

    if (head > 325 && subcooling <= 12) {
      applyDiagnosisWithWorkflow({
        title: "Possible Dirty Condenser or Poor Condenser Airflow",
        causes: [
          "Dirty condenser coil",
          "Weak condenser fan motor",
          "Blocked airflow",
          "High outdoor ambient temperature",
        ],
        tools: ["Thermometer", "Multimeter", "Digital gauges"],
        checks: [
          "Inspect and clean condenser coil.",
          "Verify condenser fan operation.",
          "Check fan capacitor and motor amperage.",
          "Confirm outdoor ambient conditions.",
        ],
        testingGuide: [
          "Inspect condenser coil for dirt, grass, leaves, or blockage.",
          "Verify condenser fan blade is spinning in the correct direction.",
          "Check fan motor amperage.",
          "Test condenser fan capacitor.",
          "Wash condenser coil if dirty.",
          "Restart system and recheck head pressure.",
        ],
        expectedReadings: [
          "Head Pressure: higher than normal before cleaning.",
          "Fan Capacitor: within rating tolerance.",
          "Fan Motor Amps: at or below nameplate rating.",
        ],
        repairActions: [
          "Clean condenser coil.",
          "Replace weak fan capacitor.",
          "Replace failing condenser fan motor.",
          "Remove airflow restrictions around outdoor unit.",
        ],
      });
      return;
    }

    if (suction < 60 && superheat > 20 && subcooling >= 8) {
      applyDiagnosisWithWorkflow({
        title: "Possible Refrigerant Restriction",
        causes: [
          "Restricted TXV",
          "Restricted filter drier",
          "Restricted liquid line",
          "Moisture or debris in system",
        ],
        tools: ["Digital gauges", "Temperature clamps", "Thermometer"],
        checks: [
          "Check temperature drop across filter drier.",
          "Inspect TXV operation.",
          "Verify liquid line restrictions.",
          "Compare superheat and subcooling readings.",
        ],
        testingGuide: [
          "Connect gauges to the system.",
          "Measure suction and head pressure.",
          "Measure superheat and subcooling.",
          "Check temperature before and after the filter drier.",
          "Look for frost or temperature drop at restriction points.",
          "Inspect TXV sensing bulb placement.",
          "Verify airflow before condemning refrigerant components.",
        ],
        expectedReadings: [
          "Suction Pressure: lower than normal.",
          "Superheat: higher than normal.",
          "Subcooling: normal to high.",
          "Filter Drier Temperature Drop: more than 3°F may indicate restriction.",
        ],
        repairActions: [
          "Replace restricted filter drier.",
          "Repair or replace restricted TXV if confirmed.",
          "Remove moisture or debris from system.",
          "Evacuate and recharge system properly.",
        ],
      });
      return;
    }

    const words = symptom
      .replace(/[^\w\s]/gi, "")
      .split(" ")
      .filter((word) => word.length > 2);

    let bestMatch = null;
    let bestScore = 0;

    diagnostics.forEach((item) => {
      const searchableText = [
        item.symptom,
        item.title,
        ...(item.causes || []),
        ...(item.checks || []),
      ]
        .join(" ")
        .toLowerCase();

      let score = 0;

      words.forEach((word) => {
        if (searchableText.includes(word)) {
          score += 1;
        }
      });

      if (score > bestScore) {
        bestScore = score;
        bestMatch = item;
      }
    });

    const match = bestScore >= 2 ? bestMatch : null;

    if (match) {
      applyDiagnosisWithWorkflow({
        title: match.title || "Matched Diagnosis",
        causes: match.causes || ["Matched from diagnostic library."],
        tools: match.tools || ["Multimeter", "Thermometer"],
        checks: match.checks || ["Continue testing."],
        testingGuide: match.testingGuide || ["Follow diagnostic workflow."],
        expectedReadings:
          match.expectedReadings || ["Compare to manufacturer specifications."],
        repairActions:
          match.repairActions || ["Repair only after confirming the failed part."],
      });
    } else {
      applyDiagnosisWithWorkflow({
        title: "General Diagnosis",
        causes: [
          "More information is needed",
          "Symptom is not in the diagnostic library yet",
        ],
        tools: ["Multimeter", "Thermometer", "Visual inspection"],
        checks: [
          "Add more details in the symptom box.",
          "Include pressure readings if available.",
          "Include temperature readings if available.",
          "Describe what is running and what is not running.",
        ],
        testingGuide: [
          "Verify power is present where required.",
          "Perform a visual inspection.",
          "Check thermostat or control signal.",
          "Check airflow before checking refrigerant charge.",
          "Record all electrical and refrigerant readings.",
        ],
        expectedReadings: [
          "Line voltage should match equipment nameplate.",
          "Low-voltage control circuit is commonly around 24V.",
          "Capacitors should be within rated tolerance.",
          "Motors should not exceed nameplate amperage.",
        ],
        repairActions: [
          "Correct wiring or power issues.",
          "Replace failed electrical components only after testing.",
          "Clean dirty coils or filters.",
          "Continue diagnosis with more complete readings.",
        ],
      });
    }
  }

  function interpretMeterReading(test, value) {
    if (!test) return "No test selected.";

    const raw = value.trim().toLowerCase();

    if (!raw) return "Enter a meter reading first.";

    if (raw === "ol" || raw === "open") {
      return "OPEN CIRCUIT: The meter is showing OL/open. This usually means the circuit is open or the component winding is broken.";
    }

    if (raw === "0" || raw === "0v" || raw === "0 vac") {
      return "NO READING: The meter shows 0. Check power source, breaker, disconnect, fuse, wiring, or control signal.";
    }

    const number = Number(raw.replace(/[^0-9.-]/g, ""));

    if (Number.isNaN(number)) {
      return "Reading not recognized. Enter a number like 240, 24, 0, or OL.";
    }

    if (test.title.includes("Line Voltage")) {
      if (number >= 208 && number <= 240) {
        return "PASS: Correct line voltage is present. Continue to the next test.";
      }

      if (number > 0 && number < 208) {
        return "WARNING: Low Voltage Detected. Voltage is below the normal operating range.";
      }

      if (number > 240) {
        return "WARNING: High Voltage Detected. Voltage exceeds expected range.";
      }
    }

    if (
      test.title.includes("Contactor Coil") ||
      test.title.includes("Coil Voltage")
    ) {
      if (number >= 22 && number <= 28) {
        return "PASS: Correct 24V control voltage is present at the contactor coil.";
      }

      if (number > 0 && number < 22) {
        return "WARNING: Low Control Voltage Detected. Check transformer, thermostat circuit, fuse, float switch, pressure switches, and low-voltage wiring.";
      }

      if (number > 28) {
        return "WARNING: High Control Voltage Detected. Verify transformer output and control circuit wiring.";
      }
    }

    if (test.title.includes("Load Side Voltage")) {
      if (number >= 208 && number <= 240) {
        return "PASS: Voltage is leaving the contactor properly.";
      }

      if (number === 0) {
        return "FAIL: No voltage leaving contactor. Check contactor contacts, coil operation, and incoming line voltage.";
      }
    }

    if (test.title.includes("Superheat")) {
      if (number > 20) {
        return "WARNING: High Superheat Detected. Possible restriction, undercharge, or evaporator starvation.";
      }

      if (number < 5) {
        return "WARNING: Low Superheat Detected. Possible flooding evaporator or TXV issue.";
      }

      return "PASS: Superheat appears normal.";
    }

    if (test.title.includes("Subcooling")) {
      if (number > 15) {
        return "WARNING: High Subcooling Detected. Possible restriction or overcharge.";
      }

      if (number < 5) {
        return "WARNING: Low Subcooling Detected. Possible refrigerant undercharge.";
      }

      return "PASS: Subcooling appears normal.";
    }

    if (test.title.includes("Filter Drier")) {
      if (number > 3) {
        return "FAIL: Excessive temperature drop. Filter drier may be restricted.";
      }

      return "PASS: Temperature drop is acceptable.";
    }

    if (
      test.title.includes("Float Switch") ||
      test.title.includes("High Pressure Switch") ||
      test.title.includes("Low Pressure Switch")
    ) {
      if (raw === "ol" || raw === "open") {
        return "FAIL: Safety switch is open. Check drain water, refrigerant pressure condition, wiring, or the switch itself.";
      }

      return "PASS: Safety switch appears closed. Continue checking the rest of the safety circuit.";
    }

    if (test.title.includes("Temperature Split")) {
      if (number >= 16 && number <= 22) {
        return "PASS: Temperature split is within normal cooling range.";
      }

      if (number < 16) {
        return "FAIL: Low temperature split. Check refrigerant charge, airflow, compressor performance, and indoor load.";
      }

      if (number > 22) {
        return "FAIL: High temperature split. Check for restricted airflow, dirty filter, dirty evaporator coil, or low blower speed.";
      }
    }

    if (test.title.includes("24V Through Safety Circuit")) {
      if (number >= 22 && number <= 28) {
        return "PASS: 24V is passing through this part of the safety circuit.";
      }

      return "FAIL: 24V is not passing through. Find the open switch or broken wire in the safety circuit.";
    }

    if (test.title.includes("C to HERM") || test.title.includes("C to FAN")) {
      return "CAPACITOR CHECK: Compare this reading to the capacitor label. If it is more than 6% below rating, replace the capacitor.";
    }

    if (test.title.includes("Turn Power Off")) {
      return "CONFIRMATION: Power should be OFF before continuing. Verify with your meter before touching components.";
    }

    if (test.title.includes("Discharge Capacitor")) {
      return "CONFIRMATION: Capacitor must be safely discharged before measuring capacitance.";
    }

    if (test.title.includes("R to C")) {
      if (number >= 22 && number <= 28) {
        return "PASS: Thermostat has proper 24V power.";
      }

      return "FAIL: No 24V power. Check transformer, fuse, float switch, wiring, and control board.";
    }

    if (test.title.includes("Y to C")) {
      if (number >= 22 && number <= 28) {
        return "PASS: Cooling call is present.";
      }

      return "FAIL: Thermostat is not sending a cooling signal.";
    }

    if (test.title.includes("G to C")) {
      if (number >= 22 && number <= 28) {
        return "PASS: Fan call is present.";
      }

      return "FAIL: Thermostat is not sending a fan signal.";
    }

    if (test.title.includes("W to C")) {
      if (number >= 22 && number <= 28) {
        return "PASS: Heat call is present.";
      }

      return "FAIL: Thermostat is not sending a heat signal.";
    }

    if (
      test.title.includes("Common To Run") ||
      test.title.includes("Common To Start") ||
      test.title.includes("Start To Run")
    ) {
      if (raw === "ol" || raw === "open") {
        return "FAIL: Open compressor winding detected. Compressor may have an internal open winding.";
      }

      if (number > 0) {
        return "READING RECORDED: Compare all three winding readings. Start-to-Run should equal Common-to-Start plus Common-to-Run.";
      }

      return "FAIL: Very low or zero ohms may indicate a shorted winding.";
    }

    if (
      test.title.includes("Compressor To Ground") ||
      test.title.includes("To Ground")
    ) {
      if (raw === "ol" || raw === "open") {
        return "PASS: No short to ground detected.";
      }

      if (number > 0) {
        return "FAIL: Possible short to ground. Do not continue running equipment.";
      }
    }

    return "Reading recorded. Compare it with the expected reading and continue diagnosis.";
  }

  function submitReading() {
    const result = interpretMeterReading(currentTest, reading);

    setWorkflowResult(result);

    if (result.startsWith("PASS") && workflowStep < currentWorkflow.length - 1) {
      setWorkflowStep(workflowStep + 1);
      setReading("");
    }
  }

  function getResultStyle(result) {
    if (result.startsWith("PASS")) return styles.passCard;

    if (
      result.startsWith("FAIL") ||
      result.startsWith("NO READING") ||
      result.startsWith("OPEN CIRCUIT")
    ) {
      return styles.failCard;
    }

    if (result.startsWith("WARNING")) {
      return styles.warningCard;
    }

    return styles.infoCard;
  }

  function previousWorkflowStep() {
    setWorkflowStep((step) => Math.max(step - 1, 0));
    setReading("");
    setWorkflowResult("");
  }

  function nextWorkflowStep() {
    setWorkflowStep((step) => Math.min(step + 1, currentWorkflow.length - 1));
    setReading("");
    setWorkflowResult("");
  }

  function clearForm() {
    setForm({
      customerName: "",
      equipmentType: "",
      brand: "",
      modelNumber: "",
      refrigerant: "",
      suctionPressure: "",
      headPressure: "",
      superheat: "",
      subcooling: "",
      ambientTemp: "",
      symptom: "",
      notes: "",
      beforePhotoNotes: "",
      afterPhotoNotes: "",
      jobStatus: "New",
      serviceFee: "",
      laborHours: "",
      hourlyRate: "",
      partsCost: "",
      taxPercent: "",
      discount: "",
      errorBrand: "Carrier",
      errorCode: "33",
    });

    setDiagnosis(null);
    setRefrigerantResult(null);
    setSuggestedWorkflow("");
    setWorkflowStep(0);
    setReading("");
    setWorkflowResult("");
    setActiveTab("job");
  }

  function handlePhotoUpload(e, type) {
    const file = e.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (type === "before") {
        setBeforePreview(reader.result);
      } else {
        setAfterPreview(reader.result);
      }
    };

  reader.readAsDataURL(file);
}

  return (
  <main style={styles.page}>
    <section style={styles.container}>
      <h1 style={styles.title}>HVAC/R Tech Assistant</h1>

      <p style={styles.subtitle}>
        Field diagnostics, apprentice guidance, reports, estimates, and invoices.
      </p>

      <div style={styles.formCard}>
        <div style={styles.tabBar}>
          <button
            style={activeTab === "job" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("job")}
          >
            Job
          </button>

          <button
            style={activeTab === "diagnosis" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("diagnosis")}
          >
            Diagnosis
          </button>

          <button
            style={activeTab === "business" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("business")}
          >
            Business
          </button>

          <button
            style={activeTab === "tools" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("tools")}
          >
            Tools
          </button>

          <button
            style={activeTab === "training" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("training")}
          >
            Training
          </button>

          <button
            style={activeTab === "reports" ? styles.activeTab : styles.tab}
            onClick={() => setActiveTab("reports")}
          >
            Reports
          </button>
        </div>

        {activeTab === "job" && (
          <>
            <select
              name="jobStatus"
              style={styles.input}
              value={form.jobStatus}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="In Progress">In Progress</option>
              <option value="Waiting on Parts">Waiting on Parts</option>
              <option value="Completed">Completed</option>
              <option value="Needs Return Visit">Needs Return Visit</option>
            </select>

            <input
              name="customerName"
              placeholder="Customer Name"
              style={styles.input}
              value={form.customerName}
              onChange={handleChange}
            />

            <select
              name="equipmentType"
              style={styles.input}
              value={form.equipmentType}
              onChange={handleChange}
            >
              <option value="">Select Equipment Type</option>
              <option value="Residential AC">Residential AC</option>
              <option value="Heat Pump">Heat Pump</option>
              <option value="Gas Furnace">Gas Furnace</option>
              <option value="Walk-In Cooler">Walk-In Cooler</option>
              <option value="Walk-In Freezer">Walk-In Freezer</option>
              <option value="Reach-In Refrigerator">Reach-In Refrigerator</option>
              <option value="Ice Machine">Ice Machine</option>
              <option value="Rooftop Unit">Rooftop Unit (RTU)</option>
            </select>

            <input
              name="brand"
              placeholder="Brand: Carrier, Trane, Lennox..."
              style={styles.input}
              value={form.brand}
              onChange={handleChange}
            />

            <input
              name="modelNumber"
              placeholder="Model Number"
              style={styles.input}
              value={form.modelNumber}
              onChange={handleChange}
            />

            <select
              name="refrigerant"
              style={styles.input}
              value={form.refrigerant}
              onChange={handleChange}
            >
              <option value="">Select Refrigerant Type</option>
              <option value="R-410A">R-410A</option>
              <option value="R-454B">R-454B</option>
              <option value="R-32">R-32</option>
              <option value="R-134a">R-134a</option>
              <option value="R-404A">R-404A</option>
              <option value="R-448A">R-448A</option>
              <option value="R-449A">R-449A</option>
            </select>

            <input
              name="suctionPressure"
              placeholder="Suction Pressure (PSI)"
              style={styles.input}
              value={form.suctionPressure}
              onChange={handleChange}
            />

            <input
              name="headPressure"
              placeholder="Head Pressure (PSI)"
              style={styles.input}
              value={form.headPressure}
              onChange={handleChange}
            />

            <input
              name="superheat"
              placeholder="Superheat (°F)"
              style={styles.input}
              value={form.superheat}
              onChange={handleChange}
            />

            <input
              name="subcooling"
              placeholder="Subcooling (°F)"
              style={styles.input}
              value={form.subcooling}
              onChange={handleChange}
            />

            <input
              name="ambientTemp"
              placeholder="Ambient Temperature (°F)"
              style={styles.input}
              value={form.ambientTemp}
              onChange={handleChange}
            />

            <textarea
              name="symptom"
              placeholder="Main Symptom: not cooling, high head pressure, compressor not starting..."
              style={styles.textarea}
              value={form.symptom}
              onChange={handleChange}
            />

            {suggestedWorkflow && suggestedWorkflow !== selectedWorkflow && (
              <div style={styles.suggestionBox}>
                <strong>Suggested Workflow:</strong>{" "}
                {workflowLabels[suggestedWorkflow]}
                <button
                  style={styles.smallButton}
                  onClick={applySuggestedWorkflow}
                >
                  Use Suggested Workflow
                </button>
              </div>
            )}

            <PhotoUpload
              beforePreview={beforePreview}
              afterPreview={afterPreview}
              handlePhotoUpload={handlePhotoUpload}
              form={form}
              handleChange={handleChange}
              styles={styles}
            />

            <textarea
              name="notes"
              placeholder="Technician notes..."
              style={styles.textarea}
              value={form.notes}
              onChange={handleChange}
            />
          </>
        )}

        {activeTab === "diagnosis" && (
          <>
            <select
              style={styles.input}
              value={selectedWorkflow}
              onChange={(e) => {
                setSelectedWorkflow(e.target.value);
                setWorkflowStep(0);
                setWorkflowResult("");
                setReading("");
              }}
            >
              {Object.keys(workflowLibrary).map((key) => (
                <option key={key} value={key}>
                  {workflowLabels[key]}
                </option>
              ))}
            </select>

            <button style={styles.button} onClick={generateDiagnosis}>
              Generate Diagnosis
            </button>

            <button style={styles.secondaryButton} onClick={clearForm}>
              Start New Job
            </button>

            <button
              style={styles.secondaryButton}
              onClick={analyzeRefrigerantReadings}
            >
              Analyze Refrigerant Readings
            </button>

            {refrigerantResult && (
              <div style={styles.refrigerantBox}>
                <h3>{refrigerantResult.title}</h3>
                <p>{refrigerantResult.message}</p>
              </div>
            )}

            {diagnosis && (
              <div style={styles.resultCard}>
                <h2>{diagnosis.title}</h2>

                <div style={styles.confidenceCard}>
                  Diagnostic Confidence: {getDiagnosticConfidence()}%
                </div>

                <h3 style={styles.sectionTitleTesting}>
                  Interactive Troubleshooting
                </h3>

                {currentTest && (
                  <div style={styles.workflowCard}>
                    <h4>
                      TEST {workflowStep + 1}: {currentTest.title}
                    </h4>

                    {apprenticeMode && (
                      <>
                        <div style={styles.customerBox}>
                          <strong>Safety Notice</strong>
                          <p>{currentTest.safety}</p>
                        </div>

                        <p>
                          <strong>Why This Test Matters:</strong>{" "}
                          {getTestWhy(currentTest)}
                        </p>

                        <p>
                          <strong>Meter Setting:</strong> {currentTest.meter}
                        </p>

                        <p>
                          <strong>Meter Dial Position:</strong>{" "}
                          {currentTest.meterPosition}
                        </p>

                        <p>
                          <strong>Why This Setting?</strong>{" "}
                          {getMeterExplanation(currentTest.meter)}
                        </p>

                        <p>
                          <strong>Lead Placement:</strong> {currentTest.leads}
                        </p>

                        <div style={styles.leadGrid}>
                          {getLeadCards(currentTest.leads).map((lead, index) => (
                            <div
                              key={index}
                              style={getLeadCardStyle(lead.type)}
                            >
                              <strong>{lead.label}</strong>
                              <p>{lead.value}</p>
                            </div>
                          ))}
                        </div>
                      </>
                    )}

                    <p>
                      <strong>Expected Reading:</strong> {currentTest.expected}
                    </p>

                    <input
                      value={reading}
                      onChange={(e) => setReading(e.target.value)}
                      placeholder="Enter meter reading, for example 240, 24, 0, or OL"
                      style={styles.input}
                    />

                    <div style={styles.workflowButtons}>
                      <button
                        style={styles.secondaryButton}
                        onClick={previousWorkflowStep}
                        disabled={workflowStep === 0}
                      >
                        Previous Test
                      </button>

                      <button style={styles.button} onClick={submitReading}>
                        Submit Reading
                      </button>

                      <button
                        style={styles.secondaryButton}
                        onClick={nextWorkflowStep}
                        disabled={workflowStep === currentWorkflow.length - 1}
                      >
                        Next Test
                      </button>
                    </div>

                    {workflowResult && (
                      <div style={getResultStyle(workflowResult)}>
                        {workflowResult}
                      </div>
                    )}
                  </div>
                )}

                <h3 style={styles.sectionTitleCauses}>Likely Causes</h3>
                <ul>
                  {diagnosis.causes.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleTools}>Tools Needed</h3>
                <ul>
                  {diagnosis.tools.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleChecks}>Recommended Checks</h3>
                <ul>
                  {diagnosis.checks.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleTesting}>
                  Step-by-Step Testing Guide
                </h3>
                <ul>
                  {diagnosis.testingGuide?.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleReadings}>Expected Readings</h3>
                <ul>
                  {diagnosis.expectedReadings?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleRepairs}>
                  Recommended Repair Actions
                </h3>
                <ul>
                  {diagnosis.repairActions?.map((action, index) => (
                    <li key={index}>{action}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleTools}>
                  Recommended Parts / Tools
                </h3>
                <ul>
                  {getRecommendedParts(diagnosis.title).map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3 style={styles.sectionTitleChecks}>Customer Explanation</h3>

                <div style={styles.customerBox}>
                  <p>
                    The system shows signs of:{" "}
                    <strong>{diagnosis.title}</strong>.
                  </p>

                  <p>{getCustomerExplanation(diagnosis.title)}</p>

                  <p>Recommended next step: {diagnosis.checks[0]}</p>
                </div>

                <h3 style={styles.sectionTitleChecks}>Service Report Draft</h3>

                <div style={styles.reportBox}>
                  <p>
                    <strong>Job Status:</strong> {form.jobStatus}
                  </p>

                  <p>
                    <strong>Customer:</strong>{" "}
                    {form.customerName || "Not provided"}
                  </p>

                  <p>
                    <strong>Equipment:</strong>{" "}
                    {form.equipmentType || "Not provided"}
                  </p>

                  <p>
                    <strong>Brand:</strong> {form.brand || "Not provided"}
                  </p>

                  <p>
                    <strong>Model:</strong>{" "}
                    {form.modelNumber || "Not provided"}
                  </p>

                  <p>
                    <strong>Refrigerant:</strong>{" "}
                    {form.refrigerant || "Not provided"}
                  </p>

                  <p>
                    <strong>Complaint:</strong>{" "}
                    {form.symptom || "Not provided"}
                  </p>

                  <p>
                    <strong>Diagnosis:</strong> {diagnosis.title}
                  </p>

                  <p>
                    <strong>Invoice Total:</strong>{" "}
                    {formatMoney(estimateTotal())}
                  </p>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === "business" && (
          <>
            <div style={styles.toolPanel}>
              <h3>Estimate Builder</h3>

              <input
                name="serviceFee"
                placeholder="Service Fee"
                style={styles.input}
                value={form.serviceFee}
                onChange={handleChange}
              />

              <input
                name="laborHours"
                placeholder="Labor Hours"
                style={styles.input}
                value={form.laborHours}
                onChange={handleChange}
              />

              <input
                name="hourlyRate"
                placeholder="Hourly Rate"
                style={styles.input}
                value={form.hourlyRate}
                onChange={handleChange}
              />

              <input
                name="partsCost"
                placeholder="Parts Cost"
                style={styles.input}
                value={form.partsCost}
                onChange={handleChange}
              />

              <input
                name="taxPercent"
                placeholder="Tax %"
                style={styles.input}
                value={form.taxPercent}
                onChange={handleChange}
              />

              <input
                name="discount"
                placeholder="Discount"
                style={styles.input}
                value={form.discount}
                onChange={handleChange}
              />

              <div style={styles.invoiceBox}>
                <p>Subtotal: {formatMoney(estimateSubtotal())}</p>
                <p>Tax: {formatMoney(estimateTax())}</p>
                <p>Discount: {formatMoney(form.discount)}</p>
                <h3>Total: {formatMoney(estimateTotal())}</h3>
              </div>
            </div>

            <button style={styles.secondaryButton} onClick={copyServiceReport}>
              Copy Full Report
            </button>

            <button style={styles.secondaryButton} onClick={copyInvoice}>
              Copy Invoice
            </button>

            <button style={styles.secondaryButton} onClick={printFullReport}>
              Print / Save Report as PDF
            </button>

            <button style={styles.secondaryButton} onClick={printInvoice}>
              Print / Save Invoice as PDF
            </button>

            <button style={styles.saveButton} onClick={saveReport}>
              Save Report
            </button>
          </>
        )}

        {activeTab === "tools" && (
          <>
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

            <div style={styles.toolPanel}>
              <h3>Refrigerant PT Reference</h3>

              <p>
                Selected refrigerant:{" "}
                <strong>{form.refrigerant || "Not selected"}</strong>
              </p>

              {ptReference[form.refrigerant] ? (
                <ul>
                  {ptReference[form.refrigerant].map((row, index) => (
                    <li key={index}>
                      {row.temp}: {row.pressure}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Select a supported refrigerant to view reference pressures.</p>
              )}
            </div>

            <div style={styles.toolPanel}>
              <h3>Parts Library</h3>

              {partsLibrary.map((part) => (
                <div key={part.name} style={styles.partCard}>
                  <h4>{part.name}</h4>
                  <p>
                    <strong>Symptoms:</strong> {part.symptoms}
                  </p>
                  <p>
                    <strong>Tests:</strong> {part.tests}
                  </p>
                  <p>
                    <strong>Common Failure:</strong> {part.commonFailure}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "training" && (
          <>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={apprenticeMode}
                onChange={(e) => setApprenticeMode(e.target.checked)}
              />
              Apprentice Mode
            </label>

            <button style={styles.secondaryButton} onClick={startQuiz}>
              Start Apprentice Quiz
            </button>

            {quizStarted && (
              <div style={styles.quizBox}>
                <h3>Apprentice Quiz Mode</h3>
                <p>
                  <strong>
                    Question {quizIndex + 1} of {quizQuestions.length}
                  </strong>
                </p>

                <p>{quizQuestions[quizIndex].question}</p>

                {quizQuestions[quizIndex].options.map((option) => (
                  <label key={option} style={styles.quizOption}>
                    <input
                      type="radio"
                      name="quizAnswer"
                      value={option}
                      checked={selectedQuizAnswer === option}
                      onChange={(e) => setSelectedQuizAnswer(e.target.value)}
                    />
                    {option}
                  </label>
                ))}

                <div style={styles.workflowButtons}>
                  <button style={styles.button} onClick={submitQuizAnswer}>
                    Submit Answer
                  </button>

                  <button
                    style={styles.secondaryButton}
                    onClick={nextQuizQuestion}
                  >
                    Next Question
                  </button>
                </div>

                {quizFeedback && <div style={styles.infoCard}>{quizFeedback}</div>}

                <p>
                  <strong>Score:</strong> {quizScore} / {quizQuestions.length}
                </p>
              </div>
            )}
          </>
        )}

        {activeTab === "reports" && (
          <>
            <button style={styles.secondaryButton} onClick={viewSavedReports}>
              View Saved Reports
            </button>

            <div style={styles.reportBox}>
              <h3>Customer Equipment History</h3>

              <input
                style={styles.input}
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                placeholder="Search by customer, brand, model, or equipment type"
              />

              <button style={styles.button} onClick={searchEquipmentHistory}>
                Search History
              </button>

              {equipmentHistory.length > 0 && (
                <div style={styles.historyBox}>
                  {equipmentHistory.map((report) => (
                    <div key={report.id} style={styles.savedReportCard}>
                      <p>
                        <strong>Date:</strong> {report.date}
                      </p>

                      <p>
                        <strong>Customer:</strong> {report.customerName}
                      </p>

                      <p>
                        <strong>Equipment:</strong> {report.equipmentType}
                      </p>

                      <p>
                        <strong>Brand / Model:</strong> {report.brand}{" "}
                        {report.modelNumber}
                      </p>

                      <p>
                        <strong>Diagnosis:</strong> {report.diagnosisTitle}
                      </p>

                      <p>
                        <strong>Job Status:</strong> {report.jobStatus}
                      </p>

                      <p>
                        <strong>Total:</strong> $
                        {report.estimateTotal || "0.00"}
                      </p>

                      <button
                        style={styles.openButton}
                        onClick={() => reopenReport(report)}
                      >
                        Open This Visit
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {historySearch && equipmentHistory.length === 0 && (
                <p style={styles.mutedText}>
                  No history found yet for this search.
                </p>
              )}
            </div>

            {savedReports.length > 0 && (
              <div style={styles.savedReportsBox}>
                <div style={styles.savedReportsHeader}>
                  <h2>Saved Reports</h2>

                  <button style={styles.deleteButton} onClick={deleteAllReports}>
                    Delete All
                  </button>
                </div>

                {savedReports.map((report) => (
                  <div key={report.id} style={styles.savedReportCard}>
                    <p>
                      <strong>Date:</strong> {report.date}
                    </p>

                    <p>
                      <strong>Status:</strong> {report.jobStatus}
                    </p>

                    <p>
                      <strong>Customer:</strong> {report.customerName}
                    </p>

                    <p>
                      <strong>Equipment:</strong> {report.equipmentType}
                    </p>

                    <p>
                      <strong>Brand:</strong> {report.brand}
                    </p>

                    <p>
                      <strong>Model:</strong> {report.modelNumber}
                    </p>

                    <p>
                      <strong>Diagnosis:</strong> {report.diagnosisTitle}
                    </p>

                    <p>
                      <strong>Total:</strong> ${report.estimateTotal}
                    </p>

                    <button
                      style={styles.openButton}
                      onClick={() => reopenReport(report)}
                    >
                      Open Report
                    </button>

                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteReport(report.id)}
                    >
                      Delete Report
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  </main>
);
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0f172a",
    color: "white",
    padding: "30px 16px",
    fontFamily: "Arial, sans-serif",
  },
  container: {
    maxWidth: "850px",
    margin: "0 auto",
  },
  title: {
    fontSize: "42px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#cbd5e1",
    marginBottom: "25px",
  },
  tabBar: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  },
  tab: {
    background: "#1e293b",
    color: "white",
    border: "1px solid #475569",
    borderRadius: "8px",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  activeTab: {
    background: "#38bdf8",
    color: "#020617",
    border: "1px solid #38bdf8",
    borderRadius: "8px",
    padding: "12px 18px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  secondaryButton: {
    background: "transparent",
    color: "white",
    border: "1px solid #475569",
    padding: "14px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "12px",
  },
  smallButton: {
    background: "#38bdf8",
    color: "#020617",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "10px",
    marginTop: "8px",
  },
  historyBox: {
    marginTop: "15px",
    display: "grid",
    gap: "15px",
  },

  mutedText: {
    color: "#94a3b8",
    fontSize: "14px",
  },
  saveButton: {
    background: "#f97316",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginTop: "12px",
  },
  deleteButton: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
  },
  openButton: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "10px",
    marginRight: "10px",
  },
  formCard: {
    background: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "16px",
    padding: "24px",
    display: "grid",
    gap: "14px",
  },
  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #475569",
    background: "#020617",
    color: "white",
    fontSize: "15px",
  },
  textarea: {
    padding: "14px",
    minHeight: "100px",
    borderRadius: "10px",
    border: "1px solid #475569",
    background: "#020617",
    color: "white",
    fontSize: "15px",
  },
  button: {
    background: "#38bdf8",
    color: "#020617",
    border: "none",
    padding: "15px",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  passCard: {
    marginTop: "15px",
    background: "#052e16",
    border: "1px solid #22c55e",
    color: "#dcfce7",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
    fontWeight: "bold",
  },
  failCard: {
    marginTop: "15px",
    background: "#450a0a",
    border: "1px solid #ef4444",
    color: "#fee2e2",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
    fontWeight: "bold",
  },
  warningCard: {
    marginTop: "15px",
    background: "#451a03",
    border: "1px solid #f59e0b",
    color: "#fef3c7",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
    fontWeight: "bold",
  },
  infoCard: {
    marginTop: "15px",
    background: "#082f49",
    border: "1px solid #38bdf8",
    color: "#e0f2fe",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
    fontWeight: "bold",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    color: "#cbd5e1",
    fontWeight: "bold",
  },
  customerBox: {
    marginTop: "15px",
    background: "#082f49",
    border: "1px solid #0ea5e9",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
  },
  suggestionBox: {
    background: "#172554",
    border: "1px solid #60a5fa",
    borderRadius: "10px",
    padding: "14px",
    color: "#dbeafe",
  },
  refrigerantBox: {
    background: "#1e1b4b",
    border: "1px solid #818cf8",
    borderRadius: "12px",
    padding: "16px",
    lineHeight: "1.7",
  },
  quizBox: {
    background: "#111827",
    border: "1px solid #a855f7",
    borderRadius: "12px",
    padding: "16px",
    lineHeight: "1.7",
  },
  quizOption: {
    display: "block",
    background: "#020617",
    border: "1px solid #334155",
    padding: "10px",
    borderRadius: "8px",
    marginTop: "8px",
    cursor: "pointer",
  },
  toolPanel: {
    background: "#020617",
    border: "1px solid #475569",
    borderRadius: "12px",
    padding: "16px",
    lineHeight: "1.7",
  },
  partCard: {
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "12px",
    marginTop: "10px",
  },
  invoiceBox: {
    background: "#111827",
    border: "1px solid #22c55e",
    borderRadius: "10px",
    padding: "14px",
    marginTop: "10px",
  },
  resultCard: {
    marginTop: "20px",
    background: "#0f172a",
    border: "1px solid #334155",
    borderRadius: "12px",
    padding: "20px",
  },
  confidenceCard: {
    background: "#052e16",
    border: "1px solid #22c55e",
    color: "#dcfce7",
    borderRadius: "10px",
    padding: "12px",
    fontWeight: "bold",
    marginTop: "10px",
  },
  workflowCard: {
    marginTop: "15px",
    background: "#020617",
    border: "1px solid #8b5cf6",
    borderRadius: "12px",
    padding: "18px",
    lineHeight: "1.7",
    display: "grid",
    gap: "12px",
  },
  workflowButtons: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  leadGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
    gap: "10px",
  },
  redLeadCard: {
    background: "#450a0a",
    border: "1px solid #ef4444",
    color: "#fee2e2",
    borderRadius: "10px",
    padding: "12px",
  },
  blackLeadCard: {
    background: "#020617",
    border: "1px solid #94a3b8",
    color: "#e2e8f0",
    borderRadius: "10px",
    padding: "12px",
  },
  clampLeadCard: {
    background: "#3b0764",
    border: "1px solid #c084fc",
    color: "#f3e8ff",
    borderRadius: "10px",
    padding: "12px",
  },
  infoLeadCard: {
    background: "#082f49",
    border: "1px solid #38bdf8",
    color: "#e0f2fe",
    borderRadius: "10px",
    padding: "12px",
  },
  reportBox: {
    marginTop: "15px",
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "15px",
    lineHeight: "1.7",
  },
  savedReportsBox: {
    marginTop: "25px",
    background: "#111827",
    border: "1px solid #374151",
    borderRadius: "14px",
    padding: "18px",
  },
  savedReportsHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  savedReportCard: {
    background: "#020617",
    border: "1px solid #334155",
    borderRadius: "10px",
    padding: "14px",
    marginTop: "12px",
  },
  sectionTitleCauses: {
    color: "#ef4444",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #ef4444",
    paddingBottom: "6px",
  },
  sectionTitleTools: {
    color: "#f59e0b",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #f59e0b",
    paddingBottom: "6px",
  },
  sectionTitleChecks: {
    color: "#38bdf8",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #38bdf8",
    paddingBottom: "6px",
  },
  sectionTitleTesting: {
    color: "#8b5cf6",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #8b5cf6",
    paddingBottom: "6px",
  },
  sectionTitleReadings: {
    color: "#22c55e",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #22c55e",
    paddingBottom: "6px",
  },
  sectionTitleRepairs: {
    color: "#f97316",
    marginTop: "22px",
    marginBottom: "10px",
    fontSize: "20px",
    fontWeight: "700",
    borderBottom: "2px solid #f97316",
    paddingBottom: "6px",
  },
  photoPreview: {
    width: "100%",
    maxWidth: "360px",
    borderRadius: "12px",
    marginTop: "10px",
    marginBottom: "16px",
    border: "1px solid #475569",
    objectFit: "cover",
  },
  savedPhoto: {
    width: "100%",
    maxWidth: "260px",
    borderRadius: "10px",
    marginTop: "8px",
    marginBottom: "12px",
    border: "1px solid #475569",
    objectFit: "cover",
  },
};