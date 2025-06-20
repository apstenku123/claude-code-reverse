/**
 * Creates a request configuration object by combining shared environment configuration, 
 * a resolved URL, and properly wrapped headers.
 *
 * @param {string} sourceObservable - The source observable or identifier used to derive configuration.
 * @param {string} config - The fallback configuration or context used for URL resolution.
 * @returns {Object} The complete request configuration object.
 */
function createRequestConfiguration(sourceObservable, config) {
  // Retrieve shared configuration from the environment based on the source observable
  const sharedConfig = J26.getSharedConfigurationFromEnvironment(sourceObservable);

  // Attempt to resolve the URL from the source observable; fallback to config if not available
  const resolvedUrl = getOtelExporterEndpoint(sourceObservable) ?? H26(config);

  // Get static headers for the source observable and wrap them in a function
  const wrappedHeaders = X26.wrapStaticHeadersInFunction(getOtelOtlpHeaders(sourceObservable));

  // Combine all configuration into a single object
  return {
    ...sharedConfig,
    url: resolvedUrl,
    headers: wrappedHeaders
  };
}

module.exports = createRequestConfiguration;