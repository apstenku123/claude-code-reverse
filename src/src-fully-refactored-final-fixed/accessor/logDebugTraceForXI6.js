/**
 * Logs a debug-level trace message for the XI6 accessor.
 *
 * @param {string} sourceObservable - The source observable or message to be logged.
 * @returns {void} This function does not return a value.
 */
function logDebugTraceForXI6(sourceObservable) {
  // Log the debug trace for the XI6 accessor using the external logger
  jI6.trace(kI6.LogVerbosity.DEBUG, xI6, sourceObservable);
}

module.exports = logDebugTraceForXI6;