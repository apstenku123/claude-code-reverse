/**
 * Processes a source observable and configuration to extract a subscription body,
 * then passes the resulting subscription object to a route handler.
 *
 * @async
 * @function processSubscriptionAndRoute
 * @param {Object} sourceObservable - The observable source object containing a 'body' property.
 * @param {Object} config - Configuration object used for parsing the subscription and routing.
 * @returns {Promise<any>} The result of the route handler function after processing the subscription.
 */
async function processSubscriptionAndRoute(sourceObservable, config) {
  // Parse the subscription body from the observable using the provided config
  const parsedBody = await parseSubscriptionFromObservable(sourceObservable.body, config);

  // Create a new subscription object, merging the parsed body with the original observable
  const subscription = {
    ...sourceObservable,
    body: parsedBody
  };

  // Pass the subscription object and config to the route handler
  return createAndDecorateInternalServerException(subscription, config);
}

module.exports = processSubscriptionAndRoute;