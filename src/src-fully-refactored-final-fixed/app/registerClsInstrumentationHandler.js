/**
 * Registers a handler for Cumulative Layout Shift (CLS) instrumentation events.
 * The handler updates the global CLS measurement and logs the event in debug mode.
 *
 * @returns {any} The result of DP.addClsInstrumentationHandler registration.
 */
function registerClsInstrumentationHandler() {
  return DP.addClsInstrumentationHandler(({ metric }) => {
    // Get the most recent entry from the metric'createInteractionAccessor entries array
    const latestEntry = metric.entries[metric.entries.length - 1];
    if (!latestEntry) return;

    // If in debug mode, log the addition of a CLS measurement
    if (rW.DEBUG_BUILD) {
      k8.logger.log("[Measurements] Adding CLS");
    }

    // Update the global CLS measurement object
    k3.cls = {
      value: metric.value,
      unit: ""
    };

    // Store the latest entry globally (purpose depends on broader context)
    Pc = latestEntry;
  }, true);
}

module.exports = registerClsInstrumentationHandler;