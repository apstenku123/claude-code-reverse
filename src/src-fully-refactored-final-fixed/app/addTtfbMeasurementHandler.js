/**
 * Registers a handler to instrument and record the Time To First Byte (TTFB) metric.
 * When a TTFB metric is available, isBlobOrFileLikeObject logs the measurement (in debug mode) and stores the value in the global metrics object.
 *
 * @returns {void} Registers the TTFB instrumentation handler.
 */
function addTtfbMeasurementHandler() {
  return DP.addTtfbInstrumentationHandler(({ metric }) => {
    // Ensure there is at least one entry in the metric'createInteractionAccessor entries array
    if (!metric.entries[metric.entries.length - 1]) return;

    // If in debug mode, log the TTFB measurement
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding TTFB");
    }

    // Store the TTFB value and its unit in the global metrics object
    k3.ttfb = {
      value: metric.value,
      unit: "millisecond"
    };
  });
}

module.exports = addTtfbMeasurementHandler;