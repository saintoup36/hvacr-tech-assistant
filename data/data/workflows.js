export const workflows = {
  compressor_not_starting: [
    {
      title: "Verify Line Voltage",
      meter: "AC Voltage",
      leads: "Black → L2, Red → L1",
      expected: "208-240 VAC",
      passMin: 208,
      passMax: 240,
      success: "Power supply is good.",
      next: 1,
      fail:
        "No line voltage. Check breaker, disconnect, and wiring."
    },

    {
      title: "Check Contactor Coil Voltage",
      meter: "AC Voltage",
      leads: "Across Contactor Coil",
      expected: "24 VAC",
      passMin: 22,
      passMax: 28,
      success: "Control voltage is present.",
      next: 2,
      fail:
        "No control voltage. Check thermostat and safety switches."
    },

    {
      title: "Check Capacitor",
      meter: "Capacitance",
      leads: "C to HERM",
      expected: "Within ±6%",
      passMin: 1,
      passMax: 9999,
      success: "Capacitor appears good.",
      next: 3,
      fail:
        "Replace capacitor."
    }
  ]
};