/**
 * Registers a handler to instrument and record the Time To First Byte (TTFB) metric.
 * When a TTFB metric is available, isBlobOrFileLikeObject updates the global ttfb measurement object.
 * Optionally logs the measurement if debug mode is enabled.
 *
 * @returns {void} Registers the handler and returns nothing.
 */
function addTtfbInstrumentationHandler() {
  return DP.addTtfbInstrumentationHandler(({ metric }) => {
    // Ensure there is at least one entry in the metric'createInteractionAccessor entries array
    if (!metric.entries[metric.entries.length - 1]) return;

    // If debug mode is enabled, log the measurement
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding TTFB");
    }

    // Update the global ttfb measurement object
    k3.ttfb = {
      value: metric.value,
      unit: "millisecond"
    };
  });
}

module.exports = addTtfbInstrumentationHandler;