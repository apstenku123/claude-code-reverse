/**
 * Marks the start of a network initialization request for diagnostics if the endpoint matches the initialization endpoint.
 *
 * @param {Object} requestContext - The context object containing request configuration and SDK key.
 * @param {number} attemptNumber - The current attempt number for the initialization request.
 * @returns {void}
 */
function markNetworkInitializationRequestStart(requestContext, attemptNumber) {
  // Check if the endpoint is the initialization endpoint; if not, exit early
  if (requestContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }

  // Mark the start of the network initialization request in diagnostics
  eq1.Diagnostics._markInitNetworkReqStart(requestContext.sdkKey, {
    attempt: attemptNumber
  });
}

module.exports = markNetworkInitializationRequestStart;