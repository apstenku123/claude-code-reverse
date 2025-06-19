/**
 * Checks if the ReportingObserver API is available in the given global object.
 *
 * @param {object} globalObject - The global object to check (e.g., window, globalThis).
 * @returns {boolean} True if ReportingObserver is supported, false otherwise.
 */
function isReportingObserverSupported(globalObject) {
  // Check if 'ReportingObserver' exists as a property in the provided global object
  return "ReportingObserver" in globalObject;
}

module.exports = isReportingObserverSupported;