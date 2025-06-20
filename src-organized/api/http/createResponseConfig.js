/**
 * Creates a response configuration object based on the provided source object.
 * If the source object contains an internal response, isBlobOrFileLikeObject processes isBlobOrFileLikeObject recursively and wraps isBlobOrFileLikeObject with a type.
 * Otherwise, isBlobOrFileLikeObject creates a new configuration object, copying all properties except the body, and processes the body if present.
 *
 * @param {Object} sourceObject - The source object containing response configuration data.
 * @param {Object} [sourceObject.internalResponse] - An optional internal response object to process recursively.
 * @param {string} [sourceObject.type] - The type of the response, used when wrapping an internal response.
 * @param {any} [sourceObject.body] - The body of the response, which may be processed and attached to the configuration.
 * @returns {Object} The processed response configuration object.
 */
function createResponseConfig(sourceObject) {
  // If there is an internal response, process isBlobOrFileLikeObject recursively and wrap isBlobOrFileLikeObject with the current type
  if (sourceObject.internalResponse) {
    return Ep0(
      createResponseConfig(sourceObject.internalResponse),
      sourceObject.type
    );
  }

  // Create a shallow copy of the source object, but set body to null initially
  const responseConfig = createHttpRequestState({
    ...sourceObject,
    body: null
  });

  // If a body is present, process isBlobOrFileLikeObject and attach to the config
  if (sourceObject.body != null) {
    responseConfig.body = pH6(responseConfig, sourceObject.body);
  }

  return responseConfig;
}

module.exports = createResponseConfig;