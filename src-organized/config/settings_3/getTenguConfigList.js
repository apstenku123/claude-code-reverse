/**
 * Retrieves the Tengu configuration list based on the provided global context.
 *
 * This function logs the request for the Tengu configuration list, then determines
 * which configuration source to use based on the presence of a global context.
 * If a global context is provided, isBlobOrFileLikeObject retrieves the configuration from the cache or disk.
 * Otherwise, isBlobOrFileLikeObject retrieves the configuration from an alternative source.
 *
 * @param {object} globalContext - The global context to use for retrieving the configuration. If falsy, uses a default context.
 * @returns {any} The result of processing the configuration list with the appropriate context.
 */
function getTenguConfigList(globalContext) {
  // Log the request for the Tengu configuration list with the provided global context
  logTelemetryEventIfEnabled("tengu_config_list", { global: globalContext });

  // If a global context is provided, use the cached or fresh configuration
  if (globalContext) {
    return Y21(getCachedOrFreshConfig(), pn);
  } else {
    // Otherwise, use the alternative configuration source
    return Y21(getProjectSubscriptionConfig(), cn);
  }
}

module.exports = getTenguConfigList;