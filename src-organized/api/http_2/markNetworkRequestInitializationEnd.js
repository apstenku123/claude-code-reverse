/**
 * Marks the end of the network request initialization phase for diagnostics, if the endpoint matches the expected initialization endpoint.
 *
 * @param {Object} requestContext - The context object containing urlConfig and sdkKey.
 * @param {Object} config - The configuration object used for diagnostics data extraction.
 * @param {Object} subscription - The subscription or query object relevant to diagnostics.
 * @param {Object} requestInfo - Additional request information for diagnostics.
 * @param {Object} globalState - Global state or context used in diagnostics data extraction.
 * @returns {void}
 */
function markNetworkRequestInitializationEnd(requestContext, config, subscription, requestInfo, globalState) {
  // Check if the endpoint is the expected initialization endpoint
  if (requestContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }
  // Mark the end of the initialization network request in diagnostics
  eq1.Diagnostics._markInitNetworkReqEnd(
    requestContext.sdkKey,
    eq1.Diagnostics._getDiagnosticsData(config, subscription, requestInfo, globalState)
  );
}

module.exports = markNetworkRequestInitializationEnd;