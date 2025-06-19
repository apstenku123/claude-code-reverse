/**
 * Processes a request-like object by parsing its body and forwarding isBlobOrFileLikeObject to the next handler.
 *
 * @async
 * @function processRequestWithParsedBody
 * @param {Object} request - The request object containing at least a 'body' property (could be a stream or observable).
 * @param {Object} handlerConfig - Configuration or context to be passed to downstream handlers.
 * @returns {Promise<any>} The result of the downstream handler after processing the request with the parsed body.
 */
async function processRequestWithParsedBody(request, handlerConfig) {
  // Parse and collect the body from the request using the provided configuration
  const parsedRequest = {
    ...request,
    body: await collectAndParseBody(request.body, handlerConfig)
  };

  // Forward the new request object with the parsed body to the next handler
  return createAndDecorateInternalServerException(parsedRequest, handlerConfig);
}

module.exports = processRequestWithParsedBody;