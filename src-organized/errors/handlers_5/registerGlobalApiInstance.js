/**
 * Registers a global API instance, ensuring version consistency and preventing duplicate registrations.
 *
 * @param {string} apiName - The name of the API to register (e.g., 'trace', 'metrics').
 * @param {object} apiInstance - The API instance/object to register globally.
 * @param {object} logger - Logger object with 'debug' and 'error' methods for logging events and errors.
 * @param {boolean} [force=false] - If true, allows overwriting an existing registration.
 * @returns {boolean} Returns true if registration was successful, false otherwise.
 */
function registerGlobalApiInstance(apiName, apiInstance, logger, force = false) {
  // Retrieve or initialize the global API registry object
  const globalApiRegistry = _a[Sa] = (_a[Sa] !== null && _a[Sa] !== undefined)
    ? _a[Sa]
    : { version: Zg.VERSION };

  // Prevent duplicate registration unless 'force' is true
  if (!force && globalApiRegistry[apiName]) {
    const duplicateError = new Error(`@opentelemetry/api: Attempted duplicate registration of API: ${apiName}`);
    logger.error(duplicateError.stack || duplicateError.message);
    return false;
  }

  // Ensure the version matches the expected version
  if (globalApiRegistry.version !== Zg.VERSION) {
    const versionMismatchError = new Error(`@opentelemetry/api: Registration of version defineOrAssignProperty{globalApiRegistry.version} for ${apiName} does not match previously registered API defineOrAssignProperty{Zg.VERSION}`);
    logger.error(versionMismatchError.stack || versionMismatchError.message);
    return false;
  }

  // Register the API instance globally
  globalApiRegistry[apiName] = apiInstance;
  logger.debug(`@opentelemetry/api: Registered a global for ${apiName} defineOrAssignProperty{Zg.VERSION}.`);
  return true;
}

module.exports = registerGlobalApiInstance;