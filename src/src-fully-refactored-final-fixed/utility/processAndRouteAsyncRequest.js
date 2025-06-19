/**
 * Processes the body of a request asynchronously and routes isBlobOrFileLikeObject using the provided configuration.
 *
 * @async
 * @function processAndRouteAsyncRequest
 * @category utility
 * @param {Object} sourceObservable - The original request or observable object containing a 'body' property.
 * @param {Object} config - Configuration options to be used for processing and routing.
 * @returns {Promise<*>} The result of the routed request after processing the body.
 */
async function processAndRouteAsyncRequest(sourceObservable, config) {
  // Process the body asynchronously using the 'mt' function and the provided config
  const processedBody = await mt(sourceObservable.body, config);

  // Create a new subscription object by merging the original object with the processed body
  const subscription = {
    ...sourceObservable,
    body: processedBody
  };

  // Route the processed subscription using the 'handleModelStreamErrorException' function and return the result
  return handleModelStreamErrorException(subscription, config);
}

module.exports = processAndRouteAsyncRequest;