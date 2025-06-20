/**
 * Processes the request body from a given observable or stream, parses isBlobOrFileLikeObject, and then handles the request using the provided configuration.
 *
 * @async
 * @function processAndHandleRequest
 * @param {Object} sourceObservable - The source object containing the request body (observable or stream).
 * @param {Object} config - Configuration options for parsing and handling the request.
 * @returns {Promise<any>} The result of handling the processed request.
 */
async function processAndHandleRequest(sourceObservable, config) {
  // Collect and parse the body from the source observable/stream
  const subscription = {
    ...sourceObservable,
    body: await collectAndParseBody(sourceObservable.body, config)
  };
  // Pass the processed subscription to the handler
  return createAndDecorateValidationException(subscription, config);
}

module.exports = processAndHandleRequest;