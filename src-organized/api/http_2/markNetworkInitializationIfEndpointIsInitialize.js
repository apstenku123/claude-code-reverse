/**
 * Marks the end of the network initialization request for diagnostics if the endpoint is set to '_initialize'.
 *
 * @param {Object} requestContext - The context object containing urlConfig and sdkKey.
 * @param {Object} config - The configuration object used for diagnostics data extraction.
 * @param {Object} subscription - The subscription or request object used for diagnostics data extraction.
 * @param {Object} requestInfo - Additional request information for diagnostics data extraction.
 * @param {Object} globalContext - Global context or options for diagnostics data extraction.
 * @returns {void}
 */
function markNetworkInitializationIfEndpointIsInitialize(requestContext, config, subscription, requestInfo, globalContext) {
  // Check if the endpoint is '_initialize'; if not, exit early
  if (requestContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }

  // Mark the end of the network initialization request for diagnostics
  eq1.Diagnostics._markInitNetworkReqEnd(
    requestContext.sdkKey,
    eq1.Diagnostics._getDiagnosticsData(config, subscription, requestInfo, globalContext)
  );
}

module.exports = markNetworkInitializationIfEndpointIsInitialize;