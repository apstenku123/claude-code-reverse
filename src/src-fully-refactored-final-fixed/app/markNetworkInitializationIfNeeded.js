/**
 * Marks the start of a network initialization request if the endpoint matches the required value.
 *
 * @param {Object} sdkContext - The SDK context containing configuration and keys.
 * @param {number} attemptNumber - The current attempt number for initialization.
 * @returns {void}
 */
function markNetworkInitializationIfNeeded(sdkContext, attemptNumber) {
  // Check if the endpoint is set to the initialization endpoint
  if (sdkContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }
  // Mark the start of the network initialization request for diagnostics
  eq1.Diagnostics._markInitNetworkReqStart(sdkContext.sdkKey, {
    attempt: attemptNumber
  });
}

module.exports = markNetworkInitializationIfNeeded;