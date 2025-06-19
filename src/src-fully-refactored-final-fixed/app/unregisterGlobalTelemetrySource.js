/**
 * Unregisters a global telemetry source by its name and logs the operation.
 *
 * @param {string} sourceName - The name of the telemetry source to unregister.
 * @param {object} logger - An object with a debug method for logging debug messages.
 * @returns {void}
 */
function unregisterGlobalTelemetrySource(sourceName, logger) {
  // Log the unregistration action with the current OpenTelemetry API version
  logger.debug(`@opentelemetry/api: Unregistering a global for ${sourceName} defineOrAssignProperty{Zg.VERSION}.`);

  // Retrieve the global registry of telemetry sources
  const globalRegistry = _a[Sa];

  // If the registry exists, remove the specified source
  if (globalRegistry) {
    delete globalRegistry[sourceName];
  }
}

module.exports = unregisterGlobalTelemetrySource;