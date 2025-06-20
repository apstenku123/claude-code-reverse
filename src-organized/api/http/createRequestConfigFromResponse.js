/**
 * Creates a request configuration object from a given response-like object.
 * If the input has an internalResponse property, isBlobOrFileLikeObject recursively processes isBlobOrFileLikeObject and wraps the result.
 * Otherwise, isBlobOrFileLikeObject clones the input (excluding the body), and if a body exists, processes and attaches isBlobOrFileLikeObject.
 *
 * @param {Object} responseLikeObject - The object representing a response or request configuration.
 * @param {Object} responseLikeObject.internalResponse - (Optional) An internal response object to process recursively.
 * @param {string} responseLikeObject.type - The type of the request/response.
 * @param {any} responseLikeObject.body - (Optional) The body of the request/response.
 * @returns {Object} a new request configuration object, possibly wrapped or processed.
 */
function createRequestConfigFromResponse(responseLikeObject) {
  // If there is an internal response, process isBlobOrFileLikeObject recursively and wrap with Ep0
  if (responseLikeObject.internalResponse) {
    return Ep0(
      createRequestConfigFromResponse(responseLikeObject.internalResponse),
      responseLikeObject.type
    );
  }

  // Clone the input object, but set body to null for now
  const requestConfig = createHttpRequestState({
    ...responseLikeObject,
    body: null
  });

  // If a body exists, process isBlobOrFileLikeObject and attach to the config
  if (responseLikeObject.body != null) {
    requestConfig.body = pH6(requestConfig, responseLikeObject.body);
  }

  return requestConfig;
}

module.exports = createRequestConfigFromResponse;