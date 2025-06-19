/**
 * Marks the end of the network initialization request in diagnostics if the endpoint matches the initialization endpoint.
 *
 * @param {Object} requestContext - The context object containing urlConfig and sdkKey.
 * @param {Object} config - The configuration object used for diagnostics data extraction.
 * @param {Object} query - The query or request-specific data for diagnostics.
 * @param {Object} interaction - The interaction or invocation context for diagnostics.
 * @param {Object} globalContext - The global context or additional data for diagnostics.
 * @returns {void}
 */
function markNetworkInitializationIfEndpointMatches(requestContext, config, query, interaction, globalContext) {
  // Check if the endpoint in the request context matches the initialization endpoint
  if (requestContext.urlConfig.endpoint !== eC.Endpoint._initialize) {
    return;
  }
  // Mark the end of the network initialization request in diagnostics
  eq1.Diagnostics._markInitNetworkReqEnd(
    requestContext.sdkKey,
    eq1.Diagnostics._getDiagnosticsData(config, query, interaction, globalContext)
  );
}

module.exports = markNetworkInitializationIfEndpointMatches;