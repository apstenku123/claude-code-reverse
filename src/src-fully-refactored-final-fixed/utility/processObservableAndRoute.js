/**
 * Processes an observable source by parsing its subscription body and then routes the result using the provided configuration.
 *
 * @async
 * @function processObservableAndRoute
 * @param {Object} sourceObservable - The observable source object containing a 'body' property to be parsed.
 * @param {Object} config - The configuration object used for parsing the subscription and routing.
 * @returns {Promise<*>} The result of routing the processed subscription object using the provided configuration.
 */
async function processObservableAndRoute(sourceObservable, config) {
  // Parse the subscription body from the observable using the provided configuration
  const parsedBody = await parseSubscriptionFromObservable(sourceObservable.body, config);

  // Create a new subscription object by merging the original observable with the parsed body
  const subscription = {
    ...sourceObservable,
    body: parsedBody
  };

  // Route the processed subscription using the provided configuration
  return handleModelStreamErrorException(subscription, config);
}

module.exports = processObservableAndRoute;