/**
 * Marks the start of a network initialization request for diagnostics if the endpoint matches the initialization endpoint.
 *
 * @param {Object} sdkContext - The SDK context containing configuration and identifiers.
 * @param {string} sdkContext.sdkKey - The unique key identifying the SDK instance.
 * @param {Object} sdkContext.urlConfig - The configuration object for URLs.
 * @param {Object} sdkContext.urlConfig.endpoint - The endpoint identifier.
 * @param {number} attemptNumber - The current attempt number for initialization.
 * @returns {void}
 */
function markNetworkInitializationIfRequired(sdkContext, attemptNumber) {
  // Check if the endpoint is specifically for initialization
  if (sdkContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }

  // Mark the start of the network initialization request for diagnostics
  eq1.Diagnostics._markInitNetworkReqStart(sdkContext.sdkKey, {
    attempt: attemptNumber
  });
}

module.exports = markNetworkInitializationIfRequired;