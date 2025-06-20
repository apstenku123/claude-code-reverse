/**
 * Processes the request body using a transformation function and then forwards the updated request to a handler.
 *
 * @async
 * @function createProcessedRequest
 * @param {Object} createRequestOptions - The original request options object, expected to contain a 'body' property.
 * @param {Object} handlerConfig - Configuration or context object passed to the transformation and handler functions.
 * @returns {Promise<any>} The result of the handler function after processing the request body.
 */
async function createProcessedRequest(createRequestOptions, handlerConfig) {
  // Transform the request body asynchronously using the 'mt' function
  const processedBody = await mt(createRequestOptions.body, handlerConfig);

  // Create a new request object with the processed body
  const processedRequest = {
    ...createRequestOptions,
    body: processedBody
  };

  // Pass the processed request to the handler function 'createAndDecorateInternalServerException' and return its result
  return createAndDecorateInternalServerException(processedRequest, handlerConfig);
}

module.exports = createProcessedRequest;