/**
 * Processes the body of a subscription object asynchronously and routes isBlobOrFileLikeObject using the provided configuration.
 * 
 * @async
 * @function processAndRouteSubscription
 * @category utility
 * @param {Object} subscriptionSource - The source subscription object containing a body property (observable or stream).
 * @param {Object} config - Configuration object used for parsing the body and routing the subscription.
 * @returns {Promise<Object>} The result of routing the processed subscription.
 */
async function processAndRouteSubscription(subscriptionSource, config) {
  // Collect and parse the body from the source subscription asynchronously
  const parsedBody = await collectAndParseBody(subscriptionSource.body, config);

  // Create a new subscription object with the parsed body
  const subscription = {
    ...subscriptionSource,
    body: parsedBody
  };

  // Route the processed subscription using the provided configuration
  return handleModelStreamErrorException(subscription, config);
}

module.exports = processAndRouteSubscription;