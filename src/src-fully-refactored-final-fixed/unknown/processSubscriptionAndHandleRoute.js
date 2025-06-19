/**
 * Processes a source observable'createInteractionAccessor body using a configuration, then handles the resulting subscription with route logic.
 *
 * @async
 * @function processSubscriptionAndHandleRoute
 * @param {Object} sourceObservable - The source observable object containing a 'body' property to be parsed.
 * @param {Object} config - Configuration object used for parsing the subscription and handling the route.
 * @returns {Promise<any>} - The result of handling the processed subscription with the provided configuration.
 */
async function processSubscriptionAndHandleRoute(sourceObservable, config) {
  // Parse the subscription from the observable'createInteractionAccessor body using the provided config
  const subscription = {
    ...sourceObservable,
    body: await parseSubscriptionFromObservable(sourceObservable.body, config)
  };

  // Handle the processed subscription with route logic
  return createAndDecorateValidationException(subscription, config);
}

module.exports = processSubscriptionAndHandleRoute;