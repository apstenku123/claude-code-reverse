/**
 * Unregisters a global observable from the registry and logs the operation.
 *
 * @param {string} observableName - The name of the observable to unregister.
 * @param {object} logger - An object with a debug method for logging.
 * @returns {void}
 */
function unregisterGlobalObservable(observableName, logger) {
  // Log the unregistration attempt with version info
  logger.debug(`@opentelemetry/api: Unregistering a global for ${observableName} defineOrAssignProperty{Zg.VERSION}.`);

  // Retrieve the global registry object using the global key
  const globalRegistry = _a[Sa];

  // If the registry exists, remove the observable entry
  if (globalRegistry) {
    delete globalRegistry[observableName];
  }
}

module.exports = unregisterGlobalObservable;