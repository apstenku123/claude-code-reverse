/**
 * Registers a global API implementation, ensuring version consistency and preventing duplicate registrations.
 *
 * @param {string} apiName - The name of the API to register (e.g., 'tracing', 'metrics').
 * @param {object} apiImplementation - The implementation object for the API.
 * @param {object} logger - Logger object with 'error' and 'debug' methods for reporting registration status.
 * @param {boolean} [allowOverride=false] - If true, allows overriding an existing registration for the API.
 * @returns {boolean} Returns true if registration was successful, false otherwise.
 */
function registerGlobalApi(apiName, apiImplementation, logger, allowOverride = false) {
  // Retrieve or initialize the global API registry object
  const globalApiRegistry = _a[Sa] = (_a[Sa] !== null && _a[Sa] !== undefined)
    ? _a[Sa]
    : { version: Zg.VERSION };

  // Prevent duplicate registration unless override is allowed
  if (!allowOverride && globalApiRegistry[apiName]) {
    const duplicateError = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${apiName}`);
    logger.error(duplicateError.stack || duplicateError.message);
    return false;
  }

  // Ensure version consistency between current and new registration
  if (globalApiRegistry.version !== Zg.VERSION) {
    const versionMismatchError = new Error(`@opentelemetry/api: Registration of version defineOrAssignProperty{globalApiRegistry.version} for ${apiName} does not match previously registered API defineOrAssignProperty{Zg.VERSION}`);
    logger.error(versionMismatchError.stack || versionMismatchError.message);
    return false;
  }

  // Register the API implementation
  globalApiRegistry[apiName] = apiImplementation;
  logger.debug(`@opentelemetry/api: Registered a global for ${apiName} defineOrAssignProperty{Zg.VERSION}.`);
  return true;
}

module.exports = registerGlobalApi;