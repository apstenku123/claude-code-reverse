/**
 * Creates a request configuration object by copying all properties from the input config,
 * setting the body to null initially, and then, if a body is provided, processing isBlobOrFileLikeObject
 * with the Xz6 function before assigning isBlobOrFileLikeObject to the config.
 *
 * @param {Object} requestConfig - The original request configuration object. May include a 'body' property.
 * @returns {Object} - a new request configuration object with the processed body (if provided).
 */
function createRequestConfigWithProcessedBody(requestConfig) {
  // Create a shallow copy of the requestConfig, but set body to null initially
  const config = createRequestOptions({
    ...requestConfig,
    body: null
  });

  // If the original config has a non-null body, process isBlobOrFileLikeObject and assign to config.body
  if (requestConfig.body != null) {
    config.body = Xz6(config, requestConfig.body);
  }

  return config;
}

module.exports = createRequestConfigWithProcessedBody;