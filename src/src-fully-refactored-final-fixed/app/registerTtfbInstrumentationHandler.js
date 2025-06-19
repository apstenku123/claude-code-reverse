/**
 * Registers a handler to instrument Time To First Byte (TTFB) measurements.
 * This function adds a TTFB instrumentation handler via DP.addTtfbInstrumentationHandler,
 * logs the measurement in debug mode, and stores the TTFB value in milliseconds.
 *
 * @returns {void} Returns nothing. Registers the handler as a side effect.
 */
function registerTtfbInstrumentationHandler() {
  return DP.addTtfbInstrumentationHandler(({ metric }) => {
    // Ensure there is at least one entry before proceeding
    const lastEntry = metric.entries[metric.entries.length - 1];
    if (!lastEntry) return;

    // If in debug mode, log the TTFB measurement
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding TTFB");
    }

    // Store the TTFB value with its unit
    k3.ttfb = {
      value: metric.value,
      unit: "millisecond"
    };
  });
}

module.exports = registerTtfbInstrumentationHandler;