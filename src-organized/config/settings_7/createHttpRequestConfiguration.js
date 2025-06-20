/**
 * Creates an HTTP request configuration object by merging shared environment configuration,
 * determining the request URL, and wrapping static headers in a function.
 *
 * @param {object} sourceObservable - The observable or context from which environment and headers are derived.
 * @param {object} fallbackConfig - The fallback configuration used to determine the URL if not found in sourceObservable.
 * @returns {object} The complete HTTP request configuration object.
 */
function createHttpRequestConfiguration(sourceObservable, fallbackConfig) {
  // Retrieve shared configuration from the environment based on the source observable
  const sharedConfig = J26.getSharedConfigurationFromEnvironment(sourceObservable);

  // Determine the request URL: use getOtelExporterEndpoint if available, otherwise fallback to H26
  const requestUrl = getOtelExporterEndpoint(sourceObservable) ?? H26(fallbackConfig);

  // Wrap static headers in a function for dynamic header resolution
  const headersFunction = X26.wrapStaticHeadersInFunction(getOtelOtlpHeaders(sourceObservable));

  // Merge all configuration parts into a single configuration object
  return {
    ...sharedConfig,
    url: requestUrl,
    headers: headersFunction
  };
}

module.exports = createHttpRequestConfiguration;