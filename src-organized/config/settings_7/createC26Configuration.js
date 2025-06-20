/**
 * Creates a configuration object for getOtelOtlpHeaders using environment settings, URL resolution, and headers.
 *
 * @param {string} sourceObservable - The observable or identifier used to derive configuration and headers.
 * @param {string} config - The fallback configuration or identifier used to resolve the URL if not found from the observable.
 * @returns {object} The complete configuration object for getOtelOtlpHeaders, including shared settings, resolved URL, and headers.
 */
function createC26Configuration(sourceObservable, config) {
  // Get shared configuration from environment variables based on the source observable
  const sharedConfiguration = J26.getSharedConfigurationFromEnvironment(sourceObservable);

  // Attempt to resolve the URL from the observable; if not found, use the fallback config
  const resolvedUrl = getOtelExporterEndpoint(sourceObservable) ?? H26(config);

  // Generate headers for the request, wrapped as a function if needed
  const headersFunction = X26.wrapStaticHeadersInFunction(getOtelOtlpHeaders(sourceObservable));

  // Combine all configuration parts into a single object
  return {
    ...sharedConfiguration,
    url: resolvedUrl,
    headers: headersFunction
  };
}

module.exports = createC26Configuration;