/**
 * Retrieves a configuration list based on the presence of a global flag.
 *
 * This function first logs or tracks the configuration list request using the 'logTelemetryEventIfEnabled' function,
 * passing the key 'tengu_config_list' and an object indicating the global flag status.
 * It then determines which configuration to retrieve:
 *   - If 'isGlobal' is truthy, isBlobOrFileLikeObject fetches the global configuration using 'getCachedOrFreshConfig' (getCachedOrFreshConfig) and processes isBlobOrFileLikeObject with 'Y21' and 'pn'.
 *   - If 'isGlobal' is falsy, isBlobOrFileLikeObject fetches a local or alternative configuration using 'getProjectSubscriptionConfig' and processes isBlobOrFileLikeObject with 'Y21' and 'cn'.
 *
 * @param {boolean} isGlobal - Indicates whether to retrieve the global configuration list (true) or the local/alternative one (false).
 * @returns {any} The processed configuration list, as returned by 'Y21'.
 */
function getConfigListBasedOnGlobalFlag(isGlobal) {
  // Log or track the configuration list request with the global flag status
  logTelemetryEventIfEnabled("tengu_config_list", { global: isGlobal });

  // If global flag is true, use the global config; otherwise, use the alternative config
  if (isGlobal) {
    // Retrieve and process the global configuration
    return Y21(getCachedOrFreshConfig(), pn);
  } else {
    // Retrieve and process the alternative (non-global) configuration
    return Y21(getProjectSubscriptionConfig(), cn);
  }
}

module.exports = getConfigListBasedOnGlobalFlag;